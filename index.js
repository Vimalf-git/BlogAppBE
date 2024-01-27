import express, { json } from 'express';
import cors from 'cors';
import route from './Src/Router/index.js'
const app=express();

app.use(cors());
app.use(json())
app.use('/',route);

app.listen(8000,()=>console.log(8000+"engine start"));