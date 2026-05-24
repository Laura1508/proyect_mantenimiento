import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  // =========================
  // ESTADOS DEL FORMULARIO
  // =========================
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [titulo, setTitulo] = useState("");
  const [areaAcademica, setAreaAcademica] = useState("");
  const [dedicacion, setDedicacion] = useState("");
  const [aniosExperiencia, setAniosExperiencia] = useState(0);

  // =========================
  // ESTADOS GENERALES
  // =========================
  const [registros, setRegistros] = useState([]);
  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtroCorreo, setFiltroCorreo] = useState("");
  const [filtroArea, setFiltroArea] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  // =========================
  // CARGAR DOCENTES
  // =========================
  useEffect(() => {
    cargarDocentes();
  }, [filtroNombre, filtroCorreo, filtroArea]);

  const cargarDocentes = async () => {
  try {

    const params = new URLSearchParams();

    if (filtroNombre) {
      params.append("nombre", filtroNombre);
    }

    if (filtroCorreo) {
      params.append("correo", filtroCorreo);
    }

    if (filtroArea) {
      params.append("area_academica", filtroArea);
    }

    const response = await fetch(
      `http://localhost:3001/docentes?${params.toString()}`
    );

    const data = await response.json();

    setRegistros(data.docentes);

  } catch (error) {
    console.error(error);

    alert("Error al cargar los docentes");
  }
};

  // =========================
  // LIMPIAR FORMULARIO
  // =========================
  const limpiarFormulario = () => {
    setNombre("");
    setCorreo("");
    setTelefono("");
    setTitulo("");
    setAreaAcademica("");
    setDedicacion("");
    setAniosExperiencia(0);
  };

  // =========================
  // REGISTRAR / ACTUALIZAR
  // =========================
  const registrarDatos = async (e) => {
    e.preventDefault();

    const payload = {
      nombre,
      correo,
      telefono,
      titulo,
      area_academica: areaAcademica,
      dedicacion,
      anios_experiencia: aniosExperiencia,
    };

    // =========================
    // ACTUALIZAR DOCENTE
    // =========================
    if (editIndex !== null) {
      try {
        const docente = registros[editIndex];

        const response = await fetch(
          `http://localhost:3001/docentes/${docente.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );

        if (response.ok) {
          const nuevosRegistros = [...registros];

          nuevosRegistros[editIndex] = {
            ...docente,
            nombre,
            correo,
            telefono,
            titulo,
            area_academica: areaAcademica,
            dedicacion,
            anios_experiencia: aniosExperiencia,
          };

          setRegistros(nuevosRegistros);

          setEditIndex(null);

          alert("Docente actualizado correctamente");

       } else {
          const err = await response.json().catch(() => ({}));

          console.error(err);

          alert(err.error || "Error al actualizar el docente");
        }

      } catch (error) {
        console.error(error);

        alert("Error de conexión con el servidor");
      }

    // =========================
    // CREAR DOCENTE
    // =========================
    } else {
      try {
        const response = await fetch(
          "http://localhost:3001/docentes",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );

        const data = await response.json();

        if (response.ok) {
          setRegistros([...registros, data]);

          alert("Docente registrado correctamente");

        } else {
          console.error(data);

          const message = data?.error || 'Error al registrar docente';

          alert(message);
        }

      } catch (error) {
        console.error(error);

        alert("Error de conexión al registrar");
      }
    }

    limpiarFormulario();
  };

  // =========================
  // ELIMINAR DOCENTE
  // =========================
  const eliminarRegistro = async (idx) => {
    const confirmar = window.confirm(
    "¿Esta seguro de eliminar este registro?"
  );

  // SI CANCELA
  if (!confirmar) {
    return;
  }

    const docente = registros[idx];

    try {
      const response = await fetch(
        `http://localhost:3001/docentes/${docente.id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
      
        setRegistros(registros.filter((_, i) => i !== idx));
        if(editIndex === idx){
          setEditIndex(null);
          limpiarFormulario()
        }
        alert("Docente eliminado correctamente");

      } else {
        alert("Error al eliminar el docente");
      }

    } catch (error) {
      console.error(error);

      alert("Error de conexión al eliminar");
    }
  };

  const editarRegistro = (idx) => {
    const reg = registros[idx];
    setNombre(reg.nombre);
    setCorreo(reg.correo);
    setTitulo(reg.titulo);
    setAreaAcademica(reg.area_academica);
    setDedicacion(reg.dedicacion);
    setAniosExperiencia(reg.anios_experiencia);
    setEditIndex(idx);

  }

  //lo que se dibuja
  return (
  <div className="container">

    {/* TITULO */}
    <div className="titulo">
      <h1>Gestión de docentes universitarios</h1>

      <p>
        Registro de profesores: datos académicos y de contacto
      </p>
    </div>

    {/* FORMULARIO */}
    <form
      className="formulario"
      onSubmit={registrarDatos}
    >

      <div className="grid-formulario">

        <div className="campo">
          <label>Nombre completo:</label>

          <input
            className="input"
            type="text"
            placeholder="Ej. María Fernanda López"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>

        <div className="campo">
          <label>Correo institucional:</label>

          <input
            className="input"
            type="email"
            placeholder="nombre@universidad.edu"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
        </div>

        <div className="campo">
          <label>Teléfono:</label>

          <input
            className="input"
            type="text"
            placeholder="Ej. +57 300 1234567"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
          />
        </div>

        <div className="campo">
          <label>Título académico máximo:</label>

          <input
            className="input"
            type="text"
            placeholder="Ej. Doctorado, Maestría"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>

        <div className="campo">
          <label>Área o programa académico:</label>

          <input
            className="input"
            type="text"
            placeholder="Ej. Ingeniería de Software"
            value={areaAcademica}
            onChange={(e) => setAreaAcademica(e.target.value)}
          />
        </div>

        <div className="campo">
          <label>Dedicación:</label>

          <input
            className="input"
            type="text"
            placeholder="Tiempo completo, medio tiempo..."
            value={dedicacion}
            onChange={(e) => setDedicacion(e.target.value)}
          />
        </div>

        <div className="campo">
          <label>Años de experiencia docente:</label>

          <input
            className="input"
            type="number"
            value={aniosExperiencia}
            onChange={(e) => setAniosExperiencia(e.target.value)}
          />
        </div>

      </div>

      <button className="btn-registrar" type="submit">
        {editIndex !== null ? "Actualizar" : "Registrar"}
      </button>

    </form>

    {/* FILTROS */}
    <div className="filtros">

      <input
        className="input"
        type="text"
        placeholder="Buscar por nombre"
        value={filtroNombre}
        onChange={(e) => setFiltroNombre(e.target.value)}
      />

      <input
        className="input"
        type="text"
        placeholder="Buscar por correo"
        value={filtroCorreo}
        onChange={(e) => setFiltroCorreo(e.target.value)}
      />

      <input
        className="input"
        type="text"
        placeholder="Buscar por área académica"
        value={filtroArea}
        onChange={(e) => setFiltroArea(e.target.value)}
      />

    </div>

    {/* TABLA */}
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
          {registros.map((reg, idx) => (
            <tr key={idx}>

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
                  onClick={() => editarRegistro(idx)}
                >
                  Editar
                </button>

                <button
                  className="btn-eliminar"
                  onClick={() => eliminarRegistro(idx)}
                >
                  Eliminar
                </button>

              </td>

            </tr>
          ))}
        </tbody>

      </table>

    </div>

  </div>
);

}

export default App;


