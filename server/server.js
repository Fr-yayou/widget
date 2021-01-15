const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
require('dotenv/config')
const PORT = process.env.PORT || 5001

const app = express()


app.use(cors({
    credentials: true
}))
app.use(express.json())



//Connect DB//
mongoose.connect(process.env.MONGO_URI,
    { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
    .then(() => { console.log("connected DB") })
    .catch(err => console.log(err))

// Import Routes//
const userRoutes = require("./routes/user")
const spotifyRoutes = require("./routes/spotify")
const authRoutes = require("./routes/google")
const weatherRoutes = require("./routes/weather")
const aboutRoutes = require("./routes/about")





//Use Routes//
app.use("/users", userRoutes);
//Route api google//
app.use("/auth", authRoutes);
//Route weather widgets//
app.use("/weather", weatherRoutes)
//Route spotify widgets//
app.use("/spotify", spotifyRoutes)
// about.json route
app.use("", aboutRoutes)


app.listen(PORT, () => console.log(`Server started on port ${PORT}`))