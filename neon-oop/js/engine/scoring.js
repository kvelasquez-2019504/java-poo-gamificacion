/* ==========================================================
   scoring.js — puntaje y estrellas
   ========================================================== */
NEON.scoring = (function () {
  const P = NEON.config.PUNTOS;

  /** Puntos por acertar un ejercicio según el número de intento (1, 2, 3…). */
  function puntosIntento(intento) {
    return P.intento[Math.min(intento, P.intento.length) - 1] || 0;
  }

  /** Bonus proporcional al tiempo que sobra respecto al objetivo. */
  function bonusRapidez(segundos, objetivo) {
    const restante = Math.max(0, objetivo - segundos) / objetivo;
    return Math.round(P.bonusRapidezMax * restante);
  }

  /** 3★ sin perder vidas y a tiempo; 2★ máximo 1 vida perdida; 1★ el resto. */
  function estrellas(vidasPerdidas, segundos, objetivo) {
    if (vidasPerdidas === 0 && segundos <= objetivo) return 3;
    if (vidasPerdidas <= 1) return 2;
    return 1;
  }

  /**
   * Calcula el resultado final de un nivel.
   * @param {object} d { puntosBase, segundos, objetivo, vidasPerdidas, vidasRestantes, esJefe, mundoNuevo }
   * @returns {{desglose: {etiqueta: string, valor: number}[], total: number, estrellas: number}}
   */
  function calcular(d) {
    const desglose = [
      { etiqueta: 'Respuestas correctas', valor: d.puntosBase },
      { etiqueta: 'Bonus de rapidez', valor: bonusRapidez(d.segundos, d.objetivo) },
      { etiqueta: 'Vidas conservadas (' + d.vidasRestantes + ')', valor: d.vidasRestantes * P.porVida },
      { etiqueta: 'Nivel completado', valor: P.nivel }
    ];
    if (d.esJefe) desglose.push({ etiqueta: 'Jefe vencido', valor: P.jefe });
    if (d.mundoNuevo) desglose.push({ etiqueta: 'Mundo completado', valor: P.mundo });

    const total = desglose.reduce((suma, fila) => suma + fila.valor, 0);
    return { desglose, total, estrellas: estrellas(d.vidasPerdidas, d.segundos, d.objetivo) };
  }

  return { puntosIntento, bonusRapidez, estrellas, calcular };
})();
