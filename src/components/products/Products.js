import './Products.css';

const Products = (props) => {
    return (

        <div className='products'>
            <div className='products__container'>
                {props.products.map((product) => {
                    return (
                    <div key={product.name} className='product'>
                    <h3 className='product__name'>{product.name}</h3>
                    <img className='product__image' src={product.image} alt={product.name} />
                    <p className='product__size'>{product.size}</p>
                    
                    {
                props.promoCode <= 0 
                ? <p className='product__price'>{product.price}PLN</p>
                : <p className='product__price'><div className='promoBefore'>{product.price}PLN</div><div>{(product.price * (1 - props.promoCode)).toFixed(2)}PLN</div></p>
                }
                    <button className='product__button' onClick={() => props.addToCart(product)}>Add to cart</button>
                </div>
                );
                })};

            </div>                        

        </div>


        ); 
}

export default Products;