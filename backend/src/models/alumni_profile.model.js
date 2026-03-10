const mongoose = require('mongoose')

const alumniProfileSchema  = new mongoose.Schema({
    name: String,
    profession : String,
    skills : String,
    college: String,
    email : String,
    linke_in: String,
    achievements : String

})

const alumniProfileModel = mongoose.model('alumniProfile',alumniProfileSchema)

module.exports = alumniProfileModel