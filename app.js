const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

//connect to db
mongoose.connect('mongodb://localhost:27017/designblog', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//EJS
app.set('view engine', 'ejs');

//import routes
const blogRoutes = require('./routes/blog');
const portfolioRoutes = require('./routes/portfolio');

//use routes
app.use('/blog', blogRoutes);
app.use('/portfolio', portfolioRoutes);

// home route
app.get('/', (req, res) => {
    res.render('index');
});

//server

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
