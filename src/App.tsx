import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'

//components
import Drawer from '@mui/material/Drawer';
import LinearProgress from '@mui/material/LinearProgress';
import Grid from '@mui/material/Grid';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import CartItem from './components/product/Product';
import NavTop from './components/navTop/NavTop';
import Cart from './components/carts/Carts';

//type 
export type CartItemType = {
  id: number,
  category: string,
  description: string,
  image: string,
  price: number,
  title: string,
  amount: number
}





function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[])
  const getProducts = async (): Promise<CartItemType[]> =>
    await (await fetch('https://fakestoreapi.com/products')).json();

  const { data, isLoading, error } = useQuery<CartItemType[]>('products', getProducts)

  const getTotalItems = (items: CartItemType[]) => {
    return items?.reduce((ack: number, item) => ack + item.amount, 0)
  }
  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems(prev => {
      // 1. is the item already in the cart
      const isItemInCart = prev?.find(item => item.id === clickedItem.id)
      if (isItemInCart) {
        return prev?.map(item => (
          item.id === clickedItem.id ? { ...item, amount: item.amount + 1 }
            : item
        ))
      }

      // 2. firt time item is add
      return [...prev, { ...clickedItem, amount: 1 }]

    })
  }
  const handleRemoveFromCart = (itemId: number) => {
    setCartItems(prev => (
      prev.reduce((ack, item) => {
        if (item.id === itemId) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }]
        } else {
          return [...ack, item]
        }
      }, [] as CartItemType[])
    ))

  }


  const handleOpenCart = () => {
    setCartOpen(!cartOpen)
  }
  if (isLoading) return <LinearProgress />
  if (error) return <div>Something went wrong...</div>
  return (
    <div className="App">
      <NavTop handleOpenCart={handleOpenCart} totalItems={getTotalItems(cartItems)} />
      <Drawer
        anchor='right'
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        PaperProps={{
          sx: { width: "25%" },
        }}>
        <Cart cartItems={cartItems} addToCard={handleAddToCart} removeFromCart={handleRemoveFromCart} />
      </Drawer>
      <Container >
        <Grid container spacing={3} marginTop={12}>
          {
            data?.map((item: CartItemType) => (
              <Grid item lg={3} md={4} sm={6} xs={12} key={item.id}  >
                <CartItem item={item} handleAddToCart={handleAddToCart} />
              </Grid>
            ))
          }
        </Grid>
      </Container>

    </div>
  );
}

export default App;
