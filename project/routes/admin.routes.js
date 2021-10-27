const router=require('express').Router()
const AdminController=require('../controller/admin.controller')
const { verifytokenandauthorizationAndAdmin, verifytokenandauthorization }=require('../middleware/auth.middleware')


//UPDATE ANY USER
router.put('/updateanyuser/:id', verifytokenandauthorizationAndAdmin , AdminController.updateanyuser)
//DELETE ANY USER
router.delete('/deleteanyuser/:id', verifytokenandauthorizationAndAdmin , AdminController.deleteanyuser)
//SHOW ALL USERS
router.get('/showallusers', verifytokenandauthorizationAndAdmin , AdminController.showallusers)
//GET USER STATS
router.get('/stats', verifytokenandauthorizationAndAdmin , AdminController.stats)
//ADD PRODUCTS
router.post('/addproduct', verifytokenandauthorizationAndAdmin , AdminController.product)
//show single
router.post('/showsingle', verifytokenandauthorizationAndAdmin , AdminController.showsingle)
//UPDATE ANY PRODUCT
router.put('/updateproduct/:id', verifytokenandauthorizationAndAdmin , AdminController.updateproduct)
//uoload product image

//DELETE PRODUCT
router.delete('/deleteanyproduct/:id', verifytokenandauthorizationAndAdmin , AdminController.deleteproduct)

//DELETE USER CART BY ADMIN
router.delete('/deleteusercart' ,verifytokenandauthorizationAndAdmin ,AdminController.deleteusercart)

//show all carts
router.get("/showcarts" ,verifytokenandauthorizationAndAdmin ,AdminController.showcarts)
//show single cart
router.post("/showsinglecart" ,verifytokenandauthorizationAndAdmin ,AdminController.showsinglecart)

//show all orders
router.get('/showorders' ,verifytokenandauthorizationAndAdmin ,AdminController.showorders)

//showprofits
//addnewadmin
module.exports=router