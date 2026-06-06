import React from 'react';

/**
 * FormularioDocentes component - Renders the form for creating/editing docentes
 * @param {Object} validacion - Validation state and methods from useValidacion
 * @param {Object} formulario - Form state and methods from useFormulario
 * @param {Function} onSubmit - Callback when form is submitted
 * @param {boolean} isEditing - Whether in edit mode
 */
function FormularioDocentes({ validacion, formulario, onSubmit, isEditing }) {
  return (
    <form className="formulario" onSubmit={onSubmit} noValidate>
      <div className="grid-formulario">
        {/* Nombre field */}
        <div className={validacion.claseCampo('nombre')}>
          <label>
            Nombre completo: <span className="campo-requerido">*</span>
          </label>
          <input
            className={`input${
              validacion.mostrarError('nombre')
                ? ' input--error'
                : validacion.tocados['nombre'] && !validacion.errores['nombre']
                ? ' input--ok'
                : ''
            }`}
            type="text"
            placeholder="Ej. María Fernanda López"
            value={formulario.nombre}
            onChange={(e) => formulario.setNombre(e.target.value)}
            onBlur={() => validacion.marcarTocado('nombre')}
          />
          {validacion.mostrarError('nombre') && (
            <span className="mensaje-error">{validacion.errores.nombre}</span>
          )}
        </div>

        {/* Correo field */}
        <div className={validacion.claseCampo('correo')}>
          <label>
            Correo institucional: <span className="campo-requerido">*</span>
          </label>
          <input
            className={`input${
              validacion.mostrarError('correo')
                ? ' input--error'
                : validacion.tocados['correo'] && !validacion.errores['correo']
                ? ' input--ok'
                : ''
            }`}
            type="email"
            placeholder="nombre@universidad.edu.co"
            value={formulario.correo}
            onChange={(e) => formulario.setCorreo(e.target.value)}
            onBlur={() => validacion.marcarTocado('correo')}
          />
          {validacion.mostrarError('correo') && (
            <span className="mensaje-error">{validacion.errores.correo}</span>
          )}
        </div>

        {/* Teléfono field */}
        <div className={validacion.claseCampo('telefono')}>
          <label>
            Teléfono: <span className="campo-requerido">*</span>
          </label>
          <input
            className={`input${
              validacion.mostrarError('telefono')
                ? ' input--error'
                : validacion.tocados['telefono'] &&
                  !validacion.errores['telefono']
                ? ' input--ok'
                : ''
            }`}
            type="text"
            inputMode="numeric"
            placeholder="Ej. 3001234567"
            value={formulario.telefono}
            maxLength={15}
            onChange={(e) =>
              formulario.setTelefono(e.target.value.replace(/\D/g, ''))
            }
            onBlur={() => validacion.marcarTocado('telefono')}
          />
          <span className="campo-hint">Solo se permiten números.</span>
          {validacion.mostrarError('telefono') && (
            <span className="mensaje-error">
              {validacion.errores.telefono}
            </span>
          )}
        </div>

        {/* Título field */}
        <div className={validacion.claseCampo('titulo')}>
          <label>
            Título académico máximo: <span className="campo-requerido">*</span>
          </label>
          <input
            className={`input${
              validacion.mostrarError('titulo')
                ? ' input--error'
                : validacion.tocados['titulo'] &&
                  !validacion.errores['titulo']
                ? ' input--ok'
                : ''
            }`}
            type="text"
            placeholder="Ej. Doctorado, Maestría"
            value={formulario.titulo}
            onChange={(e) => formulario.setTitulo(e.target.value)}
            onBlur={() => validacion.marcarTocado('titulo')}
          />
          {validacion.mostrarError('titulo') && (
            <span className="mensaje-error">{validacion.errores.titulo}</span>
          )}
        </div>

        {/* Área académica field */}
        <div className={validacion.claseCampo('areaAcademica')}>
          <label>
            Área o programa académico:{' '}
            <span className="campo-requerido">*</span>
          </label>
          <input
            className={`input${
              validacion.mostrarError('areaAcademica')
                ? ' input--error'
                : validacion.tocados['areaAcademica'] &&
                  !validacion.errores['areaAcademica']
                ? ' input--ok'
                : ''
            }`}
            type="text"
            placeholder="Ej. Ingeniería de Software"
            value={formulario.areaAcademica}
            onChange={(e) => formulario.setAreaAcademica(e.target.value)}
            onBlur={() => validacion.marcarTocado('areaAcademica')}
          />
          {validacion.mostrarError('areaAcademica') && (
            <span className="mensaje-error">
              {validacion.errores.areaAcademica}
            </span>
          )}
        </div>

        {/* Dedicación field */}
        <div className={validacion.claseCampo('dedicacion')}>
          <label>
            Dedicación: <span className="campo-requerido">*</span>
          </label>
          <input
            className={`input${
              validacion.mostrarError('dedicacion')
                ? ' input--error'
                : validacion.tocados['dedicacion'] &&
                  !validacion.errores['dedicacion']
                ? ' input--ok'
                : ''
            }`}
            type="text"
            placeholder="Tiempo completo, medio tiempo..."
            value={formulario.dedicacion}
            onChange={(e) => formulario.setDedicacion(e.target.value)}
            onBlur={() => validacion.marcarTocado('dedicacion')}
          />
          {validacion.mostrarError('dedicacion') && (
            <span className="mensaje-error">
              {validacion.errores.dedicacion}
            </span>
          )}
        </div>

        {/* Años de experiencia field */}
        <div className={validacion.claseCampo('aniosExperiencia')}>
          <label>
            Años de experiencia docente:{' '}
            <span className="campo-requerido">*</span>
          </label>
          <input
            className={`input${
              validacion.mostrarError('aniosExperiencia')
                ? ' input--error'
                : validacion.tocados['aniosExperiencia'] &&
                  !validacion.errores['aniosExperiencia']
                ? ' input--ok'
                : ''
            }`}
            type="number"
            min="0"
            placeholder="Ej. 5"
            value={formulario.aniosExperiencia}
            style={{ maxWidth: '160px' }}
            onChange={(e) => formulario.setAniosExperiencia(e.target.value)}
            onBlur={() => validacion.marcarTocado('aniosExperiencia')}
          />
          <span className="campo-hint">No puede ser un valor negativo.</span>
          {validacion.mostrarError('aniosExperiencia') && (
            <span className="mensaje-error">
              {validacion.errores.aniosExperiencia}
            </span>
          )}
        </div>
      </div>

      <p className="leyenda-requeridos">
        <span className="campo-requerido">*</span> Campos obligatorios
      </p>

      <button
        className="btn-registrar"
        type="submit"
        disabled={validacion.intentoEnvio && validacion.hayErrores}
        title={
          validacion.intentoEnvio && validacion.hayErrores
            ? 'Corrige los errores para poder guardar'
            : ''
        }
      >
        {isEditing ? 'Actualizar' : 'Registrar'}
      </button>
    </form>
  );
}

export default FormularioDocentes;
