import supertest from 'supertest'
import { BaseProduct, ProductMethods } from '../../models/product';
import { BaseUser, User, UserMethods } from '../../models/user';
import app from "../../server";

const request = supertest(app);
const userObject = new UserMethods;
let userResult: User;
let token: string;
const userBaseObject: BaseUser = {'email': 'ahmedmagdy01@gmail.com', 'password': '123456', 'name' : 'ahmed magdy'};
let userId: number;
const product = new ProductMethods;
describe("Test Order Endpoints", () => {

    beforeAll( async() => {
        userResult = await (await userObject.create(userBaseObject));
        await request.post('/users/auth')
        .send({'email': userBaseObject.email, 'password': userBaseObject.password})
        .then((result) => {
            token = result.body
        })
    })

    it('create order', async () => {
        const productBaseModel: BaseProduct = { 'name' : 'Iphone 13', 'price': 20000};
        const productModel = await product.store(productBaseModel);
        await request
            .post('/orders/create')
            .set('Authorization', 'Bearer ' + token)
            .send({
                "user_id": 1,
                "status" : 1,
                "products": [
                    {"product_id": productModel.id, "quantity": 1},
                ]
            })
            .expect(200);
    });

    it('Show order', async () => {
        await request
            .get('/orders/1')
            .set('Authorization', 'Bearer ' + token)
            .expect(200);
    });

    it('return all orders', async () => {
        await request
            .get('/orders')
            .set('Authorization', 'Bearer ' + token)
            .expect(200);
    });

  
}); 