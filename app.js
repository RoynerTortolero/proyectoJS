const cards = document.getElementById('cards');
const items = document.getElementById('items');
const footer = document.getElementById('footer');
const thead = $('#thead');
const header = $('#header');
const ubicacion = $('#ubicacion');
const volver = $('#volver');
const formulario = $('#formulario');
const datos = $('#datos');
const comprar = $('#comprar');
const comentarios = $('#comentarios');
const titulo = $('#tituloFinalizar');
const titulo2 = $('#tituloFinalizar2');
const templateCard = document.getElementById('template-card').content
const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content
const fragment = document.createDocumentFragment();
let carro = {};
let misProductos = []

$.getJSON("productos.json", (response, status) => {
    if (status === "success") {
        let contenido = response
        misProductos = contenido
        pintarCard(misProductos)
        if (localStorage.getItem('carro')) {
            carro = JSON.parse(localStorage.getItem('carro'))
            pintarCarrito()
        }
    } else {
        $("#contenido").html(contenidoError)
    }
    $("#contenido").fadeIn("slow")
})

const contenidoError = `<div class="titulo">
                            <ion-icon name="sad-outline" class ="redes"></ion-icon>
                            <h2>ERROR...No se pudo recuperar el contenido</h2>
                            <h3>Intente nuevamente en unos segundos...</h3>
                        </div>`


cards.addEventListener('click', e => {
    addCarrito(e);
});

items.addEventListener('click', e => {
    btnAccion(e);
});

// Cargo los productos en las cards

const pintarCard = data => {
    data.forEach(objeto => {
        templateCard.querySelector('h5').textContent = objeto.nombre
        templateCard.querySelector('p').textContent = objeto.precio
        templateCard.querySelector('img').setAttribute("src", objeto.img)
        templateCard.querySelector('.btn-dark').dataset.id = objeto.productoid
        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    });
    cards.appendChild(fragment);
}
// me traigo el objeto seleccionado con comprar
const addCarrito = e => {
    if (e.target.classList.contains('btn-dark')) {
        setCarrito(e.target.parentElement)
    }
    e.stopPropagation()
}

const setCarrito = articulo => {
    const guardar = {
        id: articulo.querySelector('.btn-dark').dataset.id,
        nombre: articulo.querySelector('h5').textContent,
        precio: articulo.querySelector('p').textContent,
        cantidad: 1
    }
    if (carro.hasOwnProperty(guardar.id)) {
        guardar.cantidad = carro[guardar.id].cantidad + 1
    }

    carro[guardar.id] = {
        ...guardar
    }
    pintarCarrito()
}

// Voy pinto en el carrito los productos que van cargando

const pintarCarrito = () => {
    items.innerHTML = '';
    Object.values(carro).forEach(guardar => {
        templateCarrito.querySelector('th').textContent = guardar.id
        templateCarrito.querySelectorAll('td')[0].textContent = guardar.nombre
        templateCarrito.querySelectorAll('td')[1].textContent = guardar.cantidad
        templateCarrito.querySelector('.btn-dark').dataset.id = guardar.id
        templateCarrito.querySelector('.btn-warning').dataset.id = guardar.id
        templateCarrito.querySelector('span').textContent = guardar.cantidad * guardar.precio
        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)
    pintarCuadro();

    localStorage.setItem('carro', JSON.stringify(carro))
}

// Pinto vacio la tabla cuando no tiene elementos 

const pintarCuadro = () => {
    footer.innerHTML = '';
    if (Object.keys(carro).length === 0) {
        footer.innerHTML = `<th scope="row" colspan="5">Comience a comprar!</th>`
        return
    }

    // Acumulo los objetos y calculo precio y cantidad
    const nCantidad = Object.values(carro).reduce((acc, {
        cantidad
    }) => acc + cantidad, 0)
    const nPrecio = Object.values(carro).reduce((acc, {
        cantidad,
        precio
    }) => acc + cantidad * precio * 1.21, 0)


    templateFooter.querySelectorAll('td')[0].textContent = nCantidad;
    templateFooter.querySelector('span').textContent = nPrecio;

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)
    footer.appendChild(fragment)

    // Boton vaciar todo
    const btnVaciar = $('#vaciar-carrito');
    btnVaciar.on('click', function () {
        carro = {};
        Swal.fire({
            icon: 'success',
            title: 'El carrito se vacio correctamente',
            showConfirmButton: false,
            timer: 1500
        })

        pintarCarrito()
    })

    const btnFinalizar = $('#finalizarCompra');
    btnFinalizar.on('click', function () {
        Swal.fire({
            title: '<span class="textoCarrito"> Completa los siguientes datos para el pago y el envio <span>',
            icon: 'info',
            backdrop: true
        })
        btnFinalizar.toggle("hide")
        btnVaciar.toggle("hide")

        finalizarCompra();
    })

}



