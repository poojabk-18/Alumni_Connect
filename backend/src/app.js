const express = require('express')
const cors=require('cors')




 const app = express()

 const alumniProfileRoutes = require('./routes/alumni_profile.route')
 const alumniPostRoutes = require('./routes/alumni_posts.route')




 app.use(express.urlencoded()) //middle wear
 app.use(cors());
 app.use(express.json());




app.use("/api",alumniProfileRoutes)
app.use("/api",alumniPostRoutes)


 module.exports = app



