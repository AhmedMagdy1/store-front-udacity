import { query } from "express";
import { PoolClient } from "pg";
import bcrypt from 'bcrypt';
import Client from "../database"
import jwt, {Secret, verify, JwtPayload} from "jsonwebtoken"
import { userWithToken } from "../helpers/jwt";

const {BCRYPT_PASSWORD, SALT_ROUNDS, TOKEN_SECRET} = process.env

export interface BaseUser{
    name: string,
    email: string,
    password: string

}
export interface User extends BaseUser {
    id: number
}

export class UserMethods{
    async index(): Promise<User[]> {
        try{
            const connection = await Client.connect();
            const query = 'select * from users';
            const { rows }  = await connection.query(query);
            connection.release();
            return rows;
        }catch(error){
            throw new Error(`can't get products. ${error}`);
        }
    }

    async show(id: number): Promise<User> {
        try{
            const connection = await Client.connect();
            const query = 'select * from users where id=($1)';
            const result  = await connection.query(query, [id]);
            connection.release();
            return result.rows[0];
        }catch(error){
            throw new Error(`can't find user with ${id}. Error: ${error}`)
        }

    }

    async create(user: BaseUser): Promise<User> {
        try{
            const connection = await Client.connect();
            const queryValidation = "select count(id) from users where email=$1";
            await this.validateEmail(connection, queryValidation, user);
            const query = 'insert into users (name, email, password) values ($1, $2, $3)';
            const result = await connection.query(query, [user.name, user.email, this.hashPassword(user.password)]);
            connection.release();
            return result.rows[0];
        }catch(error){
            throw new Error(`can't create user, Error: ${error}`)
        }
    }

    async update(user: User): Promise<User> {
        try{
            const connection = await Client.connect();
            const queryValidation = "select count(id) from users where email=$1 and id != $2";
            await this.validateEmailInUpdate(connection, queryValidation, user);
            const query = 'update users set name=$1, email=$2, password=$3 where id= $4';
            const result = await connection.query(query, [user.name, user.email, this.hashPassword(user.password), user.id]);
            connection.release();
            return result.rows[0];
        }catch(error){
            throw new Error(`can't create user, Error: ${error}`)
        }
    }

    private async validateEmail(connection: PoolClient, queryValidation: string, user: BaseUser) {
        const validationResult = await connection.query(queryValidation, [user.email]);
        if (validationResult.rows[0].count > 1)
            throw new Error(`Email is Already Exist`);
    }

    private async validateEmailInUpdate(connection: PoolClient, queryValidation: string, user: User) {
        const validationResult = await connection.query(queryValidation, [user.email, user.id]);
        if (validationResult.rows[0].count > 1)
            throw new Error(`Email is Already Exist`);
    }

    async delete (id:number): Promise<Boolean> {
        try{
            const connect = await Client.connect();
            const query = 'delete from users where id=($1)';
            const result = await connect.query(query, [id]);
            connect.release();
            return (result.rowCount) ? true : false;
        }catch(error){
            throw new Error(`can't delete user, Error: ${error}`)
        }
    }

    hashPassword = (password: string) : string => {
        return bcrypt.hashSync(password + BCRYPT_PASSWORD, parseInt(SALT_ROUNDS as unknown as string))
    }
    
    async authntication (email:string, password: string) : Promise<string|null> {
        try {
            const connection = await Client.connect();
            const query = 'select * from users where email=$1';
            const {rows}  = await connection.query(query, [email]);
            connection.release();
            if(rows.length > 0 ){
                if (bcrypt.compareSync(password + BCRYPT_PASSWORD, rows[0].password)) {
                    return userWithToken(rows[0]);
                }
            }
            return null;
        } catch (error) {
            throw new Error(`can't authnticate user, Error: ${error}`)

        }

    }


}