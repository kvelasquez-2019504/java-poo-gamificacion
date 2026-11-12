/* ==========================================================
   main.js — utilidades de interfaz (NEON.ui), router y arranque
   ========================================================== */
/* ---------------- Utilidades de interfaz ---------------- */
NEON.ui = (function () {

  /** Crea un elemento. Claves especiales: class, text, html, dataset, on* (eventos). */
  function el(etiqueta, props, hijos) {
    const nodo = document.createElement(etiqueta);
    Object.keys(props || {}).forEach(function (k) {
      const v = props[k];
      if (k === 'class') nodo.className = v;
      else if (k === 'text') nodo.textContent = v;
      else if (k === 'html') nodo.innerHTML = v;
      else if (k === 'dataset') Object.assign(nodo.dataset, v);
      else if (k.indexOf('on') === 0) nodo.addEventListener(k.slice(2), v);
      else if (v !== false && v != null) nodo.setAttribute(k, v === true ? '' : v);
    });
    [].concat(hijos || []).forEach(function (h) {
      if (h == null) return;
      nodo.appendChild(typeof h === 'string' ? document.createTextNode(h) : h);
    });
    return nodo;
  }

  function escapar(texto) {
    return String(texto).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function aleatorio(lista) { return lista[Math.floor(Math.random() * lista.length)]; }

  function formatoTiempo(ms) {
    const total = Math.ceil(ms / 1000);
    const m = Math.floor(total / 60), s = total % 60;
    return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
  }

  /* ----- Resaltado de sintaxis Java hecho a mano ----- */
  const PALABRAS = 'abstract|boolean|break|case|catch|char|class|continue|default|do|double|else|enum|extends|final|finally|float|for|if|implements|import|instanceof|int|interface|long|new|null|package|private|protected|public|return|short|static|super|switch|this|throw|throws|try|void|while|true|false';
  const RE_JAVA = new RegExp(
    '(\\/\\/.*)|("(?:[^"\\\\]|\\\\.)*")|(@\\w+)|\\b(' + PALABRAS + ')\\b|\\b([A-Z]\\w*)\\b|\\b(\\d+(?:\\.\\d+)?)\\b', 'g');
  const CLASES = [null, 'cm', 'st', 'an', 'kw', 'tp', 'nm'];

  /** Devuelve HTML con <span> de color para un fragmento de código Java. */
  function resaltarJava(texto) {
    let salida = '', ultimo = 0, m;
    RE_JAVA.lastIndex = 0;
    while ((m = RE_JAVA.exec(texto)) !== null) {
      salida += escapar(texto.slice(ultimo, m.index));
      let g = 1;
      while (m[g] === undefined) g++;
      salida += '<span class="' + CLASES[g] + '">' + escapar(m[0]) + '</span>';
      ultimo = m.index + m[0].length;
    }
    return salida + escapar(texto.slice(ultimo));
  }

  /** Texto enriquecido seguro: `código` resaltado, **negrita** y *cursiva*. */
  function marcado(texto) {
    return String(texto).split('`').map(function (parte, i) {
      if (i % 2) return '<code>' + resaltarJava(parte) + '</code>';
      return escapar(parte).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\*(.+?)\*/g, '<em>$1</em>');
    }).join('');
  }

  /* ----- Modales ----- */
  /**
   * @param {object} o { titulo, cuerpo (Node|string HTML), botones:[{texto, clase, accion, mantener}], cerrable, acento }
   * @returns {{cerrar: Function}}
   */
  function modal(o) {
    const idTitulo = 'm' + Math.random().toString(36).slice(2, 7);
    const previo = document.activeElement;
    const cuerpo = el('div', { class: 'modal-cuerpo' });
    if (typeof o.cuerpo === 'string') cuerpo.innerHTML = o.cuerpo; else if (o.cuerpo) cuerpo.appendChild(o.cuerpo);

    const acciones = el('div', { class: 'modal-acciones' });
    const caja = el('div', { class: 'modal', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': idTitulo, tabindex: '-1' },
      [el('h2', { id: idTitulo, text: o.titulo }), cuerpo, acciones]);
    if (o.acento) caja.style.setProperty('--acento', o.acento);
    const fondo = el('div', { class: 'modal-fondo' }, caja);

    function cerrar() {
      document.removeEventListener('keydown', alTeclear);
      fondo.remove();
      if (previo && previo.focus && document.contains(previo)) previo.focus();
    }
    function alTeclear(e) {
      if (e.key === 'Escape' && o.cerrable !== false) { cerrar(); return; }
      if (e.key !== 'Tab') return;
      const foco = caja.querySelectorAll('button, input, [tabindex]:not([tabindex="-1"])');
      if (!foco.length) return;
      const primero = foco[0], ultimo = foco[foco.length - 1];
      if (e.shiftKey && document.activeElement === primero) { e.preventDefault(); ultimo.focus(); }
      else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primero.focus(); }
    }

    (o.botones || []).forEach(function (b) {
      acciones.appendChild(el('button', {
        type: 'button', class: 'btn btn-mini ' + (b.clase || 'btn-secundario'), text: b.texto,
        onclick: function () { if (!b.mantener) cerrar(); if (b.accion) b.accion(); }
      }));
    });

    if (o.cerrable !== false) fondo.addEventListener('pointerdown', function (e) { if (e.target === fondo) cerrar(); });
    document.addEventListener('keydown', alTeclear);
    document.getElementById('modales').appendChild(fondo);
    (acciones.querySelector('button') || caja).focus();
    return { cerrar: cerrar };
  }

  function confirmar(titulo, texto, textoAceptar, alAceptar) {
    modal({
      titulo: titulo, cuerpo: el('p', { text: texto }),
      botones: [
        { texto: 'Cancelar', clase: 'btn-secundario' },
        { texto: textoAceptar, clase: 'btn-peligro', accion: alAceptar }
      ]
    });
  }

  /* ----- Avisos ----- */
  function toast(texto, tipo) {
    const t = el('div', { class: 'toast ' + (tipo || ''), text: texto });
    document.getElementById('toasts').appendChild(t);
    setTimeout(function () { t.remove(); }, 3100);
  }

  /* ----- Confeti de partículas neón ----- */
  function confeti() {
    const colores = ['#ff2bd6', '#00f0ff', '#f5ff3d', '#7a2bff', '#39ff88'];
    const capa = el('div', { class: 'confeti-capa', 'aria-hidden': 'true' });
    for (let i = 0; i < 80; i++) {
      const c = el('i', { class: 'confeti' });
      c.style.left = Math.random() * 100 + '%';
      c.style.color = c.style.background = colores[i % colores.length];
      c.style.setProperty('--dx', (Math.random() * 200 - 100) + 'px');
      c.style.setProperty('--giro', (Math.random() * 1000 - 500) + 'deg');
      c.style.setProperty('--dur', (1.8 + Math.random() * 1.6) + 's');
      c.style.animationDelay = Math.random() * 0.6 + 's';
      capa.appendChild(c);
    }
    document.body.appendChild(capa);
    setTimeout(function () { capa.remove(); }, 4500);
  }

  /* ----- Sonido sintético (Web Audio API, sin archivos) ----- */
  let audio = null;
  const SONIDOS = {
    click:   [[660, 0.05, 'square']],
    soltar:  [[440, 0.05, 'triangle'], [587, 0.06, 'triangle']],
    ok:      [[523, 0.09, 'square'], [659, 0.09, 'square'], [784, 0.16, 'square']],
    error:   [[196, 0.16, 'sawtooth'], [147, 0.28, 'sawtooth']],
    vida:    [[880, 0.08, 'sine'], [1175, 0.14, 'sine']],
    estrella:[[988, 0.1, 'triangle'], [1319, 0.22, 'triangle']]
  };

  function sonido(nombre) {
    if (!NEON.state.datos.ajustes.sonido || !SONIDOS[nombre]) return;
    try {
      audio = audio || new (window.AudioContext || window.webkitAudioContext)();
      if (audio.state === 'suspended') audio.resume();
      let t = audio.currentTime;
      SONIDOS[nombre].forEach(function (nota) {
        const osc = audio.createOscillator(), vol = audio.createGain();
        osc.type = nota[2]; osc.frequency.value = nota[0];
        vol.gain.setValueAtTime(0.06, t);
        vol.gain.exponentialRampToValueAtTime(0.0001, t + nota[1]);
        osc.connect(vol); vol.connect(audio.destination);
        osc.start(t); osc.stop(t + nota[1]);
        t += nota[1];
      });
    } catch (e) { /* sin audio disponible: se ignora */ }
  }

  /* ----- Corazones de vida ----- */
  /** Dibuja los corazones; `animacion` ('roto' | 'nuevo') anima el que acaba de cambiar. */
  function dibujarVidas(contenedor, cantidad, animacion) {
    const max = NEON.config.MAX_VIDAS;
    contenedor.innerHTML = '';
    contenedor.setAttribute('role', 'img');
    contenedor.setAttribute('aria-label', cantidad + ' de ' + max + ' vidas');
    for (let i = 0; i < max; i++) {
      const c = el('span', { class: 'corazon' + (i < cantidad ? '' : ' vacio'), 'aria-hidden': 'true', text: '❤' });
      if (animacion === 'roto' && i === cantidad) c.classList.add('roto');
      if (animacion === 'nuevo' && i === cantidad - 1) c.classList.add('nuevo');
      contenedor.appendChild(c);
    }
  }

  return { el, escapar, aleatorio, formatoTiempo, resaltarJava, marcado, modal, confirmar, toast, confeti, sonido, dibujarVidas };
})();

/* ---------------- Router de pantallas ---------------- */
NEON.router = (function () {
  let limpiar = null;   // función de limpieza de la pantalla actual (intervalos, etc.)

  /** Cambia de pantalla. Cada pantalla expone mostrar(raiz, params) y puede devolver una función de limpieza. */
  function ir(nombre, params) {
    if (limpiar) { limpiar(); limpiar = null; }
    const raiz = document.getElementById('app');
    raiz.innerHTML = '';
    limpiar = NEON.screens[nombre].mostrar(raiz, params || {}) || null;
    window.scrollTo(0, 0);
    raiz.focus({ preventScroll: true });
  }

  return { ir };
})();

/* ---------------- Arranque ---------------- */
document.addEventListener('DOMContentLoaded', function () {
  NEON.state.cargar();
  NEON.lives.sincronizar();
  const d = NEON.state.datos;
  if (d.perfil) NEON.router.ir('map');
  else NEON.router.ir(d.ajustes.introVista ? 'profile' : 'intro');
});
