const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
    // Requerimiento 1: Testea que la ruta GET /cafes devuelve un status code 200 y el tipo de dato recibido
    // es un arreglo con por lo menos 1 objeto
    it("GET  /cafes  devuelve: codigo 200", async () => {
        const { statusCode, body } = await request(server).get("/cafes");
        const cafes = body;
        expect(statusCode).toBe(200);
        expect(cafes).toBeInstanceOf(Array);
        expect(cafes.length).toBeGreaterThan(0);
    });

    //Reqquerimiento 2: Comprueba que se obtiene un código 404 al intentar eliminar un café con un id que no existe.

    it("Se elimina café inexistente para obener error 404", async () => {
        const jwt = "token";
        const id = 10; /* este cafe no existe */
        const response = await request(server)
            .delete(`/cafes/${id}`)
            .set("Authorization", jwt)
            .send();

        expect(response.statusCode).toBe(404);
    });

    //Requerimiento 3: Prueba que la ruta POST /cafes agrega un nuevo café y devuelve un código 201. 

    it('POST /cafes devuelve: codigo 201, al agregar un café', async () => {
        const cafe = {
            id: 8,
            nombre: 'Café Alondra',
        };
        const { statusCode } = await request(server).post('/cafes').send(cafe);
        expect(statusCode).toBe(201);
    });
});

//Requerimiento 4: Prueba que la ruta PUT /cafes devuelve un status code 400 si intentas actualizar un
//café enviando un id en los parámetros que sea diferente al id dentro del payload.

it("PUT /cafes devuelve status code 400 al actualizar con id que no existe", async () => {
    const actualizarCafe = { id: 1, nombre: "Te amo Hija" }
    const response = await request(server).put("/cafes/2").send(actualizarCafe)
    const status = response.statusCode
    expect(status).toBe(400)
})
