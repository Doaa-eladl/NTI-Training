const fs = require('fs')

// read all customers data
const readData = () =>{
    let data
    try{
        data = JSON.parse(fs.readFileSync('data.json'))
        if(!Array.isArray(data)) throw new Error()
    }
    catch(e){
        data=[]
    }
    return data
}

//write data
const writeData = (allcustomers)=>{
    fs.writeFileSync('data.json', JSON.stringify(allcustomers))
}

const checkbalance=(balance)=>{
    if(balance<10000) return true
}
class Customer{
    static getAll(){
        return readData()
    }
    static addcustomer(customerData){
        let all= readData()
        if(checkbalance(customerData.balance)){
            all.push(customerData)
            writeData(all)
        }
        else console.log('balance should by less than 10000')
        console.log(all)
    }
    static deletecustomer(id){
        let all=readData()
        let index=all.findIndex(function(customer,index){
            if(customer.id==id) return true
        })
        if(index!=-1){
            all.splice(index,1)
            writeData(all)
            console.log('deleted')
        }
        else console.log('not found')
        console.log(all)
    }
    static editcustomerbalance(id,balance,typeofprocee){
        let all=readData()
        let index=all.findIndex(function(customer,index){if(customer.id==id){return index}})
        if(index!=-1){
            let customer=all[index]
            console.log('found')
            if(typeofprocee=='+'){
                console.log(customer.balance)
                const newbalance=customer.balance+balance
                if(checkbalance(newbalance)){
                    customer.balance +=balance
                    all.splice(index,1)
                    all.push(customer)
                    writeData(all)
                }
                else console.log('balance should by less than 10000')
            }
            else {
                const newbalance=customer.balance-balance
                if(newbalance<0){
                    console.log(`you can't get money more than your balance`)
                }
                else {
                    customer.balance-=balance
                    all.splice(index,1)
                    all.push(customer)
                    writeData(all)
                }
            }
            console.log(customer)
        }
        else {
            console.log('not found')
        }
    }
    static findbyid(id) {
        let all=readData()
        let customer=all.find(function(customer) { if(customer.id==id) return customer})
        if(typeof customer!='undefined') console.log(customer)
        else console.log('not found')
    }
}

module.exports = Customer