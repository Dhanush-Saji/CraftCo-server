const express = require("express");
const app = express();
const { connection} = require("./Config/db.js");
const cors = require("cors");
const { productRouter } = require("./Routes/Products.routes.js");
const { categoryRouter } = require("./Routes/Category.routes.js");
const { userRouter } = require("./Routes/User.routes.js");
const PORT = process.env.PORT

app.use(cors())
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello home page");
  });
app.use('/products',productRouter)
app.use('/category',categoryRouter)
app.use('/users',userRouter)

  app.listen(PORT,async ()=> {
    try {
        await connection;
        console.log("Connected to DB");
    } catch (error) {
        console.log(error)
    }

    console.log(`Listening on http://localhost:${PORT}`);
  })