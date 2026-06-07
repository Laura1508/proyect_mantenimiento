import React from 'react';

/**
 * Toast component for displaying floating notifications
 * @param {Array} toasts - Array of toast objects with { id, mensaje, tipo }
 * @param {Function} onClose - Callback to close a toast by ID
 */
function Toast({ toasts, onClose }) {
  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map((t) => (
        <div key={t.id} className={`toast toast--${t.tipo}`} role="alert">
          <span className="toast-icono">
            {t.tipo === 'exito' ? '✅' : '❌'}
          </span>
          <span className="toast-msg">{t.mensaje}</span>
          <button
            className="toast-cerrar"
            onClick={() => onClose(t.id)}
            aria-label="Cerrar"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}

export default Toast;
