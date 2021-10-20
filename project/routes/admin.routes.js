const router=require('express').Router()
const AdminController=require('../controller/admin.controller')
const { verifytokenandauthorization,verifytokenandauthorizationAndAdmin }=require('../middleware/auth.middleware')


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
//UPDATE ANY PRODUCT
router.put('/updateproduct/:id', verifytokenandauthorizationAndAdmin , AdminController.updateproduct)
//DELETE PRODUCT
router.delete('/deleteanyproduct/:id', verifytokenandauthorizationAndAdmin , AdminController.deleteproduct)
/*SHOW ALL PRODUCTS
Admin or User can see products */
router.get('/showallproducts', verifytokenandauthorization , AdminController.getallproducts)

module.exports=router