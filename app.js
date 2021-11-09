const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
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


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.get('/', (req, res) => {
    res.render('home')
})


app.get('/events', async (req, res) => {
    const events = await Events.find({});
    res.render('events', {events})
})
app.get('/events/businessShow', async (req, res) => {
    const business = await Business.find({});
    res.render('businessShow', {business})
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




app.listen(3000, () => {
    console.log('serving on Port 3000')
})

