import { BaseUser, User, UserMethods } from "../../models/user";

const user = new UserMethods;
const userBaseObject: BaseUser = {'email': 'ahmed.m2gdi@gmail.com', 'password': '123456', 'name' : 'ahmed magdy'};
const userObject: User = {'id' : 1, 'email': 'ahmed.m2gdi00@gmail.com', 'password': '123456', 'name' : 'ahmed magdy abdelghany'};

describe("user index function Exist?", () => {

    it('should have an create method', () => {
        expect(user.create).toBeDefined();
    });

    it('create user fanctionality', async () => {
        const userResult: User = await user.create(userBaseObject);
        const users = await user.index();
        expect(users.length).toBeGreaterThan(0);
    });

    it('should have an index method', () => {
        expect(user.index).toBeDefined();
    });

    it('get all users', async () => {
        const users = await user.index();
        expect(users.length).toBeGreaterThan(0);
    });
  
    it('should have an show method', () => {
        expect(user.show).toBeDefined();
    });

    it('get specific user using id', async () => {
        const users = await user.show(1);
        expect(users.name).toBe(userBaseObject.name);
    });

    it('should have an update method', () => {
        expect(user.update).toBeDefined();
    });

    it('update User Data', async () => {
        const result = await user.update(userObject);
        const users = await user.show(1);
        expect(users.name).toBe(userObject.name);
    });
}); 