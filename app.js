const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const request = require('request');
const bodyParser = require('body-parser');
const Eat = require('./models/events');
const Stay = require('./models/events');
const Events = require('./models/events');
const Business = require('./models/events');



mongoose.connect('mongodb://localhost:27017/stc_events', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();


app.engine('ejs', ejsMate);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

//Bodyparser middleware
app.use(bodyParser.urlencoded({ extended: true }));
//sign up route
app.post('/signup', (req, res) => {
    console.log(req.body)
    res.send('IT WORKED!!')
});


app.get('/', (req, res) => {
    res.render('home')
})



app.get('/eatShowPage', async (req, res) => {
    const eat = await Eat.find({});
    res.render('eatShowPage', {eat})
})
app.get('/stayShowPage', async (req, res) => {
    const stay = await Stay.find({});
    res.render('stayShowPage', {stay})
})
app.get('/events', async (req, res) => {
    const events = await Events.find({});
    res.render('events', {events})
})
app.get('/events/businessShow', async (req, res) => {
    const business = await Business.find({});
    res.render('businessShow', { business })
})


app.get('/events/scarecrowShow', async (req, res) => {
    res.render('events/scarecrowShow')
})
app.get('/events/holidayShow', async (req, res) => {
    res.render('events/holidayShow')
})
app.get('/events/restaurantShow', async (req, res) => {
    res.render('events/restaurantShow')
})


app.get('/itineraries/oneDay', async (req, res) => {
    res.render('itineraries/oneDay')
})
app.get('/itineraries/weekendStay', async (req, res) => {
    res.render('itineraries/weekendStay')
})
app.get('/itineraries/familyFriendly', async (req, res) => {
    res.render('itineraries/familyFriendly')
})




// const PORT = process.env.PORT || 3000;
// app.listen(PORT, console.log(`Serving on ${PORT}`));

app.listen(3000, () => {
    console.log('serving on Port 3000')
})

