const express = require('express')
const mongoose = require('mongoose');
const prodctRoute = require('./Routes/productRoute.js');
const errorMiddleware = require('./middleware/errorMiddleware.js');
require('dotenv').config()

const app = express();
PORT = process.env.PORT || 3000;

const uri = "mongodb+srv://Madhur240:SrTzlrjlEvEwouGo@cluster1.s5ifwgs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1";
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//routes
app.use('/api/products',prodctRoute);

app.get('/', (req, res) => {
    throw new Error('fake error');
   // res.send('Hello NODE API')
})

app.get('/blog', (req, res) => {
    res.send('Hello Blog, My name is Devtamin')
})

app.use(errorMiddleware);

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected!')

        app.listen(PORT, () => {
            console.log("Node API app is running on port 3000")
        })
    });