import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import Products from './components/products/Products';
import Cart from './components/cart/Cart';
import Filter from './components/filter/Filter';
import {ReactComponent as Logo} from './logo.svg';
import {ReactComponent as CartLogo} from './cart.svg';


const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [alert, setAlert] = useState(false);
  const [copy, setCopy] = useState(false);
  const [promoCode, setPromoCode] = useState(0);
  const promoRef = useRef(null);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch('products.json');
      const data = await response.json();
      setProducts(data.products);
      setCopy(data.products);
    }
    getData();
  }, []);

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
    if (category === 'ALL') {
      setProducts(copy);
    } else {
      const filtered = copy.filter((product) => product.category === category);
      setProducts(filtered);
    }
  };

  const applyPromoCode = () => {
    const code = promoRef.current.value;
    if (code === 'DISCOUNT') {
      setPromoCode(0.1);
    } else if (code === 'DISCOUNT2') {
      setPromoCode(0.9);
    }
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <Logo className='App-logo' alt='logo' />
        <div className='promoCode'>
        <input ref={promoRef} type='text' placeholder='Promo code' />
        <button className='submit-promocode' onClick={applyPromoCode}>Submit</button>
        </div>
        <Filter filter={filter} />
      <Cart cart={cart} CartLogo={CartLogo} removeFromCart={removeFromCart} clearCart={clearCart} promoCode={promoCode} />
      </header>

      <Products products={products} addToCart={addToCart} promoCode={promoCode} />

      {alert && <div className='alert'>Item added to cart</div>}

    </div>
  );
}

export default App;