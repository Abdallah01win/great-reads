const express = require('express');
const path = require('path');
const { wait } = require('./src/app/getbooks')
const bodyParser = require('body-parser');
const app = express();

//webpack set up
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('./webpack.config');
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
app.post('/search', urlencodedParser, async (req, res) => {
    const dataa = await wait(req.body.search);
    const books = dataa.data.items
    newArray = books.filter(book => {
        if (book.volumeInfo.publishedDate && book.volumeInfo.imageLinks) {
            return book.volumeInfo.imageLinks.thumbnail && parseInt(book.volumeInfo.publishedDate.substring(0, 4)) >= 1900 && book.volumeInfo.pageCount > 60 && book.volumeInfo.categories == ("Fiction");
            /*("City planning" && "Industries" && "Consumer credit" && )*/
        }
    })
    res.render('search', { newArray, collectionInfo})
})


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
    const colKeys = Object.keys(collectionInfo)
    console.log(colKeys)
    res.render('collections', {userInfo, collectionInfo, colKeys});
})
app.post('/book',jsonParser, async (req, res)=>{
    const bookIndex = await req.body[0];
    res.status(200).end();
    console.log(newArray[bookIndex].id);
    book = newArray[bookIndex];
})
app.get('/book', (req, res)=>{
    if (userInfo !== undefined) {
        res.render('book', {book, userInfo, collectionInfo})
    } else{
        res.render('book', {book})
    }
})

app.get('/', async (req, res) => {
    res.render('index', {collectionInfo})
})

app.listen(process.env.PORT || 6700, () => {
    console.log('listening on env port or 6700')
})