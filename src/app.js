import express from "express"
import { __dirname } from "./utilis.js"
import {ManagerProducto}  from "../managerProducto.js"

const app = express()

const managerProducto = new ManagerProducto(__dirname + "/productos.json")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/products", async (req, res) => {
    if (req.url === "/products" && req.method === "GET") {
        const productos = await managerProducto.getProduct()
        res.json({ productos })
    } else {
        const { limit, orden } = req.query
        const productos = await managerProducto.getproductolimite(+limit,orden)
        res.json({ productos })
    }
})



app.post("/", async (req, res) => {
    const producto = req.body
    const nuevoProducto = await managerProducto.addProduct(producto)
    res.json({ message: "Producto creado", producto: nuevoProducto })
})

app.get("/products/:idProducto", async (req, res) => {
    const { idProducto } = req.params
    const producto = await managerProducto.getProductoById(+idProducto)
    res.json({ producto })
})




app.listen(8080, () => {
    console.log("escuchando puerto")
})