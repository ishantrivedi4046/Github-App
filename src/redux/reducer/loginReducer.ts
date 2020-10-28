import { actions } from "../action/actions";

const initialState={
    isLoggedIn:false,
    userData:{},
    errorMessage:""
};

const loginReducer=(state=initialState,action:{type:string,payload:any})=>{
    switch(action.type){
        case actions.LOGIN:
        return {
            ...state,
            isLoggedIn:action.payload.isLoggedIn,
            userData:action.payload.data
        }
        case actions.LOGOUT:
            return{
                ...state,
                isLoggedIn:false,
                userData:{},
                errorMessage:""
            }
        case actions.LOGIN_ERROR:
            return{
                ...state,
                errorMessage:action.payload.error
            }
        default:
            return state;
    }
}

export default loginReducer;