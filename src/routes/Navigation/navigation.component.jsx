import { Outlet, Link } from 'react-router-dom'
import { ReactComponent as RestaurantLogo } from '../../assets/logo.svg'
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
                    <Link className="nav-link" to="/sign-in">
                        SIGN IN
                    </Link>
                </div>
            </div>
            <Outlet/>
        </Fragment>
    );
}

export default Navigation;