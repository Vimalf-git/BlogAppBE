import postModel from "../../Model/Post/Post.js";
import  cloudnary from 'cloudinary'
import fs from 'fs'
const postFeed=async(req,res)=>{

    // console.log(req.body);
    // console.log(req.file);
    
    cloudnary.config({
        cloud_name:"dfjc0pkpp",
        api_key:"588969669952431",
        api_secret:"SaArGafJGobXIJzjmYNoAKwaEY8"
    })
    console.log('enter into post img');
    try {
        // console.log(req.body);
        // console.log(req.file);
        if(req.file){
       const result= await cloudnary.v2.uploader.upload(req.file.path)
        const newImage=new postModel({
            mail:req.body.mail,
            name:req.body.name,
            tittle:req.body.tittle,
            desc:req.body.desc,
            category:req.body.category,
            imageUrl:result.url,
            public_id:result.public_id
        })
        await newImage.save()
    }else{
        const newImage=new postModel({
        mail:req.body.mail,
        name:req.body.name,
        tittle:req.body.tittle,
        desc:req.body.desc,
        category:req.body.category,
        })
        await newImage.save()
    }
        // await fs.unlink(req.file.path)
        // if(dbRes){
            res.status(200).send({message:'post saved successfully'})
        // }else{
            // res.status(400).send({message:'please try again some after mins'})
        // }        
    } catch (error) {
        res.status(500).send({message:error})
    }
}
const updatepost=async(req,res)=>{
    // console.log('enter');
    // console.log(req.file);
    // console.log(req.body);
    cloudnary.config({
        cloud_name: "dfjc0pkpp",
        api_key: "588969669952431",
        api_secret: "SaArGafJGobXIJzjmYNoAKwaEY8"
    })
    try {
       let resData= await postModel.findOne({_id:req.body.id});
    //    console.log(resData);
       if(resData){
        if(req.file){
            const result= await cloudnary.v2.uploader.upload(req.file.path)
        resData.tittle=req.body.tittle?req.body.tittle:resData.tittle
        resData.desc=req.body.desc?req.body.desc:resData.desc
        resData.category=req.body.category?req.body.category:resData.category
        resData.imageUrl=result.url
        resData.public_id=result.public_id
        }else{
            resData.tittle=req.body.tittle?req.body.tittle:resData.tittle
            resData.desc=req.body.desc?req.body.desc:resData.desc
            resData.category=req.body.category?req.body.category:resData.category
            // await resdata.save()        
        }
        await resData.save()

        res.status(200).send({message:'updated succesfully'})
       }else{
        res.status(400).send({message:'User is Not exist'})
       }

    } catch (error) {
        res.status(500).send({message:error})

    }
}
const getFeed=async(req,res)=>{
try {
    let dbRes=await postModel.find();
    // console.log(dbRes);
    if (dbRes) {
        res.status(200).send({message:'fetched successfully',feeds:dbRes})
    } else {
        res.status(400).send({message:'no exist data'})
    }
} catch (error) {
    res.status(500).send({message:error})
}
}
const getSingleFeed=async(req,res)=>{
try {
    let DbData= await postModel.findOne({_id:req.params.id})
    res.status(200).send({message:'fetched successfully',updateFeed:DbData})
} catch (error) {
    res.status(500).send({message:error})
}
}
const deleteFeed=async(req,res)=>{
    try {
        console.log(req.params.id);
        let resdata=await postModel.deleteOne({_id:req.params.id})
        if(resdata)
        res.status(200).send({message:'deleted successfully'});
    } catch (error) {
        res.status(500).send({message:error})
    }
}
export default{postFeed,getFeed,deleteFeed,getSingleFeed,updatepost}