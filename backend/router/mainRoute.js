const express =require("express")
const router = express.Router()
const ctrlSite = require("../controller/controler-site")
const auth = require("../middleware/auth")

router.post("/api/allDates", auth, ctrlSite.allDates)
router.post("/api/basse-saison", auth, ctrlSite.basseSaison)
router.post("/api/updateDates", auth, ctrlSite.updatDates)
router.post("/api/haute-saison", auth, ctrlSite.hauteSaison)

module.exports = router