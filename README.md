# ⚡ NEON//OOP: Protocolo Nexus ⚡
> **Juego educativo gamificado para el aprendizaje progresivo de los 4 pilares de la Programación Orientada a Objetos en Java.**

---

## 🏛️ Contexto Académico y Créditos

* **Curso:** Didáctica de la Programación
* **Autor / Estudiante:** Marvin Alegría
* **Diseño y Desarrollo Asistido por IA:** Generado e implementado utilizando el modelo **Claude 3.5 Sonnet** (Anthropic).
* **Especificación y Prompt Original:** Todo el diseño pedagógico, técnico y de mecánicas de juego fue estructurado a partir del prompt maestro documentado en el archivo [`Jueguito.md`](Jueguito.md).

---

## 🌃 Sinopsis Narrativa (El Lore)

> **Neo-Quetzal, Año 2089.** La ciudad que nunca apaga sus luces.  
> Bajo el resplandor del neón y la lluvia ácida, la megacorporación **OMNICORE** controla cada semáforo, cada transacción bancaria y cada latido de la red ciudadana.  
> 
> En el corazón de sus servidores reside **NEXUS**, una arquitectura central programada en Java tan blindada que ninguna intrusión ha logrado quebrarla... salvo aquellos que dominan a fondo **los cuatro pilares de la Programación Orientada a Objetos**.
>
> Eres un **Runner**: un hacker novato armado con un cyberdeck prestado, 3 vidas de conexión y una misión crítica. Cada pilar de la POO es un firewall corporativo. Cada firewall que derribes te otorgará un fragmento de la llave maestra para liberar la red.
>
> *¿Listo para conectarte al deck, Runner?*

---

## 🕹️ Manual del Runner (Guía de Funcionamiento del Juego)

> [!NOTE]  
> El juego no incluye un menú de ayuda interno durante la partida para mantener la inmersión en la terminal; por ello, este documento constituye la **guía oficial de usuario y manual operativo** de todas las secciones y mecánicas.

```
       [ PANTALLA INTRO ] (Narrativa Cyberpunk & Glitch)
               │
               ▼
      [ CREACIÓN DE PERFIL ] (Alias de Runner + Avatar)
               │
               ▼
         [ MAPA SAGA ] ──(HUD: Vidas ❤❤❤, Puntos, Reloj, Ranking 🏆, Ajustes ⚙)
         │  ├── Mundo 1: Abstracción (Niveles 1-4 + Jefe 5)
         │  ├── Mundo 2: Encapsulamiento (Niveles 1-4 + Jefe 5)
         │  ├── Mundo 3: Herencia (Niveles 1-4 + Jefe 5)
         │  └── Mundo 4: Polimorfismo (Niveles 1-4 + Jefe 5)
         ▼
     [ NODO / RETO ] ──► (Drag & Drop, Opción Múltiple, Ordenar Bloques)
         │
         ├───► Fallo: Terminal ICE con pista (-1 Vida)
         └───► Acierto: Explicación didáctica del concepto
                   │
                   ▼
         [ PANTALLA DE RESULTADOS ] (Estrellas ★★★, desglose y récord)
```

---

### 1. Inicio Rápido y Requisitos
* **Cero dependencias:** No requiere Node.js, npm, servidores locales ni conexión a Internet.
* **Ejecución:** Haz doble clic sobre [`index.html`](index.html) desde tu explorador de archivos para abrirlo en cualquier navegador moderno (Chrome, Edge, Firefox, Safari).
* **Dispositivos soportados:** Totalmente adaptable a ordenadores de escritorio, portátiles, tablets y smartphones (controles táctiles habilitados).

---

