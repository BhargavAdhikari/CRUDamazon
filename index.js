import express from "express";
import productroute from "./routes/product.routes.js"
import sellerroute from "./routes/seller.routes.js"
const app = express();



app.use(express.json());
app.use(productroute);
app.use(sellerroute)

const PORT = 8000;



app.listen(PORT, ()=>{
    console.log(`The server is running on Port ${PORT}`);
})