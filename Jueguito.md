# ROL
Eres un equipo senior compuesto por: Game Designer, Frontend Engineer (HTML/CSS/JS puro), UX/UI Designer especializado en estética cyberpunk y Docente experto en Programación Orientada a Objetos con Java. Tu entregable es un JUEGO EDUCATIVO COMPLETO, FUNCIONAL y ESTRUCTURADO, listo para abrirse con doble clic en `index.html` (sin servidor, sin frameworks, sin dependencias de npm, sin CDN obligatorios).

# VISIÓN DEL PRODUCTO
**Nombre del juego:** NEON//OOP: Protocolo Nexus
**Concepto:** Un juego de puzzles con mapa de niveles estilo Candy Crush Saga, donde el jugador "hackea" la red de una megacorporación completando, ordenando y razonando código Java. Cada nivel superado desbloquea el siguiente; cada error cuesta una vida.
**Objetivo pedagógico:** Comprobar conocimientos PROGRESIVOS de los 4 pilares de la POO en Java: Abstracción, Encapsulamiento, Herencia y Polimorfismo.
**Público:** Estudiantes principiantes-intermedios de Java.
**Idioma de toda la interfaz y contenido:** Español.

# NARRATIVA (usar textualmente en la intro y adaptar en cada mundo)

## Introducción (pantalla de apertura, con efecto máquina de escribir y glitch)
> Año 2089. Neo-Quetzal, la ciudad que nunca apaga sus luces.
> Bajo el neón y la lluvia ácida, la corporación **OMNICORE** controla cada semáforo, cada banco y cada latido de la red. Su núcleo, **NEXUS**, está escrito en Java… y está diseñado con una arquitectura tan perfecta que nadie ha logrado romperla.
> Nadie, excepto quienes entienden **los cuatro pilares**.
> Eres un *Runner*: un hacker novato con un deck prestado, tres vidas de conexión y una misión. Cada pilar es un firewall. Cada firewall guarda un fragmento de la llave maestra.
> Si tu conexión se agota, serás expulsado de la red. Pero la red es terca… y tú también.
> **¿Listo para entrar, Runner?**

## Narrativa por mundo
- **Mundo 1, ABSTRACCIÓN, "El Distrito de las Sombras":** "Aquí nada se muestra tal cual es. Solo ves lo esencial: lo que un objeto hace, no cómo lo hace. Aprende a modelar la realidad ocultando el ruido."
- **Mundo 2, ENCAPSULAMIENTO, "La Bóveda Cifrada":** "Los datos de OMNICORE están blindados. Atributos privados, accesos controlados. Si quieres entrar, debes pedirlo por la puerta correcta."
- **Mundo 3, HERENCIA, "El Árbol Genealógico de la IA":** "Las IA de OMNICORE nacieron de un ancestro común. Cada hija hereda su poder… y añade el suyo. Rastrea el linaje y toma el control."
- **Mundo 4, POLIMORFISMO, "El Espejo Infinito":** "Una orden, mil respuestas. El mismo mensaje, comportamientos distintos. Domina el cambio de forma y NEXUS será tuyo."

## Textos de sistema (redactar con tono cyberpunk, breves y con personalidad)
- Pérdida de vida: "⚠ CONEXIÓN COMPROMETIDA. Perdiste 1 vida."
- Sin vidas: "☠ CONEXIÓN PERDIDA. El nivel se reinicia. Tu progreso anterior está a salvo."
- Éxito: "✔ FIREWALL VULNERADO. Acceso concedido."
- Vida regenerada: "⚡ Energía restaurada. +1 vida."
- Pantalla final del juego: epílogo donde NEXUS cae y el Runner se convierte en leyenda.
Genera además 2 variantes por cada mensaje, elegidas al azar.

# STACK Y RESTRICCIONES
- HTML5, CSS3 (variables CSS, Grid, Flexbox, animaciones/keyframes) y JavaScript ES6+ puro (módulos con `<script type="module">` si funciona en `file://`; si no, usar scripts clásicos con namespaces u objetos globales ordenados).
- Persistencia ÚNICAMENTE con `localStorage`. SIN login, SIN registro, SIN backend.
- Drag & Drop con **Pointer Events** (no la API nativa HTML5 DnD) para que funcione igual con mouse y táctil.
- Responsive (móvil primero, mínimo 360px) y accesible (contraste, foco visible, `aria-live` para mensajes, alternativa por teclado: seleccionar fragmento y luego seleccionar hueco).
- Sin imágenes externas: efectos con CSS/SVG. Las únicas imágenes son los avatares en `chars/`.
- Código comentado en español, sin código muerto, funciones pequeñas y nombres claros.

