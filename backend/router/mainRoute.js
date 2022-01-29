const express =require("express")
const router = express.Router()
const ctrlSite = require("../controller/controler-site")

router.post("/api/allDates", ctrlSite.allDates)
router.post("/api/putNewDate", ctrlSite.newDate)
router.post("/api/updateDates", ctrlSite.updatDates)
router.post("/api/haute-saison", ctrlSite.hauteSaison)

module.exports = router