### 2. Creación de Perfil de Runner
Al iniciar por primera vez (tras la introducción narrativa interactiva):
1. **Alias de Hacker:** Ingresa tu nombre de Runner (longitud válida entre 3 y 16 caracteres).
2. **Selección de Avatar:** Escoge entre 8 avatares cibernéticos (`Glitch`, `Vex`, `Kira`, `Nova`, `Zero`, `Pixel`, `Echo`, `Byte`).
3. **Persistencia:** Tu perfil y progreso se almacenan automáticamente en el almacenamiento local del navegador (`localStorage`).

---

### 3. La Interfaz del Mapa y el HUD Superior
La pantalla principal presenta un mapa vertical sinuoso inspirado en mecánicas estilo *Saga* (Candy Crush) que asciende a medida que conquistas distritos:

* **HUD Superior (Monitor de Estado):**
  * **Identidad:** Muestra tu avatar activo y nombre de Runner.
  * **Batería de Conexión (❤❤❤):** Tus vidas activas en tiempo real.
  * **Temporizador de Recarga (⏱):** Cuenta regresiva para la regeneración de la próxima vida (si has perdido alguna).
  * **Scoreboard:** Puntos totales acumulados en tu campaña.
  * **Botón de Audio (🔊/🔇):** Activa o silencia los efectos de sonido sintetizados (Web Audio API).
  * **Trofeo (🏆):** Abre la tabla de clasificación local.
  * **Engrane (⚙):** Abre el menú de configuración y ajustes.
* **Estados de los Nodos del Mapa:**
  * 🔒 **Bloqueado:** Nodo atenuado con candado; requiere superar el nivel inmediatamente anterior.
  * ⚡ **Disponible:** Nodo con pulso luminoso de neón listo para ser hackeado.
  * 👤 **Actual:** Tu avatar se posiciona sobre el último nodo desbloqueado.
  * ⭐ **Completado:** Muestra las estrellas obtenidas (1 a 3) y tu récord.

---

### 4. Los 4 Mundos (Los Firewalls de OMNICORE)

| Mundo | Distrito | Pilar de la POO | Temas y Sintaxis Java Evaluada | Color de Neón |
| :--- | :--- | :--- | :--- | :---: |
| **Mundo 1** | *El Distrito de las Sombras* | **Abstracción** | `abstract class`, métodos sin cuerpo, `interface`, `implements`, modelado esencial vs implementación. | Cian (`#00f0ff`) |
| **Mundo 2** | *La Bóveda Cifrada* | **Encapsulamiento** | `private`, getters y setters, validación de estado, constructores, atributos inmutables `final`. | Magenta (`#ff2bd6`) |
| **Mundo 3** | *El Árbol Genealógico de la IA* | **Herencia** | `extends`, constructores con `super()`, llamada a métodos con `super.metodo()`, visibilidad `protected`, herencia simple. | Amarillo (`#f5ff3d`) |
| **Mundo 4** | *El Espejo Infinito* | **Polimorfismo** | Sobrescritura (`@Override`), sobrecarga de métodos, referencias padre (`List<IA>`), enlace dinámico, operador `instanceof`. | Violeta (`#a672ff`) |

> [!IMPORTANT]  
> **Niveles de Jefe (Nivel 5 de cada mundo):**  
> El quinto nivel de cada distrito representa el núcleo del firewall. Es un nodo de mayor tamaño que contiene **3 desafíos encadenados**. Para superarlo, debes resolver los tres ejercicios consecutivamente compartiendo la misma reserva de vidas.

---

### 5. Mecánicas de Ejercicio (Cómo Hackear)

Cada nodo propone un reto clasificado en una de las 3 modalidades didácticas:

#### A. Completar Código (Práctico - Drag & Drop)
* **Objetivo:** Analizar una clase Java funcional y rellenar los huecos vacíos (`slots`) con los fragmentos sintácticos correctos.
* **Interacción:**
  * **Mouse / Táctil:** Arrastra los bloques desde el banco de fragmentos inferior hacia los huecos luminosos. Puedes reubicarlos o devolverlos al banco en cualquier momento.
  * **Accesibilidad por Teclado:** Pulsa `Tab` o haz clic sobre un fragmento para seleccionarlo, y luego pulsa sobre el hueco destino.
