const fs=require('fs')

//read from file
const readfile=function(){
    let data
    try{
        data=JSON.parse(fs.readFileSync('./data.json'))
        if(!Array.isArray(data)) throw new Error()
    }
    catch(e){
        data=[]
    }
    return data
}

const writedata=function(data){
    fs.writeFileSync('./data.json',JSON.stringify(data))
}

class user{
    static goAll(req,res){
        let data = {title:'show all users'}
        res.render('all',data)
    }
    static showAll(req,res){
        let alldata=readfile()
        let data = {
            title:'show all users',
            alldata,
            statues:alldata.length==0?false:true
        }
        res.render('all',data)
    }
    static add(req,res){
        let data = {title:'add new user'}
        //هو انا بعمل كده عشان خاطر الفورم بايديفولت بترجع تريفريش علي نفس الصفحه صح؟
        if(req.query.userName){
            let newuser={id:Date.now(),name:req.query.userName,age:req.query.age}
            let alldata=readfile()
            alldata.push(newuser)
            writedata(alldata)
            res.redirect('/all')
        }
        else{
            res.render('add',data)
        }
    }
    static error(req,res){
        let data = {title:'page not found'}
        res.render('errorpage',data)
    }
    static single(req,res){
        let id=req.params.id
        let alldata=readfile()
        let user=alldata.find((user)=>{return user.id==id})
        let data = {title:'show single user',user:false}
        if(user) data.user=user
        res.render('single',data)
    }
    static edit(req,res){
        let id=req.params.id
        let alldata=readfile()
        let user=alldata.find((user)=>{return user.id==id})
        //مش هحتاج اتشيك وجوده لان اصلا مش هيكون ف زرار غير لو في user 
        let data = {title:'edit user',user:false}
        //انا بعتاله داتا جواها يوزر بس روحت قرات يوزر بس عادي بقدر يوصل للي جوه علطول
        if( user )  data.user=user,
        res.render('edit',data)
    }
    static sendeditdata(req,res){
        //ليه مششتغلتش ب req.body.id
        let id=req.params.id
        let alldata=readfile()
        let user=alldata.find((user)=>{return user.id==id})
        if(user){
            user.name=req.body.name
            user.age=req.body.age
            writedata(alldata)
        }
        res.redirect('/all')
    }
    static delete(req,res){
        let id=req.params.id
        let alldata=readfile()
        let index=alldata.findIndex( user => {return user.id==id})
        console.log(index)
        if(index!=-1) {
            alldata.splice(index,1)
            writedata(alldata)
        }
        res.redirect('/all')
    }
    static addpost(req,res){
        let data = {title:'add user'}
        res.render('addPost',data)
    }
    static sendpost(req,res){
        let data = {title:'add user'}
        if(req.body.userName){
            let newuser={id:Date.now(),name:req.body.userName,age:req.body.age}
            let alldata=readfile()
            alldata.push(newuser)
            writedata(alldata)
            res.redirect('/all')
        }
        else{
            res.render('addPost',data)
        }
    }
}

module.exports=user