import { UserMethods } from "../../models/user";

const user = new UserMethods;
describe("user index function Exist?", () => {
    it('should have an index method', () => {
      expect(user.index).toBeDefined();
    });
    it('should have an create method', () => {
        expect(user.create).toBeDefined();
    });
    it('should have an show method', () => {
        expect(user.show).toBeDefined();
    });
    it('should have an update method', () => {
        expect(user.update).toBeDefined();
    });
    it('should have an delete method', () => {
        expect(user.delete).toBeDefined();
    });
}); 