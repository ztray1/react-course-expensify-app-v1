import React from "react";
import {connect} from "react-redux";
import ExpenseForm from "./ExpenseForm";
import {startEditExpense} from "../actions/expenses";
import {startRemoveExpense} from "../actions/expenses";
import ConfirmModal from "./ConfirmModal";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export class EditExpensePage extends React.Component{
    state={
        removeConfirm:false
    }
    onSubmit=(expense)=>{
        this.props.startEditExpense(this.props.expense.id,expense)
        this.props.history.push("/")
    }
    /*onRemove=()=>{
        this.setState({removeConfirm:true})
    }*/
    onRemove=()=> {
        confirmAlert({
          title: 'Confirm to submit',
          message: 'Are you sure to do this.',
          buttons: [
            {
              label: 'Yes',
              onClick: () => {
                this.props.startRemoveExpense({id:this.props.expense.id});
                this.props.history.push("/");
            }
            },
            {
              label: 'No',
              onClick: () => {}
            }
          ]
        });
      };
    onHandleCancelOption=()=>{
        this.setState({removeConfirm:false})
    }
    onHandleConfirmRemoveOption=()=>{
        this.props.startRemoveExpense({id:this.props.expense.id});
        this.props.history.push("/");
    }
    render(){
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Edit Expense</h1>
                    </div>
                </div>
                <div className="content-container">
                    <ExpenseForm 
                        expense={this.props.expense}
                        onSubmit={this.onSubmit}/>
                    <button className="button button--secondary" onClick={this.onRemove}>Remove Expense</button>
                </div>
            </div>
        )
    }
   
};

const mapStateToProps=(state,props)=>{
    return {
        expense:state.expenses.find((expense)=>{
            return (expense.id===props.match.params.id);
        })
    }
}

const mapDispatchToProps=(dispatch)=>({
    startEditExpense:(id,expense)=>{dispatch(startEditExpense(id,expense))},
    startRemoveExpense:({id})=>{dispatch(startRemoveExpense({id}))},
})

export default connect(mapStateToProps,mapDispatchToProps)(EditExpensePage);