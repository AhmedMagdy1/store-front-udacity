import { ProductMethods } from "../../models/product";
import supertest from 'supertest'
import app from "../../server";
import { BaseUser, User, UserMethods } from "../../models/user";
import { response } from "express";

const product = new ProductMethods;
const request = supertest(app);
const userObject = new UserMethods;
let userResult: User;
let token: string;
const userBaseObject: BaseUser = {'email': 'ahmedmagdy@gmail.com', 'password': '123456', 'name' : 'ahmed magdy'};

describe("Test Product Endpoints", () => {

    beforeAll( async() => {
        userResult = await (await userObject.create(userBaseObject));
        await request.post('/users/auth')
        .send({'email': userBaseObject.email, 'password': userBaseObject.password})
        .then((result) => {
            token = result.body
        })
    })

    it('create product test', async () => {
        await request
            .post('/products')
            .send({'name': 'Iphone 13' , 'price': 25000})
            .set('Authorization', 'Bearer ' + token)
            .expect(200);
    });

    it('get all products', async () => {
        await request
            .get('/products')
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
            .then((response) => {
                expect(response.body.length).toBeGreaterThan(0)
            });
    });

    it('get specific product', async () => {
        await request
            .get('/products/1')
            .expect(200)
    });

  
}); 