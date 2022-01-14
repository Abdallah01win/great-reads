const axios = require('axios');
const apiToken = "AIzaSyDxuuNaDqsEUc9wp4Wr4lk5BEVJB6Z5Wc8";

function wait(searchTerm = "One Hundred Years of Solitude", lang = "en") {
    let data  = axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${apiToken}&langRestrict=${lang}&maxResults=40&printType=books`) 
return data
}

module.exports = {wait};