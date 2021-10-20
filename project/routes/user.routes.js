const router=require('express').Router()
const UserController=require('../controller/user.controller')
const { verifytokenandauthorization }=require('../middleware/auth.middleware')

//UPDATE
router.put('/update', verifytokenandauthorization , UserController.update)
//DELETE
router.delete('/delete', verifytokenandauthorization , UserController.delete)
//SHOW USER (PROFILE)
router.get('/profile', verifytokenandauthorization , UserController.profile)

module.exports=router