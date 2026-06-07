// API service for docentes endpoints
const API_BASE_URL = 'http://localhost:3001';

/**
 * Fetch all docentes with optional filters and pagination
 * @param {Object} params - Query parameters
 * @returns {Promise<Object>} Response with docentes and pagination info
 */
export const fetchDocentes = async (params = {}) => {
  const queryString = new URLSearchParams(params).toString();
  const response = await fetch(`${API_BASE_URL}/docentes${queryString ? '?' + queryString : ''}`);
  if (!response.ok) throw new Error('Error fetching docentes');
  return await response.json();
};

/**
 * Fetch a single docente by ID
 * @param {number} id - Docente ID
 * @returns {Promise<Object>} Docente data
 */
export const fetchDocenteById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/docentes/${id}`);
  if (!response.ok) throw new Error('Error fetching docente');
  return await response.json();
};

/**
 * Create a new docente
 * @param {Object} docenteData - Docente data
 * @returns {Promise<Object>} Created docente
 */
export const createDocente = async (docenteData) => {
  const response = await fetch(`${API_BASE_URL}/docentes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(docenteData),
  });
  if (!response.ok) throw new Error('Error creating docente');
  return await response.json();
};

/**
 * Update an existing docente
 * @param {number} id - Docente ID
 * @param {Object} docenteData - Updated docente data
 * @returns {Promise<Object>} Response message
 */
export const updateDocente = async (id, docenteData) => {
  const response = await fetch(`${API_BASE_URL}/docentes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(docenteData),
  });
  if (!response.ok) throw new Error('Error updating docente');
  return await response.json();
};

/**
 * Delete a docente
 * @param {number} id - Docente ID
 * @returns {Promise<Object>} Response message
 */
export const deleteDocente = async (id) => {
  const response = await fetch(`${API_BASE_URL}/docentes/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Error deleting docente');
  return await response.json();
};
