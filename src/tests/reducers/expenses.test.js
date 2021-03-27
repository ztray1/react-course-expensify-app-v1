import expensesReducer from "../../reducers/expenses";
import expenses from "../fixtures/expenses"

test("should set default state",()=>{
    const state=expensesReducer(undefined,{type:"@@INIT"})
    expect(state).toEqual([])
})

test("should remove expenses by id",()=>{
    const action={
        type:"REMOVE_EXPENSE",
        id:expenses[2].id,
    }
    const state=expensesReducer(expenses,action)
    expect(state).toEqual([expenses[0],expenses[1]])
})

test("should not remove expenses if id not exist",()=>{
    const action={
        type:"REMOVE_EXPENSE",
        id:-1
    }
    const state=expensesReducer(expenses,action)
    expect(state).toEqual(expenses)
})

test("should add an expense",()=>{
    const action={
        type:"ADD_EXPENSE",
        expense:{
            id:"4",
            description:"BUS",
            note:"",
            amount:450,
            createdAt:0
        }
    }
    const state=expensesReducer(expenses,action)
    expect(state).toEqual([
        ...expenses,
        action.expense
    ])
})

test("should edit an expense",()=>{
    const amount=122200;
    const action={
        type:"EDIT_EXPENSE",
        id:expenses[1].id,
        updates:{
            amount
        }
    }
    const state=expensesReducer(expenses,action)
    expect(state[1].amount).toBe(amount)
})

test("should edit an expense",()=>{
    const amount=122200;
    const action={
        type:"EDIT_EXPENSE",
        id:-1,
        updates:{
            amount
        }
    }
    const state=expensesReducer(expenses,action)
    expect(state).toEqual(expenses)
})