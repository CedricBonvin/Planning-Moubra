require("dotenv").config()
const User = require("../model/model-user")
const jwt = require("jsonwebtoken")

module.exports = async (req, res, next) => {
    
    // ici try and catch
    
    try {
        
        const token = JSON.parse(req.body.token) 
        const decodedToken = jwt.verify(token, `${process.env.CLEF_TOKEN}`);
        const user = await User.findOne({user : decodedToken.user})

        if (user){
            if (user.password == decodedToken.password){
                next()
            }else{
                res.status(500).json({message : "Le token ne reconnait pas le password"})
        }
         }else {
        res.status(500).json({message : "User introuvable"})
    }
        
    } catch (err) {
        res.status(301).json({message : "connection time out"})
    }

    
};