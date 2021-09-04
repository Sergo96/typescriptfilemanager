import React from 'react';


import Header from "./Components/Header/Header";
import Dashboard from "./Components/Dashboard/Dashboard";
import SubFiles from "./pages/SubFiles/SubFiles";
import FileText from "./pages/FileText/FileText";
import TrashBin from "./pages/TrashBin/TrashBin";

import {signInWithPopup} from "firebase/auth";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {auth, provider} from "./firebase";

import {useDispatch, useSelector} from "react-redux";
import {
    setActiveUser,
    selectUserName,
} from "./features/userSlice/userSlice";

import "./App.scss";
import DirectBreadCrubs from "./Components/DirectBreadCrubs/DirectBreadCrubs";

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




    return (
        <Router>
            <Switch>
                <div className="App">
                    {userName ? (
                        <>
                            <Header/>
                            <DirectBreadCrubs/>
                            <Route exact path="/" component={Dashboard}/>
                            <Route exact path="/folder/:folderId" component={SubFiles}/>
                            <Route exact path="/file/:fileId" component={FileText}/>
                            <Route exact path="/trashBin" component={TrashBin}/>
                        </>
                    ) : (
                        <div className={"signIn"}>
                            <button onClick={handleSignIn}>Sign in</button>
                        </div>
                    )}
                </div>
            </Switch>
        </Router>
    );
}

export default App;
