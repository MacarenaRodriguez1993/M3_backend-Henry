const session = require('supertest-session');
const app = require('../index.js'); // Importo el archivo de entrada del server de express.
const {sumArray,pluck}=require('../utils')
const agent = session(app);

describe('Test de APIS', () => {
  describe('GET /', () => {
    it('responds with 200', () => agent.get('/').expect(200));
    it('responds with and object with message `hola`', () =>
        agent.get('/').then((res) => {
          expect(res.body.message).toEqual('hola');
        }));
  });

  describe('GET /test', () => {
    it('responds with 200', () => agent.get('/test').expect(200));
    it('responds with and object with message `test`', () =>
      agent.get('/test').then((res) => {
        expect(res.body.message).toEqual('test');
      }));
  });

  describe('POST /sum', () => {
    it('responds with 200', () => agent.post('/sum').expect(200));
    it('responds with the sum of 2 and 3', () =>
      agent.post('/sum')
        .send({a: 2, b: 3})
        .then((res) => {
          expect(res.body.result).toEqual(5);
        })
    );
        // para que no este hardcode
        it('responds with the product of 5 and 8', () =>
        agent.post('/sum')
          .send({a: 5, b: 8})
          .then((res) => {
            expect(res.body.result).toEqual(13);
          })
      );
  });

  describe('POST /product', () => {
    it('responds with 200', () => agent.post('/product').expect(200));
    it('responds with the product of 2 and 3', () =>
      agent.post('/product')
        .send({a: 2, b: 3})
        .then((res) => {
          expect(res.body.result).toEqual(6);
        })
    );

  });

  describe('function sumArray',()=>{
    const arr = [1,2,3,4]
    it('deberia devolver true si dos numeros sumados son igual a num',()=>{
      expect(sumArray(arr,5)).toBe(true)
    })
    it('deberia devolver false si dos numeros sumados son distintos a num',()=>{
      expect(sumArray(arr,8)).toBe(false)
    })
  })

  describe('POST /sumArray', () => {
    it('responds with 200', () => 
      agent.post('/sumArray')
      .send({array: [2,5,7,10,11,15,20], num: 13}).expect(200));
    it('deberia devolver true si dos numeros sumados dan igual a num ', () =>
      agent.post('/sumArray')
        .send({array: [2,5,7,10,11,15,20], num: 13})
        .then((res) => {
          expect(res.body.result).toEqual(true);
      }));
  });

  
  describe('POST /numString', () => {
    it('responds with 400 si no recibe body', () => 
      agent.post('/numString').expect(400));
    it('devuelve 4 si escribo hola', () =>
      agent.post('/numString')
        .send({word:'hola'})
        .then((res) => {
          expect(res.body.result).toEqual(4);
      }));
  });

  describe('function pluck', () => {
   const array=[{nombre:'fede',apellido:'panella'},{nombre:'mxi',apellido:'vallejo'}]
   it('returnar un array solo de los nombres',()=>{
    expect(pluck(array,'nombre')).toEqual(['fede','mxi'])
   })
  });

  describe('POST a /pluck',()=>{
    const array=[{nombre:'fede',apellido:'panella'},{nombre:'mxi',apellido:'vallejo'}]
    it('si le mando array y nombre devuelve arreglo solo de nombres',()=>{
      agent.post('/pluck')
        .send({array:array,prop:'nombre'})
        .then((res)=>{
          expect(res.body.result).toBe(['fede','mxi'])
        })
    })
  })
});

