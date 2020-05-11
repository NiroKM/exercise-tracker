const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');

require('dotenv').config();

const app= express();
const port=process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//open connection to the database using Connection String used as an environment Variable
const uri = process.env.ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser:true,useCreateIndex:true});


const connection=mongoose.connection;
connection.once('open',()=>{
    console.log("MongoDB connected successfully");
})
//

//Using the Routes for the Project in the Server
const exerciseRouter = require('./routes/Exercise');
const usersRourter = require('./routes/Users');

app.use('/exercise',exerciseRouter);
app.use('/users',usersRourter);
//

if(process.env.NODE_ENV === "production"){
    app.use(express.static('../build'))
}

app.listen(port,()=>{
    console.log(`Server is runnig on port: ${port}`);
})
