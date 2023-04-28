import React from "react";
import ProgressStepper from "./ProgressStepper";
import BagPage from "./BagPage";
import TaskRunner from "../TaskRunner";
import TopicPage from "./TopicPage";
import TaskPage from "./TaskPage";
import FinishPage from "./FinishPage";
import TopBar from "../TopBar";

export default function RosbagUtilsPage() {
    return (
        <div>
            <TopBar />
            <ProgressStepper>{[<BagPage key={1} />, <TopicPage key={2} />, <TaskPage key={3} />, <FinishPage key={4} />]}</ProgressStepper>
            <TaskRunner />
        </div>
    );
}
