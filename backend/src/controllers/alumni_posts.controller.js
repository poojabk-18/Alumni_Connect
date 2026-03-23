const alumniPostsModel = require('../models/alumni_posts.model')
const ImageUrl = require('../services/image_kit.service')

async function createPost(req, res) {

    
   if(req.file){
     const data = await ImageUrl(req.file.buffer)
      await alumniPostsModel.create({
        title: req.body.title,
        description: req.body.description,
        link: req.body.link,
        image: data.url
    })
    
   }
   

    res.status(201).json({message: 'post successfully created'})
}


async function getPost(req,res) {
  const postData =await alumniPostsModel.find()
  res.status(200).json({
    message:"posts fetched successfully",
    data:postData
  })
}

module.exports = {createPost,getPost}