const desplazarMe = (titulo, vel) => {
    debugger
    $('html, body').animate({
       scrollTop: $(`#${titulo}`).offset().top
    }, vel)

 }
 
 $('#link1Productos').click(()=> {desplazarMe("Productos", 200)})
 $('#link2Ubicacion').click(()=> {desplazarMe("ubicacion", 200)})
 $('#link3Contacto').click(()=> {desplazarMe("contacto", 200)})