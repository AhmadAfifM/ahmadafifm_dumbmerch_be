const express = require("express");

const PORT = 5006;

//Take Router
const routers = require("./src/routes");

const app = express();

app.use(express.json());

//CRUD nonDB
app.use("/api/v1/", routers);

app.use("/uploads", express.static("uploads"));
app.listen(PORT, () => console.log(`Server Running On PORT:${PORT}`));
