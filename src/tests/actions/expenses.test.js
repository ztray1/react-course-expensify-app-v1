import { parseTwoDigitYear } from "moment";
import {startAddExpense,addExpense,editExpense,removeExpense,setExpenses,startSetExpenses,startRemoveExpense,startEditExpense} from "../../actions/expenses.js";
import expenses from "../fixtures/expenses"
import configureMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { createStore } from "redux";
import database  from "../../firebase/firebase";

const uid="thisismytestuid";
const defaultAuthState={auth:{uid}}
const createMockStore=configureMockStore([thunk])

beforeEach((done)=>{
    const expenseData={};
    expenses.forEach(({id,description,note,amount,createdAt}) => {
        expenseData[id]={description,note,amount,createdAt}
    });
    database.ref(`users/${uid}/expenses`).set(expenseData).then(()=>done());
})

test("should setup remove expense action object",()=>{
    const action=removeExpense({
        id:"123abc"
    })
    expect(action).toEqual({
        type:"REMOVE_EXPENSE",
        id:"123abc"
    })
})

test("should remove expense from firebase",(done)=>{
    const store=createMockStore(defaultAuthState);
    const id=expenses[2].id;
    store.dispatch(startRemoveExpense({id})).then(()=>{
        const action=store.getActions()
        expect(action[0]).toEqual({
            type:"REMOVE_EXPENSE",
            id
        })
        return database.ref(`users/${uid}/expenses/${id}`).once("value");
    }).then((snapshot)=>{
        expect(snapshot.val()).toBeFalsy();
        done();
    })
})


test("should setup edit expense action object",()=>{
    const action=editExpense("123abc",{note:"not a value"})
    expect(action).toEqual({
        type:"EDIT_EXPENSE",
        id:"123abc",
        updates:{
            note:"not a value"
        }
    });
})

test("should edit expense from firebase",(done)=>{
    const store=createMockStore(defaultAuthState);
    const id=expenses[2].id;
    const updates={amount:123545};
    store.dispatch(startEditExpense(id,updates)).then(()=>{
        const actions=store.getActions();
        expect(actions[0]).toEqual({
            type:"EDIT_EXPENSE",
            id,
            updates
        });
        return database.ref(`users/${uid}/expenses/${id}`).once("value");
    }).then((snapshot)=>{
        expect(snapshot.val().amount).toBe(updates.amount);
        done();
    })
})

test("should setup add expense action object",()=>{
    const action=addExpense(expenses[2])
    expect(action).toEqual({
        type:"ADD_EXPENSE",
        expense:{
            id:expect.any(String),
            ...expenses[2]
        }
    })
})

/*test("should setup add expense with default value",()=>{
    const action=addExpense();
    expect(action).toEqual({
        type:"ADD_EXPENSE",
        expense:{
            id:expect.any(String),
            description:"",
            note:"",
            amount:0,
            createdAt:0
        }
    })
})*/

test("should add expense to database and store",(done)=>{
    const store=createMockStore(defaultAuthState)
    const expenseData={
        description:"Mouse",
        amount:3000,
        note:"This one is better",
        createdAt:1000
    }
    store.dispatch(startAddExpense(expenseData)).then(()=>{
        const actions=store.getActions();
        expect(actions[0]).toEqual({
            type:"ADD_EXPENSE",
            expense:{
                id:expect.any(String),
                ...expenseData
            }
        });
        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once("value");
    }).then((snapshot)=>{
        expect(snapshot.val()).toEqual(expenseData)
        done();
    });
});

test("should add expense with defaults to database and store",(done)=>{
    const store=createMockStore(defaultAuthState)
    const expenseData={
        description:"",
        note:"",
        amount:0,
        createdAt:0
    }
    store.dispatch(startAddExpense()).then(()=>{
        const actions=store.getActions();
        expect(actions[0]).toEqual({
            type:"ADD_EXPENSE",
            expense:{
                id:expect.any(String),
                ...expenseData
            }
        });
        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once("value");
    }).then((snapshot)=>{
        expect(snapshot.val()).toEqual(expenseData)
        done();
    });
});

test("should setup set expense action object with data",()=>{
    const action=setExpenses(expenses);
    expect(action).toEqual({
        type:"SET_EXPENSES",
        expenses
    })
})


test("should fetch the expenses from firebase",(done)=>{
    const store=createMockStore(defaultAuthState)
    store.dispatch(startSetExpenses()).then(()=>{
        const actions=store.getActions();
        expect(actions[0]).toEqual({
            type:"SET_EXPENSES",
            expenses
        })
        done();
    })
})