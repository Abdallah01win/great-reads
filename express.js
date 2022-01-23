const express = require('express');
const path = require('path');
//const cons = require('./src/app/firebase')
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


//Routs
app.get('/', async (req, res) => {
    res.render('index')
})
// Search Rout
app.post('/search', urlencodedParser, async (req, res) => {
    const dataa = await wait(req.body.search);
    const books = dataa.data.items
    const newArray = books.filter(book => {
        if (book.volumeInfo.publishedDate && book.volumeInfo.imageLinks) {
            return book.volumeInfo.imageLinks.thumbnail && parseInt(book.volumeInfo.publishedDate.substring(0, 4)) >= 1950;
        }
    })
    // we can map the results from the api by their IDs and return an array of just IDs 
    // then we can get the index of the the element that was clicked and match it with the index in the IDs array

    // or add an eventlistener to each book and send a post request with the book ID when it's fired.
    const getId = (bookArray) => {
        bookArray.forEach(book => {
            book.addEventListener('click', () => {
                //console.log(book.id);
            })
        });
    }
    res.render('search', { newArray, getId })
})


app.post('/users', jsonParser, async (req, res) => {
    const activeUser = await req.body;
    res.status(200).end()
    userInfo = activeUser[0]
    collectionInfo = activeUser[1]
    //console.log(userInfo)
    console.log(collectionInfo)
})
app.get('/profile', (req, res) => {
    //fetch the data of the user using Document ID
    res.render('profile', {userInfo, collectionInfo});
})

app.listen(process.env.PORT || 6700, () => {
    console.log('listening on env port or 6600')
})