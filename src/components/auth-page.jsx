import React, { useContext, useState } from "react";
import { UserContext } from "../App";
function AuthPage() {
    let context = useContext(UserContext);
    return (
        <>
            <h1>Welcome Back {context.data.user.name}</h1>
            <p>
                You are now logged in and are authorised to access features
                within this application. The features you can access are based
                on your community whitelisting.
            </p>
        </>
    );
}

export default AuthPage;
