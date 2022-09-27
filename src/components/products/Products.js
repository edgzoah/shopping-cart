import './Products.css';

const Products = (props) => {
    return (

        <div className="products">
            <div className="products__container">
                {props.products.map((product) => {
                    return (
                    <div key={product.name} className="product">
                    <h3 className="product__name">{product.name}</h3>
                    <img className="product__image" src={product.image} alt={product.name} />
                    <p className="product__size">{product.size}</p>
                    <p className="product__price">{product.price}PLN</p>
                    <button className="product__button" onClick={() => props.addToCart(product)}>Add to cart</button>
                </div>
                );
                })};

            </div>                        

        </div>


        ); 
}

export default Products;