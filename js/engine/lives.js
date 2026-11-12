/* ==========================================================
   lives.js — vidas y regeneración con el tiempo
   `lastLifeTimestamp` marca cuándo empezó la cuenta de la próxima vida.
   Al volver al juego (incluso tras cerrar el navegador) se calculan
   las vidas regeneradas a partir de esa marca.
   ========================================================== */
NEON.lives = (function () {
  const C = NEON.config;

  function vidas() { return NEON.state.datos.vidas; }

  /**
   * Aplica la regeneración pendiente.
   * @returns {number} vidas ganadas en esta sincronización
   */
  function sincronizar(ahora) {
    const v = vidas();
    ahora = ahora || Date.now();
    let ganadas = 0;

    if (v.cantidad >= C.MAX_VIDAS) {
      v.cantidad = C.MAX_VIDAS;
      v.lastLifeTimestamp = null;
    } else {
      if (!v.lastLifeTimestamp) v.lastLifeTimestamp = ahora;   // dato incompleto: reinicia cuenta
      ganadas = Math.max(0, Math.floor((ahora - v.lastLifeTimestamp) / C.REGEN_VIDA_MS));
      if (ganadas > 0) {
        v.cantidad = Math.min(C.MAX_VIDAS, v.cantidad + ganadas);
        v.lastLifeTimestamp = v.cantidad >= C.MAX_VIDAS ? null : v.lastLifeTimestamp + ganadas * C.REGEN_VIDA_MS;
      }
    }
    NEON.state.guardar('vidas');
    return ganadas;
  }

  function cantidad() {
    sincronizar();
    return vidas().cantidad;
  }

  /** Resta una vida. Devuelve las vidas que quedan. */
  function perder() {
    sincronizar();
    const v = vidas();
    if (v.cantidad > 0) {
      if (v.cantidad >= C.MAX_VIDAS) v.lastLifeTimestamp = Date.now();   // arranca la regeneración
      v.cantidad--;
      NEON.state.guardar('vidas');
    }
    return v.cantidad;
  }

  /** Milisegundos que faltan para la próxima vida (0 si está al máximo). */
  function msParaSiguiente() {
    sincronizar();
    const v = vidas();
    if (v.cantidad >= C.MAX_VIDAS || !v.lastLifeTimestamp) return 0;
    return Math.max(0, C.REGEN_VIDA_MS - (Date.now() - v.lastLifeTimestamp));
  }

  return { sincronizar, cantidad, perder, msParaSiguiente };
})();
