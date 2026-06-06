import React from 'react';

/**
 * Modal component for confirming docente deletion
 * @param {Object} docente - Docente object with id, nombre
 * @param {Function} onConfirmar - Callback for confirm button
 * @param {Function} onCancelar - Callback for cancel button
 */
function ModalConfirmar({ docente, onConfirmar, onCancelar }) {
  if (!docente) return null;

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-titulo"
    >
      <div className="modal">
        <div className="modal-icono">🗑️</div>
        <h2 id="modal-titulo" className="modal-titulo">
          Confirmar eliminación
        </h2>
        <p className="modal-cuerpo">
          ¿Está seguro que desea eliminar al docente{' '}
          <strong>{docente.nombre}</strong>?
          <br />
          <span className="modal-advertencia">
            Esta acción no se puede deshacer.
          </span>
        </p>
        <div className="modal-acciones">
          <button className="btn-modal-cancelar" onClick={onCancelar}>
            Cancelar
          </button>
          <button className="btn-modal-eliminar" onClick={onConfirmar}>
            Sí, eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalConfirmar;
