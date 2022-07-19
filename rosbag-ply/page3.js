function onShowPanel3() {
    updateStep3Finished();
}

function updateStep3Finished() {
    if (!document.getElementById("standstillSwitch").checked || cropData.length > 0)
        if (!document.getElementById("trajectoryLengthSwitch").checked || document.getElementById("trajectoryTopicSelect").value.trim() !== "")
            return completedStep(3);
    completedStep(2);
}

function checkEnableStandstill() {
    let checkbox = document.getElementById("standstillSwitch");
    let checkboxLabel = document.getElementById("standstillSwitchLabel");

    if (!document.getElementById("oneRunSwitch").checked && checkbox.checked) {
        checkbox.checked = false;
        showAlert(
            "Can't enable this feature",
            "This feature requires all the files to be in one run. <br>Go to the step 1 and enable 'Treat as one run'",
            "warning",
            "Got it!",
            () => {
                showPanel(1);
            }
        );
    }
    if (checkbox.checked) {
        checkboxLabel.innerHTML = `Enabled`;
        document.getElementById("standstillTimeInput").parentElement.parentElement.parentElement.classList.remove("disabled");
        initOdometryDropdown();
    } else {
        checkboxLabel.innerHTML = `Disabled`;
        document.getElementById("standstillTimeInput").parentElement.parentElement.parentElement.classList.add("disabled");
        cropData = [];
        let table = document.getElementById("croppingTable");
        table.innerHTML = "";
    }
    if (completedStepIdx >= 2) updateStep3Finished();
}

function checkTrajectoryLength() {
    let checkbox = document.getElementById("trajectoryLengthSwitch");
    let checkboxLabel = document.getElementById("trajectoryLengthLabel");

    if (!document.getElementById("oneRunSwitch").checked && checkbox.checked) {
        checkbox.checked = false;
        showAlert(
            "Can't enable this feature",
            "This feature requires all the files to be in one run. <br>Go to the step 1 and enable 'Treat as one run'",
            "warning",
            "Got it!",
            () => {
                showPanel(1);
            }
        );
    }
    if (checkbox.checked) {
        checkboxLabel.innerHTML = `Enabled`;
        document.getElementById("trajectoryTopicSelect").parentElement.parentElement.classList.remove("disabled");
        initTrajectoryOdometryDropdown();
    } else {
        checkboxLabel.innerHTML = `Disabled`;
        document.getElementById("trajectoryTopicSelect").parentElement.parentElement.classList.add("disabled");
    }
    if (completedStepIdx >= 2) updateStep3Finished();
}

function initOdometryDropdown() {
    let topics = new Set();
    for (let fileIdx = 0; fileIdx < files.length; fileIdx++) {
        let info = files[fileIdx].info.topics;
        for (let topic in info) {
            if (info[topic][0] === "nav_msgs/Odometry") topics.add(topic);
        }
    }
    let result = "<option></option>";
    topics.forEach(function (value) {
        result += "<option>" + value + "</option>";
    });
    document.getElementById("standstillTopicSelect").innerHTML = result;
}

function initTrajectoryOdometryDropdown() {
    let topics = new Set();
    for (let fileIdx = 0; fileIdx < files.length; fileIdx++) {
        let info = files[fileIdx].info.topics;
        for (let topic in info) {
            if (info[topic][0] === "nav_msgs/Odometry") topics.add(topic);
        }
    }
    let result = "<option></option>";
    topics.forEach(function (value) {
        result += "<option>" + value + "</option>";
    });
    document.getElementById("trajectoryTopicSelect").innerHTML = result;
}

function checkTreatAsOneRun() {
    let checkbox = document.getElementById("oneRunSwitch");
    if (!checkbox.checked) {
        document.getElementById("standstillSwitch").parentElement.MaterialSwitch.off();
    }
}

function previewCropping() {
    function updateCroppingTable() {
        let table = document.getElementById("croppingTable");
        table.innerHTML = "";
        let blankTime = document.getElementById("standstillTimeInput").value;
        for (let idx = 0; idx < files.length; idx++) {
            let startMoving = cropData[idx] / 1e9 - files[idx].info.start;
            let cropFrom = Math.max(0, startMoving - blankTime);
            if (doubleEquals(cropData[idx], -1)) {
                startMoving = "No movement";
                cropFrom = "Skip entire bag";
            } else if (doubleEquals(cropData[idx], -2)) {
                startMoving = "Topic not found";
                cropFrom = "Skip entire bag";
            } else {
                startMoving = round2(startMoving) + "s";
                cropFrom = round2(cropFrom) + "s";
            }
            addToTable(table, [files[idx].filename, files[idx].info.duration, startMoving, cropFrom]);
        }
        hideLoading();
        updateStep3Finished();
    }
    updateCroppingData(updateCroppingTable);
}

function updateCroppingData(callback) {
    let topicName = document.getElementById("standstillTopicSelect").value;
    if (topicName.trim() === "")
        return showAlert("No topic selected", "Select an odometry topic to compute the cropping.", "error", "Got it", () => {});
    showLoading("Scanning 1/" + files.length + "...");
    cropData = [];
    let count = 0;
    for (let fileIdx = 0; fileIdx < files.length; fileIdx++) {
        cropData.push(0);
        function receivedFirstMoveTime(str) {
            let data = JSON.parse(str);
            console.log("receivedFirstMoveTime: " + data);
            cropData[fileIdx] = parseInt(data);
            count++;
            if (count === files.length) callback();
            else document.getElementById("swal2-title").innerHTML = "Scanning " + (count + 1) + "/" + files.length + "...";
        }
        makeRequest(
            "/findMoveStart",
            "topic=" + encodeURIComponent(topicName) + "&path=" + encodeURIComponent(files[fileIdx].filename),
            receivedFirstMoveTime
        );
    }
}
