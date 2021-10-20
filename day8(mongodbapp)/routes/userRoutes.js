const router=require('express').Router()
const userController=require('../controls/userController')

router.get('',userController.showhome)
router.get('/all',userController.showall)

router.get('/add',userController.addtasktype)
router.post('/add',userController.sendnewtasktype)

router.get('/delete/:id',userController.delete)

router.get('/edit/:id',userController.edittasktype)
router.post('/edit/:id',userController.sendupdeatedtasktype)

router.get('/alltask',userController.alltask)

router.get('/addtask',userController.addtask)
router.post('/addtask',userController.sendnewtask)

router.get('/deletetask/:id',userController.deletetask)

router.get('/edittask/:id',userController.edittask)
router.post('/edittask/:id',userController.sendupdeatedtask)

router.get('/singletask/:id',userController.showsingletask)

router.get('*',userController.errorpage)

module.exports=router