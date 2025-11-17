import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom"
import { AuthContext } from "../contexts/auth.context";

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
    const { token } = useContext(AuthContext)
    const location = useLocation()

    if (!token) {
        return <Navigate to="/login" replace state={{ from: location }} />
    }
    return <>{ children }</>
}