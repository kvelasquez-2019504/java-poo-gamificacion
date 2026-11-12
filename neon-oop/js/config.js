/* ==========================================================
   config.js — constantes globales del juego
   Todo el juego cuelga del namespace global NEON (scripts clásicos,
   porque los módulos ES no funcionan al abrir con file://).
   ========================================================== */
window.NEON = window.NEON || {};
NEON.screens = {};     // pantallas (intro, profile, map, level, results, ranking…)
NEON.exercises = {};   // tipos de ejercicio (dragCode, multiple, order)
NEON.levels = {};      // niveles por mundo

NEON.config = {
  VERSION: 1,                      // versión del formato de datos guardados
  PREFIJO: 'neonoop:',             // prefijo de las claves de localStorage

  MAX_VIDAS: 3,
  REGEN_VIDA_MS: 10 * 60 * 1000,   // 1 vida cada 10 minutos
  COMPILAR_MS: 600,                // duración de la animación "compilando…"

  NOMBRE_MIN: 3,
  NOMBRE_MAX: 16,
  RANKING_MAX: 10,                 // jugadores mostrados en el ranking
  RANKING_GUARDADOS: 50,           // límite de entradas almacenadas

  NIVELES_POR_MUNDO: 5,

  PUNTOS: {
    intento: [100, 60, 30],        // acierto en 1.º, 2.º y 3.er intento
    bonusRapidezMax: 50,           // bonus máximo por tiempo restante
    porVida: 25,                   // por cada vida conservada al terminar
    nivel: 100,                    // por completar un nivel
    mundo: 500,                    // por completar un mundo
    jefe: 250                      // por vencer a un jefe
  },

  // Orden de los mundos = orden de desbloqueo
  MUNDOS: [
    { id: 'abstraccion',      nombre: 'ABSTRACCIÓN',      titulo: 'El Distrito de las Sombras',    color: '#00f0ff', icono: '◈' },
    { id: 'encapsulamiento',  nombre: 'ENCAPSULAMIENTO',  titulo: 'La Bóveda Cifrada',             color: '#ff2bd6', icono: '▣' },
    { id: 'herencia',         nombre: 'HERENCIA',         titulo: 'El Árbol Genealógico de la IA', color: '#f5ff3d', icono: '⑂' },
    { id: 'polimorfismo',     nombre: 'POLIMORFISMO',     titulo: 'El Espejo Infinito',            color: '#a672ff', icono: '∞' }
  ]
};
