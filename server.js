const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan')
const cookieParser = require('cookie-parser');
const cors = require('cors');
const {checkAuth} = require('./controller/checkAuth');
require('dotenv').config()

const app = express();
const port = process.env.PORT || 2000;

const connectDB = async ()=>{
  mongoose.set('strictQuery',true);
    await mongoose.connect(process.env.DB_LINK,()=>{
     console.log('connected to DB')
    })
}


app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(cookieParser());

const authRouter = require('./router/authRouter')
const taskRouter = require('./router/taskRouter')
app.get('/',(req,res)=>{
 res.send('server is online')
})

app.use('/auth', authRouter)

app.use('/task',checkAuth,taskRouter)

app.get('/private',checkAuth,(req,res)=>{
 res.send(req.user)
})

app.listen(port,()=>{
 console.log(`server is running at port ${port}`);
 connectDB()
})