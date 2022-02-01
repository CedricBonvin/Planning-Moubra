
const TabDate = require("../model/model-Jour")


exports.allDates = (req,res) => {
    if (req.body.collaborateur === "Tous"){
        TabDate.find({
            $and : [
                {date : {$gte : req.body.dateDebut}},
                {date : {$lte : req.body.dateFin}},
            ]
        })
        .then(response => res.status(200).json(response) )
        .catch(err => res.status(401).json(err))   
    } else {
        
        TabDate.find({
            $and : [
                {date : {$gte : req.body.dateDebut}},
                {date : {$lte : req.body.dateFin}},
                {$or : [
                    {collab1 : req.body.collaborateur},
                    {collab2 : req.body.collaborateur}
                ]}
            ]
        })
        .then(response => res.status(200).json(response) )
        .catch(err => res.status(401).json(err))
    }
}

exports.basseSaison = async (req,res) => {

    const debut = new Date(req.body.debut)
    const fin = new Date(req.body.fin)

    let err = false
    while(debut <= fin){
        try {
            let weekend = false
            let heureOuverture = 5

            if (debut.getDay() === 6 || debut.getDay() === 0){
                weekend = true
            }
            if (debut.getDay() === 0 || debut.getDay() === 6 || debut.getDay() === 3 ){
                heureOuverture = 7
            }
            if (debut.getDay() === 1 ){
                heureOuverture = 0
            }

            await TabDate.updateOne({date : debut},
                {
                    date : new Date(debut), 
                    weekend : weekend,
                    heureOuverture : heureOuverture,
                    hauteSaison : false
                },
                {upsert : true}
            )
            debut.setDate(debut.getDate() + 1)

        } catch (error) {
            res.status(500).json(error)
            err = true
        }  
    }
    if (err === false){
       await TabDate.find()
        .then(response => res.status(200).json(response) )
        .catch(err => res.status(401).json(err))   
    }else res.status(500).json({message : "problème serveur"})

}

exports.updatDates = async (req,res) => {

    for (let item of req.body.tabNewUpdate){
        await TabDate.updateOne({_id : item.idAModifier}, {...item} )
    }

    res.status(200).json({message : "salut la route"})
}

exports.hauteSaison = async (req, res) => {
    const dateDebut = new Date(req.body.debut) 
    const dateFin = new Date(req.body.fin)
    const error = ""

    while(dateDebut <= dateFin){
        try {
            await TabDate.updateOne({date : dateDebut},
                {
                    heureOuverture : 7,
                    hauteSaison : true
                },
                {upsert : true}
             )
             dateDebut.setDate(dateDebut.getDate() + 1)

        } catch (err) {
            error = err
        }
    }

    if (error){
        res.status(500).json(error)
    }else {
        res.status(200).json({message : "Les dates ont bien été mis à jour"})
    }
}
