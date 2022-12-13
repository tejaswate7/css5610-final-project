import {Outlet, Link, useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'

import { ReactComponent as RestaurantLogo } from '../../assets/logo.svg'


import './navigation.styles.scss'
import { Fragment } from 'react'
import {signOutUser} from "../../utils/firebase/firebase.utils";

const Navigation = () => {
    const {currentUser, displayName, userType} = useSelector((state) => state.user)
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
                    {
                        currentUser ? (
                            <span className="nav-link" onClick={signOutUserAndRedirect}>SIGN OUT</span>
                        ) : (
                            <Link className="nav-link" to="/auth">
                            SIGN IN
                            </Link>
                        )
                    }
                    {
                        currentUser ? (
                            <div>HELLO {displayName.toUpperCase()}</div>
                        ) : (
                            <div></div>
                        )
                    }
                    {
                        userType === 'admin'
                                &&
                        <Link className="nav-link" to="/admin">
                            ADMIN
                        </Link>
                    }
                    {
                        currentUser &&
                        <Link className="nav-link" to="/profile">
                            PROFILE
                        </Link>
                    }
                </div>
            </div>
            <Outlet/>
        </Fragment>
    );
}

export default Navigation;