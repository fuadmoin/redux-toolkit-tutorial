import {createSlice} from '@reduxjs/toolkit';
import cartItems from '../../cartItems'

const initialState = {
    cartItems: cartItems,
    amount: 4,
    total: 0,
    isLoading: true,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cartItems = []
        },
        removeItem: (state, action) => {
            const id = action.payload
            state.cartItems = state.cartItems.filter((item) => item.id !== id)
        },
        increaseAmount: (state, action) => {
            const id = action.payload
            const newCart = state.cartItems.map((item) => {
                if(item.id === id) {
                    return {...item, amount: item.amount + 1}
                }
                return item
            })
            state.cartItems = newCart
        },
        decreaseAmount: (state, action) => {
            const id = action.payload
            const newCart = state.cartItems.map((item) => {
                if(item.id === id) {
                    return {...item, amount: item.amount - 1}
                }
                return item
            }).filter((item) => item.amount !== 0)
            state.cartItems = newCart
        },
        getTotals: (state) => {
            state.amount = state.cartItems.reduce((total, item) => {
                return total + item.amount
            }, 0)
            state.total = state.cartItems.reduce((total, item) => {
                return total + item.price * item.amount
            }, 0)
        },
        toggleLoading: (state) => {
            state.isLoading = !state.isLoading
        }
    }
})

export const {clearCart, removeItem, increaseAmount, decreaseAmount, getTotals, toggleLoading} = cartSlice.actions
export default cartSlice.reducer;