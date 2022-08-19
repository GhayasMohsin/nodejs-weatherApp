const forecast = require('../utils/forecast')
const positionstackURL = require('../utils/positionstackURL')
const express = require('express')
const path = require('path')
const hbs = require('hbs')

const app = express()

//configuring paths
// console.log(path.join(__dirname,'./public/index.html'))
const indexPath=path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//configuring the settings for the handlebars
app.set('view engine', 'hbs')
app.set('views', viewsPath)  //renaming the views
hbs.registerPartials(partialsPath)


app.use(express.static(indexPath))

//dynamic web page using the express hbs package
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ghayas'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About ceo',
        name: 'Ghayas Mohsin',
        designation: 'Software Engineer Trainee',
        company: 'Speridian Technologies'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        statement: 'Kindly Contact',
        title: 'Help Me',
        name: 'What can we do for you!   (ghayas)'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        res.send({ error: 'No address found! Address is required' })
    }
    else {
        positionstackURL(req.query.address, (error, { latitude, longitude, location }) => { //using destructuring as it comes response so we use to get its prop.
            if (error) {
                return res.send({error})
            }
            forecast(latitude, longitude, (error, data) => {
                if (error === undefined) {
                    res.send({
                        address: req.query.address,
                        location,
                        forecast: data
                    })
                } else { console.log('Error', error) }
            })
        })
    }
})

app.get('/help/*', (req, res) => {
    res.render('404', { title: '404', message: 'Help article not found' })
})
app.get('*', (req, res) => {
    res.render('404', { title: '404', message: 'Page not found' })
})

app.listen(3000, () => {
    console.log('Server is started')
})







































// app.get('', (req, res) => {
//     res.send('<h1>Home Page</h1>')
// })

// app.get('/help', (req, res) => {
//     app.use(express.static(helpPath))
//     // res.re   nder(helpPath)
// })

// app.get('/about', (req, res) => {
//     res.render(aboutPath)
// })