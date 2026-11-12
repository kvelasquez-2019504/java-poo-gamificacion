/* ==========================================================
   dragCode.js — Completar código (arrastrar fragmentos a huecos)
   Interfaz común de los ejercicios:
     montar(contenedor, ejercicio, alCambiar) ->
       { completo(), respuesta(), marcar(detalle), limpiarMarcas(), bloquear() }
   Alternativa por teclado/toque: seleccionar un fragmento y luego un hueco.
   ========================================================== */
NEON.exercises.dragCode = (function () {
  const ui = NEON.ui;
  const RE_HUECO = /(___\w+___)/;

  function montar(contenedor, ej, alCambiar) {
    const asignado = {};        // slotId -> índice del fragmento colocado
    let seleccionado = null;    // índice del fragmento elegido con clic/teclado
    const slots = {};           // slotId -> elemento <button>
    const fragmentos = [];      // índice -> elemento <button> del banco
    const ids = Object.keys(ej.slots);

    // ----- Código con huecos -----
    const codigo = ui.el('div', { class: 'codigo', role: 'group', 'aria-label': 'Código Java con huecos' });
    ej.codigo.split('\n').forEach(function (linea, i) {
      const txt = ui.el('span', { class: 'txt' });
      linea.split(RE_HUECO).forEach(function (parte) {
        const m = /^___(\w+)___$/.exec(parte);
        if (!m) { txt.insertAdjacentHTML('beforeend', ui.resaltarJava(parte)); return; }
        const boton = ui.el('button', { type: 'button', class: 'slot', dataset: { slot: m[1] } });
        boton.addEventListener('animationend', function () { boton.classList.remove('rebote'); });
        slots[m[1]] = boton;
        txt.appendChild(boton);
      });
      codigo.appendChild(ui.el('div', { class: 'linea' }, [ui.el('span', { class: 'num', text: String(i + 1) }), txt]));
    });

    // ----- Banco de fragmentos -----
    const banco = ui.el('div', { class: 'banco', role: 'group', 'aria-label': 'Banco de fragmentos' });
    ej.fragmentos.forEach(function (texto, i) {
      const f = ui.el('button', { type: 'button', class: 'frag', 'aria-pressed': 'false', dataset: { fi: String(i) }, text: texto });
      fragmentos.push(f);
      banco.appendChild(f);
    });

    contenedor.appendChild(codigo);
    contenedor.appendChild(ui.el('p', { class: 'banco-titulo', text: 'Banco de fragmentos — arrastra o selecciona un fragmento y luego un hueco' }));
    contenedor.appendChild(banco);

    // ----- Lógica de colocación -----
    function huecoDe(fi) { return ids.find(function (id) { return asignado[id] === fi; }); }

    function colocar(slotId, fi) {
      const origen = huecoDe(fi);
      const previo = asignado[slotId];
      if (origen === slotId) return;
      if (origen) { if (previo !== undefined) asignado[origen] = previo; else delete asignado[origen]; }
      asignado[slotId] = fi;
      slots[slotId].classList.add('rebote');
      ui.sonido('soltar');
      cambio();
    }

    function quitar(slotId) {
      delete asignado[slotId];
      ui.sonido('click');
      cambio();
    }

    function cambio() {
      seleccionado = null;
      pintar();
      limpiarMarcas();
      alCambiar();
    }

    function pintar() {
      ids.forEach(function (id, n) {
        const s = slots[id], fi = asignado[id];
        s.classList.toggle('lleno', fi !== undefined);
        s.classList.toggle('objetivo', seleccionado !== null);
        s.dataset.fi = fi !== undefined ? fi : '';
        s.innerHTML = fi !== undefined ? ui.escapar(ej.fragmentos[fi]) : '<span class="vacio">____</span>';
        s.setAttribute('aria-label', 'Hueco ' + (n + 1) + ': ' + (fi !== undefined ? ej.fragmentos[fi] + ' (pulsa para quitar)' : 'vacío'));
      });
      fragmentos.forEach(function (f, i) {
        const usado = huecoDe(i) !== undefined;
        f.classList.toggle('usado', usado);
        f.disabled = usado;
        f.setAttribute('aria-pressed', String(seleccionado === i));
      });
    }

    // Clic / teclado: elegir fragmento y luego hueco
    banco.addEventListener('click', function (e) {
      const f = e.target.closest('.frag');
      if (!f || f.disabled) return;
      const i = Number(f.dataset.fi);
      seleccionado = seleccionado === i ? null : i;
      ui.sonido('click');
      pintar();
    });
    codigo.addEventListener('click', function (e) {
      const s = e.target.closest('.slot');
      if (!s) return;
      if (seleccionado !== null) colocar(s.dataset.slot, seleccionado);
      else if (asignado[s.dataset.slot] !== undefined) quitar(s.dataset.slot);
    });

    // Arrastre con Pointer Events
    NEON.dragdrop.activar({
      contenedor: contenedor,
      origen: '.frag:not(.usado), .slot.lleno',
      destino: '.slot, .banco',
      onSoltar: function (origen, destino) {
        const fi = Number(origen.dataset.fi);
        if (destino && destino.classList.contains('slot')) colocar(destino.dataset.slot, fi);
        else if (origen.classList.contains('slot')) quitar(origen.dataset.slot);
      }
    });

    function limpiarMarcas() {
      ids.forEach(function (id) { slots[id].classList.remove('ok', 'mal'); });
    }

    pintar();

    return {
      completo: function () { return ids.every(function (id) { return asignado[id] !== undefined; }); },
      respuesta: function () {
        const r = {};
        ids.forEach(function (id) { if (asignado[id] !== undefined) r[id] = ej.fragmentos[asignado[id]]; });
        return r;
      },
      marcar: function (detalle) {
        detalle.forEach(function (d) { slots[d.slotId].classList.add(d.ok ? 'ok' : 'mal'); });
      },
      limpiarMarcas: limpiarMarcas,
      bloquear: function () { contenedor.classList.add('bloqueado'); }
    };
  }

  return { montar: montar };
})();