# ESTRUCTURA DE CARPETAS (respétala exactamente)
```
neon-oop/
├── index.html
├── README.md
├── chars/                  ← avatares (avatar1.png ... avatar8.png)
├── css/
│   ├── base.css            ← variables, reset, tipografía
│   ├── theme-cyberpunk.css ← neón, glitch, scanlines
│   ├── components.css      ← botones, tarjetas, modales, HUD
│   ├── map.css             ← mapa de niveles
│   └── game.css            ← tablero de ejercicios
└── js/
    ├── main.js             ← arranque y router de pantallas
    ├── config.js           ← constantes (vidas, tiempos, puntos)
    ├── storage.js          ← capa de acceso a localStorage
    ├── state.js            ← estado global del jugador
    ├── screens/            ← intro.js, profile.js, map.js, level.js, results.js, ranking.js
    ├── engine/
    │   ├── lives.js        ← vidas + regeneración
    │   ├── scoring.js      ← puntaje y estrellas
    │   ├── validator.js    ← validación estructural
    │   └── dragdrop.js     ← lógica de arrastrar y soltar
    ├── exercises/          ← dragCode.js, multipleChoice.js, orderCode.js
    └── data/
        ├── avatars.js      ← lista de avatares (manifest)
        ├── narrative.js    ← todos los textos
        └── levels/         ← abstraccion.js, encapsulamiento.js, herencia.js, polimorfismo.js
```
Nota técnica: como el navegador no puede listar carpetas, los avatares se declaran en `data/avatars.js` como arreglo `[{id, nombre, archivo: 'chars/avatar1.png'}, ...]`. Incluir un avatar de respaldo en SVG (emoji o inicial) si la imagen no carga (`onerror`).

# FLUJO DE PANTALLAS
1. **Intro narrativa** (botón "Saltar" y "Continuar").
2. **Perfil (solo primera vez):** nombre de usuario (3 a 16 caracteres, validado) + selección de avatar de `chars/`. Se guarda y NO se vuelve a pedir. Agregar en Ajustes la opción "Cambiar perfil" y "Borrar progreso" (con confirmación).
3. **Mapa de niveles** (pantalla principal).
4. **Pantalla de nivel** (ejercicio).
5. **Resultados del nivel** (estrellas, puntos, desglose).
6. **Ranking local** (accesible desde el mapa).
7. **Epílogo** al completar los 4 mundos.

# MAPA DE NIVELES (estilo Candy Crush)
- Camino sinuoso vertical con scroll, nodos circulares conectados por una línea de neón (SVG `path` o posiciones absolutas).
- 4 mundos × 5 niveles = 20 niveles. Cada mundo tiene banner con su nombre, color neón propio y fondo temático.
- Estados del nodo: bloqueado (candado, atenuado), disponible (pulso animado), completado (1 a 3 estrellas bajo el nodo), actual (avatar del jugador sobre el nodo).
- Cada mundo se desbloquea al completar el anterior; el nivel 5 de cada mundo es **JEFE** (más difícil, nodo más grande, 3 ejercicios encadenados).
- HUD superior fijo: avatar, nombre, ❤❤❤ vidas, temporizador de próxima vida (si faltan), puntos totales, botón ranking y ajustes.

# SISTEMA DE VIDAS
- Máximo **3 vidas**. Se pierde 1 por cada respuesta incorrecta (al pulsar "Comprobar").
- Al llegar a 0: se muestra el modal de "Conexión perdida" y el nivel actual **se reinicia** (sin perder niveles ya completados ni sus estrellas).
- **Regeneración con el tiempo:** 1 vida cada 10 minutos (constante en `config.js`). Guardar `lastLifeTimestamp` en localStorage y calcular las vidas regeneradas al volver (incluso si cerró el navegador). Mostrar cuenta regresiva en el HUD.
- Si el jugador tiene 0 vidas y no ha regenerado ninguna, no puede iniciar un nivel: mostrar modal con el tiempo restante.
- Animación de corazón que se rompe al perder vida y de pulso al ganarla.

# MODALIDADES DE EJERCICIO (3 tipos, mezclar teoría y práctica)

