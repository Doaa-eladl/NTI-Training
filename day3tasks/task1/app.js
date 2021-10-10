// student => id,name, age, grade, email  => add , edit, delete, show all, showsingle

// fs, yargs, validator
const yargs = require('yargs')
var uniqid = require('uniqid'); 

const student = require('./modules/student')
yargs.command({
    command: "getAllStudents",
    handler: function(){
        console.log(student.getAll())
    }
})

yargs.command({
    command:"addStudent",
    builder:{
        id:{
            type:"number",
            default: uniqid()
        },
        name:{
            type:"string",
            demandOption:true
        },
        age:{
            type: "number",
            demandOption:true
        },
        grade:{
            type:"number",
            default:0
        },
        email:{
            type:"string",
            demandOption:true
        } 
    },
    handler:function(argv){
        let st = {
            id: argv.id,
            name: argv.name,
            age:argv.age,
            grade:argv.grade,
            email:argv.email
        }
        student.addStudent(st)
    }
})

yargs.command({
    command: "findbyid",
    builder:{
        id:{}
    },
    handler: function(argv){
        //console.log(argv.id)
        student.findbyid(argv.id)
    }
})

yargs.command({
    command: "deletestudent",
    builder:{
        id:{}
    },
    handler: function(argv){
        student.deletestudent(argv.id)
    }
})

yargs.command({
    command: "editstudent",
    builder:{
        id:{},
        targetproperity:{},
        value:{}
    },
    handler: function(argv){
        student.editstudent(argv.id,argv.targetproperity,argv.value)
    }
})
yargs.argv