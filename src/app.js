const path = require('path')
const express = require('express')
const hbs = require ('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express();
const port = process.env.PORT || 3000

// Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebar and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title : 'Weather App',
        name : "Ma'mun Ramdhan"
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title : 'About Page',
        name : `Ma'mun Ramdhan`
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title : 'Help Page',
        list : {
            list1 : 'User Guide',
            list2 : 'Navigation',
            list3 : 'Contact Administrator'
        }
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            err : 'You must provide location to search!'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) { 
            return res.send({
                err : error
            })
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    err : error
                })
            }
            res.send({
                forecast : forecastData,
                location,
                address : req.query.address
            })
        })

    })

    
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({                                       //'return' its used to provide that after send response in if condition its res.send below doesn't execute too 
            err : 'You must provide a search term!'             //it's awesome than to use else statement
        })
    }
    console.log(req.query);
    res.send({
        products : []
    })
})

app.get('/help/*', (req, res) => {
    res.render('article-not-found', {
        title : 'Article Not Found!',
        errorMessage : `This WebApp not contain Help Article at this moment, Maybe will be available soon.`
    })
})

app.get('*', (req, res) => {
    res.render('404-error', {
        title : '404 Not Found!',
        errorMessage : 'You just access forbiden Page/Method Please Go Back'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
})