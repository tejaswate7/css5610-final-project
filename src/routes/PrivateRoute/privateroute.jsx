import React from "react";
import {useSelector} from "react-redux";
import {Navigate, Route} from "react-router-dom";

const PrivateRoute = ({children}) => {
    const {currentUser} = useSelector((state) => state.user)
    return currentUser ? children : (<Navigate to={"/auth"}/>)
}

export default PrivateRoute