const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Events = require('./models/events');
const events = require('./models/events');



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

app.get('/events/:id', async (req, res) => {
    res.render('events/scarecrowShow')
})





app.listen(3000, () => {
    console.log('serving on Port 3000')
})