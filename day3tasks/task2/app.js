const yargs=require('yargs')
var uniqid = require('uniqid'); 

const customers = require('./modules/customers');
const Customer = require('./modules/customers');

yargs.command({
    command: "showcustomers",
    handler: function(){
        console.log(customers.getAll())
    }
})

yargs.command({
    command:"addcustomer",
    builder:{
        id:{
            type:"number",
            default: uniqid()
        },
        name:{
            type:"string",
            demandOption:true
        },
        balance:{
            type: "number",
            demandOption:true
        }
    },
    handler:function(argv){
        let customer = {
            id: argv.id,
            name: argv.name,
            balance:argv.balance,
        }
        customers.addcustomer(customer)
    }
})

yargs.command({
    command: "deletecustomer",
    builder:{
        id:{}
    },
    handler: function(argv){
        customers.deletecustomer(argv.id)
    }
})

yargs.command({
    command: "editcustomerbalance",
    builder:{
        id:{},
        balance:{},
        typeofprocee:{}
    },
    handler: function(argv){
        customers.editcustomerbalance(argv.id,argv.balance,argv.typeofprocee)
    }
})

yargs.command({
    command:"findbyid",
    builder:{
        id:{}
    },
    handler:function(argv) {
        customers.findbyid(argv.id)
    }
})
yargs.argv