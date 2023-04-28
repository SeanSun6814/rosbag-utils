import * as React from "react";
import { setPageComplete } from "../../reducers/status";
import { useDispatch, connect } from "react-redux";
import TopicTable from "./TopicTable";


const TopicPage = (props) => {
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(setPageComplete(false));
    }, [dispatch]);

    React.useEffect(() => {
        console.log("Checking topics:", props.topics);
        let selectedTopics = Object.keys(props.topics).filter((topic) => props.topics[topic].selected);
        dispatch(setPageComplete(selectedTopics.length > 0));
    }, [props.topics, dispatch]);

    return (
        <TopicTable />
    );
};

export default connect((state) => ({
    topics: state.topics,
}))(TopicPage);
