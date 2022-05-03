import React from 'react';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import { CartItemType } from '../../App';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper'


type props = {
    item: CartItemType;
    handleAddToCart: (clickedItem: CartItemType) => void;
}

const CartItem: React.FC<props> = ({ item, handleAddToCart }) => {
    return (
        <Box sx={{
            width: '100%',
            maxHeight: 500,
            borderRadius: '20px'
        }}>
            <Paper elevation={3} sx={{
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '10px'
            }}>
                <img width="100%" height="250" src={item.image} alt={item.title} />
                <Box sx={{
                    padding: 1,

                }}>
                    <Typography variant="h5" component="h2" sx={{
                        display: '-webkit-box',
                        overflow: 'hidden',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 1,
                        textOverflow: 'ellipsis',
                    }}>
                        {item.title}
                    </Typography>
                    <Typography variant="body2" component="p" sx={{
                        margin: '10px 0',
                        display: '-webkit-box',
                        overflow: 'hidden',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 3,
                        textOverflow: 'ellipsis',
                    }}>
                        {item.description}
                    </Typography>
                    <Typography variant="h5" component="span">
                        {item.price}
                    </Typography>f
                </Box>


                <Button onClick={() => handleAddToCart(item)}>Add to cart</Button>
            </Paper>
        </Box>
    );
};

export default CartItem;