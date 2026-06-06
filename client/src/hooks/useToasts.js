import { useState } from 'react';
import { generateId } from '../utils/idGenerator';

/**
 * Custom hook for managing toast notifications
 */
export const useToasts = () => {
  const [toasts, setToasts] = useState([]);

  /**
   * Show a toast notification
   * @param {string} mensaje - Toast message
   * @param {string} tipo - Toast type: 'exito' or 'error' (default: 'exito')
   */
  const mostrarToast = (mensaje, tipo = 'exito') => {
    const id = generateId();
    setToasts((prev) => [...prev, { id, mensaje, tipo }]);
    // Auto-close after 4.5 seconds
    setTimeout(() => cerrarToast(id), 4500);
  };

  /**
   * Close a specific toast
   * @param {number} id - Toast ID
   */
  const cerrarToast = (id) =>
    setToasts((prev) => prev.filter((t) => t.id !== id));

  return {
    toasts,
    mostrarToast,
    cerrarToast,
  };
};
