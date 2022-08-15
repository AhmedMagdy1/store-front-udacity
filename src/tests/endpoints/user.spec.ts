import supertest from 'supertest'
import app from "../../server";

const request = supertest(app);

describe("Test Order Endpoints", () => {

    it('get orders unauthorized no token send', async () => {
        await request
            .get('/orders')
            .expect(401);
    });

    it('create order unauthorized no token send', async () => {
        await request
            .post('/orders/create')
            .expect(401);
    });

    it('get order unauthorized no token send', async () => {
        await request
            .get('/orders/1')
            .expect(401);
    });

    it('delete order unauthorized no token send', async () => {
        await request
            .delete('/orders/1')
            .expect(401);
    });

  
}); 