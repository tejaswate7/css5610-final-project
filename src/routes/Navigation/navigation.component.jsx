import { Outlet, Link } from 'react-router-dom'


import { ReactComponent as RestaurantLogo } from '../../assets/logo.svg'
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import './navigation.styles.scss'
import { Fragment } from 'react'

const Navigation = () => {
    return(
        <Fragment>
            <div className="navigation">
                <Link className="logo-container" to="/">
                    <RestaurantLogo className = "logo" width={50}/>
                </Link>
                <div className = "nav-links-container">
                    <Link className="nav-link" to="/shop">
                        BUY
                    </Link>
                    <Link className="nav-link" to="/auth">
                        SIGN IN
                    </Link>
                    <CartIcon />
                </div>
                {/*<CartDropdown />*/}
            </div>
            <Outlet/>
        </Fragment>
    );
}

export default Navigation;