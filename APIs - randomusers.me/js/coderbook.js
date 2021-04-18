let HTMLTabla = "<h4>Resultados</h4>"
let HTMLCard = ""
let contenidoJSON = ""

function cargoContenidoStreaming() {
   $.ajax({
      url: 'https://randomuser.me/api/?results=1&gender=female&nat=US&phone',
      dataType: 'json',
      success: function(data) {
         contenidoJSON = data.results
         console.log(data)
         for (let user of contenidoJSON) {
            HTMLTabla += `<tr class="white">
                              <td><img src="${user.picture.medium}" class="circle responsive-img"></td>
                              <td>${user.name.first} ${user.name.last}</td>
                              <td>${user.location.city}, ${user.location.country}</td>
                              <td class="blue-text">${user.email}</td>
                          </tr>`
            $("#tabladeresultado").html(HTMLTabla)
         };
      },
      error: function() {
         HTMLCard = `<div class="center black-text ancho">
                        <br><br>
                        <br><br>
                        <h4>El contenido parece no estar disponible. Intente nuevamente en unos minutos.</h4>
                        <br><br>
                        <i class="medium material-icons">sentiment_very_dissatisfied</i>
                        <br><br>
                     </div>`
         $("#tabladeresultado").html(HTMLCard)
      }
   })
}

setTimeout(() => {
   cargoContenidoStreaming()
      $('#contenido').fadeIn("fast", function() {
         $('#cargando').fadeOut(1000)
      })
}, 100)

/*

https://randomuser.me/
https://randomuser.me/documentation#howto
70&nat=es&gender=female

*/