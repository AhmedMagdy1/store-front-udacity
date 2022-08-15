create table order_products (
    order_id integer not null REFERENCES orders(id) ON DELETE CASCADE,
    product_id integer not null REFERENCES products(id),
    quantity integer not null
)