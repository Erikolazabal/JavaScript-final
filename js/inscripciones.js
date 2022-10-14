/* seccion de inscriones con localstorage */

class inscripto {
    constructor(correoAlumno, escuelaAlumno, edadAlumno, integrantesAlumno, ciudadAlumno) {
        this.correoAlumno = correoAlumno;
        this.escuelaAlumno = escuelaAlumno;
        this.edadAlumno = edadAlumno;
        this.integrantesAlumno = integrantesAlumno;
        this.ciudadAlumno = ciudadAlumno;
    }
}

const inscriptos = []; 

if(localStorage.getItem("inscriptos")) {
    let reserva = JSON.parse(localStorage.getItem("inscriptos"));
    for(let i = 0; i < reserva.length; i++ ) {
        inscriptos.push(reserva[i]);
    }
}

const formularioInscrip = document.getElementById("formularioInscrip");

formularioInscrip.addEventListener("submit", (e) => {
    e.preventDefault();
    agregarReserva();
})

function agregarReserva() {
    const mail = document.getElementById("mail").value;
    const escuela = document.getElementById("escuela").value;
    const edad = document.getElementById("edad").value;
    const integrantes = document.getElementById("integrantes").value;
    const provicia = document.getElementById("provicia").value;
    const nuevaInscripcion = new inscripto(mail, escuela, edad, integrantes, provicia);
    inscriptos.push(nuevaInscripcion);
    localStorage.setItem("inscriptos", JSON.stringify(inscriptos));
    formularioInscrip.reset();
}

const contenedor = document.getElementById("contenedor");

const verReservas = document.getElementById("verReservas");

verReservas.addEventListener("click", () => {
    mostrarReservas();
});


function mostrarReservas() {
    contenedor.innerHTML = "";
    inscriptos.forEach( inscripto => {
        const div = document.createElement("div");
        div.innerHTML = `
                        <div>
                            <p>Correo del Alumno: ${inscripto.correoAlumno}</p>
                            <p>Escuela del Alumno: ${inscripto.escuelaAlumno}</p>
                            <p>Edad del Alumno: ${inscripto.edadAlumno}</p>
                            <p>Integrantes: ${inscripto.integrantesAlumno}</p>
                            <p>cuidad del Alumno: ${inscripto.ciudadAlumno}</p>
                        </div>
        
                        `;
        contenedor.appendChild(div);
    })
};
