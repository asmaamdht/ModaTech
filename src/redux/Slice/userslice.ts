import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type userstate = {
    token: string | null;
    username: string | null;

};
const initialState: userstate = {
    token: null,
    username: null
};
type setuserdatapayload = {
    token: string;
    username: string;
}
const userslice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setuserdata: (state, action: PayloadAction<setuserdatapayload>) => {
            state.token = action.payload.token;
            state.username = action.payload.username;
        },
        clearuserdata: (state) => {
            state.token = null;
            state.username = null;

        },
    },

});
export const { setuserdata, clearuserdata } = userslice.actions;
export default userslice.reducer;