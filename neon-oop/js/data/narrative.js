/* ==========================================================
   narrative.js — todos los textos del juego (en español)
   ========================================================== */
NEON.narrative = (function () {

  /** Introducción: **negrita** y *cursiva* se interpretan al mostrarse. */
  const intro = [
    'Año 2089. Neo-Quetzal, la ciudad que nunca apaga sus luces.',
    'Bajo el neón y la lluvia ácida, la corporación **OMNICORE** controla cada semáforo, cada banco y cada latido de la red. Su núcleo, **NEXUS**, está escrito en Java… y está diseñado con una arquitectura tan perfecta que nadie ha logrado romperla.',
    'Nadie, excepto quienes entienden **los cuatro pilares**.',
    'Eres un *Runner*: un hacker novato con un deck prestado, tres vidas de conexión y una misión. Cada pilar es un firewall. Cada firewall guarda un fragmento de la llave maestra.',
    'Si tu conexión se agota, serás expulsado de la red. Pero la red es terca… y tú también.',
    '**¿Listo para entrar, Runner?**'
  ];

  /** Texto de cada mundo (se muestra en el banner del mapa). */
  const mundos = {
    abstraccion:     'Aquí nada se muestra tal cual es. Solo ves lo esencial: lo que un objeto hace, no cómo lo hace. Aprende a modelar la realidad ocultando el ruido.',
    encapsulamiento: 'Los datos de OMNICORE están blindados. Atributos privados, accesos controlados. Si quieres entrar, debes pedirlo por la puerta correcta.',
    herencia:        'Las IA de OMNICORE nacieron de un ancestro común. Cada hija hereda su poder… y añade el suyo. Rastrea el linaje y toma el control.',
    polimorfismo:    'Una orden, mil respuestas. El mismo mensaje, comportamientos distintos. Domina el cambio de forma y NEXUS será tuyo.'
  };

  /** Mensajes del sistema: la primera frase es la original y hay 2 variantes aleatorias más. */
  const mensajes = {
    perdidaVida: [
      '⚠ CONEXIÓN COMPROMETIDA. Perdiste 1 vida.',
      '⚠ ALERTA ICE: el firewall te rastreó. −1 vida.',
      '⚠ Paquete corrupto. La red te cobra 1 vida.'
    ],
    sinVidas: [
      '☠ CONEXIÓN PERDIDA. El nivel se reinicia. Tu progreso anterior está a salvo.',
      '☠ SESIÓN TERMINADA. Te expulsaron del nodo. Lo que ya conquistaste sigue siendo tuyo.',
      '☠ SIN SEÑAL. El deck se apaga, pero tus logros siguen guardados en la red.'
    ],
    exito: [
      '✔ FIREWALL VULNERADO. Acceso concedido.',
      '✔ BRECHA ABIERTA. El sistema te deja pasar.',
      '✔ ROOT OBTENIDO. Bien hecho, Runner.'
    ],
    vidaRegenerada: [
      '⚡ Energía restaurada. +1 vida.',
      '⚡ El deck recarga una celda. +1 vida.',
      '⚡ Conexión estable de nuevo. +1 vida.'
    ],
    compilando: [
      'Compilando',
      'Inyectando payload',
      'Ejecutando exploit'
    ]
  };

  const epilogo = [
    'Las luces de Neo-Quetzal parpadean… y por primera vez, se apagan.',
    'En el corazón de **OMNICORE**, **NEXUS** intenta reiniciarse, pero cada firewall ha caído: **Abstracción**, **Encapsulamiento**, **Herencia** y **Polimorfismo**. Cuatro pilares, una sola llave maestra… y la tienes tú.',
    'Los semáforos vuelven a ser solo semáforos. Los bancos, solo bancos. La red, por fin, respira.',
    'En los callejones bajo la lluvia ácida, alguien pinta un nombre con aerosol de neón. Es el tuyo.',
    'Ya no eres un hacker novato con un deck prestado. Eres una **leyenda**.',
    '*Fin del Protocolo Nexus.*'
  ];

  /** Devuelve una variante al azar del mensaje indicado. */
  function mensaje(tipo) { return NEON.ui.aleatorio(mensajes[tipo]); }

  return { intro: intro, mundos: mundos, mensajes: mensajes, epilogo: epilogo, mensaje: mensaje };
})();
