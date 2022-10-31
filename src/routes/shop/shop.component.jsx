import SHOP_DATA from "../../shop-data.json"
import ProductCard from "../../components/product-card/product-card.component";
import "./shop.styles.scss"

const Shop = () => {
    return(
        <div className="products-container">
            {SHOP_DATA.map((product) => (
                <ProductCard key={product.id} product={product} />
                )
            )}
        </div>
    );

}

export default Shop;