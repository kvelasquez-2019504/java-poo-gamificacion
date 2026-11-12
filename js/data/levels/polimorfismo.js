/* ==========================================================
   polimorfismo.js — Mundo 4: POLIMORFISMO · "El Espejo Infinito"
   Este mundo integra los pilares anteriores (abstracción, encapsulamiento, herencia).
   ========================================================== */
(function () {
  const T = NEON.levelTools;

  NEON.levels.polimorfismo = [
    // ---------------------------------------------------------------- 1
    {
      id: 'pol-1', mundo: 'polimorfismo', numero: 1, esJefe: false,
      titulo: 'Eco en el espejo',
      historia: 'Dices una palabra y mil reflejos responden distinto. Así comienza el espejo infinito.',
      tiempoObjetivo: 60,
      ejercicios: [
        {
          tipo: 'multiple',
          enunciado: '¿Qué significa **polimorfismo** en POO?',
          opciones: T.opciones(
            'Ocultar los datos de un objeto con `private`.',
            'Que un mismo mensaje (método) produzca comportamientos distintos según el objeto que lo recibe.',
            'Que una clase abstracta no tenga métodos.',
            'Que una clase tenga muchos atributos.'),
          correcta: ['b'],
          feedback: '"Poli-morfo" significa "muchas formas".',
          feedbackPorOpcion: {
            a: 'Eso es encapsulamiento.',
            c: 'Las clases abstractas sí pueden tener métodos; además, no definen el polimorfismo.',
            d: 'La cantidad de atributos no tiene relación con el polimorfismo.'
          },
          pista: 'Una misma orden, respuestas diferentes según quién la recibe.',
          explicacion: 'Con polimorfismo, el mismo método invocado sobre distintos objetos puede ejecutar código diferente.'
        },
        {
          tipo: 'dragCode',
          enunciado: 'Declara la variable con el tipo PADRE (`IA`) y llama al método sobrescrito.',
          codigo: 'class IA {\n    public void hablar() { System.out.println("..."); }\n}\n\nclass Robot extends IA {\n    @Override\n    public void hablar() { System.out.println("Bip bop"); }\n}\n\npublic class Prueba {\n    public static void main(String[] args) {\n        ___s1___ ia = new Robot();\n        ia.___s2___();\n    }\n}',
          slots: { s1: ['IA'], s2: ['hablar'] },
          fragmentos: ['IA', 'Robot', 'hablar', 'callar'],
          feedbackPorSlot: {
            s1: 'Para aprovechar el polimorfismo, la referencia es del tipo PADRE y el objeto, de la hija.',
            s2: 'Se debe invocar el método que ambas clases comparten.'
          },
          feedback: 'Referencia de la clase padre apuntando a un objeto hijo y llamada al método compartido.',
          pista: 'IA · hablar.',
          explicacion: 'Una referencia `IA` puede apuntar a un `Robot`; al llamar `hablar()` se ejecuta la versión del Robot.'
        }
      ]
    },
    // ---------------------------------------------------------------- 2
    {
      id: 'pol-2', mundo: 'polimorfismo', numero: 2, esJefe: false,
      titulo: 'Dos voces',
      historia: 'El espejo devuelve dos tipos de eco: los que cambian por parámetros y los que cambian por herencia.',
      tiempoObjetivo: 60,
      ejercicios: [
        {
          tipo: 'multiple',
          enunciado: '¿Cuál de estas opciones describe la **sobrecarga** (overloading)?',
          opciones: T.opciones(
            'Varios métodos con el mismo nombre y distintos parámetros en la misma clase.',
            'Redefinir en la hija un método heredado del padre.',
            'Declarar un atributo `private` con getter.',
            'Declarar una clase dentro de otra.'),
          correcta: ['a'],
          feedback: 'Sobrecarga = mismo nombre, firma distinta.',
          feedbackPorOpcion: {
            b: 'Eso es sobrescritura (overriding), no sobrecarga.',
            c: 'Eso es encapsulamiento.',
            d: 'Eso es una clase anidada, no un tipo de polimorfismo.'
          },
          pista: 'Sobrecarga: la lista de parámetros cambia. Sobrescritura: la firma es idéntica pero en la hija.',
          explicacion: 'La sobrecarga es polimorfismo en tiempo de compilación; la sobrescritura, en tiempo de ejecución.'
        },
        {
          tipo: 'dragCode',
          enunciado: 'Un método sobrecargado en `Escaner` y otro sobrescrito en `EscanerPro`.',
          codigo: 'class Escaner {\n    public void escanear(String ip) {\n        System.out.println("Escaneando " + ip);\n    }\n\n    // Sobrecarga: mismo nombre, distintos parámetros\n    public void ___s1___(String ip, int puerto) {\n        System.out.println("Escaneando " + ip + ":" + puerto);\n    }\n}\n\nclass EscanerPro extends Escaner {\n    @___s2___\n    public void escanear(String ip) {\n        System.out.println("Escaneo profundo " + ip);\n    }\n}',
          slots: { s1: ['escanear'], s2: ['Override'] },
          fragmentos: ['escanear', 'Override', 'Overload', 'escaneo'],
          feedbackPorSlot: {
            s1: 'Sobrecargar es repetir el MISMO nombre de método con otros parámetros.',
            s2: 'La anotación real que marca una sobrescritura no se llama "Overload".'
          },
          feedback: 'La sobrecarga repite el nombre; la sobrescritura se marca con una anotación estándar.',
          pista: 'escanear · Override.',
          explicacion: '`escanear(String)` y `escanear(String, int)` están sobrecargados; `EscanerPro` sobrescribe `escanear(String)`.'
        }
      ]
    },
    // ---------------------------------------------------------------- 3
    {
      id: 'pol-3', mundo: 'polimorfismo', numero: 3, esJefe: false,
      titulo: 'La flota',
      historia: 'Una flota entera de drones responde a una sola orden. Aprende a manejarla como una colección.',
      tiempoObjetivo: 120,
      ejercicios: [
        Object.assign({
          tipo: 'order',
          enunciado: 'Ordena el `main`: crea la lista de `IA`, añade un `Androide` y recórrela llamando a `hablar()`.',
          feedback: 'Primero se declara la lista, luego se llena y después se recorre. Cada llave se cierra antes de la siguiente.',
          pista: 'La llamada `ia.hablar()` va dentro del `for`; el `for` se cierra antes que el `main`.',
          explicacion: 'Una `List<IA>` admite cualquier subclase de `IA`; el `for` llama a la versión propia de cada objeto.'
        }, T.ordenar([
          'public static void main(String[] args) {',
          '    List<IA> red = new ArrayList<>();',
          '    red.add(new Androide());',
          '    for (IA ia : red) {',
          '        ia.hablar();',
          '    }',
          '}'
        ], [4, 6, 2, 7, 5, 1, 3])),
        {
          tipo: 'dragCode',
          enunciado: 'Recorre una flota de drones de distinto tipo con una sola lista.',
          codigo: 'import java.util.*;\n\nabstract class Dron {\n    public abstract String sonido();\n}\n\nclass DronAereo extends Dron {\n    public String sonido() { return "Zzzz"; }\n}\n\nclass DronAcuatico extends Dron {\n    public String sonido() { return "Glub"; }\n}\n\npublic class Flota {\n    public static void main(String[] args) {\n        ___s1___<Dron> flota = new ArrayList<>();\n        flota.add(new DronAereo());\n        flota.add(new ___s2___());\n        for (___s3___ d : flota) {\n            System.out.println(d.___s4___());\n        }\n    }\n}',
          slots: { s1: ['List'], s2: ['DronAcuatico'], s3: ['Dron'], s4: ['sonido'] },
          fragmentos: ['List', 'DronAcuatico', 'Dron', 'sonido', 'Map', 'Object'],
          feedbackPorSlot: {
            s1: 'Se necesita un tipo de colección con un solo parámetro genérico.',
            s2: 'Hay que añadir un dron concreto que todavía no esté en la lista.',
            s3: 'La variable del `for` debe tener el tipo común a todos los elementos para poder llamar a su método.',
            s4: 'Es el método que todos los drones comparten.'
          },
          feedback: 'Colección de `Dron`, un hijo concreto distinto, variable de tipo padre y el método común.',
          pista: 'List · DronAcuatico · Dron · sonido.',
          explicacion: 'La lista guarda `Dron` (tipo padre); cada elemento responde con la versión de su propia clase.'
        }
      ]
    },
    // ---------------------------------------------------------------- 4
    {
      id: 'pol-4', mundo: 'polimorfismo', numero: 4, esJefe: false,
      titulo: 'Enlace dinámico',
      historia: 'El espejo decide en el último instante qué versión del método ejecutar. Es el enlace dinámico.',
      tiempoObjetivo: 120,
      ejercicios: [
        {
          tipo: 'multiple',
          enunciado: 'Con `IA ia = new Androide();` (y `Androide` sobrescribe `hablar()`), selecciona **todas** las afirmaciones verdaderas.',
          opciones: T.opciones(
            'La referencia es de tipo `IA`, pero el objeto real es un `Androide`.',
            'Se puede llamar a cualquier método propio de `Androide` mediante `ia` sin hacer cast.',
            'Al llamar `ia.hablar()` se ejecuta la versión de `Androide`.',
            'Es un error de compilación.'),
          correcta: ['a', 'c'],
          feedback: 'Hay más de una correcta. Distingue el tipo de la referencia del tipo del objeto.',
          feedbackPorOpcion: {
            b: 'El compilador solo deja usar lo que declara el tipo de la referencia (`IA`); para lo demás hace falta un cast.',
            d: 'Es válido: un `Androide` ES una `IA`.'
          },
          pista: 'El compilador mira el tipo de la referencia; la ejecución mira el tipo del objeto real.',
          explicacion: 'Enlace dinámico: el método que se ejecuta lo decide el objeto real en tiempo de ejecución.'
        },
        {
          tipo: 'dragCode',
          enunciado: 'Crea un `Androide` desde una referencia `IA` y usa un método exclusivo con `instanceof` y cast.',
          codigo: 'class IA {\n    public String hablar() { return "..."; }\n}\n\nclass Androide extends IA {\n    @___s4___\n    public String hablar() { return "Hola, humano"; }\n\n    public ___s5___ cargar() { System.out.println("Cargando"); }\n}\n\npublic class Prueba {\n    public static void main(String[] args) {\n        IA ia = new ___s1___();\n        System.out.println(ia.hablar());\n        if (ia ___s2___ Androide) {\n            ((Androide) ia).___s3___();\n        }\n    }\n}',
          slots: { s1: ['Androide'], s2: ['instanceof'], s3: ['cargar'], s4: ['Override'], s5: ['void'] },
          fragmentos: ['Androide', 'instanceof', 'cargar', 'Override', 'void', 'IA', 'hablar'],
          feedbackPorSlot: {
            s1: 'Se debe crear el objeto de la clase hija que sobrescribe `hablar()`.',
            s2: 'Se necesita el operador que comprueba el tipo real de un objeto.',
            s3: 'Es el método exclusivo de `Androide`, que `IA` no conoce.',
            s4: 'Anotación de sobrescritura.',
            s5: 'El método `cargar` no devuelve ningún valor.'
          },
          feedback: 'Objeto hijo, comprobación de tipo real, método exclusivo, anotación y tipo de retorno.',
          pista: 'Androide · instanceof · cargar · Override · void.',
          explicacion: '`instanceof` comprueba el tipo real y el cast permite usar métodos exclusivos de la subclase con seguridad.'
        }
      ]
    },
    // ---------------------------------------------------------------- 5 (JEFE)
    {
      id: 'pol-5', mundo: 'polimorfismo', numero: 5, esJefe: true,
      titulo: 'JEFE: NEXUS',
      historia: 'NEXUS se refleja en mil formas. Para vencerlo debes integrar los cuatro pilares: abstraer, encapsular, heredar y cambiar de forma.',
      tiempoObjetivo: 180,
      ejercicios: [
        {
          tipo: 'multiple',
          enunciado: '¿Qué imprime este código?',
          codigo: 'class IA {\n    void hablar() { System.out.println("IA"); }\n}\nclass Androide extends IA {\n    @Override\n    void hablar() { System.out.println("Androide"); }\n}\n// main:\nIA a = new Androide();\na.hablar();',
          opciones: T.opciones('`IA`', '`Androide`', 'Error de compilación', '`IA` y luego `Androide`'),
          correcta: ['b'],
          feedback: 'Fíjate en qué clase es el objeto real, no en el tipo de la variable.',
          feedbackPorOpcion: {
            a: 'Esa sería la salida si no hubiera sobrescritura o si el enlace fuera estático.',
            c: 'El código compila: un `Androide` es una `IA`.',
            d: 'Solo se ejecuta UNA versión del método.'
          },
          pista: 'Enlace dinámico: manda el objeto real (`new Androide()`).',
          explicacion: 'Gracias al enlace dinámico se ejecuta `Androide.hablar()` aunque la referencia sea de tipo `IA`.'
        },
        {
          tipo: 'dragCode',
          enunciado: 'Integra los pilares: clase abstracta, atributo encapsulado, herencia y polimorfismo.',
          codigo: 'public ___s1___ class Nodo {\n    private String id;\n\n    public Nodo(String id) {\n        this.id = id;\n    }\n\n    public String getId() {\n        return id;\n    }\n\n    public ___s2___ String ejecutar();\n}\n\nclass Firewall ___s3___ Nodo {\n    public Firewall(String id) {\n        ___s4___(id);\n    }\n\n    @Override\n    public String ejecutar() {\n        return "Bloqueando desde " + getId();\n    }\n}\n\nclass Prueba {\n    public static void main(String[] args) {\n        Nodo n = new Firewall("FW-01");\n        System.out.println(n.___s5___());\n    }\n}',
          slots: { s1: ['abstract'], s2: ['abstract'], s3: ['extends'], s4: ['super'], s5: ['ejecutar'] },
          fragmentos: ['abstract', 'abstract', 'extends', 'super', 'ejecutar', 'interface', 'getId'],
          feedbackPorSlot: {
            s1: 'La clase tiene un método sin cuerpo: debe declararse como abstracta.',
            s2: 'Método sin cuerpo = modificador de "pendiente de implementar".',
            s3: '`Nodo` es una clase: la hija la extiende.',
            s4: 'El atributo `id` es privado en `Nodo`, así que se inicializa llamando a su constructor.',
            s5: 'Se invoca el método abstracto que cada hija implementa a su modo.'
          },
          feedback: 'Abstracción (clase y método), encapsulamiento (id privado + getter), herencia (extends/super) y polimorfismo (llamada por referencia padre).',
          pista: 'abstract · abstract · extends · super · ejecutar.',
          explicacion: 'Los cuatro pilares juntos: `Nodo` abstrae, encapsula `id`, `Firewall` hereda y `ejecutar()` se resuelve de forma polimórfica.'
        },
        Object.assign({
          tipo: 'order',
          enunciado: 'Ordena el recorrido polimórfico de la red de `Nodo`: lista, alta, bucle y comprobación de tipo.',
          feedback: 'Se crea la lista, se añade un nodo y se recorre; la comprobación `instanceof` va dentro del bucle.',
          pista: 'Dos cierres de llave seguidos: primero el del `if` (con sangría) y luego el del `for`.',
          explicacion: 'Las colecciones de tipo padre permiten recorrer objetos distintos, y `instanceof` permite tratar a cada tipo de forma específica.'
        }, T.ordenar([
          'List<Nodo> red = new ArrayList<>();',
          'red.add(new Firewall("FW-01"));',
          'for (Nodo n : red) {',
          '    if (n instanceof Firewall) {',
          '        System.out.println(n.ejecutar());',
          '    }',
          '}'
        ], [3, 7, 5, 1, 6, 2, 4]))
      ]
    }
  ];
})();
