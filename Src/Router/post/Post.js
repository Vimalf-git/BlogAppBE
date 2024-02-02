import express from 'express';
import post from '../../Controller/Post/Post.js'
import multer from "multer";
import Auth from '../../Auth/Auth.js'

const storage=multer.diskStorage({
    
    filename:function(req,file,cb){
        return cb(null,`${Date.now()}_${file.originalname}`)
    }
})
const upload=multer({storage})

const route=express()
route.post('/postfeed',upload.single('file'),post.postFeed);
route.get('/allfeeds',Auth.validate,post.getFeed);
route.delete('/deletefeed/:id',post.deleteFeed);
route.get('/getUpdatefeed/:id',Auth.validate,post.getSingleFeed);
route.put('/updatepost',upload.single('file'),post.updatepost);

export default route