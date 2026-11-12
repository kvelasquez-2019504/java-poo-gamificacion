/* ==========================================================
   profile.js — creación de perfil (solo la primera vez)
   Nombre de usuario (3 a 16 caracteres) + avatar de chars/
   ========================================================== */
NEON.screens.profile = (function () {
  const ui = NEON.ui;
  const C = NEON.config;
  const PATRON_NOMBRE = /^[A-Za-z0-9_\- ÁÉÍÓÚÜÑáéíóúüñ]+$/;

  /** Devuelve un mensaje de error o '' si el nombre es válido. */
  function validarNombre(nombre) {
    if (nombre.length < C.NOMBRE_MIN || nombre.length > C.NOMBRE_MAX) {
      return 'El nombre debe tener entre ' + C.NOMBRE_MIN + ' y ' + C.NOMBRE_MAX + ' caracteres.';
    }
    if (!PATRON_NOMBRE.test(nombre)) return 'Usa solo letras, números, espacios, guion y guion bajo.';
    return '';
  }

  /** params.cambiar = true cuando se llega desde Ajustes (se permite cancelar). */
  function mostrar(raiz, params) {
    let avatarId = NEON.avatars.lista[0].id;
    const error = ui.el('p', { class: 'error-campo', 'aria-live': 'polite' });
    const input = ui.el('input', {
      class: 'input', id: 'nombre', type: 'text', maxlength: String(C.NOMBRE_MAX), autocomplete: 'off',
      placeholder: 'Tu alias de Runner', 'aria-describedby': 'err-nombre'
    });
    error.id = 'err-nombre';

    const grid = ui.el('div', { class: 'avatares-grid', role: 'radiogroup', 'aria-label': 'Elige tu avatar' });
    NEON.avatars.lista.forEach(function (a) {
      const b = ui.el('button', { type: 'button', class: 'avatar-opcion', role: 'radio', 'aria-checked': String(a.id === avatarId), dataset: { id: a.id } },
        [NEON.avatars.crear(a.id), ui.el('span', { text: a.nombre })]);
      grid.appendChild(b);
    });
    grid.addEventListener('click', function (e) {
      const b = e.target.closest('.avatar-opcion');
      if (!b) return;
      avatarId = b.dataset.id;
      ui.sonido('click');
      grid.querySelectorAll('.avatar-opcion').forEach(function (x) { x.setAttribute('aria-checked', String(x === b)); });
    });

    function enviar(e) {
      e.preventDefault();
      const nombre = input.value.trim().replace(/\s+/g, ' ');
      const msg = validarNombre(nombre);
      error.textContent = msg;
      if (msg) { input.focus(); input.classList.add('sacudir'); setTimeout(function () { input.classList.remove('sacudir'); }, 500); ui.sonido('error'); return; }
      NEON.state.crearPerfil(nombre, avatarId);
      NEON.state.ajustar('introVista', true);
      ui.sonido('ok');
      NEON.router.ir('map');
    }

    const botones = [ui.el('button', { type: 'submit', class: 'btn btn-primario btn-grande', text: 'Entrar a la red ▶' })];
    if (params.cambiar) {
      botones.unshift(ui.el('button', { type: 'button', class: 'btn btn-secundario', text: 'Cancelar', onclick: function () { NEON.router.ir('map'); } }));
    }

    raiz.appendChild(ui.el('form', { class: 'centrada pantalla', novalidate: true, onsubmit: enviar }, [
      ui.el('h1', { class: 'intro-titulo neon-cian', text: params.cambiar ? 'NUEVO RUNNER' : 'IDENTIFÍCATE, RUNNER' }),
      ui.el('div', { class: 'tarjeta campo' }, [
        ui.el('label', { for: 'nombre', text: 'Nombre de usuario' }), input, error
      ]),
      ui.el('div', { class: 'tarjeta campo' }, [ui.el('label', { text: 'Avatar' }), grid]),
      ui.el('div', { class: 'fila-botones' }, botones)
    ]));
    input.focus();
  }

  return { mostrar: mostrar };
})();
