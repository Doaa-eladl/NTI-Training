const router=require('express').Router()
const UserController=require('../controller/user.controller')
const { verifytokenandauthorization }=require('../middleware/auth.middleware')

//REGITERATION
router.post('/regestier',UserController.regestier)

//LOGIN
router.post('/login',UserController.login)
//LOGOUT
router.post("/logout", verifytokenandauthorization , UserController.logout)
//LOGOUTALL
router.post("/logoutall", verifytokenandauthorization , UserController.logoutall)
module.exports=router