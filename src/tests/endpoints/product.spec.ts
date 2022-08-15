import { ProductMethods } from "../../models/product";
import supertest from 'supertest'
import app from "../../server";

const product = new ProductMethods;
const request = supertest(app);

describe("Test Product Endpoints", () => {

    it('get all unauthorized no token send', async () => {
        await request
            .post('/products')
            .expect(401);
    });

    it('update unauthorized no token send', async () => {
        await request
            .put('/products/1')
            .expect(401);
    });

    it('Delete unauthorized no token send', async () => {
        await request
            .delete('/products/1')
            .expect(401);
    });

  
}); 