// Boton que suma  o resta elementos ya cargados
const btnAccion = e => {
    if (e.target.classList.contains('btn-dark')) {

        const producto = carro[e.target.dataset.id]
        producto.cantidad++
        carro[e.target.dataset.id] = {
            ...producto
        }
        pintarCarrito();
    }

    if (e.target.classList.contains('btn-warning')) {

        const producto = carro[e.target.dataset.id]
        producto.cantidad--
        if (producto.cantidad === 0) {
            delete carro[e.target.dataset.id]
        }
        pintarCarrito();
    }
    e.stopPropagation()
}

//Mostrar y esconder formulario de compra e index
const finalizarCompra = () => {
    cards.classList.toggle("hide")
    //thead.toggle("hide")
    ubicacion.toggle("hide")
    header.toggle("hide")
    titulo.toggle("hide")
    titulo2.toggle("hide")
    volver.toggle("hide")
    formulario.toggle("hide")
    datos.toggle("hide")
    comprar.toggle("hide")
    comentarios.toggle("hide")
    $('.suma').toggle("hide")
    $('.resta').toggle("hide")

}


// Botón volver a los productos
volver.on("click", function () {
    const btnFinalizar2 = $('#finalizarCompra')
    const btnVaciar2 = $('#vaciar-carrito')
    btnFinalizar2.toggle("hide")
    btnVaciar2.toggle("hide")
    finalizarCompra()
    Swal.fire({
        icon: 'success',
        title: 'Volviste al inicio',
        showConfirmButton: false,
        timer: 1500
    })
})

//Valido el formulario
function validarForm() {
    let nombre = document.form.nombre.value;
    let apellido = document.form.apellido.value;
    let documento = document.form.documento.value;
    let email = document.form.email.value;
    let nroTelefono = document.form.nroTelefono.value;
    let direccion = document.form.direccion.value;

    if (nombre.length == 0) {
        Swal.fire({
            icon: 'error',
            title: 'Debes completar correctamente el campo NOMBRE',
            showConfirmButton: false,
            timer: 1500
        })
        event.preventDefault();
    } else if (apellido.length == 0) {
        Swal.fire({
            icon: 'error',
            title: 'Debes completar correctamente el campo APELLIDO',
            showConfirmButton: false,
            timer: 1500
        })
        event.preventDefault();
    } else if (documento.length == 0) {
        Swal.fire({
            icon: 'error',
            title: 'Debes completar correctamente el campo DOCUMENTO',
            showConfirmButton: false,
            timer: 1500
        })
        event.preventDefault();
    } else if (email.length == 0) {
        Swal.fire({
            icon: 'error',
            title: 'Debes completar correctamente el campo MAIL',
            showConfirmButton: false,
            timer: 1500
        })
        event.preventDefault();
    } else if (nroTelefono.length == 0) {
        Swal.fire({
            icon: 'error',
            title: 'Debes completar correctamente el campo NRO TELEFONO',
            showConfirmButton: false,
            timer: 1500
        })
        event.preventDefault();
    } else if (direccion.length == 0) {
        Swal.fire({
            icon: 'error',
            title: 'Debes completar correctamente el campo DIRECCIÓN',
            showConfirmButton: false,
            timer: 1500
        })
        event.preventDefault();
    } else {
        Swal.fire({
            icon: 'success',
            title: `Muchas gracias por tu compra ${nombre}, recuerda de enviarnos el comprobante de pago al whatsapp para enviarte tu pedido a la siguiente dirección ${direccion}, saludos!`,
            backdrop: true
        })
        event.preventDefault();
        carro = {};
        pintarCarrito()
        finalizarCompra()
    }
}