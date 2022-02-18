const jwt = require ("jsonwebtoken")

const generateActiveToken = (payload) => {
    return jwt.sign(payload, `${process.env.ACTIVE_TOKEN_SECRET}`, {expiresIn: '5m'})
  }
  
  
const generateAccessToken = (payload) => {
    return jwt.sign(payload, `${process.env.ACCESS_TOKEN_SECRET}`, {expiresIn: '15m'})
  }
  

  const generateRefreshToken = (payload) => {
    return jwt.sign(payload, `${process.env.REFRESH_TOKEN_SECRET}`, {expiresIn: '30d'})
  }



  module.exports = { 
      generateActiveToken,
      generateAccessToken,
      generateRefreshToken
  }