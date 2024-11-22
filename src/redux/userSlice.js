import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id_seller: "",
    id_customer: "",
    id_employee: "",
    role: "",
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
        addEmployee: (state, action) => {
            const { id_employee, role, email, name } = action.payload;
            state.id_employee = id_employee;
            state.email = email;
            state.role = role;
            state.name = name;
        },
        removeUser: (state) => {
            state.id_seller = "";
            state.id_customer = "";
            state.name = "";
            state.email = "";
            state.id_employee = "";
            state.role = ""
        },
        setName: (state, action) => {
            state.name = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        }
    },
});

export const { addUser, removeUser, setName, setToken, addEmployee } = userSlice.actions;
export default userSlice.reducer;