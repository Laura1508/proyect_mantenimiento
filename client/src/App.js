import React from 'react';
import './App.css';
import Toast from './components/Toast/Toast';
import ModalConfirmar from './components/ModalConfirmar/ModalConfirmar';
import FormularioDocentes from './components/FormularioDocentes/FormularioDocentes';
import TablaDocentes from './components/TablaDocentes/TablaDocentes';
import { useValidacion } from './hooks/useValidacion';
import { useToasts } from './hooks/useToasts';
import { useFormulario } from './hooks/useFormulario';
import { useDocentes } from './hooks/useDocentes';

function App() {
  // Custom hooks for state management
  const { toasts, mostrarToast, cerrarToast } = useToasts();
  const formulario = useFormulario();
  const validacion = useValidacion(
    formulario.nombre,
    formulario.correo,
    formulario.telefono,
    formulario.titulo,
    formulario.areaAcademica,
    formulario.dedicacion,
    formulario.aniosExperiencia
  );
  const docentes = useDocentes(mostrarToast);

  /**
   * Handle form submission (create or update)
   */
  const registrarDatos = async (e) => {
    e.preventDefault();
    validacion.marcarTodosComoCambiados();

    if (validacion.hayErrores) return;

    const payload = formulario.obtenerDatos();

    if (formulario.editIndex !== null) {
      // Update mode
      const docente = docentes.registros[formulario.editIndex];
      const success = await docentes.actualizarDocente(docente.id, payload);
      if (success) {
        formulario.setEditIndex(null);
        formulario.limpiarFormulario();
        validacion.limpiarValidacion();
      }
    } else {
      // Create mode
      const success = await docentes.crearDocente(payload);
      if (success) {
        formulario.limpiarFormulario();
        validacion.limpiarValidacion();
      }
    }
  };

  /**
   * Load docente data into form for editing
   */
  const editarRegistro = (idx) => {
    const reg = docentes.registros[idx];
    formulario.cargarEnFormulario(reg);
    formulario.setEditIndex(idx);
    validacion.limpiarValidacion();
  };

  return (
    <div className="container">
      {/* Toast notifications */}
      <Toast toasts={toasts} onClose={cerrarToast} />

      {/* Deletion confirmation modal */}
      <ModalConfirmar
        docente={docentes.docenteAEliminar?.docente}
        onConfirmar={docentes.confirmarEliminar}
        onCancelar={docentes.cancelarEliminar}
      />

      <div className="titulo">
        <h1>Gestión de docentes universitarios</h1>
        <p>Registro de profesores: datos académicos y de contacto</p>
      </div>

      {validacion.intentoEnvio && validacion.hayErrores && (
        <div className="alerta-error" role="alert">
          ⚠️ Hay {Object.keys(validacion.errores).length} campo(s) con errores.
          Por favor corrígelos antes de continuar.
        </div>
      )}

      <FormularioDocentes
        validacion={validacion}
        formulario={formulario}
        onSubmit={registrarDatos}
        isEditing={formulario.editIndex !== null}
      />

      <TablaDocentes
        registros={docentes.registros}
        onEditar={editarRegistro}
        onEliminar={(idx, reg) => docentes.solicitarEliminar(idx, reg)}
      />
    </div>
  );
}

export default App;