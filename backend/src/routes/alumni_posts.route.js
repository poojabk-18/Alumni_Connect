
const express = require('express')
const multer = require('multer')


 const alumniPostsController = require('../controllers/alumni_posts.controller')

 const router = express.Router()

 const upload = multer({storage: multer.memoryStorage()})

 router.post('/post-content',upload.single("image"),alumniPostsController.createPost)


 module.exports = router