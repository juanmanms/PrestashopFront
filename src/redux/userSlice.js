import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id_seller: "",
    id_customer: "",
    name: "",
    email: "",
    token: ""
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser: (state, action) => {
            const { id_seller, id_customer, name, email } = action.payload;
            state.id_seller = id_seller;
            state.id_customer = id_customer;
            state.name = name;
            state.email = email;
        },
        removeUser: (state) => {
            state.id_seller = "";
            state.id_customer = "";
            state.name = "";
            state.email = "";
        },
        setName: (state, action) => {
            state.name = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        }
    },
});

export const { addUser, removeUser, setName, setToken } = userSlice.actions;
export default userSlice.reducer;