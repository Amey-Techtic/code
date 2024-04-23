const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/user.routes");
const productRouter = require("./routes/product.routes");
require('dotenv').config();
const app = express();

console.log("app is called");

const PORT = process.env.PORT || 3905;
const DB_URL = process.env.DATABASE;
const mongoDbConnector = require("./config/DB/mongoose");
console.log("DB_URL ", DB_URL);
app.use(express.json());
app.use(cors())
app.use("/users",userRouter);
app.use("/products",productRouter);
app.listen(PORT, ()=>{
    mongoDbConnector.mongoDBConnect(DB_URL);
    console.log(`Server is running on port ${PORT}`);
})

