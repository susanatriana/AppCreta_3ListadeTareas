import pkg from 'pg'
const { Pool } = pkg

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '5860',
    port: 5432
})

export async function  PUT({request}) {
    let data = await request.json ()
    console.log (data)
    let client= await pool.connect()
    let deletequery = 'Update FROM tareas where id = $1'
    let values = [data.id]
    let result = client.query(deletequery, values)
    client.release ()

    return new Response("todo bn", {status: 200})

}