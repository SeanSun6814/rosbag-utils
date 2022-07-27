function onShowPanel2() {
    updateStep2Finished();
}

function updateStep2Finished() {
    if (speedUpInputIsValid() && fpsInputIsValid && document.getElementById("imageTopicSelect").value.trim() !== "") {
        return completedStep(2);
    }
    return completedStep(1);
}

function initImageDropdown() {
    let topics = new Set();
    for (let fileIdx = 0; fileIdx < files.length; fileIdx++) {
        let info = files[fileIdx].info.topics;
        for (let topic in info) {
            if (info[topic][0] === "sensor_msgs/Image") topics.add(topic);
        }
    }
    let result = "<option></option>";
    topics.forEach(function (value) {
        result += "<option>" + value + "</option>";
    });
    document.getElementById("imageTopicSelect").innerHTML = result;
}

function speedUpInputIsValid() {
    let value = document.getElementById("speedUpInput").value;
    return !isNaN(value) && value.trim() !== "" && parseInt(value) > 0 && value.indexOf(".") === -1;
}

function fpsInputIsValid() {
    let value = document.getElementById("fpsInput").value;
    return !isNaN(value) && value.trim() !== "" && parseInt(value) > 0 && value.indexOf(".") === -1;
}
