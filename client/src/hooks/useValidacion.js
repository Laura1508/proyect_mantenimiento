import { useState, useEffect } from 'react';

/**
 * Custom hook for form validation
 * Validates all docente form fields
 */
export const useValidacion = (
  nombre,
  correo,
  telefono,
  titulo,
  areaAcademica,
  dedicacion,
  aniosExperiencia
) => {
  const [errores, setErrores] = useState({});
  const [tocados, setTocados] = useState({});
  const [intentoEnvio, setIntentoEnvio] = useState(false);

  /**
   * Validate all form fields
   */
  const validarCampos = (campos) => {
    const errs = {};

    if (!campos.nombre.trim())
      errs.nombre = 'El nombre completo es obligatorio.';

    if (!campos.correo.trim())
      errs.correo = 'El correo institucional es obligatorio.';
    else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        campos.correo
      )
    )
      errs.correo =
        'Ingresa un correo válido (ej: nombre@universidad.edu.co).';

    if (!campos.telefono.trim())
      errs.telefono = 'El teléfono es obligatorio.';
    else if (!/^\d+$/.test(campos.telefono))
      errs.telefono = 'El teléfono solo debe contener números.';
    else if (
      campos.telefono.length < 7 ||
      campos.telefono.length > 15
    )
      errs.telefono = 'El teléfono debe tener entre 7 y 15 dígitos.';

    if (!campos.titulo.trim())
      errs.titulo = 'El título académico es obligatorio.';

    if (!campos.areaAcademica.trim())
      errs.areaAcademica = 'El área académica es obligatoria.';

    if (!campos.dedicacion.trim())
      errs.dedicacion = 'La dedicación es obligatoria.';

    if (campos.aniosExperiencia === '' || campos.aniosExperiencia === null)
      errs.aniosExperiencia = 'Los años de experiencia son obligatorios.';
    else if (Number(campos.aniosExperiencia) < 0)
      errs.aniosExperiencia =
        'Los años de experiencia no pueden ser negativos.';
    else if (!Number.isInteger(Number(campos.aniosExperiencia)))
      errs.aniosExperiencia = 'Ingresa un número entero de años.';

    return errs;
  };

  // Update errors whenever form fields change
  useEffect(() => {
    const campos = {
      nombre,
      correo,
      telefono,
      titulo,
      areaAcademica,
      dedicacion,
      aniosExperiencia,
    };
    setErrores(validarCampos(campos));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    nombre,
    correo,
    telefono,
    titulo,
    areaAcademica,
    dedicacion,
    aniosExperiencia,
  ]);

  const marcarTocado = (campo) =>
    setTocados((prev) => ({ ...prev, [campo]: true }));

  const mostrarError = (campo) =>
    (tocados[campo] || intentoEnvio) && errores[campo];

  const claseCampo = (campo) => {
    if (!tocados[campo] && !intentoEnvio) return 'campo';
    if (errores[campo]) return 'campo campo--error';
    return 'campo campo--ok';
  };

  const hayErrores = Object.keys(errores).length > 0;

  const marcarTodosComoCambiados = () => {
    setTocados({
      nombre: true,
      correo: true,
      telefono: true,
      titulo: true,
      areaAcademica: true,
      dedicacion: true,
      aniosExperiencia: true,
    });
    setIntentoEnvio(true);
  };

  const limpiarValidacion = () => {
    setErrores({});
    setTocados({});
    setIntentoEnvio(false);
  };

  return {
    errores,
    tocados,
    intentoEnvio,
    marcarTocado,
    mostrarError,
    claseCampo,
    hayErrores,
    marcarTodosComoCambiados,
    limpiarValidacion,
    validarCampos,
  };
};
