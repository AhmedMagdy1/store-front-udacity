import {NextFunction, Request, Response} from 'express'

export function createProductValidation(request: Request, response: Response, next: NextFunction): void|boolean{
    if(!request.body.name || !request.body.price){
        response.status(401)
        response.json("Please Provide product name and price")
        return false;
    }
    next();
}