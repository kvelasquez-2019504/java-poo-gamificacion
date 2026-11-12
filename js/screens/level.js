/* ==========================================================
   level.js — pantalla de nivel: encadena ejercicios, vidas y retroalimentación
   ========================================================== */
NEON.screens.level = (function () {
  const ui = NEON.ui;
  const C = NEON.config;

  const ETIQUETAS = { multiple: 'Teoría', dragCode: 'Práctica', order: 'Ordenar' };

  /** Punto de entrada desde el mapa/resultados: comprueba que haya vidas. */
  function iniciar(nivelId) {
    if (NEON.lives.cantidad() > 0) { NEON.router.ir('level', { nivelId: nivelId }); return; }
    ui.sonido('error');
    ui.modal({
      titulo: '⚡ SIN ENERGÍA',
      cuerpo: ui.el('p', { text: 'Tu deck no tiene vidas. La próxima se regenera en ' + ui.formatoTiempo(NEON.lives.msParaSiguiente()) + '. Vuelve en un rato, Runner.' }),
      botones: [{ texto: 'Entendido', clase: 'btn-primario' }]
    });
  }

  function mostrar(raiz, params) {
    const nivel = NEON.state.nivelPorId(params.nivelId);
    const mundo = NEON.state.mundoPorId(nivel.mundo);
    const total = nivel.ejercicios.length;
    const sesion = { indice: 0, intentos: 0, puntosBase: 0, vidasPerdidas: 0, inicio: Date.now() };

    let ctrl = null;          // controlador del ejercicio actual
    let ocupado = false;      // true mientras se "compila"
    let resuelto = false;     // true cuando el ejercicio actual ya está acertado

    // ----- Estructura de la pantalla -----
    const vidasEl = ui.el('span', { class: 'vidas' });
    const reloj = ui.el('span', { class: 'cronometro' });
    const progreso = ui.el('div', { class: 'progreso-ejercicios', 'aria-hidden': 'true' });
    const historia = ui.el('p', { class: 'historia', text: nivel.historia });
    const enunciado = ui.el('p', { class: 'enunciado' });
    const zona = ui.el('div', { class: 'zona-ejercicio' });
    const terminal = ui.el('div', { class: 'terminal', 'aria-live': 'polite' });
    const boton = ui.el('button', { type: 'button', class: 'btn btn-primario btn-grande', onclick: alPulsarBoton });

    raiz.appendChild(ui.el('section', { class: 'pantalla pantalla-nivel', style: '--acento:' + mundo.color }, [
      ui.el('header', { class: 'nivel-barra' }, [
        ui.el('button', { type: 'button', class: 'btn btn-secundario btn-mini', text: '← Mapa', onclick: salir }),
        ui.el('div', { class: 'nivel-titulo' }, [
          ui.el('small', { text: mundo.nombre + ' · Nivel ' + nivel.numero + (nivel.esJefe ? ' · JEFE' : '') }),
          ui.el('h2', { class: 'neon-acento', text: nivel.titulo })
        ]),
        ui.el('div', { class: 'hud-datos' }, [vidasEl, reloj])
      ]),
      progreso, historia, enunciado, zona, terminal,
      ui.el('footer', { class: 'acciones' }, boton)
    ]));

    ui.dibujarVidas(vidasEl, NEON.lives.cantidad());

    // ----- Cronómetro -----
    function pintarReloj() {
      const seg = Math.floor((Date.now() - sesion.inicio) / 1000);
      reloj.textContent = '⏱ ' + seg + ' s / ' + nivel.tiempoObjetivo + ' s';
      reloj.classList.toggle('tarde', seg > nivel.tiempoObjetivo);
    }
    pintarReloj();
    const intervalo = setInterval(pintarReloj, 1000);

    // ----- Carga de ejercicios -----
    function cargarEjercicio() {
      const ej = nivel.ejercicios[sesion.indice];
      sesion.intentos = 0;
      resuelto = false;
      historia.hidden = sesion.indice > 0;
      terminal.className = 'terminal';
      terminal.innerHTML = '';
      zona.innerHTML = '';

      progreso.innerHTML = '';
      for (let i = 0; i < total; i++) {
        progreso.appendChild(ui.el('span', { class: i < sesion.indice ? 'hecho' : i === sesion.indice ? 'actual' : '' }));
      }

      enunciado.innerHTML = '<span class="etiqueta">' + ETIQUETAS[ej.tipo] + ' ' + (sesion.indice + 1) + '/' + total + '</span>' + ui.marcado(ej.enunciado);
      if (ej.tipo === 'multiple' && ej.correcta.length > 1) enunciado.insertAdjacentHTML('beforeend', ' <em>(varias respuestas)</em>');

      // Contenedor nuevo por ejercicio: evita que queden eventos del anterior
      const contenedor = ui.el('div', { class: 'ejercicio ' + ej.tipo });
      zona.appendChild(contenedor);
      ctrl = NEON.exercises[ej.tipo].montar(contenedor, ej, alCambiar);
      pintarBoton();
    }

    function alCambiar() { if (!resuelto) pintarBoton(); }

    function pintarBoton() {
      if (resuelto) {
        boton.textContent = sesion.indice + 1 < total ? 'Siguiente ▶' : 'Finalizar ✔';
        boton.className = 'btn btn-exito btn-grande';
        boton.disabled = false;
      } else {
        boton.textContent = ocupado ? 'Compilando…' : 'Comprobar';
        boton.className = 'btn btn-primario btn-grande';
        boton.disabled = ocupado || !ctrl.completo();
      }
    }

    // ----- Terminal de retroalimentación -----
    function linea(texto, clase) {
      return '<p' + (clase ? ' class="' + clase + '"' : '') + '><span class="prompt">&gt;</span> ' + texto + '</p>';
    }
    function mostrarTerminal(lineas, error) {
      terminal.className = 'terminal visible' + (error ? ' error' : '');
      terminal.innerHTML = lineas.join('');
    }

    // ----- Comprobar -----
    function alPulsarBoton() {
      ui.sonido('click');
      if (resuelto) { avanzar(); return; }
      if (ocupado || !ctrl.completo()) return;
      ocupado = true;
      pintarBoton();
      mostrarTerminal([linea('<span class="compilando">' + NEON.narrative.mensaje('compilando') + '</span>')], false);
      setTimeout(evaluar, C.COMPILAR_MS);
    }

    function evaluar() {
      ocupado = false;
      const ej = nivel.ejercicios[sesion.indice];
      const resultado = NEON.validator.validar(ej, ctrl.respuesta());
      sesion.intentos++;
      ctrl.marcar(resultado.detalle);
      if (resultado.correcto) acierto(ej); else fallo(ej, resultado);
    }

    function acierto(ej) {
      resuelto = true;
      ctrl.bloquear();
      sesion.puntosBase += NEON.scoring.puntosIntento(sesion.intentos);
      ui.sonido('ok');
      mostrarTerminal([
        linea(ui.escapar(NEON.narrative.mensaje('exito'))),
        linea('💡 ' + ui.marcado(ej.explicacion), 'concepto')
      ], false);
      pintarBoton();
    }

    /** Explica POR QUÉ falló cada elemento incorrecto, según el tipo de ejercicio. */
    function explicaciones(ej, resultado) {
      const fallos = resultado.detalle.filter(function (d) { return !d.ok; });
      if (ej.tipo === 'dragCode') {
        const ids = Object.keys(ej.slots);
        return fallos.filter(function (d) { return ej.feedbackPorSlot && ej.feedbackPorSlot[d.slotId]; })
          .map(function (d) { return 'Hueco ' + (ids.indexOf(d.slotId) + 1) + ': ' + ej.feedbackPorSlot[d.slotId]; });
      }
      if (ej.tipo === 'multiple') {
        return fallos.filter(function (d) { return ej.feedbackPorOpcion && ej.feedbackPorOpcion[d.slotId]; })
          .map(function (d) { return 'Opción ' + d.slotId.toUpperCase() + ': ' + ej.feedbackPorOpcion[d.slotId]; });
      }
      return [];
    }

    function fallo(ej, resultado) {
      const quedan = NEON.lives.perder();
      sesion.vidasPerdidas++;
      ui.dibujarVidas(vidasEl, quedan, 'roto');
      ui.sonido('error');
      zona.classList.add('sacudir');
      setTimeout(function () { zona.classList.remove('sacudir'); }, 500);

      const lineas = [linea(ui.escapar(NEON.narrative.mensaje('perdidaVida'))), linea(ui.marcado(ej.feedback))];
      explicaciones(ej, resultado).forEach(function (t) { lineas.push(linea(ui.marcado(t))); });
      if (sesion.intentos >= 2 && ej.pista) lineas.push(linea('PISTA: ' + ui.marcado(ej.pista), 'pista'));
      mostrarTerminal(lineas, true);
      pintarBoton();

      if (quedan <= 0) setTimeout(sinVidas, 900);
    }

    function sinVidas() {
      clearInterval(intervalo);
      ui.modal({
        titulo: '☠ CONEXIÓN PERDIDA',
        cuerpo: ui.el('div', { class: 'modal-cuerpo' }, [
          ui.el('p', { text: NEON.narrative.mensaje('sinVidas') }),
          ui.el('p', { text: 'Próxima vida en ' + ui.formatoTiempo(NEON.lives.msParaSiguiente()) + '.' })
        ]),
        cerrable: false, acento: '#ff3b5c',
        botones: [{ texto: 'Volver al mapa', clase: 'btn-primario', accion: function () { NEON.router.ir('map'); } }]
      });
    }

    // ----- Avance y cierre del nivel -----
    function avanzar() {
      sesion.indice++;
      if (sesion.indice < total) cargarEjercicio(); else terminar();
    }

    function terminar() {
      const segundos = Math.round((Date.now() - sesion.inicio) / 1000);
      const mundoNuevo = nivel.esJefe && !NEON.state.mundoCompletado(nivel.mundo);   // antes de registrar
      const resultado = NEON.scoring.calcular({
        puntosBase: sesion.puntosBase, segundos: segundos, objetivo: nivel.tiempoObjetivo,
        vidasPerdidas: sesion.vidasPerdidas, vidasRestantes: NEON.lives.cantidad(),
        esJefe: nivel.esJefe, mundoNuevo: mundoNuevo
      });
      const record = NEON.state.registrarResultado(nivel.id, resultado.total, resultado.estrellas, segundos);
      NEON.router.ir('results', {
        nivelId: nivel.id, resultado: resultado, segundos: segundos, record: record,
        mundoNuevo: mundoNuevo, juegoCompleto: mundoNuevo && NEON.state.juegoCompletado()
      });
    }

    function salir() {
      ui.confirmar('¿Abandonar el nivel?', 'Perderás el avance de este intento (las vidas gastadas no se recuperan).', 'Abandonar',
        function () { NEON.router.ir('map'); });
    }

    cargarEjercicio();
    return function limpiar() { clearInterval(intervalo); };
  }

  return { iniciar: iniciar, mostrar: mostrar };
})();
