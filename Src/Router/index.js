import express, { json } from 'express';
import userRoute from './UserRouter/User.js';
import Forget from './Forget/Forget.js'
import Post from './post/Post.js'
import cors from 'cors';

const route=express();
route.use(json())
route.use(cors())
route.use('/',userRoute);
route.use('/forgetpass',Forget)
route.use('/',Post)
export default route;
