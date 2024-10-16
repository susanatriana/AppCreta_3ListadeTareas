import pkg from 'pg'
let { Pool } = pkg

let pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '5860',
    port: 5432
})

export async function POST({request}) {
    let dataFront = await request.json()
    
    let client = await pool.connect()
    let insertQuery = `INSERT INTO tareas(nombre_tarea, completado) VALUES($1, $2)`
    let values = [dataFront.nombre_tarea, dataFront.completado]

    let result = await client.query(insertQuery, values)
    client.release()

    return new Response('Todo bien', {status: 200})
}