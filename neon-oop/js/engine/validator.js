/* ==========================================================
   validator.js — validación estructural contra la solución en datos
   Devuelve siempre { correcto: boolean, detalle: [{ slotId, ok }] }
   ========================================================== */
NEON.validator = (function () {

  /** Normaliza texto: sin espacios sobrantes y con ';' final opcional. */
  function normalizar(texto) {
    return String(texto).trim().replace(/\s+/g, ' ').replace(/;$/, '').trim();
  }

  /**
   * Completar código. `respuesta` = { s1: 'private', ... }.
   * Cada hueco admite una lista de alternativas válidas.
   */
  function validarSlots(ej, respuesta) {
    const detalle = Object.keys(ej.slots).map(function (slotId) {
      const dado = respuesta[slotId];
      const ok = dado != null && ej.slots[slotId].some(function (alt) {
        return normalizar(alt) === normalizar(dado);
      });
      return { slotId: slotId, ok: ok };
    });
    return { correcto: detalle.every(function (d) { return d.ok; }), detalle: detalle };
  }

  /**
   * Ordenar fragmentos. `respuesta` = lista de ids en el orden del jugador.
   * Una línea también cuenta como correcta si su texto coincide con el de la solución
   * en esa posición (por ejemplo, dos llaves de cierre idénticas).
   */
  function validarOrden(ej, respuesta) {
    const texto = {};
    ej.lineas.forEach(function (l) { texto[l.id] = l.texto; });

    const detalle = ej.orden.map(function (idEsperado, i) {
      const dado = respuesta[i];
      return { slotId: dado, ok: dado === idEsperado || (dado != null && texto[dado] === texto[idEsperado]) };
    });
    return { correcto: respuesta.length === ej.orden.length && detalle.every(function (d) { return d.ok; }), detalle: detalle };
  }

  /** Selección múltiple. `respuesta` = ids de las opciones elegidas. */
  function validarMultiple(ej, respuesta) {
    const detalle = respuesta.map(function (id) {
      return { slotId: id, ok: ej.correcta.indexOf(id) !== -1 };
    });
    const completa = ej.correcta.every(function (id) { return respuesta.indexOf(id) !== -1; });
    return { correcto: completa && detalle.every(function (d) { return d.ok; }), detalle: detalle };
  }

  function validar(ej, respuesta) {
    if (ej.tipo === 'dragCode') return validarSlots(ej, respuesta);
    if (ej.tipo === 'order') return validarOrden(ej, respuesta);
    return validarMultiple(ej, respuesta);
  }

  return { normalizar, validar };
})();
