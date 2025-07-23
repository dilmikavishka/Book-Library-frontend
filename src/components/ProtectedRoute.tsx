import * as React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function ProtectedRoute({ children }: { children: React.ReactElement }) {
    const accessToken = Cookies.get("accessToken");
    const refreshToken = Cookies.get("refreshToken");

    if (!accessToken && !refreshToken) {
        return <Navigate to="/signin" replace />;
    }

    return children;
}
