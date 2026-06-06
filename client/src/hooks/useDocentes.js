import { useState, useEffect } from 'react';
import * as docentesService from '../services/docentesService';

/**
 * Custom hook for managing docentes data and operations
 */
export const useDocentes = (mostrarToast) => {
  const [registros, setRegistros] = useState([]);
  const [docenteAEliminar, setDocenteAEliminar] = useState(null);

  /**
   * Load docentes from server
   */
  const cargarDocentes = async () => {
    try {
      const data = await docentesService.fetchDocentes();
      setRegistros(Array.isArray(data) ? data : data.docentes ?? []);
    } catch (error) {
      console.error(error);
      mostrarToast(
        'Error al cargar los docentes. Verifique la conexión con el servidor.',
        'error'
      );
    }
  };

  // Load docentes on component mount
  useEffect(() => {
    cargarDocentes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Create a new docente
   */
  const crearDocente = async (payload) => {
    try {
      await docentesService.createDocente(payload);
      await cargarDocentes();
      mostrarToast('Docente registrado correctamente.');
      return true;
    } catch (error) {
      console.error(error);
      mostrarToast(
        'Error al registrar el docente. Intente nuevamente.',
        'error'
      );
      return false;
    }
  };

  /**
   * Update an existing docente
   */
  const actualizarDocente = async (docenteId, payload) => {
    try {
      await docentesService.updateDocente(docenteId, payload);
      await cargarDocentes();
      mostrarToast('Docente actualizado correctamente.');
      return true;
    } catch (error) {
      console.error(error);
      mostrarToast(
        'Error al actualizar el docente. Intente nuevamente.',
        'error'
      );
      return false;
    }
  };

  /**
   * Delete a docente
   */
  const eliminarDocente = async (docenteId) => {
    try {
      await docentesService.deleteDocente(docenteId);
      await cargarDocentes();
      mostrarToast('Docente eliminado correctamente.');
      return true;
    } catch (error) {
      console.error(error);
      mostrarToast(
        'Error al eliminar el docente. Intente nuevamente.',
        'error'
      );
      return false;
    }
  };

  /**
   * Request confirmation to delete a docente
   */
  const solicitarEliminar = (idx, docente) => {
    setDocenteAEliminar({ idx, docente });
  };

  /**
   * Cancel deletion request
   */
  const cancelarEliminar = () => {
    setDocenteAEliminar(null);
  };

  /**
   * Confirm and execute deletion
   */
  const confirmarEliminar = async () => {
    if (!docenteAEliminar) return false;
    const { docente } = docenteAEliminar;
    setDocenteAEliminar(null);
    return await eliminarDocente(docente.id);
  };

  return {
    registros,
    docenteAEliminar,
    cargarDocentes,
    crearDocente,
    actualizarDocente,
    eliminarDocente,
    solicitarEliminar,
    cancelarEliminar,
    confirmarEliminar,
  };
};
