/* ==========================================================
   avatars.js — manifiesto de avatares
   El navegador no puede listar carpetas, por eso cada avatar se declara aquí.
   Para añadir uno: copia la imagen a chars/ y agrega una línea al arreglo.
   Si la imagen no carga se muestra un avatar de respaldo en SVG (emoji + color).
   ========================================================== */
NEON.avatars = (function () {
  const lista = [
    { id: 'avatar1', nombre: 'Glitch',  archivo: 'chars/avatar1.png', emoji: '🤖', color: '#00f0ff' },
    { id: 'avatar2', nombre: 'Vex',     archivo: 'chars/avatar2.png', emoji: '👾', color: '#ff2bd6' },
    { id: 'avatar3', nombre: 'Kira',    archivo: 'chars/avatar3.png', emoji: '🦊', color: '#f5ff3d' },
    { id: 'avatar4', nombre: 'Nova',    archivo: 'chars/avatar4.png', emoji: '🌌', color: '#a672ff' },
    { id: 'avatar5', nombre: 'Zero',    archivo: 'chars/avatar5.png', emoji: '💀', color: '#39ff88' },
    { id: 'avatar6', nombre: 'Pixel',   archivo: 'chars/avatar6.png', emoji: '🎮', color: '#ff7a2b' },
    { id: 'avatar7', nombre: 'Echo',    archivo: 'chars/avatar7.png', emoji: '🎧', color: '#2b8bff' },
    { id: 'avatar8', nombre: 'Byte',    archivo: 'chars/avatar8.png', emoji: '🐱', color: '#ff3b5c' }
  ];

  function porId(id) { return lista.find(function (a) { return a.id === id; }) || lista[0]; }

  /** SVG de respaldo: círculo de color con el emoji del avatar. */
  function respaldo(a) {
    return '<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="' + a.nombre + '">' +
      '<rect width="64" height="64" fill="#0d0d22"/>' +
      '<circle cx="32" cy="32" r="28" fill="' + a.color + '" fill-opacity="0.25" stroke="' + a.color + '" stroke-width="3"/>' +
      '<text x="32" y="43" font-size="30" text-anchor="middle">' + a.emoji + '</text></svg>';
  }

  /** Crea el elemento de avatar (imagen con respaldo SVG si falla `onerror`). */
  function crear(id, claseExtra) {
    const a = porId(id);
    const caja = document.createElement('span');
    caja.className = 'avatar' + (claseExtra ? ' ' + claseExtra : '');
    const img = new Image();
    img.alt = a.nombre;
    img.onerror = function () { caja.innerHTML = respaldo(a); };
    img.src = a.archivo;
    caja.appendChild(img);
    return caja;
  }

  return { lista: lista, porId: porId, crear: crear };
})();
