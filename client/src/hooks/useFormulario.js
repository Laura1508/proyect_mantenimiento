import { useState } from 'react';

/**
 * Custom hook for managing form state
 */
export const useFormulario = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [titulo, setTitulo] = useState('');
  const [areaAcademica, setAreaAcademica] = useState('');
  const [dedicacion, setDedicacion] = useState('');
  const [aniosExperiencia, setAniosExperiencia] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  /**
   * Load docente data into form for editing
   */
  const cargarEnFormulario = (docente) => {
    setNombre(docente.nombre);
    setCorreo(docente.correo);
    setTelefono(docente.telefono || '');
    setTitulo(docente.titulo);
    setAreaAcademica(docente.area_academica);
    setDedicacion(docente.dedicacion);
    setAniosExperiencia(docente.anios_experiencia);
  };

  /**
   * Clear form and reset edit state
   */
  const limpiarFormulario = () => {
    setNombre('');
    setCorreo('');
    setTelefono('');
    setTitulo('');
    setAreaAcademica('');
    setDedicacion('');
    setAniosExperiencia('');
    setEditIndex(null);
  };

  /**
   * Get form data as object for API calls
   */
  const obtenerDatos = () => ({
    nombre,
    correo,
    telefono,
    titulo,
    area_academica: areaAcademica,
    dedicacion,
    anios_experiencia: aniosExperiencia,
  });

  return {
    nombre,
    setNombre,
    correo,
    setCorreo,
    telefono,
    setTelefono,
    titulo,
    setTitulo,
    areaAcademica,
    setAreaAcademica,
    dedicacion,
    setDedicacion,
    aniosExperiencia,
    setAniosExperiencia,
    editIndex,
    setEditIndex,
    cargarEnFormulario,
    limpiarFormulario,
    obtenerDatos,
  };
};
