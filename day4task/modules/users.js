const fs=require('fs')
const MyValidator=require('./myvalidator')

const readdata=()=>{
    let data;
    try{
        data=JSON.parse(fs.readFileSync('data.json'))
        if(!Array.isArray(data)) throw new Error()
    }
    catch(e){
        console.log('msh tmam')
        data=[]
    }
    return data
}

const writedata=function(alldata){
    fs.writeFileSync('data.json',JSON.stringify(alldata))
}

class User{
    static showusers(){
        return readdata()
    }
    static adduser(newuser){
        try{
            if(!MyValidator.isId(newuser.id)) throw new Error('invalid id')
            if(!MyValidator.isEmail(newuser.email)) throw new Error('invalid email')
            if(!MyValidator.isName(newuser.name)) throw new Error('invalid name')
            if(!MyValidator.isJop(newuser.job)) throw new Error('invalid job')

            let alldata=readdata()

            if(!MyValidator.isUnique("id",newuser.id, alldata)) throw new Error('id used before')
            if(!MyValidator.isUnique("email",newuser.email, alldata)) throw new Error('email used before')
            
            alldata.push(newuser)
            writedata(alldata)
        }
        catch(e){
            console.log(e.message)
        }
    }
    static deleteuser(id){
        let alldata=readdata()
        let index=alldata.findIndex(function(user,index){
            if(user.id==id) return index
        })
        if(index!=-1){
            alldata.splice(index,1)
            writedata(alldata)
            console.log('deleted')
        }
        else console.log('user not found')
    }
    static searchbyid(id){
        let alldata=readdata()
        let index=alldata.findIndex((user,index)=>{
            if(user.id==id) return index
        })
        if(index!=-1) console.log(alldata[index])
        else console.log('user not found')
    }
    static edituser(id,targetproperity,value){
        let alldata=readdata()
        let index=alldata.findIndex((user,index)=>{
            if(user.id==id) return index
        })
        if(index!=-1){
            try{
                if(targetproperity=='job'){
                    if(!MyValidator.isJop(value)) throw new Error('invalid job')
                }
                if(targetproperity=='email'){
                    if(!MyValidator.isEmail(value)) throw new Error('invalid email')
                    if(!MyValidator.isUnique("email",value, alldata)) throw new Error('email used before')
                }
                if(targetproperity=='name'){
                    if(!MyValidator.isName(value)) throw new Error('invalid name')
                }
                if(targetproperity=='id'){
                    if(!MyValidator.isId(value)) throw new Error('invalid id')
                    if(!MyValidator.isUnique('id',value, alldata)) throw new Error('id used before')
                }
                alldata[index][targetproperity]=value
                writedata(alldata)
                console.log(alldata[index])
            }
            catch(e){
                console.log(e.message)
            }
        }
        else console.log('not found')
    }
    static addtask(id,newtask){
        let alldata=readdata()
        let index=alldata.findIndex((user,index)=>{
            if(user.id==id) return index
        })
        if(index!=-1){
            alldata[index].tasks.push(newtask)
            writedata(alldata)
            console.log(alldata[index].tasks)
        }
        else console.log('user not found')
    }
    static deletetask(userid,taskid){
        let alldata=readdata()
        let index=alldata.findIndex((user,index)=>{
            if(user.id==userid) return index
        })
        if(index!=-1){
            for(let i=0;i<alldata[index].tasks.length;i++){
                if(alldata[index].tasks[i].taskId==taskid) {
                    alldata[index].tasks.splice(i,1)
                    writedata(alldata)
                }
            }
        }
        else console.log('not found')
        console.log(alldata[index])
    }
}

module.exports=User