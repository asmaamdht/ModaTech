import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type userstate={
    token:string|null;
    username:string|null;
    id: number |null;
};
const initialState:userstate={
    token:null,
    username:null,
    id:null
};
type setuserdatapayload={
    token:string;
    username:string;
    id:number;
}
const userslice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        setuserdata:(state,action:PayloadAction<setuserdatapayload>)=>{
        state.token=action.payload.token;
        state.username=action.payload.username;
        state.id=action.payload.id;
        },
        clearuserdata: (state) => {
            state.token = null;
            state.username = null;
            state.id = null;
        },
    },

});
export const { setuserdata, clearuserdata } = userslice.actions;
export default userslice.reducer;