## A. Completar código (Drag & Drop), práctico
- En el centro se muestra una clase Java con syntax highlighting simple (hecho a mano con spans: palabras reservadas, tipos, strings, comentarios), fuente monoespaciada, con números de línea.
- El código contiene entre 2 y 6 huecos (`slots`) resaltados en neón.
- Debajo hay un "banco de fragmentos" con las opciones (incluir 1 o 2 distractores por ejercicio). Se arrastran a los huecos; se pueden sacar y reubicar.
- Botón **"Comprobar"** (simula compilar/ejecutar), habilitado solo cuando todos los huecos estén llenos. Mostrar mini animación tipo "compilando…" (600 ms).

## B. Selección múltiple, teórico
- Pregunta conceptual con 4 opciones y una correcta (algunas con "selecciona todas las que apliquen" en niveles altos).
- Al elegir y pulsar "Comprobar", se valida igual que los demás.

## C. Ordenar fragmentos de código
- Líneas o bloques de código desordenados que el jugador reordena arrastrando verticalmente para formar un programa o método correcto.
- Validación por orden de ids.

# VALIDACIÓN (comparación estructural con respuestas predefinidas)
- Cada ejercicio define su solución en datos: `slots: {s1: 'private', s2: 'int'}` o `orden: ['l1','l3','l2']` o `correcta: ['b']`.
- `validator.js` compara la respuesta del jugador contra la solución. Normalizar cadenas (trim, espacios múltiples, `;` opcional) y aceptar `alternativas` válidas por hueco cuando existan (ej. `['int','Integer']` si aplica).
- Devuelve `{correcto: boolean, detalle: [{slotId, ok}]}` para marcar visualmente en verde/rojo cada hueco.
- **Retroalimentación por fallo:** cada ejercicio tiene `feedback` general y opcionalmente `feedbackPorSlot` y `feedbackPorOpcion` (explicar POR QUÉ está mal, con tono didáctico y breve, sin revelar la respuesta completa en el primer fallo; en el segundo fallo dar una pista más fuerte). Mostrar en un panel/alerta animada tipo terminal.
- Tras acertar, mostrar "Explicación del concepto" de 1 a 2 líneas.

# DIFICULTAD PROGRESIVA (5 niveles por pilar)
- **Niveles 1 y 2:** conceptos y sintaxis básica (selección múltiple + completar 1 a 2 huecos).
- **Niveles 3 y 4:** código más largo, 3 a 5 huecos, ordenar fragmentos, distractores más engañosos.
- **Nivel 5 (JEFE):** 3 ejercicios encadenados que mezclan las 3 modalidades; compartir 1 sola barra de vidas; y se necesita acertar los 3.
- Entre mundos, la dificultad base sube (el mundo 4 incluye código que integra los pilares anteriores).

# CONTENIDO MÍNIMO POR PILAR (genera 100% del banco, 20 niveles; ejemplos de enfoque)
- **Abstracción:** `abstract class`, métodos abstractos, interfaces, diferencia entre clase abstracta e interfaz, modelar una entidad ocultando detalles.
- **Encapsulamiento:** `private`, getters/setters, validaciones en setters, constructores, `final`, por qué no exponer atributos.
- **Herencia:** `extends`, `super()`, `super.metodo()`, `@Override`, `protected`, jerarquías, qué se hereda y qué no, herencia simple en Java.
- **Polimorfismo:** sobrescritura vs sobrecarga, referencia de tipo padre con objeto hijo, `List<Animal>` con distintos hijos, `instanceof`, enlace dinámico.
Todo el código Java del contenido debe ser **sintácticamente correcto y compilable**, usar nombres temáticos cyberpunk (ej. `Dron`, `Hacker`, `ImplanteNeural`, `CuentaCorporativa`, `IA`), y las explicaciones deben ser técnicamente exactas.

# ESQUEMA DE DATOS DE UN NIVEL (usarlo como contrato)
```js
{
  id: 'abs-1', mundo: 'abstraccion', numero: 1, esJefe: false,
  titulo: 'Señal en la niebla',
  historia: 'Texto narrativo breve del nivel (1 a 2 frases).',
  ejercicios: [{
    tipo: 'dragCode' | 'multiple' | 'order',
    enunciado: '...',
    codigo: 'public ___s1___ class Dron {\n  ___s2___ void volar();\n}',
    slots: { s1: ['abstract'], s2: ['abstract'] },
    fragmentos: ['abstract','final','static','private'],
    feedbackPorSlot: { s1: '...' },
    feedback: '...',
    explicacion: '...'
  }],
  tiempoObjetivo: 60   // segundos para la máxima bonificación
}
```

