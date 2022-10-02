import './Cart.css';

const cart = (props) => {
  let total = 0;
  let totalBeforeDiscount = 0;
    return (
        <div className='dropdown'>
          <props.CartLogo className='cart' alt='cart-logo' />
          <div className='dropdown-content'>
            {props.cart.map((item) => {
              total += item.price * item.count;

              if (props.promoCode !== 0) {
                totalBeforeDiscount = total;
                total *= (1 - props.promoCode);
              }
  
              return (
                <p key={item.id} className='item' onClick={() => props.removeFromCart(item)}>
                {item.name} x {item.count}
                </p>
                );
              })}
              {props.cart.length === 0 && <p>Cart is empty</p>}
              {props.cart.length > 0 &&
              <div className='bottom-cart'> 
              <p>Total: {total}PLN</p>
              {props.promoCode !== 0 && <p>Total before discount: {totalBeforeDiscount}PLN</p>}
              <button className='clear-cart' onClick={() => props.clearCart()}>Clear</button>
              </div>
              }
          </div>
        </div>
    )
}

export default cart;