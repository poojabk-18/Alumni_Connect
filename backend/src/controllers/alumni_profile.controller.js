const alumniProfileModel = require('../models/alumni_profile.model')



async function createProfile(req, res) {


    await alumniProfileModel.create({
        name: req.body.name,
        profession: req.body.profession,
        skills: req.body.skills,
        college: req.body.college,
        email: req.body.email,
        linked_in: req.body.linked_in,
        achievements: req.body.achievements
    })

            res.status(201).json({
        message: 'alumni profile successfully pushed'
    })
}


async function getProfile(req,res) {
    const alumniData = await alumniProfileModel.find()
    res.status(200).json({
            message: 'Alumni profiles fetched successfully',
            alumniProfiles : alumniData
    })
}

module.exports = { createProfile , getProfile}