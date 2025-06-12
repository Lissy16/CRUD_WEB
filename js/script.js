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
                <button onclick="AbrirModalEditar('${integrante.id}','${integrante.nombre}','${integrante.apellido}','${integrante.correo}')">Editar</button>
                <button onclick="EliminarPersona (${integrante.id})">Eliminar</button>
            </td>
            </tr>
        `;
    });

}

ObetenerIntegrantes();


//Proceso para agregar un nuevo integrante
const modal = document.getElementById("mdAgregar")//cuadro de dialogo
const btnAgregar = document.getElementById("btnAgregar")//boton par agregar registro
const btnCerrar = document.getElementById("btnCerrar")//boton para cerrar el popup

btnAgregar.addEventListener("click", ()=>{
    modal.showModal();
});

btnCerrar.addEventListener("click", ()=>{
    modal.close();
})

//Agregar nuevo integrante desde el formulario
document.getElementById("frmAgregar").addEventListener("submit", async e => { //"e" representa a "submot". Evita que el formulario se envie un solo    
 
    //Capturar los valores del formulario
    const nombre = document.getElementById("txtNombre").value.trim();
    const apellido = document.getElementById("txtApellido").value.trim();
    const correo = document.getElementById("txtEmail").value.trim();
 
    //Validacion basica
    if(!nombre || !apellido || !correo)
        {
            alert("Ingresar los valores correctamente");
            return;
    }
 
    const respuesta = await fetch(API_URL, {
        method: "POST",//tipo de solicitud
        headers: {'Content-Type': 'application/json'}, //tipo de datos enviado
        body: JSON.stringify({nombre, apellido, correo})//datos enviados
    });

    //verificar si la api responde que los datos fueron enviados correctamente

    if(respuesta.ok){
        alert("El registro fue agregado correctamente");

        //limpiar el formulario
        document.getElementById("frmAgregar").reset();

        //cerrar el modal
        modal.close();

        //recargar tabla 
        ObetenerIntegrantes();
    }
    else{
        //en caso de que la api devuelva el codigo diferente a 200-299
        alert("El registro no fue agregado ponlo biennnn🙄!!!!!!!");
    }

});

//funcion para borrar registros
async function EliminarPersona(id){
    const confirmacion = confirm("¿Realmente queres eliminarlo?");

    // validamos si el usuario escogio borrar
    if(confirmacion){
        await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });
    
        //Recargar la tabla despues de eliminarloooo!
        ObetenerIntegrantes();
    }
}

const modalEditar = document.getElementById("mdEditar");
const btnCerrarEditar = document.getElementById("btnCerrarEditar");

btnCerrarEditar.addEventListener("click", ()=>{
    modalEditar.close();
});

function AbrirModalEditar(id,nombre,apellido,correo){
    //se agrega los valores del registro en los input
    document.getElementById("txtIdEditar").value = id;
    document.getElementById("txtNombreEditar").value = nombre;
    document.getElementById("txtApellidoEditar").value =apellido;
    document.getElementById("txtEmailEditar").value = correo;

    //abrimos el modal despues de pasar 
    modalEditar.showModal();
}