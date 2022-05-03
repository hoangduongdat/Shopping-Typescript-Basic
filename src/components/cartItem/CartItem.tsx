import React from 'react';
import Button from '@mui/material/Button'
//type
import { CartItemType } from '../../App'

//
import { wrapper } from './cartitem.styles'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

type props = {
    item: CartItemType,
    addToCard: (clickedItem: CartItemType) => void,
    removeFromCart: (id: number) => void
}

const CartItem: React.FC<props> = ({ item, addToCard, removeFromCart }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                marginBottom: '20px',
                borderBottom: '1px solid #999',


            }}
        >
            <Box sx={{
                display: 'flex',

            }}>
                <img width='100' height='100' src={item.image} alt="" />

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    marginLeft: '35px'
                }}>
                    <IconButton
                        sx={{ backgroundColor: '#ccc', width: '30px', height: '30px' }}
                        onClick={() => addToCard(item)}
                    >+</IconButton>
                    <Typography variant='subtitle2' component='span'>SL: {item.amount}</Typography>
                    <IconButton
                        sx={{ backgroundColor: '#ccc', width: '30px', height: '30px' }}
                        onClick={() => removeFromCart(item.id)}
                    >-</IconButton>

                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    marginLeft: '35px'
                }}>

                    <Typography variant='body1' component='span'>Price: ${item.price}</Typography>
                    <Typography variant='body1' component='span'>Total: ${(item.price * item.amount).toFixed(2)}</Typography>


                </Box>
            </Box>
            <h3>{item.title}</h3>
        </Box>
    );
};

export default CartItem;

