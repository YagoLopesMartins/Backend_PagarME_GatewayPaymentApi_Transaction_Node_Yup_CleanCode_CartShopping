import { Router } from "express"

import CartsController from "./controllers/CartsController.js";
import TransactionsController from "./controllers/TransactionsController.js";
import PostBackController from "./controllers/PostBackController.js";

const routes = new Router()

routes.get("/carts", CartsController.index)
routes.post("/carts", CartsController.create)
routes.put("/carts/:id", CartsController.update)
routes.delete("/carts/:id", CartsController.destroy)

routes.post("/transations", TransactionsController.create)

routes.post("/postbacks/pagarme", PostBackController.pagarme)

export default routes