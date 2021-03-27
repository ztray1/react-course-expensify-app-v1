import {createStore} from "redux";

const incrementCount=({incrementBy=1}={})=>({
    type:"INCREMENT",
    incrementBy:typeof incrementBy==="number"?incrementBy:1
})


const decrementCount=({decrementBy=1}={})=>({
    type:"DECREMENT",
    decrementBy:typeof decrementBy==="number"?decrementBy:1
})

const setcount=({count})=>({
    type:"SET",
    count
})

const countReducer=(state={count:0},action)=>{
    switch(action.type){
        case "INCREMENT":
            return {
                count:state.count+action.incrementBy
            };
        case "default":
            return {
                state
            };
        case "DECREMENT":
            return {
                count:state.count-action.decrementBy
            };
        case "SET":
            return {
                count:action.count
            }
    }
}

const store=createStore(countReducer);

store.dispatch(incrementCount({incrementBy:5}));

console.log(store.getState());

store.dispatch(decrementCount({decrementBy:5}))

console.log(store.getState());

store.dispatch(setcount({
    count:-100
}))

console.log(store.getState());

