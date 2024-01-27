import express from 'express';
import post from '../../Controller/Post/Post.js'
import multer from "multer";
import path from 'path'
import {fileURLToPath} from 'url'

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// destination:function(req,file,cb){
    //     return cb(null,path.join(__dirname,'../../Image/Post'))
    // },
const storage=multer.diskStorage({
    
    filename:function(req,file,cb){
        return cb(null,`${Date.now()}_${file.originalname}`)
    }
})
const upload=multer({storage})

const route=express()
route.post('/postfeed',upload.single('file'),post.postFeed);
route.get('/allfeeds',post.getFeed);
route.delete('/deletefeed/:id',post.deleteFeed);
route.get('/getUpdatefeed/:id',post.getSingleFeed);
route.put('/updatepost',upload.single('file'),post.updatepost);

export default route