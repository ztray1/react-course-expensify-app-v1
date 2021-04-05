import {createStore,combineReducers, applyMiddleware,compose} from "redux";
import expenseReducer from "../reducers/expenses";
import filterReducer from "../reducers/filters";
import thunk from "redux-thunk";
import authReducer from "../reducers/auth";

const composeEnhancers=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||compose;

export default ()=>{
    const store=createStore(combineReducers({
        expenses:expenseReducer,
        filters:filterReducer,
        auth:authReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
    return store;
}
