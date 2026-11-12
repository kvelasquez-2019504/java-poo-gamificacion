/* ==========================================================
   storage.js — capa de acceso a localStorage
   - Todo va dentro de try/catch (modo privado, cuota, bloqueo…).
   - Si localStorage no existe, se usa memoria temporal.
   - Cada valor se guarda como { version, datos } para migraciones futuras.
   ========================================================== */
NEON.storage = (function () {
  const memoria = {};             // respaldo si localStorage no está disponible
  let disponible = true;

  try {
    const prueba = NEON.config.PREFIJO + '__prueba';
    localStorage.setItem(prueba, '1');
    localStorage.removeItem(prueba);
  } catch (e) {
    disponible = false;
  }

  function clave(nombre) { return NEON.config.PREFIJO + nombre; }

  /** Lee un valor; devuelve `defecto` si no existe, está corrupto o es de otra versión. */
  function leer(nombre, defecto) {
    try {
      const crudo = disponible ? localStorage.getItem(clave(nombre)) : memoria[nombre];
      if (crudo == null) return defecto;
      const obj = JSON.parse(crudo);
      // Aquí se añadirían migraciones cuando exista una VERSION > 1.
      return obj && obj.version === NEON.config.VERSION ? obj.datos : defecto;
    } catch (e) {
      return defecto;
    }
  }

  /** Guarda un valor; devuelve true si se pudo guardar. */
  function escribir(nombre, datos) {
    const crudo = JSON.stringify({ version: NEON.config.VERSION, datos: datos });
    try {
      if (disponible) localStorage.setItem(clave(nombre), crudo);
      else memoria[nombre] = crudo;
      return true;
    } catch (e) {
      memoria[nombre] = crudo;
      return false;
    }
  }

  function borrar(nombre) {
    try {
      if (disponible) localStorage.removeItem(clave(nombre));
    } catch (e) { /* sin acceso: nada que borrar */ }
    delete memoria[nombre];
  }

  return { leer, escribir, borrar, get persistente() { return disponible; } };
})();
