const { demandOption, array } = require('yargs')
const yargs=require('yargs')
const user=require('./modules/users')

yargs.command({
    command:"showusers",
    handler:function(){
        console.log(user.showusers())
        //console.log('test')
    }
})

yargs.command({
    command:"adduser",
    builder:{
        id:{ type:"string", demandOption: true},
        name:{ type:"string", demandOption: true},
        job:{ type:"string", demandOption: true},
        email:{ type:"string", demandOption: true},
    },
    handler:function(argv){
        let newuser={
            id:argv.id,
            name:argv.name,
            job:argv.job,
            email:argv.email,
            tasks:[]
        }
        user.adduser(newuser)
    }
})

yargs.command({
    command:"deleteuser",
    builder:{
        id:{}
    },
    handler:function(argv){
        user.deleteuser(argv.id)
    }
})

yargs.command({
    command:"searchbyid",
    builder:{
        id:{}
    },
    handler:function(argv){
        user.searchbyid(argv.id)
    }
})

yargs.command({
    command:"edituser",
    builder:{
        id:{},
        targetproperity:{},
        value:{}
    },
    handler:function(argv){
        user.edituser(argv.id,argv.targetproperity,argv.value)
    }
})

yargs.command({
    command:"addtask",
    builder:{
        id:{type:"string", demandOption:true},
        tasktitle:{type:"string", demandOption:true},
        details:{type:"string", demandOption:true}
    },
    handler:function(argv){
        taskDate = new Date()
        let newtask={
            taskId:Date.now(),
            tasktitle:argv.tasktitle,
            details:argv.details,
            createdAt: `${taskDate.getDate()}-${taskDate.getMonth()+1}-${taskDate.getFullYear()}` 
        }
        user.addtask(argv.id,newtask)
    }
})

yargs.command({
    command:"deletetask",
    builder:{
        id:{},
        taskid:{}
    },
    handler:function(argv){
        user.deletetask(argv.id,argv.taskid)
    }
})
yargs.argv