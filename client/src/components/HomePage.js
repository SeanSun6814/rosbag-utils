import React from "react";
import { connect } from "react-redux";
import ProgressStepper from "./ProgressStepper";
import Topbar from "./TopBar";
import BagPage from "./BagPage";
import TaskRunner from "./TaskRunner";
import TopicPage from "./TopicPage";

const HomePage = (props) => {
    console.log(props.bags);
    return (
        <div>
            <Topbar />
            <ProgressStepper>{[<BagPage />, <TopicPage />]}</ProgressStepper>
            <TaskRunner />
        </div>
    );
};

export default connect((state) => ({
    bags: state.bags,
}))(HomePage);
