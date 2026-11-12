/* ==========================================================
   dragdrop.js — arrastrar y soltar con Pointer Events
   Funciona igual con mouse, lápiz y pantalla táctil.
   Un toque/clic SIN movimiento no inicia arrastre: se deja pasar el
   evento `click`, que usan los ejercicios para la alternativa por teclado.
   ========================================================== */
NEON.dragdrop = (function () {
  const UMBRAL_PX = 6;          // distancia mínima para considerar que es un arrastre
  const PROXIMIDAD_PX = 48;     // distancia a la que un hueco "brilla"
  let suprimirClick = false;

  // Tras un arrastre real se anula el click que dispara el navegador al soltar
  document.addEventListener('click', function (e) {
    if (suprimirClick) { e.stopPropagation(); e.preventDefault(); }
  }, true);

  function pararClickPronto() {
    suprimirClick = true;
    setTimeout(function () { suprimirClick = false; }, 60);
  }

  function crearFantasma(el, x, y) {
    const rect = el.getBoundingClientRect();
    const g = el.cloneNode(true);
    g.removeAttribute('id');
    g.classList.add('fantasma');
    g.style.width = rect.width + 'px';
    g.style.height = rect.height + 'px';
    document.body.appendChild(g);
    moverFantasma(g, x, y);
    return g;
  }

  function moverFantasma(g, x, y) {
    g.style.transform = 'translate(' + (x - g.offsetWidth / 2) + 'px,' + (y - g.offsetHeight / 2) + 'px) scale(1.08)';
  }

  /** Distancia del punto (x, y) a un rectángulo (0 si está dentro). */
  function distanciaA(rect, x, y) {
    const dx = Math.max(rect.left - x, 0, x - rect.right);
    const dy = Math.max(rect.top - y, 0, y - rect.bottom);
    return Math.hypot(dx, dy);
  }

  /** Destino más cercano al puntero dentro del radio de proximidad (null si ninguno). */
  function destinoCercano(contenedor, selector, x, y) {
    let mejor = null, mejorDist = PROXIMIDAD_PX;
    contenedor.querySelectorAll(selector).forEach(function (el) {
      const d = distanciaA(el.getBoundingClientRect(), x, y);
      if (d < mejorDist) { mejor = el; mejorDist = d; }
    });
    return mejor;
  }

  /**
   * Arrastre de fragmentos hacia huecos.
   * @param {object} o { contenedor, origen, destino, onSoltar(origenEl, destinoEl|null) }
   */
  function activar(o) {
    o.contenedor.addEventListener('pointerdown', function (e) {
      if (e.button > 0) return;
      const origen = e.target.closest(o.origen);
      if (!origen || !o.contenedor.contains(origen)) return;

      const idPuntero = e.pointerId, x0 = e.clientX, y0 = e.clientY;
      let fantasma = null, resaltado = null;

      function resaltar(el) {
        if (resaltado === el) return;
        if (resaltado) resaltado.classList.remove('cerca');
        resaltado = el;
        if (el) el.classList.add('cerca');
      }

      function mover(ev) {
        if (ev.pointerId !== idPuntero) return;
        if (!fantasma) {
          if (Math.hypot(ev.clientX - x0, ev.clientY - y0) < UMBRAL_PX) return;
          fantasma = crearFantasma(origen, ev.clientX, ev.clientY);
          origen.classList.add('arrastrando');
        }
        ev.preventDefault();
        moverFantasma(fantasma, ev.clientX, ev.clientY);
        resaltar(destinoCercano(o.contenedor, o.destino, ev.clientX, ev.clientY));
      }

      function terminar(ev, cancelado) {
        if (ev.pointerId !== idPuntero) return;
        document.removeEventListener('pointermove', mover);
        document.removeEventListener('pointerup', soltar);
        document.removeEventListener('pointercancel', cancelar);
        if (!fantasma) return;
        const destino = resaltado;
        resaltar(null);
        fantasma.remove();
        origen.classList.remove('arrastrando');
        pararClickPronto();
        if (!cancelado) o.onSoltar(origen, destino);
      }
      function soltar(ev) { terminar(ev, false); }
      function cancelar(ev) { terminar(ev, true); }

      document.addEventListener('pointermove', mover, { passive: false });
      document.addEventListener('pointerup', soltar);
      document.addEventListener('pointercancel', cancelar);
    });
  }

  /**
   * Lista reordenable por arrastre vertical.
   * @param {HTMLElement} lista contenedor de los elementos
   * @param {object} o { item: selector, ignorar: selector, onCambio() }
   */
  function ordenable(lista, o) {
    lista.addEventListener('pointerdown', function (e) {
      if (e.button > 0) return;
      if (o.ignorar && e.target.closest(o.ignorar)) return;
      const item = e.target.closest(o.item);
      if (!item || !lista.contains(item)) return;

      const idPuntero = e.pointerId, x0 = e.clientX, y0 = e.clientY;
      let fantasma = null;

      function mover(ev) {
        if (ev.pointerId !== idPuntero) return;
        if (!fantasma) {
          if (Math.hypot(ev.clientX - x0, ev.clientY - y0) < UMBRAL_PX) return;
          fantasma = crearFantasma(item, ev.clientX, ev.clientY);
          item.classList.add('arrastrando');
        }
        ev.preventDefault();
        moverFantasma(fantasma, ev.clientX, ev.clientY);
        reubicar(ev.clientY);
      }

      /** Inserta el elemento arrastrado antes/después del vecino sobre el que está el puntero. */
      function reubicar(y) {
        const vecinos = Array.prototype.slice.call(lista.querySelectorAll(o.item));
        for (let i = 0; i < vecinos.length; i++) {
          const v = vecinos[i];
          if (v === item) continue;
          const r = v.getBoundingClientRect();
          if (y >= r.top && y <= r.bottom) {
            const despues = y > r.top + r.height / 2;
            lista.insertBefore(item, despues ? v.nextSibling : v);
            return;
          }
        }
      }

      function terminar(ev) {
        if (ev.pointerId !== idPuntero) return;
        document.removeEventListener('pointermove', mover);
        document.removeEventListener('pointerup', terminar);
        document.removeEventListener('pointercancel', terminar);
        if (!fantasma) return;
        fantasma.remove();
        item.classList.remove('arrastrando');
        item.classList.add('rebote');
        item.addEventListener('animationend', function () { item.classList.remove('rebote'); }, { once: true });
        pararClickPronto();
        o.onCambio();
      }

      document.addEventListener('pointermove', mover, { passive: false });
      document.addEventListener('pointerup', terminar);
      document.addEventListener('pointercancel', terminar);
    });
  }

  return { activar, ordenable };
})();
