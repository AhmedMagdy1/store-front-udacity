import supertest from 'supertest'
import app from "../../server";

const request = supertest(app);

describe("Test User Endpoints", () => {

    it('get user unauthorized no token send', async () => {
        await request
            .get('/users/1')
            .expect(401);
    });

    it('update unauthorized no token send', async () => {
        await request
            .put('/users/1')
            .expect(401);
    });

    it('Delete unauthorized no token send', async () => {
        await request
            .delete('/users/1')
            .expect(401);
    });

  
}); 