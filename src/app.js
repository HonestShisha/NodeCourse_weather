const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express();
const port = process.env.PORT || 3000

// Define path for express config
const publicDirectoryPath = path.join(__dirname, '../Public')
const viewsDirectoryPath = path.join(__dirname, '../templates/views')
const partialsDirectoryPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views loaction
app.set('view engine', 'hbs')
app.set('views', viewsDirectoryPath)
hbs.registerPartials(partialsDirectoryPath)

// Setup starting dir to serve
app.use(express.static(publicDirectoryPath))

// app.com
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Shisha'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Shisha'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Stop it, get some help.',
        title: 'Help page',
        name: 'Shisha'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.location) {
        return res.send({
            error: 'You must provide location'
        })
    }
    geocode(req.query.location, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }
        
        forecast(latitude, longitude, (error, {temperature, feelsLike, weatherType, windSpeed} = {}) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
            res.send({
                latitude,
                longitude,
                location,
                temperature,
                feelsLike,
                weatherType,
                windSpeed
            })
        })
        
    })
})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        res.send({
            error: 'You must provide a search term'
        })
        return
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'help article not found',
        title: '404',
        name: 'Shisha'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'page not found',
        title: '404',
        name: 'Shisha'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port )
})