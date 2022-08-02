function onShowPanel2() {
    updateStep2Finished();
}

function updateStep2Finished() {
    if (standstillSecondsIsValid() && document.getElementById("pointCloudTopicSelect").value.trim() !== "")
        if (!document.getElementById("trimPointcloudSwitch").checked || trimDataIsValid())
            return completedStep(2);
    return completedStep(1);
}

function initPointCloudDropdown() {
    let topics = new Set();
    for (let fileIdx = 0; fileIdx < files.length; fileIdx++) {
        let info = files[fileIdx].info.topics;
        for (let topic in info) {
            if (info[topic][0] === "sensor_msgs/PointCloud2") topics.add(topic);
        }
    }
    let result = "<option></option>";
    topics.forEach(function (value) {
        result += "<option>" + value + "</option>";
    });
    document.getElementById("pointCloudTopicSelect").innerHTML = result;
}

function standstillSecondsIsValid() {
    let value = document.getElementById("maxPointsInput").value;
    return !isNaN(value) && value.trim() !== "";
}

function trimDataIsValid() {
    let value;
    value = document.getElementById("minXInput").value;
    if (!(!isNaN(value) && value.trim() !== "")) return false;
    value = document.getElementById("maxXInput").value;
    if (!(!isNaN(value) && value.trim() !== "")) return false;
    value = document.getElementById("minYInput").value;
    if (!(!isNaN(value) && value.trim() !== "")) return false;
    value = document.getElementById("maxYInput").value;
    if (!(!isNaN(value) && value.trim() !== "")) return false;
    value = document.getElementById("minZInput").value;
    if (!(!isNaN(value) && value.trim() !== "")) return false;
    value = document.getElementById("maxZInput").value;
    if (!(!isNaN(value) && value.trim() !== "")) return false;
    return true;
}
