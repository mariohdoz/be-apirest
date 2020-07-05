const app = require("../../server/server");
const request = require("supertest");
const mongoose = require("mongoose");

afterAll((done) => {
  mongoose.connection.close();
  done();
});

describe('Prueba Endpoints de login', () => {
    
    it('No debe iniciar sesión', async done => {
        const res = await request(app)
                            .post('/login')
                            .send({
                                email: 'test',
                                password: '1234567'
                             });

        let aux_usuario = JSON.parse(res.text);
    
        expect(res.statusCode).toEqual(400);
        expect(aux_usuario.usuario).toBeUndefined();
        expect(res.text.status).toBeFalsy();

        done();
    });

})
