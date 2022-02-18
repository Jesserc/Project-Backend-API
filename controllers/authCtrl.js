const Users = require ("../models/userModel")
const bcrypt = require ("bcrypt")
const { generateAccessToken, generateRefreshToken } = require("../utils/generateTokens")
const jwt = require ("jsonwebtoken")

const authCtrl = {

    register: async (req, res) => {

        try {

            const { name, email, password } = req.body

            const user = await Users.findOne({email})
            if(user) return res.status(400).json({msg: 'this user already already exists.'})

            const passwordHash = await bcrypt.hash(password, 12)

            const newUser = { name, email, password: passwordHash }


            const access_token = generateAccessToken({newUser})

            const new_user = new Users(newUser)

            await new_user.save()


            res.status(200).json({msg: "Registration Succesful!", access_token});


            
        } catch (err) {
            return res.status(500).json({msg: err.message})
          }

    },




    login: async (req, res) => {


        try {

            const { email, password } = req.body


            const user = await Users.findOne({email})


            if(!user) return res.status(400).json({msg: 'This account does not exits.'})

            const isMatch = await bcrypt.compare(password, user.password)

            if(!isMatch) {

                return res.status(400).json({ msg: "Incorrect password, please check your password and try again" })
              }


             // if user exists & password match
             const access_token = generateAccessToken({id: user._id})
             const refresh_token = generateRefreshToken({id: user._id})


             res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: `/api/refresh_token`,
                maxAge: 30*24*60*60*1000 // 30days
              })


              res.json({
                msg: 'Login Success!',
                access_token,
                user: { ...user._doc, password: '' }
              })

            
        } catch (err) {
            return res.status(500).json({msg: err.message})
          }

    },



    logout: async(req, res) => {
        try {
          res.clearCookie('refreshtoken', { path: `/api/refresh_token` })
          return res.json({msg: "Logged out!"})
    
        } catch (err) {
          return res.status(500).json({msg: err.message})
        }
    },




    refreshToken: async(req, res) => {

        try {
            const rf_token = req.cookies.refreshtoken

            if(!rf_token) return res.status(400).json({msg: "Please login now!"})
      
            const decoded = jwt.verify(rf_token, `${process.env.REFRESH_TOKEN_SECRET}`)

            if(!decoded.id) return res.status(400).json({msg: "Please login now!"})
      
            const user = await Users.findById(decoded.id).select("-password")

            if(!user) return res.status(400).json({msg: "This account does not exist."})
      
            const access_token = generateAccessToken({id: user._id})
      
            res.json({ access_token, user })


            
          } catch (err) {
            return res.status(500).json({msg: err.message})
          }

    }



}





module.exports = authCtrl;