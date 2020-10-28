import {rootReducer} from "../reducer/index";
import {createStore} from "redux";


const devtools= (window as any).__REDUX_DEVTOOLS_EXTENSION__ ?
(window as any).__REDUX_DEVTOOLS_EXTENSION__():(f:any)=>f;

const store=createStore(rootReducer,devtools);

export default store;
