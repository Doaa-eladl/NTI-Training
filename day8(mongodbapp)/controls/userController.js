const db=require('../dbConnection/db')
const {ObjectId} = require("mongodb")

class userController{
    static showhome(req,res){
        res.render('home')
    }
    static showall(req,res){
        db((err, dbCilent)=>{
            if(err) res.send('database error')
            dbCilent.collection('tasktype').find().toArray((e, data)=>{
                if(e) res.send("fe error")
                res.render('tasktype/all', {
                    data, 
                    Status: data.length==0?false:true
                })
            })
        })
    }
    static addtasktype(req,res){
        res.render('tasktype/add')
    }
    static sendnewtasktype(req,res){
        db((err, dbCilent)=>{
            if(err) res.send('database error')
            dbCilent.collection('tasktype').insertOne(req.body)
            .then(()=> res.redirect('/all'))
            .catch(()=>res.send('error'))
        })
    }
    static delete(req,res){
        let id = new ObjectId(req.params.id)
        db((err, dbCilent)=>{
            if(err) res.send('database error')
            dbCilent.collection("tasktype").deleteOne({_id:id})
            .then(()=> res.redirect('/all'))
            .catch(e=>res.send(e))
        })
    }
    static edittasktype(req,res){
        let id= new ObjectId(req.params.id)
        db((err, dbCilent)=>{
            if(err) res.send('database error')
            dbCilent.collection('tasktype').findOne({_id:id}, (err, data)=>{
                res.render('tasktype/edit', {data})
            })
        })
    }
    static sendupdeatedtasktype(req,res){
        let id= new ObjectId(req.params.id)
        let newData = req.body
        db((err, dbCilent)=>{
            if(err) res.send('database error')
            dbCilent.collection("tasktype").updateOne(
                {_id: id},
                {$set: {TaskCategory: newData.TaskCategory}}
            )
            .then(res.redirect('/all'))
            .catch(e=>{ res.send('error in edit')})
        })
    }
    static alltask(req,res){
        db((err, dbCilent)=>{
            if(err) res.send('database error')
            dbCilent.collection('tasks').find().toArray((e, data)=>{
                if(e) res.send("fe error")
                res.render('tasks/alltask', {data,
                    Status: data.length==0?false:true
                })
            })
        })
    }
    static addtask(req,res){
        db((err, dbCilent)=>{
            if(err) res.send('database error')
            dbCilent.collection('tasktype').find().toArray((e, data)=>{
                if(e) res.send("fe error")
                res.render('tasks/addtask', {data})
            })
        })
    }
    static sendnewtask(req,res){
        db((err, dbCilent)=>{
            if(err) res.send('database error')
            dbCilent.collection('tasks').insertOne(req.body)
            .then(()=> res.redirect('/alltask'))
            .catch(()=>res.send('error'))
        })
    }
    static deletetask(req,res){
        let id= new ObjectId(req.params.id)
        db((err, dbCilent)=>{
            if(err) res.send('database error')
            dbCilent.collection('tasks').deleteOne({_id:id})
            .then(()=> res.redirect('/alltask'))
            .catch(e=>res.send(e))
        })
    }
    static edittask(req,res){
        let id= new ObjectId(req.params.id)
        db((err, dbCilent)=>{
            if(err) res.send('database error')
            dbCilent.collection('tasktype').find().toArray((e, tasktype)=>{
                if(e) res.send("fe error")
                dbCilent.collection('tasks').findOne({_id:id}, (err, data)=>{
                    if(err) res.send("fe error")
                    res.render('tasks/edittask',{tasktype,data})
                })
            })
        })
    }
    static sendupdeatedtask(req,res){
        let id= new ObjectId(req.params.id)
        let newData = req.body
        db((err, dbCilent)=>{
            if(err) res.send('database error')
            dbCilent.collection("tasks").updateOne(
                {_id: id},
                {$set: {taskName: newData.taskName,TaskCategory:newData.TaskCategory,Details:newData.Details}}
            )
            .then(res.redirect('/alltask'))
            .catch(e=>{ res.send('error in edit')})
        })
    }
    static showsingletask(req,res){
        let id= new ObjectId(req.params.id)
        db((err, dbCilent)=>{
            if(err) res.send('database error')
            dbCilent.collection('tasks').findOne({_id:id}, (err, data)=>{
                if(err) res.send("fe error")
                res.render('tasks/singletask',{data,
                    Status: data.length==0?false:true
                })
            })
        })
    }
    static errorpage(req,res){
        res.render("error")
    }
}
module.exports=userController