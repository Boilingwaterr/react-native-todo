import { combineReducers, applyMiddleware, createStore, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import authReducer from './authReducer';
import todoListReducer from './todoListReducer';

let reducers = combineReducers({
    authData: authReducer,
    todoListData: todoListReducer
});

const store = createStore(reducers, compose(applyMiddleware(thunkMiddleware)));

export default store;