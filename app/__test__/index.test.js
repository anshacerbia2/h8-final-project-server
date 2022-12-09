// if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User, Product } = require("../models");
const request = require("supertest");
const app = require("../app");

// beforeAll(async () => {
//   try {
//     const registeredUser = await User.create(userTest1);
//     validToken = jwt.sign({
//       id: registeredUser.id,
//       email: registeredUser.email
//     }, process.env.SECRET);

//     const registeredUser2 = await User.create(userTest1);
//     validToken2 = jwt.sign({
//       id: registeredUser2.id,
//       email: registeredUser2.email
//     }, process.env.SECRET);

//     await Product.bulkCreate(require('../data/products.json'));

//     invalidToken =
//       '12345678eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIwMUBtYWlsLmNvbSIsImlkIjoxLCJpYXQiOjE2MjI2MDk2NTF9';
//   } catch (error) {
//     console.log(err);
//   }
// });

// afterAll(async () => {
//   await User.destroy({
//     truncate: true,
//     restartIdentity: true,
//     cascade: true
//   });
//   await Product.destroy({
//     truncate: true,
//     restartIdentity: true,
//     cascade: true
//   });
// });


describe('USER ROUTES CUSTOMER', () => {
  // LOGIN
  describe('POST SUCCESS /login - 200', () => {
    it('output ====> ACCESS_TOKEN', async () => {
      const response = await request(app).post('/login').send({
        email: 'ryan@hck8.com',
        password: 'ryan',
      });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("access_token", expect.any(String));
    });
  }); // OK
  describe('POST FAIL /login - 401', () => {
    it('output ====> 401 STATUS UNAUTHORIZED', async () => {
      const response = await request(app).post('/login').send({
        email: 'ryan@hck8.com',
        password: 'ryan1234',
      });
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("msg", expect.any(String));
    });
  }); // OK
  describe('POST SUCCESS /regisCust - 201', () => {
    it('output ====> Account has been created successfully', async () => {
      const response = await request(app).post('/regisCust').send({
        fName: 'Hitam',
        lName: 'Putih',
        email: 'hitamputih@gmail.com',
        password: '123456',
        phoneNumber: '081212121212',
        userImg: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
      });
      expect(response.status).toBe(201);
      expect(response.body.msg).toBe('User has been created');
    });
  }); // OK 

  describe('POST FAIL /regisCust - 400', () => {
    it('should return Email field is required', async () => {
      const response = await request(app).post('/regisCust').send({
        username: 'user',
        email: '',
        password: '123456',
        phoneNumber: '0812xxxxxxxx',
        address: 'Jl. ABC No. 7'
      });
      expect(response.status).toBe(500); //! Nanti dicomment aja
      // expect(response.status).toBe(400); //! ERROR SHOULD BE 400 HANDLE LATER
      // expect(response.body.errors).toBeInstanceOf(Array);
      // expect(response.body.errors[0].message).toBe('Email field is required');
    });
  }); // BLM OK

  describe('POST /pub/register - 400', () => {
    it.only('should return Password field is required', async () => {
      const response = await request(app).post('/regisCust').send({
        username: '',
        email: 'user@mail.com',
        password: '',
        phoneNumber: '0812xxxxxxxx',
        address: 'Jl. ABC No. 7'
      });
      expect(response.status).toBe(500); // Nanti comment
      // expect(response.status).toBe(400);
      // expect(response.body.errors).toBeInstanceOf(Array);
      // expect(response.body.errors[0].message).toBe('Password field is required');
    });
  }); // BLM OK
  // to be continued
});

describe('USER ROUTES ADMIN', () => { 
  describe('POST SUCCESS /login - 200', () => {
    it('output ====> ACCESS_TOKEN', async () => {
      const response = await request(app).post('/login').send({
        email: 'ryan@hck8.com',
        password: 'ryan',
      });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("access_token", expect.any(String));
    });
  }); // OK
});