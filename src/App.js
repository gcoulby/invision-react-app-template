import React, { useState } from "react";
import { HashRouter, Route } from "react-router-dom";
import "./css/css-compiled/main.css";
import "font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import AuthPage from "./components/auth-page";
import withRole, { withMinumumStaffRole } from "./components/rbac-hoc";

export const UserContext = React.createContext();

function App() {
    const AuthenticationView = withMinumumStaffRole("Management")(AuthPage);
    const [user, setUser] = useState({
        access_token: "",
        expiry: "",
        user: {},
    });

    const checkRoles = (roles) => {
        var r = roles.filter((x) =>
            x
                .toLowerCase()
                .includes(user?.user?.primaryGroup?.name?.toLowerCase())
        );
        return r.length > 0;
    };

    return (
        <>
            <UserContext.Provider
                value={{
                    data: user,
                    updateUser: setUser,
                    checkRoles: checkRoles,
                }}
            >
                <Navbar />
                <Sidebar />
                <div id="page-container">
                    <div className="container-fluid">
                        <HashRouter basename="/">
                            {/* <Switch> */}
                            <Route exact path="/">
                                <AuthenticationView
                                    showIfNotAuthorized={true}
                                />
                            </Route>
                            <Route exact path="/page-one">
                                <h1>Page 1</h1>
                            </Route>
                            <Route exact path="/page-two">
                                <h1>Page 2</h1>
                            </Route>
                            <Route path={/access_token=.*/}>
                                <AuthenticationView
                                    showIfNotAuthorized={true}
                                />
                            </Route>
                        </HashRouter>
                    </div>
                </div>
            </UserContext.Provider>
        </>
    );
}

export default App;
