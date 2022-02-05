const express = require('express');
const path = require('path');
const { wait } = require('./src/app/getbooks')
const bodyParser = require('body-parser');
const app = express();

//webpack set up
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('./webpack.config');
const { default: axios } = require('axios');
webpackDevMiddleware(webpack(webpackConfig));

// EJS and Static Files
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, ('public'))));
app.use(express.static(path.join(__dirname, ('dist'))));

//Body Parser
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const jsonParser = bodyParser.json()
collectionInfo = "";


// Search Rout
app.post('/search', jsonParser, async (req, res) => {
    newArray = await req.body;
    res.status(200).end();
})
app.get('/search', (req, res)=>{
    res.render('search', { newArray, collectionInfo})
})
app.post('/book',jsonParser, async (req, res)=>{
    const bookIndex = await req.body[0];
    res.status(200).end();
    console.log(newArray[bookIndex].id);
    const bookId = newArray[bookIndex].id;
    book = newArray[bookIndex];
})
app.get('/book', (req, res)=>{
    res.render('book', {book, collectionInfo})
})

//User Data rout
app.post('/users', jsonParser, async (req, res) => {
    activeUser = await req.body;
    res.status(200).end();
    userInfo = activeUser[0];
    collectionInfo = activeUser[1];
    console.log(userInfo);
    console.log(collectionInfo);
})
app.get('/profile', (req, res) => {
    res.render('profile', {userInfo, collectionInfo});
})
app.get('/collections', (req, res) => {
    res.render('collections', {userInfo, collectionInfo});
})

app.get('/', async (req, res) => {
    res.render('index', {collectionInfo})
})

app.listen(process.env.PORT || 6700, () => {
    console.log('listening on env port or 6700')
})