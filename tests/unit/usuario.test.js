const app = require('../../server/server')
const request = require("supertest");
const mongoose = require('mongoose')

const usuario = "jest-" + Date.now() + '@gmail.com';

jest.useFakeTimers();

afterAll((done) => {
  mongoose.connection.close();
  done();
});

describe('Post Endpoints de usuarios', () => {

    it('Debe create un nuevo usuario', async done => {
        
        const res = await request(app)
                    .post('/usuario')
                    .send({
                        nombre: 'Usuario creado en jest',
                        email: usuario,
                        password: '123456',
                        role: 'ADMIN_ROLE'
                    });
        
        expect(res.statusCode).toEqual(201);

        done();

    });

    it('No debe crear un usuario con el correo ya registrado', async done => {

        const res = await request(app)
                    .post('/usuario')
                    .send({
                        nombre: 'Usuario creado en jest',
                        email: usuario,
                        password: '123456',
                        role: 'ADMIN_ROLE'
                    });

        expect(res.statusCode).toEqual(400);

        done();
    });

    it('No debe crear usuario sin ROL correspondiente', async done => {
        
        const res = await request(app)
                    .post('/usuario')
                    .send({
                        nombre: 'Usuario creado en jest',
                        email: usuario,
                        password: '123456',
                        role: 'ADMIN'
                    });

        expect(res.statusCode).toEqual(400);
        expect(res.text.status).toBeFalsy();

        done();

    });


})
