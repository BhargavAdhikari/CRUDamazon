import express from "express";
import productroute from "./routes/product.routes.js";
import sellerroute from "./routes/seller.routes.js";
import buyerroute from "./routes/buyer.routes.js";
const app = express();

app.use(express.json());
app.use(productroute);
app.use(sellerroute);
app.use(buyerroute);

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`The server is running on Port ${PORT}`);
});
