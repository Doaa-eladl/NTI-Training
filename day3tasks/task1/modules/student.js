const fs = require('fs')
const validator = require('validator')

// read all data
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
const writeData = (allStudents)=>{
    fs.writeFileSync('data.json', JSON.stringify(allStudents))
}

class Student{
    static getAll(){
        return readData()
    }
    static addStudent(studentData){
       // console.log(studentData)
       if(!validator.isEmail(studentData.email)) return console.log('invalid email')
        let all= readData()
        all.push(studentData)
        writeData(all)
    }
    static findbyid(id){
        //all data i have
        let all=readData()
        all.find(function(stu){
            if(stu.id==id){
                console.log(stu)
                return stu
            }
            else {
                console.log('not found')
                return -1
            }
        })
    }
    static deletestudent(id){
        let all=readData()
        let index=all.findIndex(function(stu,index){ if(stu.id==id) return index})
        if(index!=-1){
            all.splice(index,1)
            writeData(all)
            console.log('deleted')
        }
        else console.log('not found')
    }
    static editstudent(id,targetproperity,value){
        let all=readData()
        let index=all.findIndex((stu,index) =>{if(stu.id==id) {return index}})
        if(index!=-1){
            let student=all[index]
            student[targetproperity]=value
            all.splice(index,1)
            all.push(student)
            writeData(all)
        }
        else{
            console.log('not found')
        }
        console.log(all)
    }
}

module.exports = Student