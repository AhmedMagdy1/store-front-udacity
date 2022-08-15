import { ProductMethods } from "../../models/product";

const product = new ProductMethods;
describe("Product index function Exist?", () => {
    it('should have an index method', () => {
      expect(product.index).toBeDefined();
    });
    it('should have an store method', () => {
        expect(product.store).toBeDefined();
    });
    it('should have an show method', () => {
        expect(product.show).toBeDefined();
    });
    it('should have an update method', () => {
        expect(product.update).toBeDefined();
    });
    it('should have an delete method', () => {
        expect(product.delete).toBeDefined();
    });
    
  
}); 