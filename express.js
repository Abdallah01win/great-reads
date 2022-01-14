const express = require('express');
const path = require('path');
const { cons } = require('./src/app/firebase');
const {wait} = require('./src/app/getbooks')
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


//Routs
app.get('/', async (req, res) => {
const dataa = await wait();
const books = dataa.data.items
console.log(dataa)
res.render('index', {cons, books})
})


app.listen(process.env.PORT || 6700, () => {
    console.log('listening on env port or 6600')
})