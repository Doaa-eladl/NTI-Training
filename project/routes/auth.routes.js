const router=require('express').Router()
const UserController=require('../controller/user.controller')

//REGITERATION
router.post('/regestier',UserController.regestier)

//LOGIN
router.post('/login',UserController.login)
module.exports=router