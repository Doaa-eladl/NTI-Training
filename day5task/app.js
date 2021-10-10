const path=require('path')
const https = require('https')

const express=require('express')
const app=express()

const hbs=require('hbs')
app.set('view engine','hbs')

//pathes
staticpath=path.join(__dirname,'public')
viewpath=path.join(__dirname,'frontend/views')
layoutspath=path.join(__dirname,'frontend/layouts')

//use
app.use(express.static(staticpath))
app.set('views',viewpath)
hbs.registerPartials(layoutspath)

//routes
app.get('',(req,res)=>{
    res.render('home',{
        title:'home page'
    })
})
app.get('/contact',(req,res)=>{
    res.render('contact',{
        title:'contact page'
    })
})

app.get('/table',(req,res)=>{
    const apiUrl = "https://jsonplaceholder.typicode.com/posts?_limit=10"
    let result = ""
    const reqq = https.request(apiUrl, (ress)=>{
        ress.on('data', (dataPart)=>{
            result+=dataPart.toString()
        })
        ress.on('end', ()=>{
            res.render('table',{
                title:'table page',
                data:JSON.parse(result)
            })
        })
    })
    reqq.end()
})

app.get('*',(req,res)=>{
    res.render('erorr404',{
        title: 'erorr 404',
    })
})
app.listen(3000,()=>{
    console.log('end run')
})