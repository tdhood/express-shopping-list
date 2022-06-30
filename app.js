"use strict";

const express = require("express");
const app = express();

const db = require("./fakeDb");


// process JSON body => req.body
app.use(express.json());

// process traditional form data => req.body
app.use(express.urlencoded({ extended: true }));

app.get("/items", function(req, res) {
    return res.json(db.items)
})

app.post("/items", function(req, res) {
    db.items.push({"name": req.body.name, "price": req.body.price})
    console.log("db.items ==", db.items)
    return res.json({
        name: req.body.name, price: req.body.price
    })
})

app.get("/items/:name", function (req,res){
    const name = req.params.name;
    const item = db.items.find(i=> i.name===name)
    console.log(db.items)


    return res.json({item})
})

app.patch("/items/:name", function (req,res){
    const name = req.params.name;
    const item = db.items.find(i=> i.name===name)
    let newname = req.body.name
    let newPrice = req.body.price
    item["name"]=newname
    item["price"]=newPrice
    console.log(item)


    return res.json({"updated":{item}})

})






/** 404 handler: matches unmatched routes. */
app.use(function (req, res) {
    throw new NotFoundError();
  });

  /** Error handler: logs stacktrace and returns JSON error message. */
  app.use(function (err, req, res, next) {
    const status = err.status || 500;
    const message = err.message;
    if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
    return res.status(status).json({ error: { message, status } });
  });


  module.exports = app;
