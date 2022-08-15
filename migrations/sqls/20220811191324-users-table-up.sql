create table users (
    id SERIAL PRIMARY KEY,
    name varchar (255) NOT NULL,
    email VARCHAR ( 255 ) UNIQUE NOT NULL,
	password VARCHAR ( 100 ) NOT NULL
);