import 'babel-polyfill';
import express from 'express';
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const HOST = process.env.HOST;
const PORT = process.env.PORT || 8080;

const {Category, Expense} = require('./models');

console.log(`Server running in ${process.env.NODE_ENV} mode`);

const app = express();
mongoose.Promise = global.Promise;
const jsonParser = bodyParser.json();

app.use(express.static(process.env.CLIENT_PATH));

app.get('/', (req, res) => {
    Category
        .find()
    return (
        res.status(200).json(listOfCheeses)
    );
});

app.post('/category', jsonParser, (req, res) => {
    console.log(req.body, 'body from user endpoint');
    Category
        .create({
            name: req.body.name
        })
        .then(category => {
            console.log(category, "CONSOLE LOGGING CATEGORY RES")
            res.status(201).json(category.apiRepr())
        })
        .catch(err => {
            res.status(500).json({error: '500 error'})
        })

});

function runServer() {
    return new Promise((resolve, reject) => {
        mongoose.connect('mongodb://localhost/MintLite', function(err){
        if(err) {
            return reject(err);
        }
        app.listen(PORT, HOST, (err) => {
        if (err) {
            console.error(err);
            reject(err);
        }
        const host = HOST || 'localhost';
        console.log(`Listening on ${host}:${PORT}`);
     });
   });
        
    });
}

if (require.main === module) {
    runServer();
}
