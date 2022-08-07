import React, {useEffect} from "react";
import {Route, useHistory} from "react-router-dom";
import {getCookie} from "../utils/cookie";

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



