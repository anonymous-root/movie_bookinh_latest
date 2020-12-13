const express = require('express');
const app = express(); 
const cors = require('cors');
const ejs = require('ejs');
require('./model/mongoose');
const stateRouter = require('./router/stateRouter');
const cityRouter = require('./router/cityRouter');
const movieRouter = require('./router/movieRouter');
app.use(express.json());
app.use(express.static('./public'));
app.use(stateRouter);
app.use(cityRouter);
app.use(movieRouter);
app.use(cors());
app.set('view engine','ejs');
app.get('/',(req,res)=>{
    res.render('index');
    });
app.listen(3001,() =>{
    console.log("Server is running 3001");
});