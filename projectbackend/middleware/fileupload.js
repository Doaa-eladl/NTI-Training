const multer = require('multer')
const fs= require('fs')
const path = require('path')

const storage = multer.diskStorage({
    destination:function(req, file, cb){
        let loc = "C:/Users/eladl/Desktop/ntiTraining/tasks/projectfrontend/src/assets"
        fs.mkdir(loc, (err)=>{})
        cb(null, loc)
    },

    filename: function(req, file, cb){
        const myFileName = req.params.id+path.extname(file.originalname)
        console.log(myFileName)
        cb(null,myFileName)
    }
})

const upload = multer({
    storage,
    limits:{fileSize:200000000}
})

module.exports = upload