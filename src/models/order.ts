import { query } from "express";
import Client from "../database";
import { Product } from "./product";

export interface OrderProduct {
    product_id: number,
    quantity: number
  }
  
export interface BaseOrder{
    products: OrderProduct[],
    user_id: number,
    status: boolean
}
export interface Order extends BaseOrder {
    id: number
}

export class OrderMethods{
    async index(): Promise<Order[]> {
        try{
            const connection = await Client.connect()
            const query = "SELECT id, user_id, status FROM orders"
            const {rows} = await connection.query(query)
            const orderProductQuery = "SELECT product_id, quantity FROM order_products WHERE order_id=($1)"
            const orders:Order[] = []
            for (const order of rows) {
                const {rows: orderProductRows} = await connection.query(orderProductQuery, [order.id])
                orders.push({ ...order, products: orderProductRows })
            }
            connection.release()
            return orders;
            }catch(error){
            throw new Error(`can't get orders. ${error}`);
        }
    }
    
    async create(order: BaseOrder): Promise<Boolean> {
        try {
            const connection = await Client.connect()
            const query = "insert into orders (user_id, status) values ($1, $2) Returning id";
            const {rows} = await connection.query(query, [order.user_id, order.status]);
            for(const orderProduct of order.products ){
                const queryOrderProduct = "insert into order_products (product_id, quantity, order_id) values ($1, $2, $3)";
                const {rows: orderProductRows} = await connection.query(queryOrderProduct, [orderProduct.product_id, orderProduct.quantity, rows[0].id]);
            }
            return true;            
        } catch (error) {
            throw new Error(`can't create order. ${error}`);
        }
    }

    async show(id: number): Promise<Order|null> {
        try {
            const connection = await Client.connect();
            const query = "select * from orders where id=$1";
            const {rows} = await connection.query(query, [id]);
            if(rows.length > 0){
                const order: Order = rows[0];
                const query = "select product_id, quantity from order_products where order_id=$1";
                const {rows: orderProductrow} = await connection.query(query, [rows[0].id]);
                const result: Order = {
                    "id": rows[0].id,
                    "user_id": rows[0].user_id,
                    "status": rows[0].status,
                    "products": orderProductrow[0],

                }
                return result;
            }
            return null;
        } catch (error) {
            console.log(error)
            throw new Error(`can't get order. ${error}`);

        }
    }

   async delete(id: number): Promise<Boolean> {
    try {
        const connection = await Client.connect();
        const query = "delete from orders where id=$1";
        const {rows} = await connection.query(query, [id]);
        if(rows.length > 0){
            return true;
        }
        return false;
    } catch (error) {
        console.log(error)
        throw new Error(`can't delete order. ${error}`);

    }

   }
}

