const router=require('express').Router()
const UserController=require('../controller/user.controller')
const { verifytokenandauthorization }=require('../middleware/auth.middleware')

//UPDATE
router.put('/update', verifytokenandauthorization ,UserController.update)
//DELETE
router.delete('/delete', verifytokenandauthorization ,UserController.delete)
//SHOW USER (PROFILE)
router.get('/profile', verifytokenandauthorization ,UserController.profile)
/*SHOW ALL PRODUCTS
Admin or User can see products */
router.get('/showallproducts', verifytokenandauthorization ,UserController.getallproducts)

//show notebooks category
router.get('/shownotebookproducts', verifytokenandauthorization ,UserController.shownotebookproducts)

//show smartphones category
router.get('/showsmartphoneproducts', verifytokenandauthorization ,UserController.showsmartphoneproducts)

//ADD TO CART
router.post("/addtocart" , verifytokenandauthorization ,UserController.addtocart)
//show my own cart
router.get('/showcart', verifytokenandauthorization ,UserController.showcart)
//delete my cart
router.get("/deletecart" , verifytokenandauthorization ,UserController.deletecart)

//increase quantity of products in cart
router.post("/increasequantity",verifytokenandauthorization ,UserController.increasequantity)
//decrease quantity of products in cart
router.post("/decreasequantity", verifytokenandauthorization ,UserController.decreasequantity)
//delete from cart (delete product id)
router.post("/deleteproductfromcart", verifytokenandauthorization ,UserController.deleteproductfromcart)

//showorder
router.post('/showorder', verifytokenandauthorization ,UserController.showorder)
//Confirmation the order
router.post('/confirmation', verifytokenandauthorization ,UserController.confirmation)

//send order
router.post('/sendorder', verifytokenandauthorization ,UserController.sendorder)

module.exports=router