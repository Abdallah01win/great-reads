const express = require('express');
const path = require('path');
const { cons } = require('./src/app/firebase');
const app = express();

//webpack set up

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('./webpack.config');
webpackDevMiddleware(webpack(webpackConfig));


app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, ('public'))));
app.use(express.static(path.join(__dirname, ('dist'))));

app.get('/', (req, res)=>{
    res.render('index', {cons});
});

app.listen(process.env.PORT || 6600, ()=>{
    console.log('listening on env port or 6600')
})