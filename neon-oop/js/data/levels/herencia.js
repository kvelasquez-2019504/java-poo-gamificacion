/* ==========================================================
   herencia.js — Mundo 3: HERENCIA · "El Árbol Genealógico de la IA"
   ========================================================== */
(function () {
  const T = NEON.levelTools;

  NEON.levels.herencia = [
    // ---------------------------------------------------------------- 1
    {
      id: 'her-1', mundo: 'herencia', numero: 1, esJefe: false,
      titulo: 'Ancestro común',
      historia: 'Todas las IA de OMNICORE comparten un ancestro. Sigue el rastro hasta la primera línea de código.',
      tiempoObjetivo: 60,
      ejercicios: [
        {
          tipo: 'multiple',
          enunciado: '¿Qué palabra clave se usa en Java para que una clase **herede** de otra?',
          opciones: T.opciones('`implements`', '`extends`', '`inherits`', '`super`'),
          correcta: ['b'],
          feedback: 'Es la misma palabra que significa "ampliar" en inglés.',
          feedbackPorOpcion: {
            a: '`implements` se usa con interfaces, no para heredar de una clase.',
            c: '`inherits` no existe en Java.',
            d: '`super` sirve para acceder a miembros del padre, no para declarar la herencia.'
          },
          pista: 'class Hija ____ Padre. La palabra significa "extender".',
          explicacion: 'Con `extends` una clase hereda atributos y métodos accesibles de su clase padre.'
        },
        {
          tipo: 'dragCode',
          enunciado: 'El `Androide` hereda de `IA` y reutiliza su método `procesar()`.',
          codigo: 'public class IA {\n    public void procesar() {\n        System.out.println("Procesando...");\n    }\n}\n\nclass Androide ___s1___ IA {\n    public void caminar() {\n        ___s2___();\n    }\n}',
          slots: { s1: ['extends'], s2: ['procesar'] },
          fragmentos: ['extends', 'implements', 'procesar', 'caminar'],
          feedbackPorSlot: {
            s1: '`IA` es una clase, así que no se "implementa": se hereda de ella.',
            s2: 'Se quiere usar el método heredado de `IA`. Si te llamas a ti mismo, entrarías en recursión infinita.'
          },
          feedback: 'Hereda de la clase padre y luego llama a un método que ya existe en ella.',
          pista: 'extends y el nombre del método que `IA` ya trae.',
          explicacion: '`Androide` no define `procesar()`, pero lo tiene porque lo hereda de `IA`.'
        }
      ]
    },
    // ---------------------------------------------------------------- 2
    {
      id: 'her-2', mundo: 'herencia', numero: 2, esJefe: false,
      titulo: 'Primera generación',
      historia: 'La primera generación de IA ya conoce las reglas del linaje. Aprende cuántos padres puede tener una hija.',
      tiempoObjetivo: 60,
      ejercicios: [
        {
          tipo: 'multiple',
          enunciado: '¿Cuántas clases padre **directas** puede tener una clase en Java?',
          opciones: T.opciones('Exactamente una (herencia simple).', 'Dos como máximo.', 'Las que se necesiten.', 'Ninguna: Java no tiene herencia.'),
          correcta: ['a'],
          feedback: 'Java evita el "problema del diamante" limitando la herencia de clases.',
          feedbackPorOpcion: {
            b: 'No hay un límite de dos: es uno.',
            c: 'Java no permite herencia múltiple de clases (sí implementar varias interfaces).',
            d: 'Java sí tiene herencia; toda clase hereda al menos de `Object`.'
          },
          pista: 'Herencia de clases simple; herencia múltiple solo con interfaces.',
          explicacion: 'En Java una clase extiende como máximo una clase; para combinar comportamientos se usan interfaces.'
        },
        {
          tipo: 'dragCode',
          enunciado: 'El constructor de la hija debe inicializar el atributo del padre.',
          codigo: 'class IA {\n    ___s1___ String nombre;\n\n    public IA(String nombre) {\n        this.nombre = nombre;\n    }\n}\n\nclass Androide extends IA {\n    public Androide(String nombre) {\n        ___s2___(nombre);\n    }\n\n    public String presentarse() {\n        return "Androide " + nombre;\n    }\n}',
          slots: { s1: ['protected'], s2: ['super'] },
          fragmentos: ['protected', 'private', 'super', 'this'],
          feedbackPorSlot: {
            s1: 'La hija usa `nombre` directamente. Con `private` no podría. ¿Qué nivel de acceso permite el acceso a las hijas?',
            s2: 'Para invocar el constructor de la clase padre se usa una palabra reservada específica.'
          },
          feedback: 'El atributo debe ser visible para las subclases y el constructor hijo debe llamar al del padre.',
          pista: 'protected · super.',
          explicacion: '`protected` da acceso a las subclases y `super(...)` ejecuta el constructor del padre.'
        }
      ]
    },
    // ---------------------------------------------------------------- 3
    {
      id: 'her-3', mundo: 'herencia', numero: 3, esJefe: false,
      titulo: 'Linaje de código',
      historia: 'El árbol se ramifica. Cada hija conserva algo de su madre… y añade algo propio.',
      tiempoObjetivo: 120,
      ejercicios: [
        Object.assign({
          tipo: 'order',
          enunciado: 'Ordena la clase `Androide`: atributo primero y luego el constructor, que debe llamar al padre.',
          feedback: 'La llamada a `super(...)` es siempre la primera instrucción del constructor.',
          pista: 'Dentro del constructor: primero `super(nombre);` y después la asignación propia.',
          explicacion: 'Java exige que `super(...)` sea la primera línea del constructor de la subclase.'
        }, T.ordenar([
          'public class Androide extends IA {',
          '    private int bateria;',
          '    public Androide(String nombre, int bateria) {',
          '        super(nombre);',
          '        this.bateria = bateria;',
          '    }',
          '}'
        ], [5, 7, 3, 1, 6, 2, 4])),
        {
          tipo: 'dragCode',
          enunciado: 'Sobrescribe `saludar()` en la hija reutilizando el saludo del padre.',
          codigo: 'class IA {\n    public String saludar() {\n        return "Sistema en línea";\n    }\n}\n\nclass Androide ___s3___ IA {\n    @___s1___\n    public String saludar() {\n        return ___s2___.saludar() + " (modo androide)";\n    }\n}',
          slots: { s1: ['Override'], s2: ['super'], s3: ['extends'] },
          fragmentos: ['Override', 'super', 'extends', 'this', 'implements'],
          feedbackPorSlot: {
            s1: 'Se necesita la anotación que indica que se sobrescribe un método del padre.',
            s2: 'Con `this.saludar()` el método se llamaría a sí mismo sin parar. ¿Cómo se invoca la versión del padre?',
            s3: 'Para heredar de una clase se usa la palabra clave de la herencia.'
          },
          feedback: 'Sobrescribir + llamar a la versión original del padre + declarar la herencia.',
          pista: 'Override · super · extends.',
          explicacion: '`super.metodo()` ejecuta la versión del padre, permitiendo ampliar su comportamiento en lugar de reemplazarlo.'
        }
      ]
    },
    // ---------------------------------------------------------------- 4
    {
      id: 'her-4', mundo: 'herencia', numero: 4, esJefe: false,
      titulo: 'Herencia en juego',
      historia: 'No todo se hereda igual. Algunas puertas quedan cerradas aunque seas de la familia.',
      tiempoObjetivo: 120,
      ejercicios: [
        {
          tipo: 'multiple',
          enunciado: 'Selecciona **todas** las afirmaciones verdaderas sobre la herencia en Java.',
          opciones: T.opciones(
            'Los miembros `private` del padre no son accesibles directamente desde la hija.',
            'Los constructores se heredan como cualquier otro método.',
            'Los miembros `protected` son accesibles desde las subclases.',
            'Una clase declarada `final` puede ser extendida.'),
          correcta: ['a', 'c'],
          feedback: 'Hay más de una correcta. Revisa qué se hereda y qué no.',
          feedbackPorOpcion: {
            b: 'Los constructores NO se heredan; la hija debe declarar los suyos y llamar a `super(...)`.',
            d: 'Una clase `final` no se puede extender.'
          },
          pista: 'Piensa en niveles de acceso: private cierra la puerta, protected la deja abierta a la familia.',
          explicacion: '`private` no es accesible desde la hija, `protected` sí; los constructores no se heredan y `final` impide extender.'
        },
        {
          tipo: 'dragCode',
          enunciado: 'Completa la jerarquía `Dron` → `DronMilitar`.',
          codigo: 'public class Dron {\n    ___s1___ int bateria;\n\n    public Dron(int bateria) {\n        this.bateria = bateria;\n    }\n\n    public void despegar() {\n        System.out.println("Despegando");\n    }\n}\n\nclass DronMilitar ___s2___ Dron {\n    private int municion;\n\n    public DronMilitar(int bateria, int municion) {\n        ___s3___(bateria);\n        this.municion = municion;\n    }\n\n    ___s4___\n    public void despegar() {\n        ___s5___.despegar();\n        System.out.println("Batería: " + bateria + " Munición: " + municion);\n    }\n}',
          slots: { s1: ['protected'], s2: ['extends'], s3: ['super'], s4: ['@Override'], s5: ['super'] },
          fragmentos: ['protected', 'extends', 'super', '@Override', 'super', 'private', 'implements'],
          feedbackPorSlot: {
            s1: 'La hija lee `bateria` directamente: el atributo debe ser accesible para las subclases.',
            s2: 'Se hereda de una clase, no se implementa.',
            s3: 'Para ejecutar el constructor del padre se usa una palabra reservada.',
            s4: 'La anotación que marca una sobrescritura incluye la arroba.',
            s5: 'Para llamar a la versión del padre del método se usa la misma palabra que en el constructor.'
          },
          feedback: 'Acceso para subclases, herencia, llamada al constructor del padre, anotación y llamada al método del padre.',
          pista: 'protected · extends · super · @Override · super.',
          explicacion: 'La hija reutiliza el constructor y el método del padre con `super`, y amplía el comportamiento.'
        }
      ]
    },
    // ---------------------------------------------------------------- 5 (JEFE)
    {
      id: 'her-5', mundo: 'herencia', numero: 5, esJefe: true,
      titulo: 'JEFE: El árbol cae',
      historia: 'El Ancestro Primordial despierta. Para derribar el árbol debes recorrer su linaje completo.',
      tiempoObjetivo: 180,
      ejercicios: [
        {
          tipo: 'multiple',
          enunciado: 'Dadas `class A {}`, `class B extends A {}` y `class C extends B {}`, ¿cuál afirmación es correcta?',
          opciones: T.opciones(
            '`C` hereda de `B` y, por transitividad, también de `A`.',
            '`C` no puede acceder a nada de `A`.',
            '`C` debe declarar también `extends A`.',
            'Java lo prohíbe porque es herencia múltiple.'),
          correcta: ['a'],
          feedback: 'La herencia es una cadena: lo que recibe B de A, lo recibe C de B.',
          feedbackPorOpcion: {
            b: 'C sí accede a los miembros no privados de A a través de B.',
            c: 'No es necesario ni posible: una clase solo tiene un `extends`.',
            d: 'No es herencia múltiple: es una cadena (multinivel), y Java la permite.'
          },
          pista: 'Herencia multinivel: A → B → C.',
          explicacion: 'Java permite jerarquías de varios niveles; lo que no permite es heredar de varias clases a la vez.'
        },
        {
          tipo: 'dragCode',
          enunciado: 'Completa la jerarquía `Vehiculo` → `Moto`.',
          codigo: 'class Vehiculo {\n    protected String modelo;\n\n    public Vehiculo(String modelo) {\n        this.modelo = modelo;\n    }\n\n    public String info() {\n        return "Modelo: " + modelo;\n    }\n}\n\nclass Moto extends ___s1___ {\n    public Moto(String modelo) {\n        ___s2___(modelo);\n    }\n\n    @___s4___\n    public String info() {\n        return ___s3___.info() + " [2 ruedas]";\n    }\n}',
          slots: { s1: ['Vehiculo'], s2: ['super'], s3: ['super'], s4: ['Override'] },
          fragmentos: ['Vehiculo', 'super', 'super', 'Override', 'Moto', 'this'],
          feedbackPorSlot: {
            s1: '`Moto` debe heredar de la clase que ya define `modelo` e `info()`.',
            s2: 'Llamada al constructor del padre.',
            s3: 'Llamada a la versión del padre del método `info()`.',
            s4: 'Anotación de sobrescritura.'
          },
          feedback: 'Hereda del padre, llama a su constructor, y sobrescribe `info()` apoyándote en la versión original.',
          pista: 'Vehiculo · super · super · Override.',
          explicacion: 'La hija conserva lo del padre (`super`) y le añade algo propio sin duplicar código.'
        },
        Object.assign({
          tipo: 'order',
          enunciado: 'Ordena la clase `Cyborg`, que extiende `Humano` y amplía su método `describir()`.',
          feedback: 'Cabecera, anotación, firma del método, `return` con la llamada al padre y los cierres.',
          pista: 'La anotación `@Override` va justo encima de la firma del método.',
          explicacion: '`@Override` + `super.metodo()` es el patrón habitual para ampliar un comportamiento heredado.'
        }, T.ordenar([
          'public class Cyborg extends Humano {',
          '    @Override',
          '    public String describir() {',
          '        return super.describir() + " con implantes";',
          '    }',
          '}'
        ], [3, 5, 1, 6, 4, 2]))
      ]
    }
  ];
})();
