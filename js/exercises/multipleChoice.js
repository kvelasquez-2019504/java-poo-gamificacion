/* ==========================================================
   multipleChoice.js — Selección múltiple (una o varias correctas)
   Misma interfaz que los demás ejercicios (ver dragCode.js).
   ========================================================== */
NEON.exercises.multiple = (function () {
  const ui = NEON.ui;

  function montar(contenedor, ej, alCambiar) {
    const multi = ej.correcta.length > 1;
    const elegidas = [];        // ids seleccionados, en orden de pulsación
    const botones = {};

    // Código opcional que acompaña a la pregunta
    if (ej.codigo) {
      const codigo = ui.el('div', { class: 'codigo', role: 'group', 'aria-label': 'Código Java' });
      ej.codigo.split('\n').forEach(function (linea, i) {
        codigo.appendChild(ui.el('div', { class: 'linea' }, [
          ui.el('span', { class: 'num', text: String(i + 1) }),
          ui.el('span', { class: 'txt', html: ui.resaltarJava(linea) })
        ]));
      });
      contenedor.appendChild(codigo);
    }

    const lista = ui.el('div', { class: 'opciones', role: multi ? 'group' : 'radiogroup', 'aria-label': 'Opciones de respuesta' });
    ej.opciones.forEach(function (op) {
      const b = ui.el('button', {
        type: 'button', class: 'opcion' + (multi ? ' multi' : ''), role: multi ? 'checkbox' : 'radio',
        'aria-checked': 'false', dataset: { id: op.id }
      }, [ui.el('span', { class: 'marca', 'aria-hidden': 'true', text: '✔' }), ui.el('span', { html: ui.marcado(op.texto) })]);
      botones[op.id] = b;
      lista.appendChild(b);
    });
    contenedor.appendChild(lista);

    lista.addEventListener('click', function (e) {
      const b = e.target.closest('.opcion');
      if (!b) return;
      const id = b.dataset.id, i = elegidas.indexOf(id);
      if (multi) { if (i >= 0) elegidas.splice(i, 1); else elegidas.push(id); }
      else { elegidas.length = 0; elegidas.push(id); }
      ui.sonido('click');
      limpiarMarcas();
      pintar();
      alCambiar();
    });

    function pintar() {
      Object.keys(botones).forEach(function (id) {
        botones[id].setAttribute('aria-checked', String(elegidas.indexOf(id) !== -1));
      });
    }

    function limpiarMarcas() {
      Object.keys(botones).forEach(function (id) { botones[id].classList.remove('ok', 'mal'); });
    }

    return {
      multi: multi,
      completo: function () { return elegidas.length > 0; },
      respuesta: function () { return elegidas.slice(); },
      marcar: function (detalle) {
        detalle.forEach(function (d) { botones[d.slotId].classList.add(d.ok ? 'ok' : 'mal'); });
      },
      limpiarMarcas: limpiarMarcas,
      bloquear: function () { contenedor.classList.add('bloqueado'); }
    };
  }

  return { montar: montar };
})();
