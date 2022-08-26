import Client from "../database";

export interface BaseProduct {
    name: string,
    price: number

}
export interface Product extends BaseProduct {
    id: number
}

export class ProductMethods{
    async index(): Promise<Product[]>{
        try{
            const connection = await Client.connect();
            const query = "select * from products";
            const {rows} = await connection.query(query);
            connection.release();
            return rows;
        }catch(error){
            throw new Error(`can't get products. ${error}`);
        }
    }

    async store(product:BaseProduct): Promise<Product> {
        try{
            const connection = await Client.connect();
            const query = 'insert into products (name, price) values ($1, $2) RETURNING *';
            const result = await connection.query(query, [product.name, product.price]);
            connection.release();
            return result.rows[0];
        }catch(error){
            throw new Error(`can't create product, Error: ${error}`)
        }

    }

    async show(id: number): Promise<Product> {
        try{
            const connection = await Client.connect();
            const query = 'select * from products where id=($1)';
            const result  = await connection.query(query, [id]);
            connection.release();
            return result.rows[0];
        }catch(error){
            throw new Error(`can't find product with ${id}. Error: ${error}`)
        }

    }

    async update(product: Product): Promise<Product> {
        try{
            const connection = await Client.connect();
            const query = 'update products set name=$1, price=$2 where id= $3 returning *';
            const result = await connection.query(query, [product.name, product.price, product.id]);
            connection.release();
            return result.rows[0];
        }catch(error){
            throw new Error(`can't update product, Error: ${error}`)
        }
    }

    async delete (id:number): Promise<Boolean> {
        try{
            const connect = await Client.connect();
            const query = 'delete from products where id=($1) returning *';
            const result = await connect.query(query, [id]);
            connect.release();
            return (result.rowCount) ? true : false;
        }catch(error){
            throw new Error(`can't delete product, Error: ${error}`)
        }
    }


}