import React from 'react';

/**
 * TablaDocentes component - Displays docentes in a table format
 * @param {Array} registros - Array of docentes objects
 * @param {Function} onEditar - Callback when edit button is clicked (receives index)
 * @param {Function} onEliminar - Callback when delete button is clicked (receives index and docente)
 */
function TablaDocentes({ registros, onEditar, onEliminar }) {
  return (
    <div className="tabla-container">
      <table className="tabla">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Título</th>
            <th>Área académica</th>
            <th>Dedicación</th>
            <th>Años doc.</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {registros.length === 0 ? (
            <tr>
              <td colSpan="8" className="tabla-vacia">
                No hay docentes registrados.
              </td>
            </tr>
          ) : (
            registros.map((reg, idx) => (
              <tr key={reg.id ?? idx}>
                <td>{reg.nombre}</td>
                <td>{reg.correo}</td>
                <td>{reg.telefono}</td>
                <td>{reg.titulo}</td>
                <td>{reg.area_academica}</td>
                <td>{reg.dedicacion}</td>
                <td>{reg.anios_experiencia}</td>
                <td>
                  <button
                    className="btn-editar"
                    onClick={() => onEditar(idx)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn-eliminar"
                    onClick={() => onEliminar(idx, reg)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TablaDocentes;
