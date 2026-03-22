const alumniPostsModel = require('../models/alumni_posts.model')
const ImageUrl = require('../services/image_kit.service')

async function createPost(req, res) {

    const data = await ImageUrl(req.file.buffer)
    await alumniPostsModel.create({
        title: req.body.title,
        description: req.body.description,
        link: req.body.link,
        image: data.url
    })
    

    res.status(201).json({message: 'post successfully created'})
}

module.exports = {createPost}