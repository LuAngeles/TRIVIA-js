/*//Preguntar nombre al usuario.
var usuario = prompt ("¿Cómo te llamas?");
//Saludar al usuario con su nombre.
document.write ("¡Hola " + usuario + "!");
*/
//Se cambia el prompt con el que se pedía el nombre, por una función//

function escribe(){
    escribir= document.getElementById('caja')
    miNombre= "<h2>" + document.rellenar.nombre.value +"</h2>"
   
    escribir.innerHTML= miNombre
   }
   
   window.onload= function () {
    document.rellenar.ver.onclick =escribe
   }