* **Cuidado con los distractores:** El banco incluye intencionalmente palabras clave tramposas (ej. confundir `extends` con `implements`, o `private` con `public`).
* **Botón Comprobar:** Se activa cuando todos los huecos están ocupados. Al pulsarlo, el sistema simula un proceso de compilación (`600 ms`) antes de validar.

#### B. Selección Múltiple (Teórico / Conceptual)
* **Objetivo:** Resolver dilemas arquitectónicos de diseño orientado a objetos.
* **Interacción:** Elige la opción correcta entre 4 alternativas. En niveles avanzados del mundo de Polimorfismo, el sistema indicará *(varias respuestas)* cuando aplique selección múltiple.

#### C. Ordenar Fragmentos (Secuencial / Sintaxis)
* **Objetivo:** Reconstruir un archivo o bloque de código Java cuyas líneas se encuentran desordenadas.
* **Interacción:** Arrastra verticalmente las líneas para colocarlas en la secuencia canónica (cabecera de clase $\rightarrow$ atributos $\rightarrow$ constructor $\rightarrow$ métodos y cierre de llaves).

---

### 6. Sistema de Vidas, Fallos y Regeneración

* **Capacidad Máxima:** Dispones de **3 vidas** de conexión.
* **Costo del Fallo:** Cada vez que pulses "Comprobar" y la solución sea incorrecta, la red de OMNICORE rastreará tu intrusión y **perderás 1 vida**.
* **Terminal de Retroalimentación ICE:** 
  * En el primer fallo, la terminal muestra una pista pedagógica orientativa sin revelar la respuesta.
  * Cada opción o hueco erróneo cuenta con una explicación específica que te aclara *por qué* ese concepto no aplica allí.
* **Expulsión por Vidas Agotadas (0 Vidas):**
  * Si tu reserva llega a 0, el sistema corta tu enlace y **reinicia el nivel actual**.
  * **Tu progreso histórico está a salvo:** Nunca perderás mundos, niveles o estrellas previamente desbloqueadas.
* **Recarga Pasiva de Vidas:**
  * Tu deck regenera **1 vida cada 10 minutos**.
  * El cálculo se sincroniza automáticamente con la hora real de tu equipo: si cierras el navegador y regresas más tarde, encontrarás tus vidas restauradas.

---

### 7. Puntuación, Estrellas y Ranking

Al vulnerar con éxito un nivel, la pantalla de resultados computa tu desempeño mediante la siguiente fórmula:

$$\text{Puntaje Total} = \text{Puntos por Intento} + \text{Bonus de Rapidez} + \text{Bonus de Vidas} + \text{Bonificaciones Especiales}$$

* **Puntos por Acierto:**
  * 1.º intento: **100 pts**
  * 2.º intento: **60 pts**
  * 3.º intento o superior: **30 pts**
* **Bonus de Rapidez:** Hasta **+50 pts** proporcionales a los segundos restantes frente al `tiempoObjetivo` del nivel.
* **Bonus de Vidas Conservadas:** **+25 pts** por cada vida con la que finalices el nivel.
* **Bonificaciones de Hito:**
  * Nivel completado: **+100 pts**
  * Jefe derrotado: **+250 pts**
  * Mundo finalizado: **+500 pts**

#### Sistema de Calificación por Estrellas (1 a 3 ★):
* ⭐⭐⭐ **3 Estrellas:** Superar el nivel sin perder ninguna vida y dentro del tiempo objetivo.
* ⭐⭐ **2 Estrellas:** Completar el nivel habiendo perdido únicamente 1 vida.
* ⭐ **1 Estrella:** Superar el nivel habiendo agotado 2 vidas.

#### 🏆 Salón de la Fama (Ranking Local)
El icono del trofeo en el HUD abre la tabla de clasificación con el **Top 10 de Runners** registrados en ese navegador. Puedes competir contra tus compañeros en el mismo equipo retándolos a superar tu puntuación acumulada.

