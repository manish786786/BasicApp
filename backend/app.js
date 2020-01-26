const express = require('express');
const app = express();
app.use(express.json())
const mongoose = require('./database/mongoose')

//database schema
const userData = require('./database/models/userData')

/*
CORS - cross origin resquest security
localhost:3000 = backend
localhost:4200 = frontend
this allow to access our backend from any origin
 */
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Accept,Origin,X-Requested-With');
    next();
});


//crud operation
//getAll
//http://localhost:3000/list  //get
app.get('/get', (req, res) => {
    userData.find({})
        .then((list) =>
            res.send(list))
        .catch((error) =>
            console.log(error))
})

//get one row
//http://localhost:3000/list/5e2d860cb8c9266651218d42  //get
app.get('/get/:id', (req, res) => {
    userData.find({_id: req.params.id})
        .then((list) =>
            res.send(list))
        .catch((error) =>
            console.log(error))
})

//create
//http://localhost:3000/list  // post
app.post('/create', (req, res) => {
    (new userData({ "name": req.body.name, "surname": req.body.surname, "address": req.body.address }))
        .save()
        .then((list) =>
            res.send({status:200,message:'Entry Saved successfully'}))
        .catch((error) =>
            console.log(error))
})

//update one row
//http://localhost:3000/list/5e2d860cb8c9266651218d42  //patch
app.patch('/update/:id', (req, res) => {
    userData.findOneAndUpdate({_id: req.params.id},{$set : { "name": req.body.name, "surname": req.body.surname, "address": req.body.address }})
        .then((list) =>
            res.send({status:200,message:"updated successfully"}))
        .catch((error) =>
            console.log(error))
})

//delete
//http://localhost:3000/list/5e2d860cb8c9266651218d42  //delete
app.delete('/delete/:id', (req, res) => {
    userData.findOneAndDelete({_id:req.params.id})
        .then((list) =>
            res.send({status:200,message:'Deleted successfully'}))
        .catch((error) =>
            console.log(error))
})




app.listen(3000, () => console.log("server is running on port 3000"))