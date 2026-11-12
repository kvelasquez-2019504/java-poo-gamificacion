/* ==========================================================
   orderCode.js — Ordenar fragmentos de código
   Arrastre vertical con Pointer Events + botones ▲ ▼ (teclado y táctil).
   Misma interfaz que los demás ejercicios (ver dragCode.js).
   ========================================================== */
NEON.exercises.order = (function () {
  const ui = NEON.ui;

  function montar(contenedor, ej, alCambiar) {
    const lista = ui.el('ol', { class: 'orden-lista', 'aria-label': 'Líneas de código; ordénalas de arriba hacia abajo' });

    ej.lineas.forEach(function (l) {
      lista.appendChild(ui.el('li', { class: 'orden-item', dataset: { id: l.id } }, [
        ui.el('span', { class: 'asa', 'aria-hidden': 'true', text: '⠿' }),
        ui.el('span', { class: 'txt', html: ui.resaltarJava(l.texto) }),
        ui.el('span', { class: 'mover' }, [
          ui.el('button', { type: 'button', 'data-dir': '-1', 'aria-label': 'Subir línea' , text: '▲' }),
          ui.el('button', { type: 'button', 'data-dir': '1', 'aria-label': 'Bajar línea', text: '▼' })
        ])
      ]));
    });
    contenedor.appendChild(lista);

    // Botones ▲ ▼
    lista.addEventListener('click', function (e) {
      const b = e.target.closest('button[data-dir]');
      if (!b) return;
      const item = b.closest('.orden-item');
      const dir = Number(b.dataset.dir);
      const destino = dir < 0 ? item.previousElementSibling : item.nextElementSibling;
      if (!destino) return;
      lista.insertBefore(item, dir < 0 ? destino : destino.nextSibling);
      b.focus();
      ui.sonido('soltar');
      cambio();
    });

    // Arrastre vertical
    NEON.dragdrop.ordenable(lista, { item: '.orden-item', ignorar: 'button', onCambio: function () { ui.sonido('soltar'); cambio(); } });

    function cambio() { limpiarMarcas(); alCambiar(); }

    function items() { return Array.prototype.slice.call(lista.querySelectorAll('.orden-item')); }

    function limpiarMarcas() {
      items().forEach(function (i) { i.classList.remove('ok', 'mal'); });
    }

    return {
      completo: function () { return true; },
      respuesta: function () { return items().map(function (i) { return i.dataset.id; }); },
      // `detalle[n]` describe la línea que está en la posición n
      marcar: function (detalle) {
        const actuales = items();
        detalle.forEach(function (d, n) { if (actuales[n]) actuales[n].classList.add(d.ok ? 'ok' : 'mal'); });
      },
      limpiarMarcas: limpiarMarcas,
      bloquear: function () { contenedor.classList.add('bloqueado'); }
    };
  }

  return { montar: montar };
})();
