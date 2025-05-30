//Endpoint de Integrantes - API
const API_URL = "https://retoolapi.dev/TAnwwJ/integrantes";

//funcion que manda a traer el json con get
async function ObetenerIntegrantes(){
    //respuesta del servidor
    const respuesta = await fetch(API_URL);

    //PASAMOS A JSON  la respuesta del servidor 
    const data = await respuesta.json();//esto es JSON

    //enviamos el json a la funcion que genera las filas en la tabla 
    MostrarDatos(data);
}

//Funcion para crear filas de la tabla en base a un JSON
//"datos representara al JSON donde vienen la información"
function MostrarDatos(datos){

    //Se llama a ala tabla con elemento ID y luego al tbody
    const tabla = document.querySelector("#tabla tbody");

    //Para inyectar codigo HTML usamos una propiedad "innerHTML"
    tabla.innerHTML = "" ; //Vaciamos el contenido de la tabla

    //
    datos.forEach(integrante => {
        tabla.innerHTML += `
        <tr>
            <td>${integrante.id}</td>
            <td>${integrante.nombre}</td>
            <td>${integrante.apellido}</td>
            <td>${integrante.correo}</td>
            <td>
                <button>Editar</button>
                <button>Eliminar</button>
            </td>
            </tr>
        `;
    });

}

ObetenerIntegrantes();

