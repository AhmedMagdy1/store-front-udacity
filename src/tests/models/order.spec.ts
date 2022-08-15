import { OrderMethods } from "../../models/order";

const order = new OrderMethods;
describe("Order index function Exist?", () => {
    it('should have an index method', () => {
      expect(order.index).toBeDefined();
    });
    it('should have an show method', () => {
        expect(order.show).toBeDefined();
    });
    it('should have an create method', () => {
        expect(order.create).toBeDefined();
    });
    it('should have an delete method', () => {
        expect(order.delete).toBeDefined();
    });
    
  
}); 