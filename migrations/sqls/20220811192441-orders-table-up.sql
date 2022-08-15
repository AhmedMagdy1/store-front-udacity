create table orders (
    id SERIAL PRIMARY KEY,
    user_id integer not null REFERENCES users (id),
    status boolean not null
)