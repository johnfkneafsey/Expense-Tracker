//import 'babel-polyfill';
import express from 'express';
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const HOST = process.env.HOST;

// new guy
const DATABASE_URL = 'mongodb://localhost/MintLite';
const PORT = 8080;

const {Category, Expense, Goal} = require('./models');

console.log(`Server running in ${process.env.NODE_ENV} mode`);


const app = express();
mongoose.Promise = global.Promise;
const jsonParser = bodyParser.json();

app.use(express.static(process.env.CLIENT_PATH));


//'mongodb://testuser:testpassword@ds137759.mlab.com:37759/easybudgetapp'
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


app.get('/', (req, res) => {
    Category
        .find()
    return (
        res.status(200).json(listOfCheeses)
    );
});

app.post('/category', jsonParser, (req, res) => {
    Category
        .create({
            name: req.body.name
        })
        .then(category => {
            res.status(201).json(category.apiRepr())
        })
        .catch(err => {
            res.status(500).json({error: '500 error'})
        })
});


app.post('/expense', jsonParser, (req, res) => {
    Expense
        .create({
            category: req.body.category,    
            cost: req.body.cost,
            description: req.body.description,
            date: req.body.date
        })
        .then(expense => {
            res.status(201).json(expense.apiRepr())
        })
        .catch(err => {
            res.status(500).json({error: '500 error'});
        })
})


app.post('/goal', jsonParser, (req, res) => {
    Goal
        .create({
            category: req.body.category,
            goal: req.body.goal 
        })
        .then(goal => {
            res.status(201).json(goal.apiRepr())
        })
        .catch(err => {
            res.status(500).json({error: '500 error'});
        })
})


app.get('/category', jsonParser, (req, res) => {
    Category
        .find()
        .exec()
        .then(categories => {
            res.json(categories.map(category => category.apiRepr()))
        })
        .catch(err => {
            res.status(500).json({error: 'Something went horribly wrong'})
        })
})


app.get('/goal', jsonParser, (req, res) => {
    Goal
        .find()
        .exec()
        .then(goals => {
            res.json(goals.map(goal => goal.apiRepr()))
        })
        .catch(err => {
            res.status(500).json({error: 'Something went horribly wrong'})
        })
})


app.get('/expense', jsonParser, (req, res) => {
    Expense
        .find()
        .exec()
        .then(expenses => {
            res.json(expenses.map(expense => expense.apiRepr()))
        })
        .catch(err => {
            res.status(500).json({error: 'Something went horribly wrong'})
        })
})


app.delete('/expense', jsonParser, (req, res) => {
  Expense
    .findByIdAndRemove(req.body.expenseId)
    .exec()
    .then(() => {
      res.status(204).json({message: 'success'});
    })
    .catch(err => {
      res.status(500).json({error: 'something went terribly wrong'});
    });
});
