//- Olazabal Erik - 

const contenedorProductos = document.getElementById("contenedorProductos");
const listadoProductos = "../json/productos.json";

fetch(listadoProductos)
.then(respuesta => respuesta.json())
.then(datos => {
    datos.forEach(producto => {
        const divProducto = document.createElement("div");
        divProducto.classList.add("col-sm-8", "col-md-6", "col-lg-4", "p-4");
        divProducto.innerHTML += `
                                <figure>
                                <img src="../img/Productos/${producto.id}.webp" alt="robot1" class="w-100 img-thumbnail">
                                    <div class="card text-center mt-2">
                                        <div class="card-header">${producto.nombre}</div>
                                        <div class="card-body p-1 ">
                                        <span class="mx-2">$${producto.precio}</span>
                                        <button id="boton${producto.id}" class="btn bg-success text-light" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">Agregar al Carrito</button>
                                        </div>   
                                    </div>
                                </figure>`;
        contenedorProductos.appendChild(divProducto);
        const boton = document.getElementById(`boton${producto.id}`);
        boton.addEventListener("click", () => {
            Toastify({
                text: "Producto agregado al carrito",
                duration: 3000,
                gravity: "bottom",
                position: "right",
                style: 
                {
                    background: "rgb(1, 30, 56)",
                },
            }).showToast();
            /* ---- array del LocalStorage: ---- */
            localStorage.setItem("productos", JSON.stringify(producto));
            verProductos = localStorage.getItem("productos") ? JSON.parse(localStorage.getItem("productos")) : []; 
        console.log(verProductos)
            agregarAlCarrito(producto.id);
        })
    });
})
.catch(error => console.log(error))
.finally(() => console.log("Se trajeron los productos"));




const carrito = [];

if(localStorage.getItem("carrito")) {
    let reserva = JSON.parse(localStorage.getItem("carrito"));
    /* reservas.push(...reserva); */
    for(let i = 0; i < reserva.length; i++ ) {
        producto.push(reserva[i]);
    
    }
}

// chequea unidades 

const agregarAlCarrito = (id) => {
    /* const producto = productos.find(producto => producto.id === id); */
    const productoEnCarrito = carrito.find(producto => producto.id === id);
    if(productoEnCarrito) {
        productoEnCarrito.cantidad++;
    }else {
        carrito.push(verProductos);
    }
    actualizarCarrito();
}

//div de carrito de compras 

const contenedorCarrito = document.getElementById("contenedorCarrito");

function actualizarCarrito() {
    let aux="";
    carrito.forEach(producto => {
        aux += `
                <figure class="d-flex">
                <img src="../img/Productos/${producto.id}.webp" alt="robot1" class="img-thumbnail ancho-25">
                    <div class="card text-center">
                        <div class="card-header">${producto.nombre}</div>
                        <div class="card-body p-1 d-flex align-items-center">
                        <span class="mx-2">$${producto.precio}</span>
                        <button onClick = "eliminarDelCarrito()" class="btn bg-success p-2 text-white"> Eliminar del Carrito </button>
                        </div>   
                    </div>
                </figure>
                `
    })

    contenedorCarrito.innerHTML = aux;
    calcularTotalCompra();
}

//Función elimine el producto del carrito: 

const eliminarDelCarrito = (id) => {
    Swal.fire({
        title: "¿Esta seguro de eliminar el robot?",
        icon: "warning",
        background: "#FDEBD0",
        backdrop: "#B7950B",
        confirmButtonText: "Aceptar",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        cancelButtonColor: "#B7950B",
        confirmButtonColor: "#B7950B",
    }).then((result) => {
        if (result.isConfirmed) {
            const producto = carrito.find(producto => producto.id === id);
            carrito.splice(carrito.indexOf(producto),1);
            actualizarCarrito();
            Swal.fire({
                title: "Producto eliminado",
                icon: "success",
                background: "#FDEBD0",
                backdrop: "#B7950B",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#B7950B",
            });
        }
    });
    
}

/* ----- OPERADOR LÓGICO && AND:  ------- */
const avercarrito = document.getElementById("averCarrito");
avercarrito.addEventListener("click", () => {
    carrito.length === 0 && console.log("El carrito está vacío");
});

///Función vaciar 

const vaciarCarrito = document.getElementById("vaciarCarrito");
vaciarCarrito.addEventListener("click", () => {
    carrito.splice(0, carrito.length);
    actualizarCarrito();
});

//Función total 

const totalCompra = document.getElementById("totalCompra");

const calcularTotalCompra = () => {
    let total = 0; 
    carrito.forEach( producto => {
        total += producto.precio*producto.cantidad;
    });
    totalCompra.innerHTML = total;
}

/*------------ operadores avanzados --------------*/
 /* ---- Se agrego un array del LocalStorage: en la fila 38  ---- */
 /* ---- Se agrego un OPERADOR LÓGICO && AND:  en la fila 105  ---- */
 /* ---- Se agrego un OPERADOR OR:  en la pagina inscripciones -- fila 70  ---- */
