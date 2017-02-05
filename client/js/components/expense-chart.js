import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import store from '../store';
import {Radar} from 'react-chartjs-2';
import {Doughnut} from 'react-chartjs-2';

export class ExpenseChart extends React.Component {
	constructor(props) {
    	super(props);
  	}


      radarData () {
		let totalExpenses = {} 

		for (let i=0; i<this.props.categories.length; i++) {
			let temp = this.props.categories[i].name;
			totalExpenses[temp] = 0;
			for(let k=0; k<this.props.expenses[0].length; k++){
				let newTemp = this.props.expenses[0];
				if (newTemp[k].category === temp) {
					totalExpenses[temp] += newTemp[k].cost;
				}
			}
		}

        let totalExpensesCategory = [];
        let totalExpensesAmount = [];
        let totalExpenseBudgets = [];
        for (let key in totalExpenses) {
            console.log(totalExpenses[key], 'AMOUNT')
            console.log(key, 'KEY')
            
            totalExpensesCategory.push(key.capitalize());
            totalExpensesAmount.push(totalExpenses[key]);
            
            for (let i=0; i<this.props.goals.length; i++) {
                let temp = this.props.goals[i].category;
                console.log(temp, 'SHOULD BE CATEGORY NAME')
                console.log(this.props.goals[i], 'THIS IS TEMP BIG CAT')
                if (key === temp) {
                   totalExpenseBudgets.push(this.props.goals[i].goal)                              
                }
            }
        }



        console.log(totalExpenses, "TOTAL EXPENSES")

        let summedExpenses = totalExpensesAmount.reduce((a, b) => {
            return a + b;
        }, 0);


        console.log(totalExpensesCategory, 'CATEGORY ARRAY');
        console.log(totalExpensesAmount, 'EXPENSES ARRAY');
        console.log(totalExpenseBudgets, 'GOALS ARRAY');
        console.log(summedExpenses, 'SUMMED EXPENSES')

        let radarData = {
            labels: totalExpensesCategory,
            options: {
                scaleFontSize : 26,scaleFontColor : 'rgb(51,51,51)'}               
            ,
            datasets: [
                {
                label: 'Budget',
                backgroundColor: 'rgba(45,126,127,0.20)',
                borderColor: 'rgb(44,62,80)',
                pointBackgroundColor: 'rgb(44,62,80)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(44,62,80)',
                options: {scaleFontSize : 26,scaleFontColor : 'rgb(51,51,51)'},
                data: totalExpenseBudgets

                },
                {
                label: 'Spent',
                backgroundColor: 'rgba(79,250,127,0.20)',
                borderColor: 'rgb(24,188,156)',
                pointBackgroundColor: 'rgb(24,188,156)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                options: {scaleFontSize : 26,scaleFontColor : 'rgb(51,51,51)'},                
                pointHoverBorderColor: 'rgb(24,188,156)',
                data: totalExpensesAmount
                }
            ]
        };
        return radarData;        
      }

      doughnutData () {
        let totalExpenses = {} 

		for (let i=0; i<this.props.categories.length; i++) {
			let temp = this.props.categories[i].name;
			totalExpenses[temp] = 0;
			for(let k=0; k<this.props.expenses[0].length; k++){
				let newTemp = this.props.expenses[0];
				if (newTemp[k].category === temp) {
					totalExpenses[temp] += newTemp[k].cost;
				}
			}
		}

        let totalExpensesCategory = [];
        let totalExpensesAmount = [];
        let totalExpenseBudgets = [];
        for (let key in totalExpenses) {
            console.log(totalExpenses[key], 'AMOUNT')
            console.log(key, 'KEY')
            
            totalExpensesCategory.push(key.capitalize());
            totalExpensesAmount.push(totalExpenses[key]);
            
            for (let i=0; i<this.props.goals.length; i++) {
                let temp = this.props.goals[i].category;
                console.log(temp, 'SHOULD BE CATEGORY NAME')
                console.log(this.props.goals[i], 'THIS IS TEMP BIG CAT')
                if (key === temp) {
                   totalExpenseBudgets.push(this.props.goals[i].goal)                              
                }
            }
        }



        console.log(totalExpenses, "TOTAL EXPENSES")

        let summedExpenses = totalExpensesAmount.reduce((a, b) => {
            return a + b;
        }, 0);


        console.log(totalExpensesCategory, 'CATEGORY ARRAY');
        console.log(totalExpensesAmount, 'EXPENSES ARRAY');
        console.log(totalExpenseBudgets, 'GOALS ARRAY');
        console.log(summedExpenses, 'SUMMED EXPENSES')


        let doughnutData = {
            labels: totalExpensesCategory,
            options: {
                legend:{display: true,labels:{fontSize:100,boxWidth:100}}},
            datasets: [{
                data: totalExpensesAmount,
                backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#66ff66',
                '#9933ff'
                ],
                hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#66ff66',
                '#9933ff'
                ]
            }]
        };

        return doughnutData;

      }






      render () {



          return (
            <div className="component">
                <div>
                    <h3>Spent vs. Budgeted by Category</h3>
                    <Radar className="chart" data={this.radarData()} />
                    <h3>Expeditures by Category</h3>
                    <Doughnut className="chart" data={this.doughnutData()} />
                </div>
            </div>
          )
      }
}



const mapStateToProps = (state, props) => ({
	categories: state.categories,
	goals: state.goals,
	expenses: state.expenses
});


export default connect(mapStateToProps)(ExpenseChart);