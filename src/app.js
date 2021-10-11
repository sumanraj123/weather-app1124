const express = require('express');
const path = require('path');
const geocode =  require('./utils/geocode');
const forecast = require('./utils/forecast');

const hbs = require('hbs');
const app =express();
const port = 3000;
// console.log(__dirname);
// console.log(__filename);
// Define path for express config
const pathdirectorypath = path.join(__dirname,'../public');
const viewspath = path.join(__dirname,'../templates/views');
const partialspath = path.join(__dirname,'../templates/partials')


//setup handelbars engine and views location
 app.set('view engine','hbs');
 app.set('views',viewspath);
 hbs.registerPartials(partialspath);
 
 //setup static diretorypath to serve

app.use(express.static(pathdirectorypath));


app.get('',(req,res)=>
{
    res.render('index',{
        title:'weather map',
        name:'sumanraj',

    })
})
app.get('/about',(req,res)=>
{
    res.render('about',{
        companyname:'bitcot Technologies',
        services :'Ios and Android Development',
        title:'about',
        name:'Sumanraj'
    })
})

app.get('/help',(req,res)=>
{
    res.render('help',{
        support:'bitcot technologies.com',
        contactnumber:'123456789',
        name:'sumanraj',
        title:'Help'
    })
})
app.get('/help/*',(req,res)=>
{
    res.send('Help Article not found')
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location }={}) => {
        if (error) {
            return res.send({ error })
            
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
            
        })
    })
})





app.get('/products',(req,res)=>
{
    if(!req.query.search)
    {
        return res.send({error:'Provide a value search optiions in the URL'});
    }
 res.send({
     products :[]
 })
})
app.get('*',(req,res)=>
{
    res.render('404',{
        title:'page not found',
        name:'sumanraj'
    })
})

app.listen(3000,()=> console.log("The server is running on port 3000"));