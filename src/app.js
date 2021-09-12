const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config.
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// setup handlebars engine and view location.
app.set('view engine', 'hbs');
app.set('views', viewsPath);

// To make common header, footer...
hbs.registerPartials(partialsPath);

// setup static directory for the server.
app.use(express.static(publicDirectoryPath));


app.get('', ( req, res ) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Jae Hyun'
    });
});

app.get('/about', ( req, res ) => {
    res.render('about', {
        title: 'About Me',
        name: 'Jae Hyun'
    });
});

app.get('/help', ( req, res ) => {
    res.render('help', {
        helpText: 'This page is helpful for the support.',
        title: 'Help',
        name: 'Jae Hyun'
    })
});

app.get('/weather', (req, res) => {
    
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an adress.' 
        })
    }
    
    geocode( req.query.address, (error, { latitude, longitude, location } = {}) => {
        
        if(error) {
            return res.send({
                error
            });
        }
        
        forecast( latitude, longitude, (error, forecastData) => {
            if(error){
                res.send({error});
            }
            res.send({
                forecast:forecastData,
                location,
                address: req.query.address
            });
        })
        
    } );
});

app.get('/products', (req,res) => {
    if(!req.query.search) {
        return res.send({
            error: 'you must provide a search term.'
        });
    }
    res.send({
        products: [],
    });
});



app.get('/help/*',  (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Jae Hyun',
        errorMessage: 'Help ariticle not found'
    });
});

app.get('*',  ( req, res ) => { 
    res.render('404', {
        title: '404',
        name: 'Jae Hyun',
        errorMessage: 'Page not found'
    });
});

app.listen(port, () => {
    console.log('Server is up on ' + port);
});