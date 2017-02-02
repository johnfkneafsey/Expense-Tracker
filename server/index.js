//import 'babel-polyfill';
import express from 'express';
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
/*old
const HOST = process.env.HOST;
const PORT = 8080;
*/
// new guy
const DATABASE_URL = 'mongodb://testuser:testpassword@ds137759.mlab.com:37759/easybudgetapp';
const PORT = 37759;

const {Category, Expense, Goal} = require('./models');

console.log(`Server running in ${process.env.NODE_ENV} mode`);


const app = express();
mongoose.Promise = global.Promise;
const jsonParser = bodyParser.json();

app.use(express.static(process.env.CLIENT_PATH));

/* old guy
//'mongodb://testuser:testpassword@ds137759.mlab.com:37759/easybudgetapp'
function runServer() {
    return new Promise((resolve, reject) => {
        mongoose.connect('mongodb://testuser:testpassword@ds137759.mlab.com:37759/easybudgetapp', function(err){
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
*/


// NEW GUY
let server;

function runServer(databaseUrl=DATABASE_URL, port=PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }

      app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    });
  });
}

// `closeServer` function is here in original code

if (require.main === module) {
  runServer().catch(err => console.error(err));
};




app.get('/', (req, res) => {
    Category
        .find()
    return (
        res.status(200).json(listOfCheeses)
    );
});

app.post('/category', jsonParser, (req, res) => {
    console.log(req.body, 'BODY FROM CATEGORY ENDPOINT');
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


app.post('/expense', jsonParser, (req, res) => {
    console.log(req.body, 'BODY FROM EXPENSE ENDPOINT');
    Expense
        .create({
            category: req.body.category,    
            cost: req.body.cost,
            description: req.body.description,
            date: req.body.date
        })
        .then(expense => {
            console.log(expense, "CONSOLE LOGGING EXPENSE RES");
            res.status(201).json(expense.apiRepr())
        })
        .catch(err => {
            res.status(500).json({error: '500 error'});
        })
})


app.post('/goal', jsonParser, (req, res) => {
    console.log(req.body, 'BODY FROM GOALS ENDPOINT');
    Goal
        .create({
            category: req.body.category,
            goal: req.body.goal 
        })
        .then(goal => {
            console.log(goal, "CONSOLE LOGGING GOAL RES");
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
            console.log(err);
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
            console.log(err);
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
            console.log(err);
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
      console.error(err);
      res.status(500).json({error: 'something went terribly wrong'});
    });
});
