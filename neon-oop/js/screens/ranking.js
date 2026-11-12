/* ==========================================================
   ranking.js — Top 10 local (jugadores de este navegador)
   ========================================================== */
NEON.screens.ranking = (function () {
  const ui = NEON.ui;

  function fila(entrada, posicion, esYo) {
    return ui.el('li', { class: esYo ? 'yo' : '' }, [
      ui.el('span', { class: 'pos', text: '#' + posicion }),
      NEON.avatars.crear(entrada.avatarId),
      ui.el('span', { class: 'nombre', text: entrada.nombre + (esYo ? ' (tú)' : '') }),
      ui.el('span', { class: 'puntos' }, [entrada.puntos + ' pts', ui.el('small', { text: entrada.estrellas + ' ★' })])
    ]);
  }

  function mostrar(raiz) {
    NEON.state.actualizarRanking();
    const yo = NEON.state.datos.perfil;
    const todos = NEON.state.datos.ranking;
    const top = todos.slice(0, NEON.config.RANKING_MAX);

    const lista = ui.el('ol', { class: 'ranking', 'aria-label': 'Mejores jugadores' });
    top.forEach(function (e, i) { lista.appendChild(fila(e, i + 1, yo && e.id === yo.id)); });

    // Si el jugador actual quedó fuera del Top 10, se muestra su posición aparte
    const miIndice = yo ? todos.findIndex(function (e) { return e.id === yo.id; }) : -1;
    if (miIndice >= top.length) {
      lista.appendChild(ui.el('li', { 'aria-hidden': 'true', text: '…' }));
      lista.appendChild(fila(todos[miIndice], miIndice + 1, true));
    }
    if (!top.length) lista.appendChild(ui.el('li', { text: 'Aún no hay jugadores. ¡Sé el primero!' }));

    raiz.appendChild(ui.el('section', { class: 'centrada pantalla' }, [
      ui.el('h1', { class: 'intro-titulo neon-magenta', text: 'RANKING' }),
      ui.el('p', { class: 'intro-subtitulo', text: 'Runners de este navegador' }),
      ui.el('div', { class: 'tarjeta' }, lista),
      ui.el('div', { class: 'fila-botones' }, ui.el('button', { type: 'button', class: 'btn btn-primario btn-grande', text: '← Volver al mapa', onclick: function () { NEON.router.ir('map'); } }))
    ]));
  }

  return { mostrar: mostrar };
})();
