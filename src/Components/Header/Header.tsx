import React from "react";
import "./Header.scss";
import {Link} from "react-router-dom";


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
                <Link to={"/"} className={"file__managerIcon"}>
                    <span>File Manager</span>
                </Link>
            </div>

        </div>
    );
};

export default Header;