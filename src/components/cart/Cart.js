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

              if (props.promoCode > 0) {
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
              <>
              {props.promoCode > 0 && <><div>
                <p className='promo'>You save: {(totalBeforeDiscount-total).toFixed(2)}PLN</p>
              </div></>}
              
              <div className='bottom-cart'> 

                {
                props.promoCode <= 0 
                ? <><b>{total}PLN</b></> 
                : <><div className='promoBefore'><b>{totalBeforeDiscount.toFixed(2)}PLN</b></div><div><b>{total.toFixed(2)}PLN</b></div></>
                }


              <button className='clear-cart' onClick={props.clearCart}>Clear</button>
              </div>
              </>
              }
          </div>
        </div>
    )
}

export default cart;