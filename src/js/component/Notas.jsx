import React, { useState } from "react";

const Notas = () => {
    const [tarea, setTarea] = useState('');
    const [lista, setLista] = useState([]);

    const manejarTecla = (evento) => {
        if (evento.key === 'Enter') {
            evento.preventDefault();
            if (tarea.trim() !== '') {
                setLista(prevLista => [...prevLista, { texto: tarea, completado: false, editando: false }]);
                setTarea('');
            }
        }
    };

    const manejarCambio = (evento) => setTarea(evento.target.value);

    const eliminarTarea = (index) => {
        setLista(prevLista => prevLista.filter((_, i) => i !== index));
    };

    const alternarCompletado = (index) => {
        setLista(prevLista => prevLista.map((item, i) => 
            i === index ? { ...item, completado: !item.completado } : item
        ));
    };

    const alternarEdicion = (index) => {
        setLista(prevLista => prevLista.map((item, i) => 
            i === index ? { ...item, editando: !item.editando } : item
        ));
    };

    const actualizarTarea = (evento, index) => {
        setLista(prevLista => prevLista.map((item, i) => 
            i === index ? { ...item, texto: evento.target.value } : item
        ));
    };

    const manejarTeclaEdicion = (evento, index) => {
        if (evento.key === 'Enter') {
            alternarEdicion(index);
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Añade una tarea"
                value={tarea}
                onChange={manejarCambio}
                onKeyDown={manejarTecla}
            />
            <ul>
                {lista.map((item, index) => (
                    <li key={index} className={item.completado ? 'completed' : ''}>
                        <input
                            type="checkbox"
                            className="checklist"
                            checked={item.completado}
                            onChange={() => alternarCompletado(index)}
                        />
                        {item.editando ? (
                            <input
                                type="text"
                                value={item.texto}
                                onChange={(e) => actualizarTarea(e, index)}
                                onKeyDown={(e) => manejarTeclaEdicion(e, index)}
                                onBlur={() => alternarEdicion(index)}
                                autoFocus
                            />
                        ) : (
                            <span className="tarea-texto">{item.texto}</span>
                        )}
                        <div className="botones">
                            <button onClick={() => alternarEdicion(index)}>
                                <i className="fa-solid fa-pen-to-square"></i>
                            </button>
                            <button onClick={() => eliminarTarea(index)}>
                                <i className="fa-solid fa-trash-can"></i>
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <footer>
                <p>Tareas actuales: {lista.length}</p>
            </footer>
        </div>
    );
};

export default Notas;
