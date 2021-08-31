import React from "react";
import "./Header.scss";
import {Link} from "react-router-dom";
import {auth} from "../../firebase";
import {setUserLogOutState} from "../../features/userSlice/userSlice";
import {useDispatch} from "react-redux";
import {Button} from "@material-ui/core";





const Header = () => {

    const dispatch = useDispatch()

    const handleSignOut = () => {
        auth
            .signOut()
            .then(() => {
                dispatch(setUserLogOutState());
            })
            .catch((err) => alert(err.message));
    };
    return (
        <div className="header">
            <div className="header__logo">
                <img
                    src={
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Flat_tick_icon.svg/1200px-Flat_tick_icon.svg.png"
                    }
                    alt="Google Drive"
                />
                <Link to={"/"} className={"file__managerIcon"}>
                    <span>File Manager</span>
                </Link>

            </div>
            <Button onClick={handleSignOut} variant="contained" color="primary">
                Log Out
            </Button>


        </div>
    );
};

export default Header;