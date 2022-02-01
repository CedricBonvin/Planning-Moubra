const express =require("express")
const router = express.Router()
const ctrlUser = require("../controller/controler-user")

router.post("/try-connection", ctrlUser.tryConnection)
router.post("/user/connection", ctrlUser.connection)


module.exports = router