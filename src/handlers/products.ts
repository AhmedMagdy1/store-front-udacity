import {Application, Request, Response} from "express"
import { checkAuth } from "../middleware/auth";
import { createProductValidation } from "../middleware/product";
import { BaseProduct, Product, ProductMethods } from "../models/product";

const ProductInstance = new ProductMethods;

const index = async (request: Request, respnse: Response) => {
    try{
        const products: Product[] = await ProductInstance.index()
        respnse.json(products);

    }catch(error){
        respnse.status(400);
        respnse.json(error);
    }
}

const store = async (request: Request, respnse: Response) => {
    try{
        const product: BaseProduct = {
            name: request.body.name,
            price: request.body.price
        }
        const result = await ProductInstance.store(product);
        if(result){
            respnse.json('Product created Successfully');
        }

    }catch(error){
        respnse.status(400);
        respnse.json(error);
    }
}

const show = async (request: Request, respnse: Response) => {
    try{
        const id =  (request.params.id) as unknown as number;
        if (id == undefined ) {
            respnse.status(400);
            respnse.send("Please send product id");
            return;
        }
        const result = await ProductInstance.show(id);
        if(!result) respnse.send('Product Not Found');
        respnse.json(result);
    }catch(error){
        respnse.status(400)
        respnse.json(error)
    }
}

const deleteProduct = async (request: Request, respnse: Response) => {
    try {
        const id =  (request.params.id) as unknown as number;
        if (id == undefined ) {
            respnse.status(400);
            respnse.send("Please Send Product id");
            return;
        }
        const result = await ProductInstance.delete(id);
        if(result) respnse.send('Product deleted succesfully');
        else respnse.send('Product Not deleted');
    } catch (error) {
        respnse.status(400)
        respnse.json(error)
    }
}

const update = async (request: Request, respnse: Response) => {
    try{
        
        if(!request.body.name || !request.body.price)
        {
            respnse.status(400);
            respnse.send('please send name, price');
            return;
        }
        if (request.params.id == undefined ) {
            respnse.status(400);
            respnse.send("Please send product id");
            return;
        }
        const product: Product = {
            id: request.params.id as unknown as number,
            name : request.body.name,
            price: request.body.price
        };


        const result: Product = await ProductInstance.update(product);
        respnse.json('Product Created Successfully');
    }catch(error){
        respnse.status(400);
        console.log(error);
        respnse.json(`Can't update product`);
    }
}

export default function ProductRoutes (app:Application){
    app.get('/products', index);
    app.post('/products',[checkAuth, createProductValidation] ,store);
    app.get('/products/:id', show)
    app.put('/products/:id',checkAuth, update)
    app.delete('/products/:id', checkAuth, deleteProduct)


}