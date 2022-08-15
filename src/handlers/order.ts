import { Application, Request, response, Response } from "express";
import { checkAuth } from "../middleware/auth";
import { BaseOrder, OrderMethods } from "../models/order";

const OrderInstance = new OrderMethods;
const index = async (request: Request, respnse: Response) => {
    try {
        const result = await OrderInstance.index();
        respnse.json(result);
    } catch (error) {
        respnse.status(400);
        respnse.send('oder created successfuly');
    }
}

const create = async (request: Request, respnse: Response) => {
    try {
        const order: BaseOrder = {
            "products": request.body.products,
            "user_id": request.body.user_id,
            "status": request.body.status
        };
        const result = await OrderInstance.create(order);
        respnse.json(result);
    } catch (error) {
        console.log(error);
    }
}

const show = async (request: Request, respnse: Response) => {
    try {
        if (request.params.id == undefined ) {
            respnse.status(400);
            respnse.send("Please send order id");
            return;
        }
        const order = await OrderInstance.show(request.params.id as unknown as number);
        respnse.json(order);
    } catch (error) {
        respnse.status(400);
        respnse.send(error);
        console.log(error);
    }
}


const deleteOrder = async (request: Request, respnse: Response) => {
    try {
        if (request.params.id == undefined ) {
            respnse.status(400);
            respnse.send("Please send order id");
            return;
        }
        const order = await OrderInstance.delete(request.params.id as unknown as number);
        respnse.send('order Deleted');
    } catch (error) {
        respnse.status(400);
        respnse.send(error);
        console.log(error);
    }
}
export default function orderRoutes(app: Application){
    app.get('/orders',checkAuth, index);
    app.post('/orders/create',checkAuth, create);
    app.get('/orders/:id', checkAuth, show);
    app.delete('/orders/:id', checkAuth, deleteOrder);

}