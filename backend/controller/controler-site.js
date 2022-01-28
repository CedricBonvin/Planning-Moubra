
const TabDate = require("../model/model-Jour")


exports.allDates = (req,res) => {

    console.log(req.body)
    TabDate.find({
        $and : [
            {date : {$gt : req.body.dateDebut}},
            {date : {$lte : req.body.dateFin}},
        ]
    })
    .then(response => res.status(200).json(response) )
    .catch(err => res.status(401).json(err))   
}

exports.newDate = async (req,res) => {

    const debut = new Date(req.body.debut)
    const fin = new Date(req.body.fin)

    let err = false
    while(debut < fin){
        try {
            let weekend = false
            if (debut.getDay() === 6 || debut.getDay() === 0){
                weekend = true
            }
            console.log(debut.getDay())
            await TabDate.updateOne({date : debut},{date : new Date(debut), weekend : weekend}, {upsert : true})
        } catch (error) {
            res.status(500).json(error)
            err = true
        }  
        debut.setDate(debut.getDate() + 1)
    }
    if (err === false){
        console.log("salut")
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