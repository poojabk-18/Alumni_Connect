const mongoose = require('mongoose')

const alumniPostsSchema = new mongoose.Schema({
    title:String,
    description:String,
    link:String,
    image:String
})

const alumniPostsModel = mongoose.model('alumni_posts',alumniPostsSchema)

module.exports = alumniPostsModel