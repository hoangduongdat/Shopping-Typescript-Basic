import React from 'react';
import CartItem from '../cartItem/CartItem';
import { CartItemType } from '../../App';
import { Wrapper } from './carts.styles';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';

type props = {
    cartItems: CartItemType[],
    addToCard: (clickedItem: CartItemType) => void,
    removeFromCart: (id: number) => void
}

const Cart: React.FC<props> = ({ cartItems, addToCard, removeFromCart }) => {

    const calculatedTotal = (items: CartItemType[]) =>
        items.reduce((ack: number, item) => {
            return ack + item.amount * item.price
        }, 0)
    return (
        <Wrapper>
            <h2>Your Shopping Cart</h2>
            {cartItems?.length > 0 ? cartItems.map(item =>
                <CartItem
                    key={item.id}
                    item={item}
                    addToCard={addToCard}
                    removeFromCart={removeFromCart}
                />

            ) : 'no item in cart'}
            <h2>Total: {calculatedTotal(cartItems).toFixed(2)}$</h2>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: '0px 50px'
            }}>
                <Button variant="contained" size="medium">Pay</Button>
            </Box>
        </Wrapper>
    );
};

export default Cart;