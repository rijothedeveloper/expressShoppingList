const express = require("express");
const router = new express.Router()
const items = require("./fakeDB")
const expressError = require("./expressError");
const app = require("./app");

router.get("/items", (req, res) => {
    res.json(items)
})

router.post("/items", (req, res) => {
    const item = {
        name: req.body.name,
        price: req.body.price
    }
    items.push(item)
    res.json({addded: item})
})


router.get("/items/:name", (req, res) => {
    const name = req.params.name
    const item = items.find(e => e.name === name)
    if (item === undefined){
        throw new expressError("name cant find", 404)
    }
    res.json(item)
})

router.patch("/items/:name", (req, res) => {
    const searchName = req.params.name
    const name = req.body.name
    const price = req.body.price
    const curritem = items.find(e => e.name === searchName)
    if (curritem === undefined){
        throw new expressError("name cant find", 404)
    }
    curritem.name = name
    curritem.price = price
    res.json(curritem)
})

router.delete("/items/:name", (req, res) => {
    const searchName = req.params.name
    const index = items.findIndex(e => e.name === searchName)
    if (index === -1){
        throw new expressError("name cant find", 404)
    }
    items.splice(index, 1)
    res.json({message: "Deleted"})
})

module.exports = router