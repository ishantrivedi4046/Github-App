export const actionCreator=(type:string,payload:any={})=>{
    return {
        type:type,
        payload:{...payload}
    };
}