# PUNTUACIÓN Y ESTRELLAS
Definir todo en `config.js` y `scoring.js`:
- Respuesta correcta al primer intento: **100 pts**; segundo intento: 60; tercero: 30.
- Bonus de rapidez: hasta **+50** proporcional al tiempo restante respecto a `tiempoObjetivo`.
- Bonus por vidas conservadas al terminar: **+25 por vida**.
- Bonus por completar nivel: **+100**; por completar mundo: **+500**; por vencer jefe: **+250**.
- **Estrellas (1 a 3):** 3★ = sin perder vidas y dentro del tiempo objetivo; 2★ = perdió máximo 1 vida; 1★ = completado perdiendo 2 vidas. Si repite un nivel, se conserva la mejor puntuación y las mejores estrellas (el ranking suma la mejor puntuación de cada nivel).
- Pantalla de resultados con animación de estrellas apareciendo una a una y conteo ascendente de puntos.

# JUGADOR Y RANKING (localStorage)
Claves sugeridas (con prefijo `neonoop:`): `perfil`, `progreso`, `vidas`, `ranking`, `ajustes`.
- Perfil: `{nombre, avatarId}` guardado una sola vez.
- Progreso: por nivel `{completado, estrellas, mejorPuntaje, mejorTiempo}`.
- Ranking local: Top 10 de jugadores del mismo navegador (permitir varios perfiles guardados en el ranking aunque se cambie de nombre). Mostrar posición, avatar, nombre, puntos totales y estrellas totales. Resaltar al jugador actual.
- `storage.js` debe encapsular try/catch (por si localStorage no está disponible) y versionar los datos (`version: 1`) para futuras migraciones.

# DISEÑO VISUAL (Cyberpunk + mecánicas Candy Crush)
- Paleta: fondo `#0a0a14`, magenta `#ff2bd6`, cian `#00f0ff`, amarillo `#f5ff3d`, violeta `#7a2bff`; un color de acento por mundo.
- Tipografías: usar solo fuentes del sistema o `font-family: 'Courier New', monospace` y una sans con fallback (si usas Google Fonts, incluir fallback para uso offline).
- Efectos: glow con `box-shadow/text-shadow`, scanlines con gradientes, glitch con `clip-path`/keyframes en títulos, fondo animado de lluvia/neón con CSS o canvas ligero.
- **Feedback "jugoso" estilo Candy Crush:** botones grandes y redondeados con sombra inferior, fragmentos que "rebotan" al soltarse, huecos que brillan al pasar un fragmento cerca, pulso en el nodo disponible, confeti de partículas neón al superar un nivel, sacudida (shake) al fallar, transiciones suaves entre pantallas.
- Sonido opcional con Web Audio API (bips sintéticos) con botón de silencio (guardado en ajustes). Sin archivos de audio.

# CRITERIOS DE ACEPTACIÓN (el proyecto debe cumplir TODO)
1. Abre y funciona con doble clic en `index.html`, sin errores en consola.
2. Perfil se pide solo la primera vez y persiste tras recargar.
3. 20 niveles jugables y con contenido real, con desbloqueo secuencial.
4. Las 3 modalidades funcionan con mouse y táctil, más alternativa de teclado.
5. Perder una vida por cada error; con 0 vidas el nivel se reinicia sin perder progreso previo.
6. La regeneración de vidas funciona incluso tras cerrar y reabrir el navegador.
7. Feedback educativo claro en cada fallo.
8. Puntuación, estrellas y ranking local correctos y persistentes.
9. Diseño responsive, cyberpunk y con la sensación visual de Candy Crush.
10. Código modular, comentado y con README (cómo ejecutar, cómo agregar niveles nuevos, cómo agregar avatares).

# FORMA DE ENTREGA (importante)
Entrega el proyecto **por fases, archivo por archivo**, indicando la ruta antes de cada bloque de código y sin omitir contenido ni usar "..." ni "resto del código aquí":
1. Estructura de carpetas + `index.html` + CSS base y tema.
2. `config.js`, `storage.js`, `state.js`, `main.js` y pantallas (intro, perfil, mapa, resultados, ranking).
3. Motor: vidas, puntuación, validador, drag & drop.
4. Tipos de ejercicio.
5. Datos: `narrative.js`, `avatars.js` y los 4 archivos de niveles completos (5 niveles cada uno).
6. `README.md` y checklist de pruebas manuales.
Al terminar cada fase, espera mi confirmación con la palabra "continuar". Si el límite de longitud te obliga a cortar, termina en un archivo completo y avísame dónde retomar.