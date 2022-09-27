import './App.css';
import React, { useState, useEffect } from 'react';
import Products from './components/products/Products';
import Cart from './components/cart/Cart';
import Filter from './components/filter/Filter';
import {ReactComponent as Logo} from './logo.svg';
import {ReactComponent as CartLogo} from './cart.svg';


const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [alert, setAlert] = useState(false);
  useEffect(() => {
    const getData = async () => {
      const response = await fetch('products.json');
      const data = await response.json();
      setProducts(data.products);
    }
    getData();
  }, []);

  const productsCopy = [...products];

  const addToCart = (product) => {
    const cartItems = cart.slice();
    let alreadyInCart = false;
    cartItems.forEach((item) => {
    if (item.id === product.id) {
      item.count++;
      alreadyInCart = true;
    }
    });
    if (!alreadyInCart) {
      cartItems.push({ ...product, count: 1 });
    }
    setCart(cartItems);
    setAlert(true);
  };

  const removeFromCart = (product) => {
    const cartItems = cart.slice();
    setCart(cartItems.filter((x) => x.id !== product.id));
  };

  const clearCart = () => {
    setCart([]);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setAlert(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [alert]);
  
  const filter = (event) => {
    const category = event.target.value;
    const copy = productsCopy.slice();
    if (category === '') {
      setProducts(copy);
    } else {
      setProducts(copy.filter((product) => product.category === category));
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <Logo className="App-logo" alt="logo" />
        <Filter filter={filter} />
      <Cart cart={cart} CartLogo={CartLogo} removeFromCart={removeFromCart} clearCart={clearCart} />
      </header>

      <Products products={products} addToCart={addToCart} />

      {alert && <div className='alert'>Item added to cart</div>}

    </div>
  );
}

export default App;
