const router=require('express').Router()
const AdminController=require('../controller/admin.controller')
const { verifytokenandauthorizationAndAdmin }=require('../middleware/auth.middleware')
const upload = require("../middleware/fileupload")

//SHOW ALL USERS ******
router.get('/showallusers', verifytokenandauthorizationAndAdmin , AdminController.showallusers)

//show single user ****** ///postman
router.get('/showsingleuser/:id', verifytokenandauthorizationAndAdmin ,AdminController.showsingleuser)

//UPDATE ANY USER
router.put('/updateanyuser/:id', verifytokenandauthorizationAndAdmin , AdminController.updateanyuser)
//show single cart ******
router.get("/showsinglecart/:id" ,verifytokenandauthorizationAndAdmin ,AdminController.showsinglecart)

//show single user orders ****** ///postman
router.get('/showsingleorders/:id' ,verifytokenandauthorizationAndAdmin ,AdminController.showsingleorders)

//DELETE ANY USER ******
router.delete('/deleteanyuser/:id', verifytokenandauthorizationAndAdmin , AdminController.deleteanyuser)
//GET USER STATS ******
router.get('/stats', verifytokenandauthorizationAndAdmin , AdminController.stats)

//ADD PRODUCTS ******
router.post('/addproduct', verifytokenandauthorizationAndAdmin , upload.single('img') , AdminController.product)
//show single product ******
router.get('/showsingle/:id', verifytokenandauthorizationAndAdmin , AdminController.showsingle)
//UPDATE ANY PRODUCT ******
router.put('/updateproduct/:id', verifytokenandauthorizationAndAdmin , AdminController.updateproduct)
//uoload product image ******
router.post('/addproductimg/:id', verifytokenandauthorizationAndAdmin , upload.single('img') , AdminController.addproductimg)
//DELETE PRODUCT ******
router.delete('/deleteanyproduct/:id', verifytokenandauthorizationAndAdmin , AdminController.deleteproduct)


//show all carts ******
router.get("/showcarts" ,verifytokenandauthorizationAndAdmin ,AdminController.showcarts)
//DELETE USER CART BY ADMIN ******
router.delete('/deleteusercart' ,verifytokenandauthorizationAndAdmin ,AdminController.deleteusercart)

//show all orders ******
router.get('/showorders' ,verifytokenandauthorizationAndAdmin ,AdminController.showorders)

//show profits ******
router.get('/showprofits' ,verifytokenandauthorizationAndAdmin ,AdminController.showprofits)

//add new admin ******
router.post('/addnewadmin',verifytokenandauthorizationAndAdmin,AdminController.addnewadmin)

module.exports=router