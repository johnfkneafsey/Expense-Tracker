const mongoose = require('mongoose');

const categoriesSchema = mongoose.Schema({
  name: {type: String, required: true}
})

categoriesSchema.methods.apiRepr = function () {
  return {
    id: this._id,
    name: this.name
  };
};

const expensesSchema = mongoose.Schema({
		category: {type: String, required: true},
		cost: {type: Number, required: true},
		description: {type: String, required: true},
    date: {type: String, required: true}
})

expensesSchema.methods.apiRepr = function() {
  return {
    id: this._id,
    category: this.category,
    cost: this.cost,
    description: this.description,
    date: this.date
  };
}

const goalsSchema = mongoose.Schema({
  category: {type: String, required: true},
  goal: {type: Number, required: true}
})

goalsSchema.methods.apiRepr = function () {
  return {
    id: this._id,
    category: this.category,
    goal: this.goal
  };
};

const Goal = mongoose.model('Goal', goalsSchema);
const Category = mongoose.model('Category', categoriesSchema);
const Expense = mongoose.model('Expense', expensesSchema);

module.exports = {Category, Expense, Goal};