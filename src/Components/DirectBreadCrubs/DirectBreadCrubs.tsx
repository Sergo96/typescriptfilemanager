import React from "react";
import "./DirectBreadCrubs.scss";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {useHistory, useLocation} from "react-router-dom";

const DirectBreadCrubs = () => {
    const directList = useSelector((state: RootState) => state);
    const history = useHistory();
    const location = useLocation();
    console.log(location)

    return (
        <>
            <div className="direcory_wrapp">
                {directList.directoryFiles.breadCrumbArr.map((directName: any) => {
                    return (
                        <p>{directName.description}/</p>
                    )
                })}
            </div>
        </>
    )

};

export default DirectBreadCrubs;