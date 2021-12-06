const router=require('express').Router()
const UserController=require('../controller/user.controller')
const { verifytokenandauthorization }=require('../middleware/auth.middleware')

//addnewadmin
router.post('/regestier',UserController.regestier)

//LOGIN
router.post('/login',UserController.login)
//LOGOUT
router.get("/logout", verifytokenandauthorization , UserController.logout)
//LOGOUTALL
router.get("/logoutall", verifytokenandauthorization , UserController.logoutall)


/*SHOW ALL PRODUCTS
Admin or User can see products */
router.get('/showallproducts' ,UserController.getallproducts)

//show notebooks category
router.get('/shownotebookproducts' ,UserController.shownotebookproducts)

//show smartphones category
router.get('/showsmartphoneproducts' ,UserController.showsmartphoneproducts)

module.exports=router