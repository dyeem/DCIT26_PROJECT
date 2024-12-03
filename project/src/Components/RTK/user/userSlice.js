import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    currentUser: null, 
    usersList: [], 
    loading: false,
    errorEmail: '',
    errorPass: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginUser: (state, action) => {
            const { email, password } = action.payload;
            const user = state.usersList.find((user) => user.email === email);

            if (!user) {
                state.errorEmail = "Email does not exist!";
            } else if (user.password !== password) {
                state.errorPass = "Incorrect password!";
            } else {
                state.currentUser = user;
                state.errorPass = null; 
                state.errorEmail = null;
            }
        },
        logoutUser: (state) => {
            state.currentUser = null; 
        },
        setUsers: (state, action) => {
            state.usersList = [...state.usersList, action.payload]; 
        },
        addToUserListCart: (state, action) => {
            const { email, product } = action.payload; 
            const userIndex = state.usersList.findIndex(user => user.email === email);
        
            if (userIndex !== -1) {
                const user = state.usersList[userIndex];
        
                const updatedCart = user.cart ? [...user.cart, product] : [product];
                
                state.usersList[userIndex] = { ...user, cart: updatedCart };
            }
        },
        removeUserListCart: (state, action) => {
            
        }
    },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;