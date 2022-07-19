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
        let blankTime = parseFloat(document.getElementById("standstillTimeInput").value);
        for (let idx = 0; idx < files.length; idx++) {
            let cropFrom = cropData[idx].start - files[idx].info.start;
            let cropTo = cropData[idx].end - files[idx].info.start;
            let startMoving = cropData[idx].start + blankTime - files[idx].info.start;
            if (doubleEquals(cropData[idx], -1)) {
                startMoving = "No movement";
                cropFrom = "Skip entire bag";
                cropTo = "Skip entire bag";
            } else if (doubleEquals(cropData[idx], -2)) {
                startMoving = "Topic not found";
                cropFrom = "Include entire bag";
                cropTo = "Include entire bag";
            } else {
                startMoving = round2(startMoving) + "s";
                cropFrom = round2(cropFrom) + "s";
                cropTo = round2(cropTo) + "s";
            }
            addToTable(table, [files[idx].filename, files[idx].info.duration, startMoving, cropFrom, cropTo]);
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
    let blankTime = document.getElementById("standstillTimeInput").value;
    for (let fileIdx = 0; fileIdx < files.length; fileIdx++) {
        cropData.push(0);
        function receivedFirstMoveTime(str) {
            let data = JSON.parse(str);
            console.log("receivedFirstMoveTime: " + data);
            let startMoving = parseInt(data) / 1e9;
            let cropFrom = startMoving < 0 ? -1 : Math.max(0, startMoving - blankTime);
            cropData[fileIdx] = {};
            cropData[fileIdx].start = cropFrom;
            cropData[fileIdx].end = files[fileIdx].info.end;
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
