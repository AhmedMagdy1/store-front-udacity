import jwt, {Secret, verify, JwtPayload} from "jsonwebtoken"
import { User } from "../models/user";

function getPayload(token: string) {
    return verify(token as string, getTokenSecret()) as JwtPayload;
}

function isAuth(userId: number|null, payload: JwtPayload){
    return userId && payload.user.id == userId;
}

function userWithToken ( user:User ) {
    return jwt.sign(user, getTokenSecret())
}
function getTokenSecret()
{
    return process.env.TOKEN_SECRET as Secret
}

export { userWithToken, getPayload };
