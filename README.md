## Image Processing Api
###### Command line
    -to run server use command: npm run start
    -to build server use command: npm run build
    -to watch server use command: npm run watch

#### API Endpoints
###### Products
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

