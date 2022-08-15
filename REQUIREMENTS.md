# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index '/products' [GET]
- Create '/products/create' [POST] required token
- Show '/products/:id' [GET]
- Update '/products/:id' [PUT] required token
- Delete '/products/:id' [DELETE] required token

#### Users
- Index '/users' [GET] required token
- Create '/users/create' [POST] 
- Show '/users/:id' [GET] required token
- Update '/users/:id' [PUT] required token
- Delete '/users/:id' [DELETE] required token
- Auth '/users/auth' [POST]


#### Orders
- Index '/orders' [GET] required token
- Create '/orders/create' [POST] required token
- Show '/orders/:id' [GET] required token
- Delete '/orders/:id' [DELETE] required token

## Data Shapes
#### products
-  id : integer
- name : varchar
- price: doucble

#### users
- id : integer
- name: varchar
- email: varchar
- password: varchar

#### orders
- id : integer
- user_id : integer
- status (true or false ) : boolean

#### order_products
- order_id : integer
- product_id : integer
- quantity : integer
