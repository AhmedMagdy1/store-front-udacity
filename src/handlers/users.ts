import { Application, request, Request, Response } from "express";
import { checkAuth } from "../middleware/auth";
import { BaseUser, User, UserMethods } from "../models/user";
const userInstance = new UserMethods;

const index = async (request: Request, respnse: Response) => {
    try{
        const users: User[] = await userInstance.index();
        respnse.json(users);
    }catch(error){
        respnse.status(200);
        respnse.json(error);
    }
}

const create = async (request: Request, respnse: Response) => {
    try{
        const user: BaseUser = {
            name : request.body.name,
            email: request.body.email,
            password: request.body.password
        };
        
        if(!request.body.name || !request.body.email || !request.body.password)
        {
            respnse.status(400);
            respnse.send('please send name, email and password');
            return;
        }
        const result: User = await userInstance.create(user);
        respnse.json('User Created Successfully');
    }catch(error){
        respnse.status(400);
        respnse.json('Email is Already exist');
    }
}

const show = async (request: Request, respnse: Response) => {
    try{
        const id =  (request.params.id) as unknown as number;
        if (id == undefined ) {
            respnse.status(400);
            respnse.send("Please send user id");
            return;
        }
        const result = await userInstance.show(id);
        if(!result) respnse.send('User Not Found');
        respnse.json(result);
    }catch(error){
        respnse.status(400)
        respnse.json(error)
    }
}

const deleteUser = async (request: Request, respnse: Response) => {
    try {
        const id =  (request.params.id) as unknown as number;
        if (id == undefined ) {
            respnse.status(400);
            respnse.send("Please send user id");
            return;
        }
        const result = await userInstance.delete(id);
        if(result) respnse.send('User deleted succesfully');
        else respnse.send('User Not deleted');
    } catch (error) {
        respnse.status(400)
        respnse.json(error)
    }
}

const update = async (request: Request, respnse: Response) => {
    try{
        
        if(!request.body.name || !request.body.email || !request.body.password)
        {
            respnse.status(400);
            respnse.send('please send name, email and password');
            return;
        }
        if (request.params.id == undefined ) {
            respnse.status(400);
            respnse.send("Please send user id");
            return;
        }
        const user: User = {
            id: request.params.id as unknown as number,
            name : request.body.name,
            email: request.body.email,
            password: request.body.password
        };


        const result: User = await userInstance.update(user);
        respnse.json('User Created Successfully');
    }catch(error){
        respnse.status(400);
        respnse.json('Email is Already exist');
    }
}

const authntication = async (request: Request, respnse: Response) => {
    try {
        if( !request.body.email || !request.body.password)
        {
            respnse.status(400);
            respnse.send('please send email and password');
            return;
        }
        const user = await userInstance.authntication(request.body.email, request.body.password)
        if(user == null){
            respnse.status(400);
            respnse.send('Not Valid User');
            return;
        }
        respnse.json(user);
    } catch (error) {
        respnse.status(400);
        respnse.json('Not Valid User');
    }
}

export default function UserRoutes(app: Application){
    app.get('/users', index);
    app.get('/users/:id', checkAuth, show)
    app.post('/users', create)
    app.put('/users/:id',checkAuth, update)
    app.delete('/users/:id', checkAuth, deleteUser)
    app.post('/users/auth', authntication)
}