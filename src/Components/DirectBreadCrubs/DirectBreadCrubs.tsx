import React from "react";
import "./DirectBreadCrubs.scss";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";

const DirectBreadCrubs = () => {
    const directList = useSelector((state: RootState) => state);


    return (
        <>
            <div className="direcory_wrapp">
                {directList.directoryFiles.breadCrumbArr.map((directName: any) => {
                    return (
                        <p className={"breadCrumbs"}>/ <span>{directName.description}</span></p>
                    )
                })}
            </div>
        </>
    )

};

export default DirectBreadCrubs;