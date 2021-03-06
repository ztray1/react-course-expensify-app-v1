import React from "react";
import {connect} from "react-redux";
import numeral from "numeral";
import {Link} from "react-router-dom";
import selectExpenses from "../selectors/expenses";
import selectExpensesTotal from "../selectors/expenses-total"

export const ExpensesSummary=({expenseCount,expenseTotal,expenseHiddenCount})=>{
    const expenseWord=expenseCount===1?"expense":"expenses";
    const formattedExpensesTotal=numeral(expenseTotal/100).format("$0,0.00");
    return(
        <div className="page-header">
            <div className="content-container">
                <h1 className="page-header__title">Viewing <span>{expenseCount}</span> {expenseWord} expenses totalling <span>{formattedExpensesTotal}</span></h1>
                {(expenseHiddenCount!=0)&&(<p>{expenseHiddenCount} expense is hidden</p>)}
                <div className="page-header__actions">
                    <Link className="button" to="/create">Add Expense</Link>
                </div>
            </div>
        </div>
    )
}

const mapStatetProps=(state)=>{
    const visibleExpenses=selectExpenses(state.expenses,state.filters);
    return {
        expenseCount:visibleExpenses.length,
        expenseTotal:selectExpensesTotal(visibleExpenses),
        expenseHiddenCount:state.expenses.length-visibleExpenses.length
    }
};

export default connect(mapStatetProps)(ExpensesSummary);