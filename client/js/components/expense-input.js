import React from 'react';
import { connect } from 'react-redux';

export class ExpenseInput extends React.Component {
	constructor(props) {
    	super(props);
  	}

  	render() {		
		let options = this.props.categories.map((category,index)=>{
			return (
				<option key={index} value={index}>{category}</option>
			);
		})

		return (
			<div>Expense Input
				<form>
					<label> Expense Amount </label>
					<input type="text" />


					<label className="category" >Expense Category?</label>
      					<select name="expenseCategory" id='expenseCategory' required>
      						{options}
        				</select>

					<label> Expense Description </label>
					<input type="text" />
					<input type="submit" />
				</form>
			</div>
		)
	}
}

const mapStateToProps = (state, props) => ({
	categories: state.categories
});

export default connect(mapStateToProps)(ExpenseInput);

