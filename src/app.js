const path = require("path")
const express = require("express")
const hbs = require("hbs")
const geocode = require('./Utils/GeoCode')
const forecast  = require('./Utils/forecast')

const app = express()

//Define paths for express config
const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


//setup handel bar engines and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//set up static directory to serve
app.use(express.static(publicDirPath))

app.get('',(req,res) =>{
    res.render('index',{
        title :'Weather',
        name :'Shivangi Soni'
    })//allow to render our view
})
app.get('/about',(req,res) =>{
    res.render('about',{
        title :'Incredible India !!!',
        name : 'Shivangi Soni'
    })

})

app.get('/help',(req,res)=>{
    res.render('help',{
        title : 'This is some Helpful text',
        name :'Shivangi Soni'
    })
})

app.get('/weather',(req,res) =>{
    if(!req.query.address){
        return res.send({
            error : "you must provide an address"
        })
    }
   geocode(req.query.address, (error, {latitude,longitude, location} ={})=>{
       if(error){
           return res.send({error})
       }
       forecast(latitude, longitude,(error,forecastData)=>{
           if(error){
               return res.send({error})
           }

           res.send({
               forecast : forecastData,
               location,
               address : req.query.address
           })
       })
   })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:"you must provide a search term"
        })
    }
    console.log(req.query.search)
    res.send({
        products :[]
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title :'404 ',
        name :'Shivangi Soni',
        errorMessage :'Help Article Not Found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title :'404',
        name :'Shivangi Soni',
        errorMessage :'Page Not Found'
    })
})
//app.com
//app.com/help
//app.com/about

app.listen(3000, ()=>{
    console.log("Server is up on port 3000")
})
