export async function GET() {

    let response = await fetch('http://13.58.249.92:8000/obtenerDatos')
    let datos = await response.json()

    console.log(datos)

    return new Response(JSON.stringify(datos),{status: 200})
}