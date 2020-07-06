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
                                password: '123456'
                             });

        let aux_usuario = JSON.parse(res.text);
    
        expect(res.statusCode).toEqual(400);
        expect(aux_usuario.usuario).toBeUndefined();
        expect(aux_usuario.status).toBeFalsy();

        done();
    });

    it('No debe iniciar con contraseña incorrecta', async done => {
        const res = await request(app)
                            .post('/login')
                            .send({
                                email: 'test@gmail.com',
                                password: '1234567'
                             });
    
        let aux_usuario = JSON.parse(res.text);

        expect(res.statusCode).toEqual(400);
        expect(aux_usuario.usuario).toBeUndefined();
        expect(aux_usuario.status).toBeFalsy();

        done();

    });


    it('Debe iniciar sesiòn', async done => {
        const res = await request(app)
                            .post('/login')
                            .send({
                                email: 'test@gmail.com',
                                password: '123456a'
                             });
    
        let aux_usuario = JSON.parse(res.text);

        console.log(aux_usuario.token.length);

        expect(res.statusCode).toEqual(200);
        expect(aux_usuario.usuario).toBeDefined();
        expect(aux_usuario.status).toBeTruthy();
        expect(aux_usuario.token.length).toBeGreaterThan(1);

        done();

    });

})
