const express = require('express');
const app = express();
const mongoose = require('mongoose')
const dotenv = require('dotenv/config');

const authRoute = require('./routes/auth.js')
const loginRoute = require('./routes/login.js')
const postRoute = require('./routes/post')

mongoose.connect(process.env.DB_CONNECTION_STRING,{useNewUrlParser :true},()=> console.log('connected to DB!!!'))

app.use(express.json());
app.use('/api/user',authRoute);
app.use('/login',loginRoute);
app.use('/api/posts',postRoute);


app.listen(3000 , () => console.log("listenning on 3000"));