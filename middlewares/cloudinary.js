import cloudinary from 'cloudinary'
import fs from "fs"
cloudinary.config({ 
  cloud_name: process.env.CLOUDNAME, 
  api_key: process.env.KEYCLOUDINARY, 
  api_secret: process.env.APYSECRETCLOUDINARY, 
});
 function uploadCloudinary(req,res,next){
  const regex = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;

  if(!regex.test(req.body.image)){
    cloudinary.uploader.upload(req.file.path,(result,error)=>{
      if(result){

        req.body.image = result.secure_url
        fs.unlinkSync(req.file.path)
        next()
      }else if(error){

            res.status(400).send('bad picture!')
      }
    })
 }
 else {
 req.body.image = req.body.image
 next()}
}

export default uploadCloudinary;



