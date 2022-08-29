import React, {FC, useEffect} from "react";
import {Redirect, Route, useHistory} from "react-router-dom";
import {getCookie, setCookie} from "../utils/cookie";
import {useDispatch} from "../services/hooks/hooks"
import {refreshToken} from "../services/actions/auth/authThunk";

interface IProtectedRouteProps {
    notForAuthorisedRoute?: boolean,
    path: string,
    exact?: true
}

export const ProtectedRoute: FC<IProtectedRouteProps> = ({children, notForAuthorisedRoute, ...rest}) => {
    const dispatch = useDispatch()
    const accessToken = getCookie("accessToken")
    const refToken = localStorage.getItem("refreshToken")
    const history = useHistory()

    useEffect(() => {
        async function checkToken() {
            if (!accessToken) {
                if (refToken) {
                    await dispatch(
                        refreshToken(refToken)
                    )
                        .then
                        ((res: { accessToken: string; }) => {
                            setCookie("accessToken", res.accessToken.split('Bearer ')[1],)
                        })
                        .catch((error: any) => {
                            console.error(error)
                            history.replace("/login")
                        })
                }
                }
            }

            checkToken()
            // eslint-disable-next-line
        }, []
    )

    if (notForAuthorisedRoute && accessToken) {
        return <Redirect to="/"/>
    }

    return (
        <>
            <Route
                {...rest}
                render={({location}) =>
                    accessToken || notForAuthorisedRoute ? (
                        children
                    ) : (
                        <Redirect
                            to={{
                                pathname: '/login',
                                state: {from: location}
                            }}
                        />
                    )
                }
            />

        </>);
}
