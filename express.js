const express = require('express');
const path = require('path');
const { cons } = require('./src/app/firebase');
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

//Routs
app.get('/', async (req, res) => {
    res.render('index', { cons })
})
app.post('/search', urlencodedParser, async (req, res) => {
    //console.log(req.body.search);
    const dataa = await wait(req.body.search);
    const books = dataa.data.items
    const newArray = books.filter(book => {
        if (book.volumeInfo.publishedDate && book.volumeInfo.imageLinks) {
            return book.volumeInfo.imageLinks.thumbnail && parseInt(book.volumeInfo.publishedDate.substring(0, 4)) >= 1950;
        }
    })
    const getId = (bookArray) => {
        bookArray.forEach(book => {
            book.addEventListener('click', ()=>{
                console.log(book.id);
            })
        });

    }
    res.render('search', { newArray, getId })
})


app.listen(process.env.PORT || 6700, () => {
    console.log('listening on env port or 6600')
})