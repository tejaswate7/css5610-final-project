import {Outlet, Link, useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'

import { ReactComponent as RestaurantLogo } from '../../assets/logo.svg'
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import './navigation.styles.scss'
import { Fragment } from 'react'
import {signOutUser} from "../../utils/firebase/firebase.utils";

const Navigation = () => {
    const {currentUser} = useSelector((state) => state.user)
    const navigate = useNavigate()
    const signOutUserAndRedirect = async () => {
        await signOutUser()
        navigate('/')
    }
    // const currentUser = 'a';
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
                    {
                        currentUser ? (
                            <span className="nav-link" onClick={signOutUserAndRedirect}>SIGN OUT</span>
                        ) : (
                            <Link className="nav-link" to="/auth">
                            SIGN IN
                            </Link>
                        )
                    }
                    <Link className="nav-link" to="/review">
                        MY REVIEWS
                    </Link>
                    <Link className="nav-link" to="/admin">
                        ADMIN
                    </Link>
                    {
                        currentUser &&
                        <Link className="nav-link" to="/profile">
                            PROFILE
                        </Link>
                    }
                    <CartIcon />
                </div>
                {/*<CartDropdown />*/}
            </div>
            <Outlet/>
        </Fragment>
    );
}

export default Navigation;