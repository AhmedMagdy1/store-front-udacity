import { BaseOrder, OrderMethods } from "../../models/order";
import { BaseProduct, Product, ProductMethods } from "../../models/product";
import { BaseUser, User, UserMethods } from "../../models/user";

const order = new OrderMethods;
const product = new ProductMethods;
const user = new UserMethods;
const productBaseModel: BaseProduct = { 'name' : 'IPhone', 'price': 20000};
const productModel: Product = { 'id': 1, 'name' : 'IPhone 8', 'price': 20000};
let productId: number;
let orderModel: BaseOrder;
describe("Order Model Testing", () => {

    it('create order function', async () => {
        await product.store(productBaseModel);
        const products = await product.index();
        productId = products[0].id;
        const userBaseObject: BaseUser = {'email': 'ahmed.m2gdi11@gmail.com', 'password': '123456', 'name' : 'ahmed magdy'};
        const userResult: User = await user.create(userBaseObject);
        const userData = await user.index()
        orderModel = {'products': [{'product_id' : productId, 'quantity': 2}] , 'status': true, 'user_id' : userData[0].id}    
        await order.create(orderModel);
        const result = await order.index()
        expect(result.length).toBeGreaterThan(1);
    });

    it('should have an index method', () => {
      expect(order.index).toBeDefined();
    });

    it('get all orders', async () => {
        const result = await order.index()
        expect(result.length).toBeGreaterThan(0);
      });
  

    it('should have an show method', () => {
        expect(order.show).toBeDefined();
    });

    it('get specific order', async () => {
        const orderResult = await order.show(productId);
        expect(orderResult?.id).toBe(productId);
    });

        
  
}); 