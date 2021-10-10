const validator = require('validator')

class  MyValidator{
    static isId(id){
        if(id.length!=14 || (id[0]!=1&&id[0]!=2&&id[0]!=3) || !validator.isNumeric(id)) return false
        else return true
    }
    static isName(name){
        if((name.length<3)||(name.length>20)|| !validator.isAlpha(name)) return false
        else return true
    }
    static isEmail(email){
        if(!validator.isEmail(email)) return false
        else return true
    }
    static isJop(jop){
        if(  !['developer', 'instructor', 'ceo', 'employee'].includes(jop) ) return false
        else return true
    }
    static isUnique(targetproperity,val,alldata){
        let index=alldata.findIndex((user,index)=>{
            if(user[targetproperity]==val) return index
        })
        if(index!=-1) return false
        else return true
    }
}

module.exports=MyValidator