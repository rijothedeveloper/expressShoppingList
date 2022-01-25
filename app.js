const express = require("express");
const ExpressError = require("./expressError");
const userRoutes = require("./routes")

const app = express()
app.use(express.json());

app.use("/shop", userRoutes)

// 404 error
app.use( (req, res, next) => {
    throw new ExpressError("not found", 404)
})

app.use( (error, req, res, next) => {
    const message = error.message
    const status = error.status
    res.status(status).json({
        error: {message: message, status: status}
    })
})

module.exports = app