/* ==========================================================
   state.js — estado global del jugador
   Claves en localStorage: perfil, progreso, vidas, ranking, ajustes.
   ========================================================== */
NEON.state = (function () {
  const C = NEON.config;
  const S = NEON.storage;

  const datos = {
    perfil: null,        // { id, nombre, avatarId }
    progreso: {},        // { [nivelId]: { completado, estrellas, mejorPuntaje, mejorTiempo } }
    vidas: { cantidad: C.MAX_VIDAS, lastLifeTimestamp: null },
    ajustes: { sonido: true, introVista: false },
    ranking: []          // [{ id, nombre, avatarId, puntos, estrellas }]
  };

  /** Carga todo desde localStorage (con valores por defecto). */
  function cargar() {
    datos.perfil = S.leer('perfil', null);
    datos.progreso = S.leer('progreso', {});
    datos.vidas = S.leer('vidas', { cantidad: C.MAX_VIDAS, lastLifeTimestamp: null });
    datos.ajustes = Object.assign({ sonido: true, introVista: false }, S.leer('ajustes', {}));
    datos.ranking = S.leer('ranking', []);
  }

  function guardar(clave) { S.escribir(clave, datos[clave]); }

  // ---------- Catálogo de niveles ----------

  /** Lista plana de los 20 niveles en orden de juego. */
  function listaNiveles() {
    return C.MUNDOS.reduce((lista, m) => lista.concat(NEON.levels[m.id]), []);
  }
  function nivelPorId(id) { return listaNiveles().find(n => n.id === id) || null; }
  function mundoPorId(id) { return C.MUNDOS.find(m => m.id === id); }

  // ---------- Perfil ----------

  function crearPerfil(nombre, avatarId) {
    datos.perfil = { id: 'p' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6), nombre, avatarId };
    datos.progreso = {};
    datos.vidas = { cantidad: C.MAX_VIDAS, lastLifeTimestamp: null };
    guardar('perfil'); guardar('progreso'); guardar('vidas');
    actualizarRanking();
  }

  /** Borra el progreso del perfil actual (el perfil se conserva). */
  function borrarProgreso() {
    datos.progreso = {};
    datos.vidas = { cantidad: C.MAX_VIDAS, lastLifeTimestamp: null };
    guardar('progreso'); guardar('vidas');
    actualizarRanking();
  }

  function ajustar(clave, valor) {
    datos.ajustes[clave] = valor;
    guardar('ajustes');
  }

  // ---------- Progreso ----------

  function progresoDe(nivelId) {
    return datos.progreso[nivelId] || { completado: false, estrellas: 0, mejorPuntaje: 0, mejorTiempo: null };
  }

  /** Un nivel está desbloqueado si es el primero o el anterior está completado. */
  function desbloqueado(indice) {
    if (indice === 0) return true;
    return progresoDe(listaNiveles()[indice - 1].id).completado;
  }

  /** Primer nivel sin completar (el "actual" del mapa) o null si terminó todo. */
  function nivelActual() {
    return listaNiveles().find(n => !progresoDe(n.id).completado) || null;
  }

  function mundoCompletado(mundoId) {
    return NEON.levels[mundoId].every(n => progresoDe(n.id).completado);
  }

  function juegoCompletado() { return C.MUNDOS.every(m => mundoCompletado(m.id)); }

  /** Guarda el resultado conservando el mejor puntaje, estrellas y tiempo. */
  function registrarResultado(nivelId, puntos, estrellas, segundos) {
    const previo = progresoDe(nivelId);
    const record = puntos > previo.mejorPuntaje;
    datos.progreso[nivelId] = {
      completado: true,
      estrellas: Math.max(previo.estrellas, estrellas),
      mejorPuntaje: Math.max(previo.mejorPuntaje, puntos),
      mejorTiempo: previo.mejorTiempo == null ? segundos : Math.min(previo.mejorTiempo, segundos)
    };
    guardar('progreso');
    actualizarRanking();
    return record;
  }

  function totales() {
    return Object.keys(datos.progreso).reduce((t, id) => {
      t.puntos += datos.progreso[id].mejorPuntaje;
      t.estrellas += datos.progreso[id].estrellas;
      return t;
    }, { puntos: 0, estrellas: 0 });
  }

  // ---------- Ranking local ----------

  function actualizarRanking() {
    if (!datos.perfil) return;
    const t = totales();
    const entrada = { id: datos.perfil.id, nombre: datos.perfil.nombre, avatarId: datos.perfil.avatarId, puntos: t.puntos, estrellas: t.estrellas };
    const i = datos.ranking.findIndex(e => e.id === entrada.id);
    if (i >= 0) datos.ranking[i] = entrada; else datos.ranking.push(entrada);
    datos.ranking.sort((a, b) => b.puntos - a.puntos || b.estrellas - a.estrellas);
    datos.ranking = datos.ranking.slice(0, C.RANKING_GUARDADOS);
    guardar('ranking');
  }

  return {
    datos, cargar, guardar, listaNiveles, nivelPorId, mundoPorId,
    crearPerfil, borrarProgreso, ajustar,
    progresoDe, desbloqueado, nivelActual, mundoCompletado, juegoCompletado,
    registrarResultado, totales, actualizarRanking
  };
})();
