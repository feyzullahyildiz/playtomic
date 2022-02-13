import { createStore, combineReducers, applyMiddleware } from "redux";
import { userReducer } from "./reducer/user";
import thunk from 'redux-thunk'
import { noteReducer } from "./reducer/note";

const reducer = combineReducers({
    user: userReducer,
    note: noteReducer,
 });
export const store = createStore(reducer, applyMiddleware(thunk));


export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

