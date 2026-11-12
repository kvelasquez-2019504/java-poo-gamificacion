/* ==========================================================
   abstraccion.js — Mundo 1: ABSTRACCIÓN · "El Distrito de las Sombras"
   Este archivo define también NEON.levelTools, helpers compartidos por
   los cuatro archivos de niveles (se carga primero).
   ========================================================== */
NEON.levelTools = {
  /** Cuatro opciones con ids a, b, c, d. */
  opciones: function (a, b, c, d) {
    return [a, b, c, d].map(function (texto, i) { return { id: 'abcd'[i], texto: texto }; });
  },
  /**
   * Ejercicio de ordenar: `lineas` va en el orden CORRECTO; `baraja` indica
   * en qué orden (números 1..n) se muestran al jugador.
   */
  ordenar: function (lineas, baraja) {
    return {
      lineas: baraja.map(function (n) { return { id: 'l' + n, texto: lineas[n - 1] }; }),
      orden: lineas.map(function (_, i) { return 'l' + (i + 1); })
    };
  }
};

(function () {
  const T = NEON.levelTools;

  NEON.levels.abstraccion = [
    // ---------------------------------------------------------------- 1
    {
      id: 'abs-1', mundo: 'abstraccion', numero: 1, esJefe: false,
      titulo: 'Señal en la niebla',
      historia: 'Una señal tenue atraviesa la niebla del distrito. Para interceptarla, primero debes entender qué es realmente "abstraer".',
      tiempoObjetivo: 60,
      ejercicios: [
        {
          tipo: 'multiple',
          enunciado: '¿Qué es la **abstracción** en la programación orientada a objetos?',
          opciones: T.opciones(
            'Ocultar los atributos de una clase con `private`.',
            'Modelar un objeto mostrando solo lo esencial y ocultando los detalles irrelevantes.',
            'Crear una clase nueva a partir de otra ya existente.',
            'Usar un mismo método con comportamientos distintos.'),
          correcta: ['b'],
          feedback: 'Piensa en qué decides *mostrar* de un objeto y qué decides *ignorar*.',
          feedbackPorOpcion: {
            a: 'Proteger datos con `private` es otro pilar: el encapsulamiento.',
            c: 'Crear una clase a partir de otra es herencia.',
            d: 'Un mismo mensaje con respuestas distintas es polimorfismo.'
          },
          pista: 'La abstracción se centra en QUÉ hace un objeto, no en CÓMO lo hace.',
          explicacion: 'La abstracción define lo esencial de una entidad (su contrato) y oculta los detalles de implementación.'
        },
        {
          tipo: 'dragCode',
          enunciado: 'Declara una clase abstracta `Dron` con un método abstracto `volar()`.',
          codigo: 'public ___s1___ class Dron {\n    public ___s2___ void volar();\n}',
          slots: { s1: ['abstract'], s2: ['abstract'] },
          fragmentos: ['abstract', 'abstract', 'final', 'static'],
          feedbackPorSlot: {
            s1: 'Esa palabra no convierte la clase en abstracta. Busca el modificador que impide instanciarla.',
            s2: 'Un método sin cuerpo (`;` en lugar de `{ }`) necesita un modificador específico.'
          },
          feedback: 'Una clase abstracta y su método sin cuerpo comparten la misma palabra clave.',
          pista: 'La palabra clave es la misma en ambos huecos y significa "incompleto, lo completarán las subclases".',
          explicacion: '`abstract` marca una clase que no se puede instanciar y un método que las subclases deben implementar.'
        }
      ]
    },
    // ---------------------------------------------------------------- 2
    {
      id: 'abs-2', mundo: 'abstraccion', numero: 2, esJefe: false,
      titulo: 'Plano del dron',
      historia: 'Interceptas el plano de un dron de vigilancia. Está incompleto a propósito: solo muestra el contrato.',
      tiempoObjetivo: 60,
      ejercicios: [
        {
          tipo: 'multiple',
          enunciado: '`Dron` es una clase abstracta. ¿Qué ocurre al escribir `new Dron()`?',
          opciones: T.opciones(
            'Se crea un dron con todos sus métodos vacíos.',
            'Error de compilación: una clase abstracta no se puede instanciar.',
            'Se lanza una excepción en tiempo de ejecución.',
            'Funciona solo si `Dron` tiene un constructor.'),
          correcta: ['b'],
          feedback: 'Recuerda: lo abstracto está incompleto por definición.',
          feedbackPorOpcion: {
            a: 'Java no rellena métodos con cuerpos vacíos; el compilador lo impide antes.',
            c: 'El error se detecta al compilar, no al ejecutar.',
            d: 'Tener constructor no cambia nada: la clase sigue siendo abstracta.'
          },
          pista: 'El compilador se niega a crear objetos de algo que está "a medio definir".',
          explicacion: 'Las clases abstractas sirven de plantilla: solo se pueden instanciar sus subclases concretas.'
        },
        {
          tipo: 'dragCode',
          enunciado: 'Define la interfaz `Escaneable` y haz que `Camara` la cumpla.',
          codigo: 'public ___s1___ Escaneable {\n    void escanear();\n}\n\nclass Camara ___s2___ Escaneable {\n    public void escanear() {\n        System.out.println("Escaneando...");\n    }\n}',
          slots: { s1: ['interface'], s2: ['implements'] },
          fragmentos: ['interface', 'implements', 'extends', 'abstract'],
          feedbackPorSlot: {
            s1: 'Una interfaz tiene su propia palabra clave, distinta de `class`.',
            s2: 'Una clase "cumple" una interfaz con una palabra distinta de la usada para heredar de otra clase.'
          },
          feedback: 'Se declara una interfaz con una palabra clave y se cumple con otra.',
          pista: 'Declarar → `interface`. Cumplir el contrato → `implements`.',
          explicacion: 'Una interfaz define un contrato (qué métodos existen); la clase que la implementa decide cómo se hacen.'
        }
      ]
    },
    // ---------------------------------------------------------------- 3
    {
      id: 'abs-3', mundo: 'abstraccion', numero: 3, esJefe: false,
      titulo: 'Contrato roto',
      historia: 'Alguien alteró el contrato de la IA de seguridad. Reconstruye la clase base antes de que las subclases se descontrolen.',
      tiempoObjetivo: 120,
      ejercicios: [
        Object.assign({
          tipo: 'order',
          enunciado: 'Ordena la clase abstracta `IA`: primero el atributo, luego el constructor y después los métodos.',
          feedback: 'El orden habitual es: cabecera de la clase, atributos, constructor y métodos. Cada bloque `{` se cierra antes de seguir.',
          pista: 'Dentro del constructor, la asignación va entre su cabecera y su llave de cierre.',
          explicacion: 'Una clase abstracta puede tener atributos y constructor, además de métodos abstractos que obligan a las subclases.'
        }, T.ordenar([
          'public abstract class IA {',
          '    protected String modelo;',
          '    public IA(String modelo) {',
          '        this.modelo = modelo;',
          '    }',
          '    public abstract void pensar();',
          '}'
        ], [5, 7, 2, 6, 3, 1, 4])),
        {
          tipo: 'dragCode',
          enunciado: 'Completa la plantilla `Dron` y la subclase `DronVigilancia`.',
          codigo: 'public abstract class Dron {\n    protected String codigo;\n\n    public ___s1___ void despegar();\n\n    public void iniciar() {\n        System.out.println("Iniciando " + codigo);\n        ___s2___();\n    }\n}\n\nclass DronVigilancia extends Dron {\n    @___s3___\n    public void despegar() {\n        System.out.println("Despegando en silencio");\n    }\n}',
          slots: { s1: ['abstract'], s2: ['despegar'], s3: ['Override'] },
          fragmentos: ['abstract', 'despegar', 'Override', 'volar', 'final'],
          feedbackPorSlot: {
            s1: 'El método no tiene cuerpo: ¿qué modificador permite eso?',
            s2: 'Desde `iniciar()` debe llamarse al método abstracto declarado arriba.',
            s3: 'Esa anotación indica que el método sobrescribe uno de la clase padre.'
          },
          feedback: 'El método de plantilla `iniciar()` usa un paso que cada subclase define a su manera.',
          pista: 'Hueco 1: abstract · Hueco 2: el nombre del método abstracto · Hueco 3: la anotación de sobrescritura.',
          explicacion: 'Una clase abstracta puede mezclar métodos completos (`iniciar`) con abstractos (`despegar`) que cada hija implementa.'
        }
      ]
    },
    // ---------------------------------------------------------------- 4
    {
      id: 'abs-4', mundo: 'abstraccion', numero: 4, esJefe: false,
      titulo: 'Dos caras del código',
      historia: 'El distrito esconde dos tipos de moldes: las clases abstractas y las interfaces. Distinguirlos es vital.',
      tiempoObjetivo: 120,
      ejercicios: [
        {
          tipo: 'multiple',
          enunciado: 'Selecciona **todas** las afirmaciones verdaderas sobre interfaces y clases abstractas en Java.',
          opciones: T.opciones(
            'Una clase puede implementar varias interfaces a la vez.',
            'Una clase puede extender varias clases abstractas a la vez.',
            'Una clase abstracta puede tener atributos de instancia y constructores.',
            'Una clase abstracta no puede tener ningún método con cuerpo.'),
          correcta: ['a', 'c'],
          feedback: 'Hay más de una correcta. Revisa qué cosas permite Java en cada caso.',
          feedbackPorOpcion: {
            b: 'Java solo permite herencia simple de clases (una sola clase padre).',
            d: 'Una clase abstracta puede mezclar métodos con cuerpo y métodos abstractos.'
          },
          pista: 'Herencia de clases: solo una. Interfaces: todas las que quieras.',
          explicacion: 'Java permite herencia simple de clases pero implementación múltiple de interfaces; las clases abstractas pueden tener estado y constructores.'
        },
        {
          tipo: 'dragCode',
          enunciado: 'El `Banco` debe cumplir dos contratos a la vez.',
          codigo: '___s1___ Cifrable {\n    void cifrar(String mensaje);\n}\n\n___s2___ Auditable {\n    void auditar();\n}\n\nclass Banco ___s3___ Cifrable, Auditable {\n    public void cifrar(String mensaje) {\n        System.out.println("Cifrando " + mensaje);\n    }\n\n    public void auditar() {\n        System.out.println("Auditoría completa");\n    }\n}',
          slots: { s1: ['interface'], s2: ['interface'], s3: ['implements'] },
          fragmentos: ['interface', 'interface', 'implements', 'extends', 'abstract'],
          feedbackPorSlot: {
            s1: 'Cifrable solo declara un método sin cuerpo: es un contrato puro.',
            s2: 'Igual que Cifrable, Auditable es un contrato puro.',
            s3: 'Con `extends` solo se hereda de UNA clase. Para varios contratos se usa otra palabra.'
          },
          feedback: 'Dos contratos puros y una clase que cumple ambos separados por coma.',
          pista: 'Los dos primeros huecos son iguales. El tercero permite listar varios contratos separados por comas.',
          explicacion: 'Con `implements` una clase puede cumplir varias interfaces, algo que la herencia de clases no permite.'
        }
      ]
    },
    // ---------------------------------------------------------------- 5 (JEFE)
    {
      id: 'abs-5', mundo: 'abstraccion', numero: 5, esJefe: true,
      titulo: 'JEFE: Núcleo abstracto',
      historia: 'En el centro del distrito, el Guardián de las Sombras te bloquea el paso. Solo quien domine la abstracción podrá cruzar.',
      tiempoObjetivo: 180,
      ejercicios: [
        {
          tipo: 'multiple',
          enunciado: '¿Cuál es la mejor razón para declarar un método como `abstract` en una clase base?',
          opciones: T.opciones(
            'Para que las subclases puedan ignorarlo.',
            'Para obligar a las subclases concretas a proporcionar su propia implementación.',
            'Para que el método se ejecute más rápido.',
            'Para impedir que el método sea heredado.'),
          correcta: ['b'],
          feedback: 'Un método abstracto es una obligación, no una opción.',
          feedbackPorOpcion: {
            a: 'Todo lo contrario: las subclases concretas están obligadas a implementarlo.',
            c: 'La velocidad no tiene nada que ver con `abstract`.',
            d: 'El método sí se hereda; lo que se hereda es la obligación de implementarlo.'
          },
          pista: 'Piensa en un contrato que las hijas deben cumplir.',
          explicacion: 'Un método abstracto fija QUÉ debe hacerse y delega en cada subclase el CÓMO.'
        },
        {
          tipo: 'dragCode',
          enunciado: 'Completa la jerarquía: `Entidad` es la plantilla y `Camara` la implementación concreta.',
          codigo: 'public ___s1___ class Entidad {\n    public ___s2___ String describir();\n\n    public void mostrar() {\n        System.out.println(describir());\n    }\n}\n\nclass Camara ___s3___ Entidad {\n    public String describir() {\n        return "Cámara de seguridad";\n    }\n}',
          slots: { s1: ['abstract'], s2: ['abstract'], s3: ['extends'] },
          fragmentos: ['abstract', 'abstract', 'extends', 'implements', 'interface'],
          feedbackPorSlot: {
            s1: 'La clase contiene un método sin cuerpo, así que debe ser abstracta.',
            s2: 'El método no tiene cuerpo: necesita el modificador de "pendiente de implementar".',
            s3: '`Entidad` es una CLASE (abstracta), no una interfaz. ¿Cómo se hereda de una clase?'
          },
          feedback: 'Dos huecos piden el mismo modificador; el tercero depende de si el padre es una clase o una interfaz.',
          pista: 'abstract, abstract, y para heredar de una clase se usa `extends`.',
          explicacion: 'Una clase abstracta aporta comportamiento común (`mostrar`) y delega los detalles (`describir`) en las hijas.'
        },
        Object.assign({
          tipo: 'order',
          enunciado: 'Ordena la clase `Dron`, que implementa la interfaz `Pagable` (declara `double calcularPago()`). Atributo primero, método después.',
          feedback: 'Cabecera de clase, atributo, anotación, firma del método, su cuerpo y los cierres.',
          pista: 'La anotación `@Override` va justo antes de la firma del método que sobrescribe.',
          explicacion: 'Implementar una interfaz obliga a escribir sus métodos con `@Override` y `public`.'
        }, T.ordenar([
          'public class Dron implements Pagable {',
          '    private double tarifa;',
          '    @Override',
          '    public double calcularPago() {',
          '        return tarifa * 2;',
          '    }',
          '}'
        ], [4, 6, 1, 7, 3, 2, 5]))
      ]
    }
  ];
})();
