export async function POST({request}) {
    let frontData = await request.json()

    let response = await fetch("http://13.58.249.92:8000/agregarTarea", {
        method: 'POST',
        body: JSON.stringify(frontData),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    return new Response('Todo bien', {status: 200})
}
