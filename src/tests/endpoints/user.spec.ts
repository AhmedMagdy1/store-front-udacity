import { response } from 'express';
import supertest from 'supertest'
import { BaseUser, User, UserMethods } from '../../models/user';
import app from "../../server";

const request = supertest(app);
const userObject = new UserMethods;
let userResult: User;
let token: string;
const userBaseObject: BaseUser = {'email': 'ahmedmag576@gmail.com', 'password': '123456', 'name' : 'ahmed magdy'};
describe("Test User Endpoints", () => {

    beforeAll( async() => {
        userResult = await (await userObject.create(userBaseObject));
        await request.post('/users/auth')
        .send({'email': userBaseObject.email, 'password': userBaseObject.password})
        .then((result) => {
            token = result.body
        })
    })

    it('user is logged in', async () => {
        await request.post('/users/auth')
        .send({'email': userBaseObject.email, 'password': userBaseObject.password})
        .expect(200)
    });

    it('return all users', async () => {
        await request
            .get('/users')
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
            .then( (response) => {
                expect(response.body.length).toBeGreaterThan(0)
            });
    });

    it('show specific user', async () => {
        await request
            .get('/users/1')
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
    });

  
}); 
