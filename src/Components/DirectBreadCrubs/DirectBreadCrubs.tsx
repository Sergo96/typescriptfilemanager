import React from "react";
import "./DirectBreadCrubs.scss";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";

const DirectBreadCrubs = () => {
    const directList = useSelector((state: RootState) => state);

    return (
        <>
            <div className="direcory_wrapp">
                {directList.directoryFiles.map((directName: any) => {
                    return (
                        <p>{directName.description}/</p>
                    )
                })}
            </div>
        </>
    )

};

export default DirectBreadCrubs;