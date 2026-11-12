/* ==========================================================
   results.js — resultados del nivel y epílogo final
   ========================================================== */
NEON.screens.results = (function () {
  const ui = NEON.ui;
  const MS_ESTRELLA = 450;
  const MS_CONTEO = 1200;

  /** Anima un número desde 0 hasta `meta`. */
  function contar(elemento, meta) {
    const inicio = performance.now();
    function cuadro(ahora) {
      const t = Math.min(1, (ahora - inicio) / MS_CONTEO);
      elemento.textContent = Math.round(meta * (1 - Math.pow(1 - t, 3)));
      if (t < 1 && document.contains(elemento)) requestAnimationFrame(cuadro);
    }
    requestAnimationFrame(cuadro);
  }

  function mostrar(raiz, p) {
    const nivel = NEON.state.nivelPorId(p.nivelId);
    const mundo = NEON.state.mundoPorId(nivel.mundo);
    const lista = NEON.state.listaNiveles();
    const siguiente = lista[lista.findIndex(function (n) { return n.id === nivel.id; }) + 1];
    const temporizadores = [];

    // Estrellas (las conseguidas aparecen una a una)
    const estrellas = ui.el('div', { class: 'estrellas estrellas-grandes', role: 'img', 'aria-label': p.resultado.estrellas + ' de 3 estrellas' },
      [1, 2, 3].map(function (n) { return ui.el('span', { class: 'estrella' + (n <= p.resultado.estrellas ? ' on' : ''), text: '★' }); }));
    const puntos = ui.el('div', { class: 'puntos-grandes neon-amarillo', text: '0' });

    const desglose = ui.el('ul', { class: 'desglose' }, p.resultado.desglose.map(function (f) {
      return ui.el('li', {}, [ui.el('span', { text: f.etiqueta }), ui.el('span', { text: '+' + f.valor })]);
    }));
    desglose.appendChild(ui.el('li', { class: 'total' }, [
      ui.el('span', { text: 'TOTAL' }), ui.el('span', { text: p.resultado.total + ' pts' })
    ]));

    const botones = [];
    if (p.juegoCompleto) {
      botones.push(ui.el('button', { type: 'button', class: 'btn btn-exito btn-grande', text: 'Ver epílogo ▶', onclick: function () { NEON.router.ir('epilogo'); } }));
    } else if (siguiente) {
      botones.push(ui.el('button', { type: 'button', class: 'btn btn-primario btn-grande', text: 'Siguiente nivel ▶',
        onclick: function () { NEON.screens.level.iniciar(siguiente.id); } }));
    }
    botones.push(ui.el('button', { type: 'button', class: 'btn btn-secundario', text: 'Repetir', onclick: function () { NEON.screens.level.iniciar(nivel.id); } }));
    botones.push(ui.el('button', { type: 'button', class: 'btn btn-secundario', text: 'Mapa', onclick: function () { NEON.router.ir('map'); } }));

    raiz.appendChild(ui.el('section', { class: 'centrada pantalla resultados', style: '--acento:' + mundo.color }, [
      ui.el('h1', { class: 'neon-acento', text: NEON.narrative.mensaje('exito') }),
      ui.el('h2', { text: nivel.titulo }),
      estrellas, puntos,
      p.record ? ui.el('div', {}, ui.el('span', { class: 'etiqueta-record', text: '★ NUEVO RÉCORD ★' })) : null,
      p.mundoNuevo ? ui.el('p', { class: 'neon-amarillo', text: '🏆 MUNDO COMPLETADO: ' + mundo.nombre + '. ¡Se abre el siguiente firewall!' }) : null,
      ui.el('div', { class: 'tarjeta' }, [
        desglose,
        ui.el('p', { class: 'meta', text: 'Tiempo: ' + p.segundos + ' s (objetivo ' + nivel.tiempoObjetivo + ' s)' })
      ]),
      ui.el('div', { class: 'fila-botones' }, botones)
    ]));

    // Animaciones: estrellas una a una, conteo de puntos y confeti
    estrellas.querySelectorAll('.estrella.on').forEach(function (e, i) {
      temporizadores.push(setTimeout(function () { e.classList.add('aparece'); ui.sonido('estrella'); }, 300 + i * MS_ESTRELLA));
    });
    contar(puntos, p.resultado.total);
    ui.confeti();
    if (p.mundoNuevo) temporizadores.push(setTimeout(ui.confeti, 1500));

    return function limpiar() { temporizadores.forEach(clearTimeout); };
  }

  return { mostrar: mostrar };
})();

/* ---------------- Epílogo: NEXUS cae ---------------- */
NEON.screens.epilogo = (function () {
  const ui = NEON.ui;

  function mostrar(raiz) {
    const parrafos = NEON.narrative.epilogo.map(function (t, i) {
      const p = ui.el('p', { html: ui.marcado(t) });
      p.style.animation = 'entrar 0.8s ease both';
      p.style.animationDelay = (i * 1.4) + 's';
      return p;
    });
    const total = NEON.state.totales();
    const ms = NEON.narrative.epilogo.length * 1400;

    const final = ui.el('div', { class: 'fila-botones', style: 'animation:entrar .8s ease both;animation-delay:' + (ms / 1000) + 's' }, [
      ui.el('button', { type: 'button', class: 'btn btn-primario btn-grande', text: 'Ver ranking 🏆', onclick: function () { NEON.router.ir('ranking'); } }),
      ui.el('button', { type: 'button', class: 'btn btn-secundario', text: 'Volver al mapa', onclick: function () { NEON.router.ir('map'); } })
    ]);

    raiz.appendChild(ui.el('section', { class: 'centrada pantalla' }, [
      ui.el('h1', { class: 'intro-titulo glitch', 'data-text': 'NEXUS HA CAÍDO', text: 'NEXUS HA CAÍDO' }),
      ui.el('div', { class: 'tarjeta intro-texto' }, parrafos),
      ui.el('p', { class: 'neon-amarillo', style: 'text-align:center', text: total.puntos + ' puntos · ' + total.estrellas + ' ★' }),
      final
    ]));

    ui.confeti();
    const t = setTimeout(ui.confeti, 2500);
    return function limpiar() { clearTimeout(t); };
  }

  return { mostrar: mostrar };
})();
