import React from "react";
import "./Header.scss";
import {Link} from "react-router-dom";

import {Search, ExpandMore, HelpOutline, Settings, AccountCircle, Apps} from "@material-ui/icons";
// import ExpandMoreIcon from "@material-ui/icons/";
// import HelpOutlineIcon from "@material-ui/icons/";
// import SettingsIcon from "@material-ui/icons/";
// import AccountCircleIcon from "@material-ui/icons/";
// import AppsIcon from "@material-ui/icons/";

const Header = () => {
    return (
        <div className="header">

            <div className="header__logo">
                    <img
                        src={
                            "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Flat_tick_icon.svg/1200px-Flat_tick_icon.svg.png"
                        }
                        alt="Google Drive"
                    />

                    <span>Drive</span>

            </div>
            <div className="header__searchContainer">
                <div className="header__searchBar">
                    <Search/>
                    <input type="text" placeholder="Search in Drive"/>
                    <ExpandMore/>
                </div>
            </div>
            <div className="header__icons">
        <span>
          <HelpOutline/>
          <Settings/>
        </span>
                <Apps/>
                {/*<img src={userPhoto} alt="User Photo" />*/}
            </div>
        </div>
    );
};

export default Header;