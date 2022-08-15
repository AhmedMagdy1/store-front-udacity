
import {NextFunction, Request, Response} from 'express'
import jwt, {Secret} from "jsonwebtoken"

export function checkAuth(request: Request, response: Response, next: NextFunction): void|boolean{
    try {
        if (!request.headers.authorization) {
            response.status(401)
            response.json("Token is Invalid")
            return false
        }        
        const token = request.headers.authorization.split(" ")[1]
        jwt.verify(token, process.env.TOKEN_SECRET as Secret);
        next()
      } catch (err) {    
        console.log(err);
        response.status(401)
        response.json("Token is Invalid")
        return false
      }
    
}