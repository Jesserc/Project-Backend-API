const express =  require ('express');
require('dotenv').config()

const mongoose =  require ("mongoose");
const morgan = require ("morgan")

const cookieParser = require ("cookie-parser")
const cors = require ("cors")

//importing routes
const routes=  require ("./routes/index")




//initializing express
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(morgan('dev'))
app.use(cookieParser())

//using routes
app.use("/api", routes.studentRouter);
app.use("/api", routes.authRouter);


//setting up port
 const PORT = process.env.PORT || 4000

mongoose.connect(process.env.MONGODB_URL, ()=>{
    console.log('Database connected')
}) 


 app.listen(PORT, ()=>{
     console.log( `Server started on port ${PORT}`)
 })