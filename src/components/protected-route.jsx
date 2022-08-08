import React, {useEffect} from "react";
import {Route, useHistory} from "react-router-dom";
import {getCookie, setCookie} from "../utils/cookie";
import {useDispatch} from "react-redux";
import {refreshToken} from "../services/actions/auth";

export function ProtectedRoute({path, children}) {
    const dispatch = useDispatch()
    const accessToken = getCookie("accessToken")
    const refToken = localStorage.getItem("refreshToken")
    const history = useHistory()

    useEffect(() => {
            async function checkToken() {
                if (!accessToken) {
                    if (refToken) {
                        await dispatch(refreshToken(refToken))
                            .then((res) => {
                                setCookie("accessToken", res.accessToken.split('Bearer ')[1],)
                            })
                            .catch(error => {
                                console.error(error)
                                history.replace("/login")
                            })
                    } else {
                        history.replace("/login")
                    }
                }
            }

            checkToken()
        // eslint-disable-next-line
        }, []
    )

    return (
        <Route to={path} exact>
            {children}
        </Route>
    )
}



