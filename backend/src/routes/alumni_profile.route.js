const express = require('express')


const alumniController = require('../controllers/alumni_profile.controller')

const router = express.Router()



router.post('/alumni-profile',alumniController.createProfile)
router.get('/alumni-profile',alumniController.getProfile)


module.exports = router