# Sistema de Gestión de Docentes

## Introducción

Este proyecto consiste en un aplicativo web sencillo para la gestión de docentes, permitiendo realizar operaciones básicas como agregar, actualizar, consultar y eliminar registros de docentes de manera rápida y eficiente.

La aplicación fue desarrollada utilizando tecnologías modernas como:

- **React** para el desarrollo del frontend.
- **Node.js** y **Express** para la lógica del backend y la creación de servicios API.
- **MySQL Workbench** como sistema de gestión de base de datos.

El objetivo principal del sistema es facilitar la administración de la información académica mediante una interfaz intuitiva y funcionalidades prácticas para el usuario.


# Historias de Usuario

---

## Historia de Usuario 1

| Campo | Detalle |
|---|---|
| **Número** | HU-01 |
| **Usuario** | Laura |
| **Nombre historia** | Búsqueda y filtrado de docentes |
| **Prioridad en negocio** | Alta |
| **Riesgo en desarrollo** | Baja |
| **Puntos estimados** | 5 |
| **Iteración asignada** | 1 |
| **Responsable** | Frontend |
| **Descripción** | Implementar búsqueda y filtrado de docentes en la tabla para facilitar consultas rápidas por nombre, correo o área académica. |
| **Observaciones** | Debe permitir búsquedas dinámicas y filtrado combinado. |

---

## Historia de Usuario 2

| Campo | Detalle |
|---|---|
| **Número** | HU-02 |
| **Usuario** | Emmanuel |
| **Nombre historia** | Servicio de consulta de docentes |
| **Prioridad en negocio** | Alta |
| **Riesgo en desarrollo** | Media |
| **Puntos estimados** | 8 |
| **Iteración asignada** | 1 |
| **Responsable** | Backend |
| **Descripción** | Crear servicio de consulta de docentes con filtros y paginación para optimizar el rendimiento del listado. |
| **Observaciones** | Debe soportar filtros por nombre, correo y área académica. |

---

## Historia de Usuario 3

| Campo | Detalle |
|---|---|
| **Número** | HU-03 |
| **Usuario** | Wilmer |
| **Nombre historia** | Validaciones visuales en formulario |
| **Prioridad en negocio** | Alta |
| **Riesgo en desarrollo** | Baja |
| **Puntos estimados** | 5 |
| **Iteración asignada** | 2 |
| **Responsable** | Frontend |
| **Descripción** | Agregar validaciones visuales en el formulario de docentes para evitar registros con datos inválidos. |
| **Observaciones** | Mostrar mensajes de error claros y validaciones en tiempo real. |

---

## Historia de Usuario 4

| Campo | Detalle |
|---|---|
| **Número** | HU-04 |
| **Usuario** | Isabel |
| **Nombre historia** | Validación de duplicidad de docentes |
| **Prioridad en negocio** | Alta |
| **Riesgo en desarrollo** | Media |
| **Puntos estimados** | 8 |
| **Iteración asignada** | 2 |
| **Responsable** | Backend |
| **Descripción** | Implementar validaciones de duplicidad para impedir registros de docentes con correos repetidos. |
| **Observaciones** | Validar tanto en backend como en base de datos. |

---

## Historia de Usuario 5

| Campo | Detalle |
|---|---|
| **Número** | HU-05 |
| **Usuario** | Camilo |
| **Nombre historia** | Confirmaciones visuales y modales |
| **Prioridad en negocio** | Media |
| **Riesgo en desarrollo** | Baja |
| **Puntos estimados** | 3 |
| **Iteración asignada** | 2 |
| **Responsable** | Frontend |
| **Descripción** | Mostrar confirmaciones visuales y modales de validación para acciones como registrar o eliminar docentes. |
| **Observaciones** | Debe incluir mensajes de éxito, advertencia y confirmación de eliminación. |

---
