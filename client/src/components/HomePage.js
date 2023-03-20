import React from "react";
import ProgressStepper from "./ProgressStepper";
import Topbar from "./TopBar";
import BagPage from "./BagPage";
import TaskRunner from "./TaskRunner";
import TopicPage from "./TopicPage";
import TaskPage from "./TaskPage";
import FinishPage from "./FinishPage";

export default function HomePage() {
    return (
        <div>
            <Topbar />
            <ProgressStepper>{[<BagPage key={1} />, <TopicPage key={2} />, <TaskPage key={3} />, <FinishPage key={4} />]}</ProgressStepper>
            <TaskRunner />
        </div>
    );
};
