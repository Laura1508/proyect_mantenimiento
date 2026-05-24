import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [titulo, setTitulo] = useState("");
  const [areaAcademica, setAreaAcademica] = useState("");
  const [dedicacion, setDedicacion] = useState("");
  const [aniosExperiencia, setAniosExperiencia] = useState("");

  // HU-03: estados de validación
  const [errores, setErrores] = useState({});
  const [tocados, setTocados] = useState({});
  const [intentoEnvio, setIntentoEnvio] = useState(false);
  const [mensajeExito, setMensajeExito] = useState("");

  const [registros, setRegistros] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  // HU-03: lógica de validaciones
  const validarCampos = (campos) => {
    const errs = {};

    if (!campos.nombre.trim())
      errs.nombre = "El nombre completo es obligatorio.";

    if (!campos.correo.trim())
      errs.correo = "El correo institucional es obligatorio.";
    else if (!/^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(campos.correo))
      errs.correo = "Ingresa un correo válido (ej: nombre@universidad.edu.co).";

    if (!campos.telefono.trim())
      errs.telefono = "El teléfono es obligatorio.";
    else if (!/^\d+$/.test(campos.telefono))
      errs.telefono = "El teléfono solo debe contener números.";
    else if (campos.telefono.length < 7 || campos.telefono.length > 15)
      errs.telefono = "El teléfono debe tener entre 7 y 15 dígitos.";

    if (!campos.titulo.trim())
      errs.titulo = "El título académico es obligatorio.";

    if (!campos.areaAcademica.trim())
      errs.areaAcademica = "El área académica es obligatoria.";

    if (!campos.dedicacion.trim())
      errs.dedicacion = "La dedicación es obligatoria.";

    if (campos.aniosExperiencia === "" || campos.aniosExperiencia === null)
      errs.aniosExperiencia = "Los años de experiencia son obligatorios.";
    else if (Number(campos.aniosExperiencia) < 0)
      errs.aniosExperiencia = "Los años de experiencia no pueden ser negativos.";
    else if (!Number.isInteger(Number(campos.aniosExperiencia)))
      errs.aniosExperiencia = "Ingresa un número entero de años.";

    return errs;
  };

  useEffect(() => {
    const campos = { nombre, correo, telefono, titulo, areaAcademica, dedicacion, aniosExperiencia };
    setErrores(validarCampos(campos));
    setMensajeExito("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nombre, correo, telefono, titulo, areaAcademica, dedicacion, aniosExperiencia]);

  const marcarTocado = (campo) => setTocados((prev) => ({ ...prev, [campo]: true }));

  const mostrarError = (campo) => (tocados[campo] || intentoEnvio) && errores[campo];

  const claseCampo = (campo) => {
    if (!tocados[campo] && !intentoEnvio) return "campo";
    if (errores[campo]) return "campo campo--error";
    return "campo campo--ok";
  };

  const hayErrores = Object.keys(errores).length > 0;

  useEffect(() => { cargarDocentes(); }, []);

  const cargarDocentes = async () => {
    try {
      const response = await fetch("http://localhost:3001/docentes");
      const data = await response.json();
      setRegistros(data);
    } catch (error) {
      console.error(error);
    }
  };

  const limpiarFormulario = () => {
    setNombre(""); setCorreo(""); setTelefono(""); setTitulo("");
    setAreaAcademica(""); setDedicacion(""); setAniosExperiencia("");
    setTocados({}); setErrores({});
    setIntentoEnvio(false); setMensajeExito("");
  };

  const registrarDatos = async (e) => {
    e.preventDefault();
    setIntentoEnvio(true);
    setTocados({ nombre: true, correo: true, telefono: true, titulo: true, areaAcademica: true, dedicacion: true, aniosExperiencia: true });

    const erroresActuales = validarCampos({ nombre, correo, telefono, titulo, areaAcademica, dedicacion, aniosExperiencia });
    setErrores(erroresActuales);
    if (Object.keys(erroresActuales).length > 0) return;

    const payload = {
      nombre, correo, telefono, titulo,
      area_academica: areaAcademica,
      dedicacion,
      anios_experiencia: aniosExperiencia,
    };

    if (editIndex !== null) {
      try {
        const docente = registros[editIndex];
        const response = await fetch(`http://localhost:3001/docentes/${docente.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (response.ok) {
          const nuevos = [...registros];
          nuevos[editIndex] = { ...docente, nombre, correo, telefono, titulo, area_academica: areaAcademica, dedicacion, anios_experiencia: aniosExperiencia };
          setRegistros(nuevos);
          setEditIndex(null);
          setMensajeExito("✅ Docente actualizado correctamente.");
        } else {
          alert("Error al actualizar el docente");
        }
      } catch (error) {
        console.error(error);
        alert("Error de conexión con el servidor");
      }
    } else {
      try {
        const response = await fetch("http://localhost:3001/docentes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await response.json();
        if (response.ok) {
          setRegistros([...registros, data]);
          setMensajeExito("✅ Docente registrado correctamente.");
        } else {
          alert("Error al registrar el docente");
        }
      } catch (error) {
        console.error(error);
        alert("Error de conexión al registrar");
      }
    }
    limpiarFormulario();
  };

  const eliminarRegistro = async (idx) => {
    const confirmar = window.confirm("¿Seguro que desea eliminar este docente?");
    if (!confirmar) return;
    const docente = registros[idx];
    try {
      const response = await fetch(`http://localhost:3001/docentes/${docente.id}`, { method: "DELETE" });
      if (response.ok) {
        setRegistros(registros.filter((_, i) => i !== idx));
        if (editIndex === idx) { setEditIndex(null); limpiarFormulario(); }
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
    setNombre(reg.nombre); setCorreo(reg.correo);
    setTelefono(reg.telefono || ""); setTitulo(reg.titulo);
    setAreaAcademica(reg.area_academica); setDedicacion(reg.dedicacion);
    setAniosExperiencia(reg.anios_experiencia);
    setEditIndex(idx); setTocados({}); setIntentoEnvio(false); setMensajeExito("");
  };

  return (
    <div className="container">
      <div className="titulo">
        <h1>Gestión de docentes universitarios</h1>
        <p>Registro de profesores: datos académicos y de contacto</p>
      </div>

      {mensajeExito && <div className="alerta-exito" role="alert">{mensajeExito}</div>}

      {intentoEnvio && hayErrores && (
        <div className="alerta-error" role="alert">
          ⚠️ Hay {Object.keys(errores).length} campo(s) con errores. Por favor corrígelos antes de continuar.
        </div>
      )}

      <form className="formulario" onSubmit={registrarDatos} noValidate>
        <div className="grid-formulario">

          <div className={claseCampo("nombre")}>
            <label>Nombre completo: <span className="campo-requerido">*</span></label>
            <input className={`input${mostrarError("nombre") ? " input--error" : tocados["nombre"] && !errores["nombre"] ? " input--ok" : ""}`}
              type="text" placeholder="Ej. María Fernanda López" value={nombre}
              onChange={(e) => setNombre(e.target.value)} onBlur={() => marcarTocado("nombre")} />
            {mostrarError("nombre") && <span className="mensaje-error">{errores.nombre}</span>}
          </div>

          <div className={claseCampo("correo")}>
            <label>Correo institucional: <span className="campo-requerido">*</span></label>
            <input className={`input${mostrarError("correo") ? " input--error" : tocados["correo"] && !errores["correo"] ? " input--ok" : ""}`}
              type="email" placeholder="nombre@universidad.edu.co" value={correo}
              onChange={(e) => setCorreo(e.target.value)} onBlur={() => marcarTocado("correo")} />
            {mostrarError("correo") && <span className="mensaje-error">{errores.correo}</span>}
          </div>

          <div className={claseCampo("telefono")}>
            <label>Teléfono: <span className="campo-requerido">*</span></label>
            <input className={`input${mostrarError("telefono") ? " input--error" : tocados["telefono"] && !errores["telefono"] ? " input--ok" : ""}`}
              type="text" inputMode="numeric" placeholder="Ej. 3001234567" value={telefono} maxLength={15}
              onChange={(e) => setTelefono(e.target.value.replace(/\D/g, ""))} onBlur={() => marcarTocado("telefono")} />
            <span className="campo-hint">Solo se permiten números.</span>
            {mostrarError("telefono") && <span className="mensaje-error">{errores.telefono}</span>}
          </div>

          <div className={claseCampo("titulo")}>
            <label>Título académico máximo: <span className="campo-requerido">*</span></label>
            <input className={`input${mostrarError("titulo") ? " input--error" : tocados["titulo"] && !errores["titulo"] ? " input--ok" : ""}`}
              type="text" placeholder="Ej. Doctorado, Maestría" value={titulo}
              onChange={(e) => setTitulo(e.target.value)} onBlur={() => marcarTocado("titulo")} />
            {mostrarError("titulo") && <span className="mensaje-error">{errores.titulo}</span>}
          </div>

          <div className={claseCampo("areaAcademica")}>
            <label>Área o programa académico: <span className="campo-requerido">*</span></label>
            <input className={`input${mostrarError("areaAcademica") ? " input--error" : tocados["areaAcademica"] && !errores["areaAcademica"] ? " input--ok" : ""}`}
              type="text" placeholder="Ej. Ingeniería de Software" value={areaAcademica}
              onChange={(e) => setAreaAcademica(e.target.value)} onBlur={() => marcarTocado("areaAcademica")} />
            {mostrarError("areaAcademica") && <span className="mensaje-error">{errores.areaAcademica}</span>}
          </div>

          <div className={claseCampo("dedicacion")}>
            <label>Dedicación: <span className="campo-requerido">*</span></label>
            <input className={`input${mostrarError("dedicacion") ? " input--error" : tocados["dedicacion"] && !errores["dedicacion"] ? " input--ok" : ""}`}
              type="text" placeholder="Tiempo completo, medio tiempo..." value={dedicacion}
              onChange={(e) => setDedicacion(e.target.value)} onBlur={() => marcarTocado("dedicacion")} />
            {mostrarError("dedicacion") && <span className="mensaje-error">{errores.dedicacion}</span>}
          </div>

          <div className={claseCampo("aniosExperiencia")}>
            <label>Años de experiencia docente: <span className="campo-requerido">*</span></label>
            <input className={`input${mostrarError("aniosExperiencia") ? " input--error" : tocados["aniosExperiencia"] && !errores["aniosExperiencia"] ? " input--ok" : ""}`}
              type="number" min="0" placeholder="Ej. 5" value={aniosExperiencia} style={{maxWidth:"160px"}}
              onChange={(e) => setAniosExperiencia(e.target.value)} onBlur={() => marcarTocado("aniosExperiencia")} />
            <span className="campo-hint">No puede ser un valor negativo.</span>
            {mostrarError("aniosExperiencia") && <span className="mensaje-error">{errores.aniosExperiencia}</span>}
          </div>

        </div>

        <p className="leyenda-requeridos"><span className="campo-requerido">*</span> Campos obligatorios</p>

        <button className="btn-registrar" type="submit"
          disabled={intentoEnvio && hayErrores}
          title={intentoEnvio && hayErrores ? "Corrige los errores para poder guardar" : ""}>
          {editIndex !== null ? "Actualizar" : "Registrar"}
        </button>
      </form>

      <div className="tabla-container">
        <table className="tabla">
          <thead>
            <tr>
              <th>Nombre</th><th>Correo</th><th>Teléfono</th><th>Título</th>
              <th>Área académica</th><th>Dedicación</th><th>Años doc.</th><th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {registros.map((reg, idx) => (
              <tr key={idx}>
                <td>{reg.nombre}</td><td>{reg.correo}</td><td>{reg.telefono}</td>
                <td>{reg.titulo}</td><td>{reg.area_academica}</td><td>{reg.dedicacion}</td>
                <td>{reg.anios_experiencia}</td>
                <td>
                  <button className="btn-editar" onClick={() => editarRegistro(idx)}>Editar</button>
                  <button className="btn-eliminar" onClick={() => eliminarRegistro(idx)}>Eliminar</button>
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