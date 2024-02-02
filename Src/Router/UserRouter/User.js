import express from 'express';
import UserCreate from '../../Controller/UserController/UserCreate.js'
import Login from '../../Controller/UserController/Login.js'
import multer from 'multer';
import Auth from '../../Auth/Auth.js';
const route=express();

const storage=multer.diskStorage({
    
    filename:function(req,file,cb){
        return cb(null,`${Date.now()}_${file.originalname}`)
    }
})
const upload=multer({storage})

// route.post('/postfeed',upload.single('file'),post.postFeed);
route.post('/createuser',UserCreate.create)
route.post('/login',Login.Login)
route.get('/getuserlist',Auth.validate,UserCreate.getUserList)
route.put('/updateprofile',upload.single('profilePic'),UserCreate.updateUserInfo)
route.get('/getUser/:email',Auth.validate,UserCreate.getuser)
export default route;