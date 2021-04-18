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