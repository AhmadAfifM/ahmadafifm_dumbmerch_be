const express = require("express");

const PORT = 5006;

//Take Router
const routerTodo = require("./src/routes");

const app = express();

app.use(express.json());

//CRUD nonDB
app.use("/api-v1/", routerTodo);

app.listen(PORT, () => console.log(`Server Running On PORT:${PORT}`));
