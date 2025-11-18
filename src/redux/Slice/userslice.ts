import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type userstate = {
    token: string | null;
    username: string | null;
    id?: number | null;
    email?: string;
    name?: { firstname: string; lastname: string };
    phone?: string;
    address?: {
        city?: string;
    }
};
const initialState: userstate = {
    token: null,
    username: null,
    id: null,

};
type setuserdatapayload = {
    token: string;
    username: string;
    id: number;
    email?: string;
    name?: { firstname: string; lastname: string };
    phone?: string;
    address?: { city: string };
}
const userslice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setuserdata: (state, action: PayloadAction<setuserdatapayload>) => {
            state.token = action.payload.token;
            state.username = action.payload.username;
            state.id = action.payload.id;
            if (action.payload.email) state.email = action.payload.email;
            if (action.payload.name) state.name = action.payload.name;
            if (action.payload.phone) state.phone = action.payload.phone;
            if (action.payload.address) state.address = action.payload.address;
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