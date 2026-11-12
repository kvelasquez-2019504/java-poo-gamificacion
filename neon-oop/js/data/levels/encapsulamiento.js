/* ==========================================================
   encapsulamiento.js — Mundo 2: ENCAPSULAMIENTO · "La Bóveda Cifrada"
   ========================================================== */
(function () {
  const T = NEON.levelTools;

  NEON.levels.encapsulamiento = [
    // ---------------------------------------------------------------- 1
    {
      id: 'enc-1', mundo: 'encapsulamiento', numero: 1, esJefe: false,
      titulo: 'Llave maestra',
      historia: 'Frente a ti, la puerta de la bóveda: ni una sola cerradura visible. Aquí los datos no se tocan, se solicitan.',
      tiempoObjetivo: 60,
      ejercicios: [
        {
          tipo: 'multiple',
          enunciado: '¿Cuál es el objetivo principal del **encapsulamiento**?',
          opciones: T.opciones(
            'Permitir que cualquier clase modifique los atributos libremente.',
            'Proteger el estado interno de un objeto y controlar cómo se accede a él.',
            'Crear objetos sin necesidad de constructor.',
            'Heredar atributos de otra clase.'),
          correcta: ['b'],
          feedback: 'La palabra clave es *controlar*: quién puede leer o cambiar los datos.',
          feedbackPorOpcion: {
            a: 'Eso es justo lo que el encapsulamiento evita.',
            c: 'Los constructores no tienen relación directa con proteger el estado.',
            d: 'Heredar atributos es herencia, otro pilar.'
          },
          pista: 'Piensa en una caja fuerte: los datos están dentro y solo se abren por puertas autorizadas.',
          explicacion: 'Encapsular es ocultar el estado interno (atributos privados) y exponer solo operaciones controladas.'
        },
        {
          tipo: 'dragCode',
          enunciado: 'Protege el saldo de la cuenta y expón su lectura de forma controlada.',
          codigo: 'public class CuentaCorporativa {\n    ___s1___ double saldo;\n\n    public double ___s2___() {\n        return saldo;\n    }\n}',
          slots: { s1: ['private'], s2: ['getSaldo'] },
          fragmentos: ['private', 'public', 'getSaldo', 'setSaldo'],
          feedbackPorSlot: {
            s1: 'Si el atributo es visible para todos, cualquiera puede alterar el saldo. Usa el nivel de acceso más restrictivo.',
            s2: 'Este método solo lee el valor y lo devuelve. ¿Cómo se llama por convención un método que *obtiene* un dato?'
          },
          feedback: 'Atributo oculto + método público para leerlo: ese es el patrón básico.',
          pista: 'Atributo `private`; el método de lectura sigue la convención `get` + NombreDelAtributo.',
          explicacion: 'Un atributo `private` con un getter público permite leer el dato sin dejar que otras clases lo modifiquen.'
        }
      ]
    },
    // ---------------------------------------------------------------- 2
    {
      id: 'enc-2', mundo: 'encapsulamiento', numero: 2, esJefe: false,
      titulo: 'La puerta correcta',
      historia: 'Detrás de cada dato hay una puerta autorizada. Aprende a reconocer la forma correcta de abrirla.',
      tiempoObjetivo: 60,
      ejercicios: [
        {
          tipo: 'multiple',
          enunciado: 'El atributo es `private String alias;`. ¿Cuál es un **setter** correcto?',
          opciones: T.opciones(
            '`public void setAlias(String alias) { this.alias = alias; }`',
            '`public String setAlias() { return alias; }`',
            '`private void setAlias(String a) { alias = a; }`',
            '`public void getAlias(String alias) { this.alias = alias; }`'),
          correcta: ['a'],
          feedback: 'Un setter es público, no devuelve nada y recibe el nuevo valor.',
          feedbackPorOpcion: {
            b: 'Ese método devuelve un valor y no recibe parámetros: se parece a un getter, no a un setter.',
            c: 'Si el setter es `private`, nadie fuera de la clase puede usarlo.',
            d: 'Asigna el valor, pero su nombre (`get…`) engaña: rompe la convención.'
          },
          pista: 'Busca: `public`, retorno `void`, nombre `set…` y un parámetro que se asigna con `this`.',
          explicacion: 'Un setter público y con la convención `setX` es la puerta autorizada para modificar un atributo privado.'
        },
        {
          tipo: 'dragCode',
          enunciado: 'El setter debe validar el rango de energía. Completa la clase.',
          codigo: 'public class Hacker {\n    private int energia;\n\n    public void setEnergia(int energia) {\n        if (energia >= 0 && energia <= 100) {\n            ___s1___.energia = energia;\n        }\n    }\n\n    public ___s2___ getEnergia() {\n        return energia;\n    }\n}',
          slots: { s1: ['this'], s2: ['int'] },
          fragmentos: ['this', 'super', 'int', 'void'],
          feedbackPorSlot: {
            s1: 'Parámetro y atributo se llaman igual. ¿Qué palabra distingue al atributo del objeto actual?',
            s2: 'El getter debe devolver el mismo tipo que el atributo que retorna.'
          },
          feedback: 'Dentro del setter hay que referirse al atributo de ESTE objeto; y el getter devuelve el tipo del atributo.',
          pista: '`this` apunta al objeto actual. El atributo `energia` es de tipo `int`.',
          explicacion: 'El setter valida antes de asignar; así el objeto nunca queda en un estado inválido.'
        }
      ]
    },
    // ---------------------------------------------------------------- 3
    {
      id: 'enc-3', mundo: 'encapsulamiento', numero: 3, esJefe: false,
      titulo: 'Saldo blindado',
      historia: 'La cuenta corporativa rechaza cualquier valor sospechoso. Descubre cómo logra mantenerse íntegra.',
      tiempoObjetivo: 120,
      ejercicios: [
        Object.assign({
          tipo: 'order',
          enunciado: 'Ordena el setter `setSaldo`: valida primero y asigna al final.',
          feedback: 'Primero se rechaza el valor inválido (con `return`); solo si es válido se llega a la asignación.',
          pista: 'El `return` va dentro del `if`, después del mensaje; la asignación queda fuera del `if`.',
          explicacion: 'Validar antes de asignar garantiza que el atributo nunca tome un valor inválido.'
        }, T.ordenar([
          'public void setSaldo(double saldo) {',
          '    if (saldo < 0) {',
          '        System.out.println("Saldo inválido");',
          '        return;',
          '    }',
          '    this.saldo = saldo;',
          '}'
        ], [6, 3, 7, 1, 5, 4, 2])),
        {
          tipo: 'dragCode',
          enunciado: 'El identificador de la cuenta no debe cambiar jamás una vez creada.',
          codigo: 'public class CuentaCorporativa {\n    private ___s1___ String id;\n    private double saldo;\n\n    public CuentaCorporativa(String id, double saldoInicial) {\n        ___s2___.id = id;\n        this.saldo = saldoInicial;\n    }\n\n    public String getId() {\n        ___s3___ id;\n    }\n}',
          slots: { s1: ['final'], s2: ['this'], s3: ['return'] },
          fragmentos: ['final', 'static', 'this', 'return', 'void'],
          feedbackPorSlot: {
            s1: 'Se necesita un modificador que impida reasignar el atributo después de inicializarlo.',
            s2: 'El parámetro `id` oculta al atributo `id`. ¿Cómo se accede al atributo del objeto?',
            s3: 'Un getter debe entregar el valor al que lo llama.'
          },
          feedback: 'Un atributo que nunca cambia + constructor que lo inicializa + getter que lo devuelve.',
          pista: 'final · this · return.',
          explicacion: 'Un atributo `final` se asigna una sola vez (en el constructor) y no necesita setter.'
        }
      ]
    },
    // ---------------------------------------------------------------- 4
    {
      id: 'enc-4', mundo: 'encapsulamiento', numero: 4, esJefe: false,
      titulo: 'Implante sellado',
      historia: 'Un implante neural cifra su propio estado. Si logras entender por qué es seguro, podrás abrir la cámara siguiente.',
      tiempoObjetivo: 120,
      ejercicios: [
        {
          tipo: 'multiple',
          enunciado: 'Selecciona **todas** las ventajas reales del encapsulamiento.',
          opciones: T.opciones(
            'Permite validar los datos antes de modificarlos.',
            'Obliga a que todos los atributos sean `public`.',
            'Permite cambiar la implementación interna sin romper el código que usa la clase.',
            'Hace que los atributos se lean más rápido en memoria.'),
          correcta: ['a', 'c'],
          feedback: 'Hay más de una correcta. Descarta lo que contradice la idea de "ocultar".',
          feedbackPorOpcion: {
            b: 'Es lo contrario: el encapsulamiento recomienda atributos `private`.',
            d: 'No es una cuestión de rendimiento, sino de diseño y seguridad.'
          },
          pista: 'Las ventajas son de mantenimiento y seguridad: validación y libertad para cambiar por dentro.',
          explicacion: 'Al exponer solo métodos, la clase puede validar entradas y cambiar su estructura interna sin afectar a quienes la usan.'
        },
        {
          tipo: 'dragCode',
          enunciado: 'El constructor reutiliza la validación del setter. Completa la clase.',
          codigo: 'public class ImplanteNeural {\n    private int nivel;\n    private ___s1___ String serie;\n\n    public ImplanteNeural(String serie, int nivel) {\n        this.serie = serie;\n        this.___s2___(nivel);\n    }\n\n    public void ___s3___(int nivel) {\n        if (nivel >= 1 && nivel <= 10) {\n            this.nivel = nivel;\n        } ___s4___ {\n            this.nivel = 1;\n        }\n    }\n\n    public int getNivel() {\n        ___s5___ nivel;\n    }\n}',
          slots: { s1: ['final'], s2: ['setNivel'], s3: ['setNivel'], s4: ['else'], s5: ['return'] },
          fragmentos: ['final', 'setNivel', 'setNivel', 'else', 'return', 'static', 'getNivel'],
          feedbackPorSlot: {
            s1: 'El número de serie no debe poder reasignarse nunca.',
            s2: 'El constructor debe llamar al método que valida y asigna el nivel.',
            s3: 'Este método valida y asigna el nivel: sigue la convención `set…`.',
            s4: 'Si la condición no se cumple, se toma la rama alternativa.',
            s5: 'El getter debe entregar el valor.'
          },
          feedback: 'Atributo inmutable, constructor que reutiliza el setter y un getter que devuelve el valor.',
          pista: 'Hay dos huecos con el mismo nombre de método (el setter) y uno con `else`.',
          explicacion: 'Reutilizar el setter en el constructor evita duplicar la lógica de validación.'
        }
      ]
    },
    // ---------------------------------------------------------------- 5 (JEFE)
    {
      id: 'enc-5', mundo: 'encapsulamiento', numero: 5, esJefe: true,
      titulo: 'JEFE: Bóveda OMNICORE',
      historia: 'El Guardián de la Bóveda custodia el último código. Solo se abre a quien respeta cada puerta de acceso.',
      tiempoObjetivo: 180,
      ejercicios: [
        {
          tipo: 'multiple',
          enunciado: 'Otra clase necesita **leer** el valor de `private int pin`. ¿Cuál es la solución que respeta el encapsulamiento?',
          opciones: T.opciones(
            'Cambiar el atributo a `public`.',
            'Añadir un método público de acceso (getter) que devuelva el valor.',
            'Quitar `private` y no poner ningún modificador.',
            'Duplicar el atributo en la otra clase.'),
          correcta: ['b'],
          feedback: 'Se trata de dar acceso *controlado*, no acceso libre.',
          feedbackPorOpcion: {
            a: 'Con `public` cualquiera puede leer Y modificar el atributo.',
            c: 'Sin modificador el atributo sería visible para todo el paquete: sigue sin ser controlado.',
            d: 'Duplicar datos genera inconsistencias y no soluciona nada.'
          },
          pista: 'El atributo se queda `private`; lo que se añade es un método.',
          explicacion: 'Un getter público mantiene el atributo protegido y ofrece una vía controlada de lectura.'
        },
        {
          tipo: 'dragCode',
          enunciado: 'Completa la bóveda: el código es secreto y los intentos fallidos se cuentan.',
          codigo: 'public class Boveda {\n    ___s1___ int codigo;\n    private int intentos;\n\n    public Boveda(int codigo) {\n        this.codigo = codigo;\n    }\n\n    public boolean abrir(int intento) {\n        if (intento ___s2___ codigo) {\n            return true;\n        }\n        intentos___s3___;\n        return false;\n    }\n\n    public int ___s4___() {\n        return intentos;\n    }\n}',
          slots: { s1: ['private'], s2: ['=='], s3: ['++'], s4: ['getIntentos'] },
          fragmentos: ['private', '==', '++', 'getIntentos', 'public', '='],
          feedbackPorSlot: {
            s1: 'El código secreto jamás debe ser visible desde fuera.',
            s2: 'Se debe *comparar* dos valores, no asignar uno.',
            s3: 'Tras un fallo hay que aumentar el contador en uno.',
            s4: 'Getter del atributo `intentos`, siguiendo la convención.'
          },
          feedback: 'Secreto oculto, comparación (no asignación), contador incrementado y getter con nombre estándar.',
          pista: 'private · == · ++ · getIntentos.',
          explicacion: 'El código es privado y solo se puede probar a través de `abrir`; el contador se expone en modo solo lectura.'
        },
        Object.assign({
          tipo: 'order',
          enunciado: 'Ordena la clase `Hacker` con su atributo privado y su getter (atributo primero, luego el método).',
          feedback: 'Cabecera de clase, atributo, firma del getter, su `return` y los cierres de llave.',
          pista: 'El `return` va dentro del método, antes de su llave de cierre.',
          explicacion: 'Un atributo privado y un getter público son la unidad básica del encapsulamiento.'
        }, T.ordenar([
          'public class Hacker {',
          '    private String alias;',
          '    public String getAlias() {',
          '        return alias;',
          '    }',
          '}'
        ], [4, 2, 6, 1, 5, 3]))
      ]
    }
  ];
})();
