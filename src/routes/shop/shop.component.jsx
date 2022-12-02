import SHOP_DATA from "../../shop-data.js"
import ProductCard from "../../components/product-card/product-card.component";
import "./shop.styles.scss"
import {useEffect} from "react";
import {addCollectionAndDocuments} from "../../utils/firebase/firebase.utils";

const Shop = () => {
    return(
        <div className="products-container">
            {/*{SHOP_DATA.map((product) => (*/}
            {/*    <ProductCard key={product.id} product={product} />*/}
            {/*    )*/}
            {/*)}*/}
        </div>
    );

}

export default Shop;