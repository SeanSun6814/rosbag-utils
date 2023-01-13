function onShowPanel2() {
    updateStep2Finished();
}

function updateStep2Finished() {
    if (
        brightnessInputIsValid() &&
        speedUpInputIsValid() &&
        fpsInputIsValid &&
        document.getElementById("imageTopicSelect").value.trim() !== ""
    ) {
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

function brightnessInputIsValid() {
    let value = document.getElementById("minBrightness").value;
    if (!(!isNaN(value) && value.trim() !== "" && parseInt(value) >= 0 && value.indexOf(".") === -1))
        return false;
    value = document.getElementById("maxBrightness").value;
    return !isNaN(value) && value.trim() !== "" && parseInt(value) >= 0 && value.indexOf(".") === -1;
}

function fpsInputIsValid() {
    let value = document.getElementById("fpsInput").value;
    return !isNaN(value) && value.trim() !== "" && parseInt(value) > 0 && value.indexOf(".") === -1;
}

function checkInvertedSwitch() {
    let checkbox = document.getElementById("invertImageSwitch");
    let checkboxLabel = document.getElementById("invertImageSwitchLabel");

    if (checkbox.checked) {
        checkboxLabel.innerHTML = `Enabled`;
    } else {
        checkboxLabel.innerHTML = `Disabled`;
    }
}

function checkEnableBrightnessRange() {
    let checkbox = document.getElementById("BrightnessRangeSwitch");
    let checkboxLabel = document.getElementById("BrightnessRangeSwitchLabel");
    if (checkbox.checked) {
        checkboxLabel.innerHTML = `Enabled`;
        document.getElementById("minBrightness").parentElement.parentElement.classList.remove("disabled");
    } else {
        checkboxLabel.innerHTML = `Disabled`;
        document.getElementById("minBrightness").parentElement.parentElement.classList.add("disabled");
    }
    if (completedStepIdx >= 1) updateStep2Finished();
}
