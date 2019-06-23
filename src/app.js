const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();


// Define paths for Express config
const publicPathDirectoryFile = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicPathDirectoryFile));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather index',
        name: 'Swithen'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Swithen'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'This is help page',
        name: 'Swithen'
    });
});

app.get('/weather', (req, res) => {
    var address = req.query.address;
    if(!address) {
        return res.send({
            error: 'Please provide address'
        });
    }

    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({
                error: error
            });
        }
        
        forecast(latitude,longitude, (error, forecastData) => {
            if(error) {
                return res.send({
                    error: error
                });
            }
            res.send({
                location: location,
                forecast: forecastData,
                address: address
            });
          })
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
       title: '404',
       errorMsg: 'Help page not found',
       name: 'Swithen'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
       title: '404',
       errorMsg: 'Page not found',
       name: 'Swithen'
    });
});



app.listen(3000, () => {
    console.log('Server is started on port 3000');
});