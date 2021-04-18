const desplazarMe = (titulo, vel) => {
    $('html, body').animate({
       scrollTop: $(`#${titulo}`).offset().top
    }, vel)
 }
 
 $('#link1Productos').click(()=> {desplazarMe("productos", 1000)})
 $('#link2Ubicacion').click(()=> {desplazarMe("ubicacion", 2000)})
 $('#link3Contacto').click(()=> {desplazarMe("contacto", 3000)})