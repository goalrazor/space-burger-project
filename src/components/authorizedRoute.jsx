import React, {useEffect} from "react";
import {Route, useHistory} from "react-router-dom";
import {getCookie} from "../utils/cookie";
import PropTypes from "prop-types";

export function AuthorizedRoute({path, children}) {
    const accessToken = getCookie("accessToken")
    const history = useHistory()

    useEffect(() => {
            if (accessToken) {
                history.replace("/")
            }
        }
    )

    return (
        <Route to={path} exact>
            {children}
        </Route>
    )
}

AuthorizedRoute.propTypes = {
    path: PropTypes.string.isRequired,
}
