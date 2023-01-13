import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import ProgressStepper from "./ProgressStepper";
import Topbar from "./TopBar";

const HomePage = (props) => {
    console.log(props.bags);
    return (
        <div>
            <Topbar />
            <ProgressStepper />
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        bags: state.bags,
    };
};

export default connect(mapStateToProps)(HomePage);
