import React from 'react';
import ExpenseCategoryList from './expense-category-list';
import CategoryGoals from './category-goals';
import ExpenseInput from './expense-input';
import SubmitDay from './submit-day';
import DisplayTransactions from './display-transactions';

export default function Layout (props) {
	return (
		<div className="layoutClass">
			<h1 className="page-title">Mint Lite</h1>
			< ExpenseCategoryList  />
			< CategoryGoals />
			< ExpenseInput />
			< DisplayTransactions />
		</div>
	);
}