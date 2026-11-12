/* ==========================================================
   intro.js — introducción narrativa (máquina de escribir + glitch)
   ========================================================== */
NEON.screens.intro = (function () {
  const ui = NEON.ui;
  const MS_POR_LETRA = 22;
  const MS_ENTRE_PARRAFOS = 350;

  /** Vacía los nodos de texto de un párrafo y devuelve cómo rellenarlos letra a letra. */
  function prepararParrafo(p) {
    const recorrido = document.createTreeWalker(p, NodeFilter.SHOW_TEXT);
    const nodos = [];
    while (recorrido.nextNode()) nodos.push({ nodo: recorrido.currentNode, texto: recorrido.currentNode.nodeValue });
    nodos.forEach(function (n) { n.nodo.nodeValue = ''; });
    return nodos;
  }

  function mostrar(raiz) {
    const parrafos = NEON.narrative.intro;
    let temporizador = null;

    const texto = ui.el('div', { class: 'intro-texto cursor', 'aria-hidden': 'true' });
    const lectores = ui.el('div', { class: 'sr-only', text: parrafos.join(' ').replace(/[*]/g, '') });
    const botonContinuar = ui.el('button', { type: 'button', class: 'btn btn-primario btn-grande', disabled: true, text: 'Continuar ▶', onclick: salir });
    const botonSaltar = ui.el('button', { type: 'button', class: 'btn btn-secundario', text: 'Saltar', onclick: salir });

    raiz.appendChild(ui.el('section', { class: 'centrada pantalla' }, [
      ui.el('h1', { class: 'intro-titulo glitch', 'data-text': 'NEON//OOP', text: 'NEON//OOP' }),
      ui.el('p', { class: 'intro-subtitulo', text: 'Protocolo Nexus' }),
      ui.el('div', { class: 'tarjeta' }, [texto, lectores]),
      ui.el('div', { class: 'fila-botones' }, [botonSaltar, botonContinuar])
    ]));

    // Prepara todos los párrafos (vacíos) y los va escribiendo en orden
    const cola = parrafos.map(function (t) {
      const p = ui.el('p', { html: ui.marcado(t) });
      texto.appendChild(p);
      return prepararParrafo(p);
    });

    let iParrafo = 0, iNodo = 0, iLetra = 0;

    function paso() {
      if (iParrafo >= cola.length) return fin();
      const nodos = cola[iParrafo];
      if (iNodo >= nodos.length) { iParrafo++; iNodo = 0; iLetra = 0; temporizador = setTimeout(paso, MS_ENTRE_PARRAFOS); return; }
      const actual = nodos[iNodo];
      iLetra++;
      actual.nodo.nodeValue = actual.texto.slice(0, iLetra);
      if (iLetra >= actual.texto.length) { iNodo++; iLetra = 0; }
      temporizador = setTimeout(paso, MS_POR_LETRA);
    }

    function fin() {
      texto.classList.remove('cursor');
      botonContinuar.disabled = false;
      botonContinuar.focus();
    }

    function salir() {
      NEON.ui.sonido('click');
      NEON.state.ajustar('introVista', true);
      NEON.router.ir(NEON.state.datos.perfil ? 'map' : 'profile');
    }

    paso();

    return function limpiar() { clearTimeout(temporizador); };
  }

  return { mostrar: mostrar };
})();
