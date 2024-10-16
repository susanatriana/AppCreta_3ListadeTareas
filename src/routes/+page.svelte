<script>
    import { onMount } from 'svelte'

    let tarea = ""
    let lista_de_tareas = [
    
    ]
    
    onMount (()=> {
        obtenerDatos()
    })

    async function obtenerDatos() {
        console.log('Mandé una solicitud')
        let response = await fetch('/api/obtenerDatos')
        let datos = await response.json()


        lista_de_tareas = datos
    }


    async function agregarTarea(){
        if (tarea.lenght === 0) {
            alert("Pusiste una tarea vacía")
        } else {
            let response = await fetch('/api/agregarTarea', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  nombre_tarea: tarea, 
                  completado: false   
                })
            })
        tarea = ""

        }
    }

    async function eliminarTarea(id) {
        alert("Eliminando")
        let response = await fetch("/api/eliminarTarea", {
            method: "DELETE", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({id: id}

            )
        
        })
    obtenerDatos()
    }

    async function completarTarea(id) {
        let response = await fetch ("/api/completarTarea", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({id: id, completado: true})
        })
    }

let isChecked = false

</script>

<h1>Lista de tareas</h1>
<input type ="text" placeholder= "Escribe una tarea aqui" bind:value={tarea}>
<button on:click={agregarTarea}>Agregar</button>

<ul>
    {#each lista_de_tareas as tarea,indice}
    <li>
        {indice}

        <span class:completado={tarea.completado}> {tarea.nombre_tarea} {tarea.id}</span>
        <input type="checkbox" bind:checked={tarea.completado}>
    <button class="container" on:click={() => eliminarTarea(tarea.id)}>Eliminar</button>
    </li>

    
    {/each}

</ul>


<style>
   main {
    max-width: 400px;
    margin: 0 auto;
    padding: 1em;
    text-align: center;
   }

   input[type-"text"] {
    width: calc()100% - 100px;
    padding: 0.5rem;
    margin-right: 0.5rem;
   }

   button {
    padding: 0.5rem;
    background-color: #6200ea;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5px;
   }

   ul {
    list-style-type: none;
   }

   li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem;
   }

   .completado{
    text-decoration: line-through;
    color: #888;
   }

   button:hover {
    background-color: #3700b3;
   }

   input[type="checkbox"] {
    margin-right: 10px;
   }
</style>

