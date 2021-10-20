const router = require("express").Router()
const userController = require('../controls/user')

router.get("", userController.goAll)
router.get("/all", userController.showAll)
router.get("/add", userController.add)

router.get("/single/:id", userController.single)

router.get("/edit/:id", userController.edit)
router.post("/edit/:id",userController.sendeditdata)

router.get("/delete/:id", userController.delete)

router.get("/addPost", userController.addpost)
router.post("/addPost", userController.sendpost)

//لازم تيجي اخر حاجه
router.get("*", userController.error)

module.exports = router