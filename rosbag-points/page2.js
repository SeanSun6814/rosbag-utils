function onShowPanel2() {
    updateStep2Finished();
}

function updateStep2Finished() {
    if (standstillSecondsIsValid() && document.getElementById("pointCloudTopicSelect").value.trim() !== "")
        if (!document.getElementById("trimPointcloudSwitch").checked || trimDataIsValid())
            if (speedUpInputIsValid()) return completedStep(2);
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

function checkEnableTrim() {
    let checkbox = document.getElementById("trimPointcloudSwitch");
    let checkboxLabel = document.getElementById("trimPointcloudSwitchLabel");
    if (checkbox.checked) {
        checkboxLabel.innerHTML = `Enabled`;
        document.getElementById("minXInput").parentElement.parentElement.classList.remove("disabled");
    } else {
        checkboxLabel.innerHTML = `Disabled`;
        document.getElementById("minXInput").parentElement.parentElement.classList.add("disabled");
    }
    if (completedStepIdx >= 1) updateStep2Finished();
}

function checkEnableAxis() {
    let checkbox = document.getElementById("collapseAxisSwitch");
    let checkboxLabel = document.getElementById("collapseAxisSwitchLabel");
    if (checkbox.checked) {
        checkboxLabel.innerHTML = `Enabled`;
        document
            .getElementById("collapseAxisSelect")
            .parentElement.parentElement.classList.remove("disabled");
    } else {
        checkboxLabel.innerHTML = `Disabled`;
        document.getElementById("collapseAxisSelect").parentElement.parentElement.classList.add("disabled");
    }
    if (completedStepIdx >= 1) updateStep2Finished();
}

function speedUpInputIsValid() {
    let value = document.getElementById("speedUpInput").value;
    return !isNaN(value) && value.trim() !== "" && parseInt(value) > 0 && value.indexOf(".") === -1;
}
