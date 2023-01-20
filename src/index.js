const express = require("express")
const mongoose = require("mongoose")
const route = require("./route/router")
const app = express()

app.use(express.json())

mongoose.connect("mongodb+srv://Priyanka19:G8reXRlHUbBX65ev@plutonium01.9fxu8wj.mongodb.net/CompanyDB", {
    useNewUrlParser: true
})
    .then(() => console.log("mongodb is connected"))
    .catch((err) => console.log(err.message))

app.use("/", route)

app.listen(3000, function () {
    console.log("connected" + 3000)
})