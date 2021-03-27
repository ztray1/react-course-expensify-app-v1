import {createStore,combineReducers} from "redux";
import uuid from "uuid";


//action object returns a object
//expense action object
const addExpense=({
    description="",
    note="",
    amount=0,
    createdAt=0
    }={})=>({
    type:"ADD_EXPENSE",
    expense:{
        id:uuid(),
        description,
        note,
        createdAt,
        amount
    }
});

const removeExpense=({id}={})=>({
    type:"REMOVE_EXPENSE",
    id
})

const editExpense=(id,updates)=>({
    type:"EDIT_EXPENSE",
    id,
    updates
})

//filter action object
const setTextFilter=(text="")=>({
    type:"SET_TEXT_FILTER",
    text
})
const sortByAmount=()=>({
    type:"SORT_BY_AMOUNT"
})

const sortByDate=()=>({
    type:"SORT_BY_DATE"
})
const setStartDate=(startDate)=>({
    type:"SET_START_DATE",
    startDate
});

const setEndDate=(endDate)=>({
    type:"SET_END_DATE",
    endDate
});

//

const expenseReducerDefaultState=[];

const expenseReducer=(state=expenseReducerDefaultState,action)=>{
    switch(action.type){
        case "ADD_EXPENSE":
            return [
                ...state,
                action.expense
            ];
        case "REMOVE_EXPENSE":
            return state.filter(({id})=>action.id!==id);
        case "EDIT_EXPENSE":
            return state.map((expense)=>{
                if(expense.id===action.id){
                    return {
                        ...expense,
                        ...action.updates
                    }
                }else{
                    return expense;
                }
            })
        default:
            return state;
    }
}

const filterReducerDefaultState={
    text:"",
    sortBy:"date",
    startDate:undefined,
    endDate:undefined
};

const filterReducer=(state=filterReducerDefaultState,action)=>{
    switch(action.type){
        case "SET_TEXT_FILTER":
            return {
                ...state,
                text:action.text
            };
        case "SORT_BY_AMOUNT":
            return {
                ...state,
                sortBy:"amount"
            }
        case "SORT_BY_DATE":
            return {
                ...state,
                sortBy:"date"
            }
        case "SET_START_DATE":
            return {
                ...state,
                startDate:action.startDate
            }
        case "SET_END_DATE":
            return {
                ...state,
                endDate:action.endDate
            }
        default:
            return state;
    }
}

const getVisibleExpenses=(expenses,{text,sortBy,startDate,endDate})=>{
    return expenses.filter((expense)=>{
        const startDateMatch=typeof startDate!=="number"||expense.createdAt>=startDate;
        const endDateMatch=typeof endDate!=="number"||expense.createdAt<=endDate;
        const textMatch=expense.description.toLowerCase().includes(text.toLowerCase());
        return startDateMatch&&endDateMatch&&textMatch;
    }).sort((a,b)=>{
        if(sortBy==="date"){
            return b.createdAt-a.createdAt;
        }else if(sortBy==="amount"){
            return b.amount-a.amount;
        }
        //compare function return a-b which is ascending order
    });
}

const store=createStore(combineReducers({
    expenses:expenseReducer,
    filters:filterReducer
}));


store.subscribe(()=>{
    const state=store.getState();
    const visibleExpenses=getVisibleExpenses(state.expenses,state.filters);
    console.log(visibleExpenses);
})

const expenseOne=store.dispatch(addExpense({text:"rent",amount:350,createdAt:-21000,description:"RENT"}));
const expenseTwo=store.dispatch(addExpense({text:"insurance",amount:300,createdAt:-1000}));
const expenseThree=store.dispatch(addExpense({text:"insurance",amount:320,createdAt:-300000}));

/*
store.dispatch(removeExpense({id:expenseOne.expense.id}));
store.dispatch(editExpense(expenseTwo.expense.id,{amount:500}))*/

//store.dispatch(setTextFilter("re"));
/*store.dispatch(setTextFilter());*/
store.dispatch(sortByAmount());
//store.dispatch(sortByDate());
//store.dispatch(setStartDate(0));
//store.dispatch(setStartDate());
//store.dispatch(setEndDate(1250));

const demoState={
    expense:[{
        id:"allen",
        description:"rent",
        note:"This is the payment of rent",
        createdAt:0,
        amount:5400
    }],
    filters:{
        text:"rent",
        sortBy:"amount",
        startDate:"undefined",
        endDate:"undefined"
    }
}