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


//Objeto el evento de las cards que agrega al carrito
cards.addEventListener('click', e => {
    Swal.fire({
        icon: 'success',
        title: 'Agregaste producto al carrito',
        showConfirmButton: false,
        timer: 1500
    })
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
    $('.suma').toggle("suma")
    $('.resta').toggle("resta")

}


// Botón volver a los productos
$(volver).click(function () {
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