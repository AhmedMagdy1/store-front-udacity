import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import ProductRoutes from './handlers/products'
import UserRoutes from './handlers/users'
import orderRoutes from './handlers/order'
const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

ProductRoutes(app);
UserRoutes(app);
orderRoutes(app);

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
