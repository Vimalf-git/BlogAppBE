import express, { json } from 'express';
import cors from 'cors';
import route from './Src/Router/index.js'
const app=express();

app.use(cors());
app.use(express.json())
app.use('/',route);
const port=process.env.PORT
app.listen(port,()=>console.log(port+"engine start"));