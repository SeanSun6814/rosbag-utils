import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import ProgressStepper from "./ProgressStepper";
import Topbar from "./TopBar";
import BagPage from "./BagPage";
import TaskRunner from "./TaskRunner";

const HomePage = (props) => {
    console.log(props.bags);
    return (
        <div>
            <Topbar />
            <ProgressStepper>
                <BagPage />
            </ProgressStepper>
            <TaskRunner />
        </div>
    );
};

export default connect((state) => ({
    bags: state.bags,
}))(HomePage);
