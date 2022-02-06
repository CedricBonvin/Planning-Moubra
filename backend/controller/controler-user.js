
const User = require("../model/model-user")
const jwt = require("jsonwebtoken")
const { json } = require("express")


exports.connection = async (req,res) => {
    const user = await User.findOne({user : req.body.user})
    if (user){
        if (user.password === req.body.password){
            const token = jwt.sign(
                { user : user.user, password : user.password },
                `${process.env.CLEF_TOKEN}`,
                // { expiresIn: '1m' }
                )
            res.status(200).json({message : "utilisateur trouvé et password correct", token : token})
        }else{
            res.status(401).json({message : "Mot de passe incorrect"})
        }
   } else {
       res.status(401).json({message : "Utilisateur non trouvé"})
   }
}

exports.tryConnection = async (req,res) => {
        console.log(req.body)
    try {
        const token = JSON.parse(req.body.token)
        const decodedToken = jwt.verify(token, `${process.env.CLEF_TOKEN}`)
        const user = await User.findOne({user : decodedToken.user})
        console.log(user)
        if (user){
            if (decodedToken.password === user.password){
                res.status(200).json({message : "le token est valide"})
            } else{
                res.status(500).json({message : "token n'est plus valide"})
            }
        } else{
            res.status(500).json({message : "impossible de trouvé le user"})
        }
    } catch (error) {
        res.status(500).json(error)
    }    
}