---

### 8. Menú de Ajustes del Deck (⚙)

Ubicado en la esquina superior derecha del mapa, permite:
* **Alternar Efectos de Audio:** Activar o apagar los beeps y alertas estilo 8-bit.
* **Repetir la Introducción:** Volver a reproducir la máquina de escribir narrativa.
* **Cambiar de Runner:** Permite crear un nuevo usuario conservando la puntuación del anterior en la tabla de clasificación.
* **Borrar Progreso:** Reinicia todos los datos de almacenamiento local a cero (requiere confirmación).

---

## 🏗️ Estructura del Proyecto

Para los curiosos o docentes que deseen inspeccionar el código fuente:

```
java-poo-gamificacion/
├── index.html                   # Punto de entrada único del juego
├── Jueguito.md                  # Especificación didáctica y prompt de Claude 3.5 Sonnet
├── README.md                    # Manual oficial y guía de contexto (este archivo)
├── LICENSE                      # Términos de licencia de código abierto
│
├── css/                         # Estilos y ambientación visual
│   ├── base.css                 # Reset, tipografía, variables de color y layout
│   ├── theme-cyberpunk.css      # Efectos visuales neón, glitch, scanlines y animaciones
│   ├── components.css           # Botones, HUD superior, terminal, modales y tarjetas
│   ├── map.css                  # Renderizado del mapa estilo saga de 20 niveles
│   └── game.css                 # Tablero de ejercicios, slots de código y banco drag & drop
│
└── js/                          # Lógica del juego estructurada bajo namespace NEON
    ├── config.js                # Constantes globales de puntuación, vidas y mundos
    ├── main.js                  # Inicializador, enrutador de vistas y utilidades de UI
    ├── state.js                 # Manejo del estado reactivo del jugador y progreso
    ├── storage.js               # Capa de abstracción y versionado sobre localStorage
    │
    ├── data/                    # Contenido temático y niveles
    │   ├── avatars.js           # Catálogo de avatares con fallback dinámico en SVG
    │   ├── narrative.js         # Textos narrativos, diálogos de terminal y epílogo
    │   └── levels/              # Bancos de preguntas y ejercicios de Java
    │       ├── abstraccion.js      # Mundo 1: 5 niveles (10 ejercicios)
    │       ├── encapsulamiento.js  # Mundo 2: 5 niveles (10 ejercicios)
    │       ├── herencia.js         # Mundo 3: 5 niveles (10 ejercicios)
    │       └── polimorfismo.js     # Mundo 4: 5 niveles (10 ejercicios + integración)
    │
    ├── engine/                  # Motores de juego
    │   ├── dragdrop.js          # Control de arrastre unificado vía Pointer Events
    │   ├── lives.js             # Economía de vidas y cronometraje de regeneración
    │   ├── scoring.js           # Cálculo de puntos, bonus y algoritmos de estrellas
    │   └── validator.js         # Comparador y normalizador estructural de código Java
    │
    ├── exercises/               # Controladores de interacción por tipo de ejercicio
    │   ├── dragCode.js          # Mecánica de completar código Java con slots
    │   ├── multipleChoice.js    # Mecánica de selección teórica
    │   └── orderCode.js         # Mecánica de ordenamiento de bloques
    │
    └── screens/                 # Vistas del ciclo de juego
        ├── intro.js             # Pantalla de apertura cinemática
        ├── profile.js           # Configuración inicial del Runner
        ├── map.js               # Mapa de distritos interactivo
        ├── level.js             # Entorno de ejecución del ejercicio actual
        ├── results.js           # Resumen de puntuación y desbloqueo de niveles
        └── ranking.js           # Tabla de mejores puntajes
```

---

*¡Que la compilación esté de tu lado, Runner! OMNICORE no sabrá qué lo golpeó.* 💻⚡
