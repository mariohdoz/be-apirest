const app = require('../../server/server')
const request = require("supertest");
const mongoose = require('mongoose')

const usuario = "jest-" + Date.now() + '@gmail.com';

afterAll((done) => {
  mongoose.connection.close();
  done();
});

describe('Post Endpoints de usuarios', () => {

    let usuario_id = '';

    it('Debe create un nuevo usuario', async done => {
        
        const res = await request(app)
                    .post('/usuario')
                    .send({
                        nombre: 'Usuario creado en jest',
                        email: usuario,
                        password: '123456',
                        role: 'ADMIN_ROLE'
                    });

        let aux_usuario = JSON.parse(res.text);

        usuario_id = aux_usuario.usuario._id;
        
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
    
    it('Debe actualizar usuario', async done => {
        
        const res = await request(app)
                        .put('/usuario/' + usuario_id)
                        .send({
                            nombre: 'Nuevo nombre',
                            role: 'USER_ROLE',
                            password: '12345678900'
                        })
        
        let aux_usuario = JSON.parse(res.text);

        expect(res.statusCode).toEqual(200);
        expect(aux_usuario.ok).toBeTruthy();

        done();

    });

});

// describe('Test login de usuario', () => {

//     it('Debe hacer login en la aplicación', async done => {
//         const res = await request(app)
//                     .post('/login')
//                     .send({
//                         email: usuario,
//                         password: 123456
//                     });
//     });

// });
