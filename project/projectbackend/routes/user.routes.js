const router=require('express').Router()
const UserController=require('../controller/user.controller')
const { verifytokenandauthorization }=require('../middleware/auth.middleware')

//UPDATE
router.put('/update', verifytokenandauthorization ,UserController.update)
//change password
router.put('/changepass', verifytokenandauthorization ,UserController.changepass)

//DELETE
router.delete('/delete', verifytokenandauthorization ,UserController.delete)
//SHOW USER (PROFILE)
router.get('/profile', verifytokenandauthorization ,UserController.profile)

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
router.get('/showorder', verifytokenandauthorization ,UserController.showorder)
//Confirmation the order
//router.post('/confirmation', verifytokenandauthorization ,UserController.confirmation)

//send order
router.get('/sendorder', verifytokenandauthorization ,UserController.sendorder)
//show user orders
router.get('/showuserorder', verifytokenandauthorization ,UserController.showuserorder)

module.exports=router