/* ==========================================================
   map.js — mapa de niveles (pantalla principal), HUD y ajustes
   El mapa se dibuja en un sistema de coordenadas proporcional:
   ANCHO x ALTO unidades, que escala igual en cualquier pantalla.
   El mundo 1 está abajo y se avanza hacia arriba, como en Candy Crush.
   ========================================================== */
NEON.screens.map = (function () {
  const ui = NEON.ui;
  const C = NEON.config;
  const SVG_NS = 'http://www.w3.org/2000/svg';

  const ANCHO = 400;
  const BLOQUE = 720;                            // alto de cada mundo
  const ALTO = BLOQUE * C.MUNDOS.length;
  const SEPARACION = 100;                        // distancia vertical entre nodos
  const MARGEN_INFERIOR = 75;

  /** Posición (en unidades del mapa) del nivel con índice global i. */
  function posicion(i) {
    const mundo = Math.floor(i / C.NIVELES_POR_MUNDO), n = i % C.NIVELES_POR_MUNDO;
    return {
      x: 200 + 100 * Math.sin(i * 1.1),
      y: ALTO - mundo * BLOQUE - MARGEN_INFERIOR - n * SEPARACION
    };
  }

  const pct = function (valor, total) { return (valor / total * 100).toFixed(3) + '%'; };

  // ---------------------------------------------------------------- HUD

  function crearHUD() {
    const d = NEON.state.datos;
    const vidas = ui.el('span', { class: 'vidas' });
    const reloj = ui.el('span', { class: 'temporizador-vida', 'aria-label': 'Tiempo para la próxima vida' });
    const puntos = ui.el('span', { class: 'puntos-total', 'aria-label': 'Puntos totales' });
    const sonido = ui.el('button', { type: 'button', class: 'btn btn-secundario btn-icono', onclick: alternarSonido });
    let vidasPrevias = -1;

    function pintarSonido() {
      sonido.textContent = d.ajustes.sonido ? '🔊' : '🔇';
      sonido.setAttribute('aria-label', d.ajustes.sonido ? 'Silenciar sonido' : 'Activar sonido');
    }
    function alternarSonido() {
      NEON.state.ajustar('sonido', !d.ajustes.sonido);
      pintarSonido();
      ui.sonido('click');
    }

    /** Refresca vidas, cuenta atrás y puntos; avisa si se regeneró una vida. */
    function actualizar() {
      const ganadas = NEON.lives.sincronizar();
      const cant = d.vidas.cantidad;
      if (cant !== vidasPrevias) {
        ui.dibujarVidas(vidas, cant, ganadas > 0 ? 'nuevo' : null);
        vidasPrevias = cant;
      }
      if (ganadas > 0) { ui.toast(NEON.narrative.mensaje('vidaRegenerada'), 'ok'); ui.sonido('vida'); }
      const ms = NEON.lives.msParaSiguiente();
      reloj.textContent = ms > 0 ? '⏱ ' + ui.formatoTiempo(ms) : '';
      puntos.textContent = NEON.state.totales().puntos + ' pts';
    }

    pintarSonido();
    actualizar();

    const hud = ui.el('header', { class: 'hud' }, [
      ui.el('div', { class: 'hud-jugador' }, [
        NEON.avatars.crear(d.perfil.avatarId),
        ui.el('span', { class: 'hud-nombre', text: d.perfil.nombre })
      ]),
      ui.el('div', { class: 'hud-datos' }, [vidas, reloj, puntos]),
      ui.el('div', { class: 'hud-datos' }, [
        sonido,
        ui.el('button', { type: 'button', class: 'btn btn-primario btn-icono', 'aria-label': 'Ranking', text: '🏆', onclick: function () { NEON.router.ir('ranking'); } }),
        ui.el('button', { type: 'button', class: 'btn btn-secundario btn-icono', 'aria-label': 'Ajustes', text: '⚙', onclick: abrirAjustes })
      ])
    ]);
    return { hud: hud, actualizar: actualizar };
  }

  // ---------------------------------------------------------------- Ajustes

  function abrirAjustes() {
    const d = NEON.state.datos;
    const lista = ui.el('div', { class: 'lista-ajustes' });
    const m = ui.modal({
      titulo: 'Ajustes', cuerpo: lista, botones: [{ texto: 'Cerrar', clase: 'btn-secundario' }]
    });

    const botonSonido = ui.el('button', { type: 'button', class: 'btn btn-mini btn-secundario', onclick: function () {
      NEON.state.ajustar('sonido', !d.ajustes.sonido);
      pintarSonido();
    } });
    function pintarSonido() { botonSonido.textContent = 'Sonido: ' + (d.ajustes.sonido ? 'ACTIVADO' : 'SILENCIADO'); }
    pintarSonido();

    lista.appendChild(botonSonido);
    lista.appendChild(ui.el('button', { type: 'button', class: 'btn btn-mini btn-secundario', text: 'Ver la introducción', onclick: function () {
      m.cerrar(); NEON.router.ir('intro');
    } }));
    lista.appendChild(ui.el('button', { type: 'button', class: 'btn btn-mini btn-primario', text: 'Cambiar perfil', onclick: function () {
      m.cerrar();
      ui.confirmar('¿Cambiar de perfil?',
        'Se creará un Runner nuevo con el progreso en blanco. El perfil actual seguirá apareciendo en el ranking con sus puntos.',
        'Cambiar perfil', function () { NEON.router.ir('profile', { cambiar: true }); });
    } }));
    lista.appendChild(ui.el('button', { type: 'button', class: 'btn btn-mini btn-peligro', text: 'Borrar progreso', onclick: function () {
      m.cerrar();
      ui.confirmar('¿Borrar todo el progreso?',
        'Perderás estrellas, puntos y vidas de este perfil. Esta acción no se puede deshacer.',
        'Sí, borrar', function () { NEON.state.borrarProgreso(); ui.toast('Progreso borrado.', 'error'); NEON.router.ir('map'); });
    } }));
  }

  // ---------------------------------------------------------------- Mapa

  function bloqueDeMundo(indice, mundo) {
    const tope = ALTO - (indice + 1) * BLOQUE;
    const bloqueado = !NEON.state.desbloqueado(indice * C.NIVELES_POR_MUNDO);
    const fondo = ui.el('div', { class: 'mapa-mundo m-' + mundo.id });
    fondo.style.cssText = '--acento:' + mundo.color + ';top:' + pct(tope + 6, ALTO) + ';height:' + pct(BLOQUE - 12, ALTO) + ';' + (bloqueado ? 'opacity:.55;' : '');

    const banner = ui.el('div', { class: 'mapa-banner' }, [
      ui.el('h2', { class: 'neon-acento', text: mundo.icono + ' MUNDO ' + (indice + 1) + ' · ' + mundo.nombre + (bloqueado ? ' 🔒' : '') }),
      ui.el('h3', { text: mundo.titulo }),
      ui.el('p', { text: NEON.narrative.mundos[mundo.id] })
    ]);
    banner.style.cssText = '--acento:' + mundo.color + ';top:' + pct(tope + 16, ALTO);
    return [fondo, banner];
  }

  function crearNodo(nivel, i, esActual) {
    const mundo = NEON.state.mundoPorId(nivel.mundo);
    const prog = NEON.state.progresoDe(nivel.id);
    const libre = NEON.state.desbloqueado(i);
    const estado = !libre ? 'bloqueado' : prog.completado ? 'completado' : 'disponible';
    const p = posicion(i);

    const contenido = !libre ? '🔒' : (nivel.esJefe ? '☠' : String(nivel.numero));
    const etiqueta = 'Nivel ' + nivel.numero + ' de ' + mundo.nombre + ': ' + nivel.titulo + '. ' +
      (!libre ? 'Bloqueado.' : prog.completado ? prog.estrellas + ' estrellas.' : 'Disponible.');

    const nodo = ui.el('button', {
      type: 'button', class: 'nodo ' + estado + (nivel.esJefe ? ' jefe' : ''), 'aria-label': etiqueta,
      onclick: function () { alPulsarNodo(nivel, i, libre); }
    }, contenido);
    nodo.style.cssText = '--acento:' + mundo.color + ';left:' + pct(p.x, ANCHO) + ';top:' + pct(p.y, ALTO);

    if (prog.completado) {
      nodo.appendChild(ui.el('span', { class: 'nodo-estrellas estrellas', 'aria-hidden': 'true' },
        [1, 2, 3].map(function (n) { return ui.el('span', { class: 'estrella' + (n <= prog.estrellas ? ' on' : ''), text: '★' }); })));
    }
    if (esActual) {
      nodo.appendChild(ui.el('span', { class: 'nodo-avatar' }, NEON.avatars.crear(NEON.state.datos.perfil.avatarId)));
    }
    return nodo;
  }

  /** Línea de neón que une los nodos; se ilumina hasta el último nivel completado. */
  function crearLinea(niveles) {
    const svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('class', 'mapa-linea');
    svg.setAttribute('viewBox', '0 0 ' + ANCHO + ' ' + ALTO);
    svg.setAttribute('preserveAspectRatio', 'none');
    svg.setAttribute('aria-hidden', 'true');

    for (let i = 0; i < niveles.length - 1; i++) {
      const a = posicion(i), b = posicion(i + 1), medio = (a.y + b.y) / 2;
      const tramo = document.createElementNS(SVG_NS, 'path');
      tramo.setAttribute('d', 'M' + a.x + ' ' + a.y + ' C' + a.x + ' ' + medio + ' ' + b.x + ' ' + medio + ' ' + b.x + ' ' + b.y);
      const mundo = NEON.state.mundoPorId(niveles[i].mundo);
      tramo.setAttribute('style', '--acento:' + mundo.color);
      if (NEON.state.progresoDe(niveles[i].id).completado) tramo.setAttribute('class', 'activo');
      svg.appendChild(tramo);
    }
    return svg;
  }

  function alPulsarNodo(nivel, i, libre) {
    ui.sonido(libre ? 'click' : 'error');
    if (!libre) { ui.toast('🔒 Completa el nivel anterior para desbloquear este.', 'error'); return; }
    const mundo = NEON.state.mundoPorId(nivel.mundo);
    const prog = NEON.state.progresoDe(nivel.id);

    const cuerpo = ui.el('div', { class: 'nivel-previa' }, [
      ui.el('p', { class: 'meta', text: mundo.nombre + ' · Nivel ' + nivel.numero + (nivel.esJefe ? ' · JEFE' : '') }),
      ui.el('p', { class: 'historia-prev', text: nivel.historia }),
      ui.el('p', { class: 'meta', text: nivel.ejercicios.length + ' ejercicio(s) · Tiempo objetivo: ' + nivel.tiempoObjetivo + ' s' +
        (nivel.esJefe ? ' · una sola barra de vidas' : '') }),
      prog.completado
        ? ui.el('p', { class: 'meta', text: 'Mejor puntaje: ' + prog.mejorPuntaje + ' pts · ' + '★'.repeat(prog.estrellas) + '☆'.repeat(3 - prog.estrellas) })
        : null
    ]);
    ui.modal({
      titulo: nivel.titulo, cuerpo: cuerpo, acento: mundo.color,
      botones: [
        { texto: 'Cancelar', clase: 'btn-secundario' },
        { texto: prog.completado ? 'Repetir' : 'Iniciar', clase: 'btn-primario', accion: function () { NEON.screens.level.iniciar(nivel.id); } }
      ]
    });
  }

  function mostrar(raiz) {
    const niveles = NEON.state.listaNiveles();
    const actual = NEON.state.nivelActual() || niveles[niveles.length - 1];
    const barra = crearHUD();

    const mapa = ui.el('div', { class: 'mapa' });
    mapa.style.aspectRatio = ANCHO + ' / ' + ALTO;

    NEON.config.MUNDOS.forEach(function (m, i) {
      bloqueDeMundo(i, m).forEach(function (n) { mapa.appendChild(n); });
    });
    mapa.appendChild(crearLinea(niveles));
    niveles.forEach(function (nivel, i) { mapa.appendChild(crearNodo(nivel, i, nivel === actual)); });

    raiz.appendChild(ui.el('section', { class: 'pantalla pantalla-mapa' }, [
      barra.hud,
      ui.el('div', { class: 'mapa-scroll' }, mapa)
    ]));

    // Centra el nivel actual en pantalla
    const nodoActual = mapa.querySelector('.nodo-avatar');
    if (nodoActual) setTimeout(function () { nodoActual.scrollIntoView({ block: 'center' }); }, 0);

    const reloj = setInterval(barra.actualizar, 1000);
    return function limpiar() { clearInterval(reloj); };
  }

  return { mostrar: mostrar };
})();
