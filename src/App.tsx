import React from 'react';


import Header from "./Components/Header/Header";
import Dashboard from "./Components/Dashboard/Dashboard";
import SubFiles from "./pages/SubFiles/SubFiles";
import FileText from "./pages/FileText/FileText";

import {signInWithPopup} from "firebase/auth";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {auth, provider} from "./firebase";

import {useDispatch, useSelector} from "react-redux";
import {
    setActiveUser,
    setUserLogOutState,
    selectUserName,
} from "./features/userSlice/userSlice";

function App() {
    const dispatch = useDispatch();
    const userName = useSelector(selectUserName);

    const handleSignIn = () => {
        signInWithPopup(auth, provider).then((result) => {
            dispatch(
                setActiveUser({
                    userName: result.user.displayName,
                    userEmail: result.user.email,
                })
            );
        });
    };

    const handleSignOut = () => {
        auth
            .signOut()
            .then(() => {
                dispatch(setUserLogOutState());
            })
            .catch((err) => alert(err.message));
    };


    return (
        <Router>
            <Switch>
                <div className="App">
                    {userName ? (
                        <>
                            <Header/>
                            <button onClick={handleSignOut}>Sign out</button>
                            <Route exact path="/" component={Dashboard}/>
                            <Route exact path="/folder/:folderId" component={SubFiles}/>
                            <Route exact path="/file/:fileId" component={FileText}/>
                        </>
                    ) : (
                        <button onClick={handleSignIn}>Sign in</button>
                    )}
                </div>
            </Switch>
        </Router>
    );
}

export default App;
