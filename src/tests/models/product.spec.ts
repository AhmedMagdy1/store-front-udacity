import { BaseProduct, Product, ProductMethods } from "../../models/product";

const product = new ProductMethods;
const productBaseModel: BaseProduct = { 'name' : 'Iphone 13', 'price': 20000};
const productModel: Product = { 'id': 1, 'name' : 'IPhone 8', 'price': 20000};

describe("Product index function Exist?", () => {

    it('should have an store method', () => {
        expect(product.store).toBeDefined();
    });

    it('test store product function', async () => {
        const result = await product.store(productBaseModel);
        expect(result.name).toBe(productBaseModel.name);
    });

    
    it('should have an index method', () => {
      expect(product.index).toBeDefined();
    });

    it('test get all products', async () => {
        const products = await product.index()
        expect(products.length).toBeGreaterThan(0)
    });

    it('should have an show method', () => {
        expect(product.show).toBeDefined();
    });

    it('show speecific product by id', async () => {
        const products = await product.show(1)
        expect(products.name).toBe(productBaseModel.name);
    });


    it('should have an update method', () => {
        expect(product.update).toBeDefined();
    });

    it('test update product', async () => {
        const products = await product.update(productModel);
        expect(products.name).toBe(productModel.name);
    });

  
}); 