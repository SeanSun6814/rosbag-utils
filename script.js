let files = [];
let combinedTopics = [];
let selectedTopics = [];
let cropData = [];
let trajectoryInfo = [];

function showPanel(panelIdx) {
    for (let i = 0; i < 5; i++) {
        document.getElementById("panel" + i).style.display = (panelIdx === i ? "block" : "none");
        if (i > 0) document.getElementById("nav" + i).style.backgroundColor = (panelIdx === i ? "rgb(224, 224, 224)" : "rgb(250, 250, 250)");
    }
    if (panelIdx - 1 > completedStepIdx) {
        return showAlert("One step at a time", "It looks like you haven't completed step " + (completedStepIdx + 1) + " yet.<br>Let's do that first.",
            "warning", "Go to step " + (completedStepIdx + 1), () => { showPanel(completedStepIdx + 1) });
    }
    if (panelIdx === 3) onShowPanel3();
    if (panelIdx === 4) onShowPanel4();

}

function onShowPanel4() {
    updateSelectedTopics();
    let label = document.getElementById("summaryLabel");
    label.innerHTML = "We'll export " + selectedTopics.length + "/" + combinedTopics.length +
        " topics from " + files.length + " bag files.";
}


function onShowPanel3() {
    updateStep3Finished();
}

function updateStep3Finished() {
    if (!document.getElementById("standstillSwitch").checked || cropData.length > 0)
        if (!document.getElementById("trajectoryLengthSwitch").checked || document.getElementById("trajectoryTopicSelect").value.trim() !== "")
            return completedStep(3);
    completedStep(2);
}

function generatePanel2() {
    function getAllTopics() {
        let allTopics = {};
        let allTheSame = true;
        for (let fileIdx = 0; fileIdx < files.length; fileIdx++) {
            let info = files[fileIdx].info.topics;
            let topicCount = 0;
            for (let topic in info) {
                topicCount++;
                if (allTopics[topic] == undefined) {
                    if (fileIdx != 0) allTheSame = false;
                    allTopics[topic] = [topic, info[topic][0], info[topic][1], 1]
                } else {
                    if (info[topic][0] !== allTopics[topic][1]) {
                        alert("Sneaky! Some topics have same names but different types!\n" +
                            "This display might only show one type but everything else should work though. " +
                            "This part of the code is not tested, so double check the results.");
                    }
                    allTopics[topic][2] += info[topic][1];
                    allTopics[topic][3] += 1;
                }
            }
            if (topicCount != Object.keys(allTopics).length) {
                allTheSame = false;
            }
        }
        let arr = [];
        for (var key in allTopics) {
            if (allTopics.hasOwnProperty(key)) {
                arr.push(allTopics[key]);
            }
        }
        combinedTopics = arr;
        return { arr: arr, topicsAllTheSame: allTheSame };
    }
    let result = getAllTopics();
    if (!result.topicsAllTheSame) {
        document.getElementById("bagDiffWarning").innerHTML = `<br><i class="fa fa-info-circle fa-lg" aria-hidden="true"></i> &nbsp Some bags have different topics.`;
    } else {
        document.getElementById("bagDiffWarning").innerHTML = `<br><i class="fa fa-info-circle fa-lg" aria-hidden="true"></i> &nbsp All bags have the same topics.`;
    }
    let table = document.getElementById("allTopicsTable");
    table.innerHTML = "";
    let rowIdx = 1;
    let checkbox = "";
    for (let arr in result.arr) {
        checkbox = `<label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect mdl-data-table__select" for="row${rowIdx}">
                <input type="checkbox" id="row${rowIdx}" class="mdl-checkbox__input" />
              </label>`;
        rowIdx++;
        addToTable(table, [checkbox].concat(result.arr[arr]));
    }
    allTopicsTableItemCount = rowIdx - 1;
    componentHandler.upgradeDom();
    let itemChecks = allTopicsTable.querySelectorAll('tbody .mdl-data-table__select input');
    itemChecks.forEach((elem) => elem.addEventListener('change', itemCheckHandler));
}

function addToTable(table, dataArr, onclick) {
    if (onclick === undefined) onclick = "";
    let html = "<tr>";
    dataArr.forEach((elem, idx, arr) => {
        if (typeof elem === "string")
            html += "<td onclick='" + onclick + "' class=\"mdl-data-table__cell--non-numeric\">" + elem + "</td>";
        else
            html += "<td onclick='" + onclick + "'>" + elem + "</td>";
    });
    html += "</tr>";
    table.innerHTML += html;
}

function showBagInfoTable(idx) {
    let title = document.getElementById("bagName");
    let table = document.getElementById("bagInfoTable");

    title.innerHTML = files[idx].filename;
    table.innerHTML = "";

    let info = files[idx].info.topics;
    for (let topic in info) {
        addToTable(table, [topic, info[topic][0], info[topic][1], info[topic][3] == null ? 0 : info[topic][3]]);
    }
}

function showFileDialog() {
    let initialFileLength = files.length;
    function addFilesToTable(str) {
        function generateTable() {
            let table = document.getElementById("fileTable");
            for (let fileIdx = initialFileLength; fileIdx < files.length; fileIdx++) {
                addToTable(table,
                    [fileIdx + 1, files[fileIdx].filename,
                    Math.round(files[fileIdx].info.duration * 100) / 100 + "s",
                    humanFileSize(files[fileIdx].info.size),
                    files[fileIdx].info.messages
                    ],
                    "showBagInfoTable(" + fileIdx + ")");
            }
            showBagInfoTable(files.length - 1);
            generatePanel2();
            completedStep(1);
            hideLoading();
            checkIfBagsAreContinuous();
        }
        let data = JSON.parse(str);
        console.log(data);
        if (data.length === 0)
            hideLoading();
        else
            showLoading("Opening 1/" + data.length + "...");
        let count = 1;
        for (let idx = 0; idx < data.length; idx++) {
            let filename = data[idx];
            files.push({ filename: filename });
            console.log("getting info for bag idx" + (files.length - 1));
            getBagInfo(files.length - 1, () => {
                if (count === data.length) {
                    generateTable();
                } else {
                    document.getElementById("swal2-title").innerHTML = "Opening " + (count + 1) + "/" + data.length + "...";
                    count++;
                }
            });
        }
    }
    showLoading("Select file...");;
    makeRequest("/selectBag", "", addFilesToTable);
    let headerCheckbox = allTopicsTable.querySelector('thead .mdl-data-table__select');
    headerCheckbox.MaterialCheckbox.uncheck();
    headerCheckbox.MaterialCheckbox.updateClasses_();
    document.getElementById("standstillSwitch").parentElement.MaterialSwitch.off();
    document.getElementById("trajectoryLengthSwitch").parentElement.MaterialSwitch.off();
    checkEnableStandstill();
    checkTrajectoryLength();
}

function getBagInfo(fileIdx, callback) {
    function saveBagInfo(str) {
        let data = JSON.parse(str);
        files[fileIdx].info = data;
        callback();
    }
    makeRequest("bagInfo", "path=" + encodeURIComponent(files[fileIdx].filename), saveBagInfo);
}

window.onload = function () {
    showPanel(0);
    completedStep(0);
}

function makeRequest(url, data, callback) {
    let httpRequest = new XMLHttpRequest();
    if (!httpRequest)
        return false;

    function receivedResponse() {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                // alert(httpRequest.responseText);
                console.log("RECEIVED RESPONSE: " + httpRequest.responseText);
                callback(httpRequest.responseText);
            } else {
                showAlert('Internal error', httpRequest.responseText + "<br><br>App will restart...", "error", "Restart app", () => { location.reload(); });
            }
        }
    }

    httpRequest.timeout = 0
    httpRequest.onreadystatechange = receivedResponse;
    console.log("SENDING REQUEST: " + url);
    httpRequest.open("POST", url, true);
    httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    httpRequest.send(data);
}

let allTopicsTableItemCount = 0;
let allTopicsTable = document.querySelector('#allTopicsTableOuter');
let headerCheckbox = allTopicsTable.querySelector('thead .mdl-data-table__select input');
let headerCheckHandler = function (event) {
    let boxes = allTopicsTable.querySelectorAll('tbody .mdl-data-table__select');
    if (event.target.checked) {
        for (let i = 0, length = boxes.length; i < length; i++) {
            boxes[i].MaterialCheckbox.check();
            boxes[i].MaterialCheckbox.updateClasses_();
            completedStep(2);
        }
    } else {
        for (let i = 0, length = boxes.length; i < length; i++) {
            boxes[i].MaterialCheckbox.uncheck();
            boxes[i].MaterialCheckbox.updateClasses_();
            completedStep(1);
        }
    }
};

let itemCheckHandler = function (event) {
    let boxes = allTopicsTable.querySelectorAll('tbody .is-checked');
    let headerCheckbox = allTopicsTable.querySelector('thead .mdl-data-table__select');
    // console.log("this many boxes checked: " + boxes.length);
    if (boxes.length === allTopicsTableItemCount) {
        headerCheckbox.MaterialCheckbox.check();
        headerCheckbox.MaterialCheckbox.updateClasses_();
    } else {
        headerCheckbox.MaterialCheckbox.uncheck();
        headerCheckbox.MaterialCheckbox.updateClasses_();
    }
    if (boxes.length === 0) {
        completedStep(1);
    } else {
        completedStep(2);
    }
}
headerCheckbox.addEventListener('change', headerCheckHandler);

let completedStepIdx = 0;
const greenCheckIcon = `<i style="margin: 5px; color: green; float:right;" class="fa fa-check-circle fa-lg" aria-hidden="true"></i>`;
const orangeBangIcon = `<i style="margin: 5px; color: #ff6200; float:right;" class="fa fa-exclamation-triangle fa-lg" aria-hidden="true"></i>`;
function completedStep(idx) {
    completedStepIdx = idx;
    let text = [``, `<b>1. Select bags</b>`, `<b>2. Select topics</b>`, `<b>3. More options</b>`, `<b>4. Finish</b>`];
    if (idx === 0) {
        text[1] += orangeBangIcon;
    } else if (idx === 1) {
        text[1] += greenCheckIcon;
        text[2] += orangeBangIcon;
    } else if (idx === 2) {
        text[1] += greenCheckIcon;
        text[2] += greenCheckIcon;
        text[3] += orangeBangIcon;
    } else if (idx === 3) {
        text[1] += greenCheckIcon;
        text[2] += greenCheckIcon;
        text[3] += greenCheckIcon;
        text[4] += orangeBangIcon;
    } else {
        text[1] += greenCheckIcon;
        text[2] += greenCheckIcon;
        text[3] += greenCheckIcon;
        text[4] += greenCheckIcon;
    }
    for (let i = 1; i < 5; i++) {
        document.getElementById("nav" + i).innerHTML = text[i];
    }
}

function checkEnableStandstill() {
    let checkbox = document.getElementById("standstillSwitch");
    let checkboxLabel = document.getElementById("standstillSwitchLabel");

    if (!document.getElementById("oneRunSwitch").checked && checkbox.checked) {
        checkbox.checked = false;
        showAlert("Can't enable this feature", "This feature requires all the files to be in one run. <br>Go to the step 1 and enable 'Treat as one run'", 'warning', 'Got it!', () => { showPanel(1) })
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
    if (completedStepIdx >= 2)
        updateStep3Finished();
}

function checkTrajectoryLength() {
    let checkbox = document.getElementById("trajectoryLengthSwitch");
    let checkboxLabel = document.getElementById("trajectoryLengthLabel");

    if (!document.getElementById("oneRunSwitch").checked && checkbox.checked) {
        checkbox.checked = false;
        showAlert("Can't enable this feature", "This feature requires all the files to be in one run. <br>Go to the step 1 and enable 'Treat as one run'", 'warning', 'Got it!', () => { showPanel(1) })
    }
    if (checkbox.checked) {
        checkboxLabel.innerHTML = `Enabled`;
        document.getElementById("trajectoryTopicSelect").parentElement.parentElement.classList.remove("disabled");
        initTrajectoryOdometryDropdown();
    } else {
        checkboxLabel.innerHTML = `Disabled`;
        document.getElementById("trajectoryTopicSelect").parentElement.parentElement.classList.add("disabled");
    }
    if (completedStepIdx >= 2)
        updateStep3Finished();
}


function initOdometryDropdown() {
    let topics = new Set();
    for (let fileIdx = 0; fileIdx < files.length; fileIdx++) {
        let info = files[fileIdx].info.topics;
        for (let topic in info) {
            if (info[topic][0] === "nav_msgs/Odometry")
                topics.add(topic);
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
            if (info[topic][0] === "nav_msgs/Odometry")
                topics.add(topic);
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

function showAlert(title, text, icon, buttonText, callback) {
    Swal.fire({
        title: title,
        html: text,
        icon: icon,
        confirmButtonColor: '#3085d6',
        confirmButtonText: buttonText
    }).then((result) => {
        callback();
    });
}

function showLoading(title) {
    Swal.fire({
        title: title,
        html: '',
        allowEscapeKey: false,
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    }).then((result) => {
    });
}

function hideLoading() {
    Swal.close();
}


function humanFileSize(bytes, si = true, dp = 2) {
    const thresh = si ? 1000 : 1024;

    if (Math.abs(bytes) < thresh) {
        return bytes + ' B';
    }

    const units = si
        ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
        : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    let u = -1;
    const r = 10 ** dp;

    do {
        bytes /= thresh;
        ++u;
    } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);


    return bytes.toFixed(dp) + ' ' + units[u];
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
            addToTable(table, [files[idx].filename, files[idx].info.duration, startMoving, cropFrom])
        }
        hideLoading();
        updateStep3Finished();
    }
    updateCroppingData(updateCroppingTable);
}

function updateCroppingData(callback) {
    let topicName = document.getElementById("standstillTopicSelect").value;
    if (topicName.trim() === "")
        return showAlert("No topic selected", "Select an odometry topic to compute the cropping.", "error", "Got it", () => { });
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
            if (count === files.length)
                callback();
            else
                document.getElementById("swal2-title").innerHTML = "Scanning " + (count + 1) + "/" + files.length + "...";
        }
        makeRequest("findMoveStart", "topic=" + encodeURIComponent(topicName) + "&path=" + encodeURIComponent(files[fileIdx].filename), receivedFirstMoveTime);
    }
}


function doubleEquals(a, b) {
    return Math.abs(a - b) < 1e-8;
}

function round2(a) {
    return Math.round(a * 1e2) / 1e2;
}

function updateSelectedTopics() {
    let boxes = allTopicsTable.querySelectorAll('tbody .is-checked');
    selectedTopics = [];
    for (let i = 0; i < boxes.length; i++) {
        selectedTopics.push(boxes[i].parentElement.nextSibling.innerHTML);
    }
}

function onExportButton() {
    let trajectoryTopic = document.getElementById("trajectoryLengthSwitch").checked ? document.getElementById("trajectoryTopicSelect").value : "NOTOPIC";
    let blankTime = document.getElementById("standstillTimeInput").value;
    blankTime *= 1e9;
    trajectoryInfo = [];
    for (let _ in files) {
        trajectoryInfo.push({});
    }
    let count = 0;
    let exportStartTimestamp = new Date().getTime();
    showLoading("Exporting 1/" + files.length + "...");
    for (let fileIdx = 0; fileIdx < files.length; fileIdx++) {
        let startMoving = (cropData.length === 0 ? 0 : cropData[fileIdx]);
        let pathIn = files[fileIdx].filename;
        let cropFrom = startMoving < 0 ? -1 : Math.max(0, startMoving - blankTime);
        let pathOut = pathIn.replace(new RegExp('.bag$'), '_processed.bag');
        let topics = "";
        for (let topicIdx = 0; topicIdx < selectedTopics.length; topicIdx++) {
            topics += selectedTopics[topicIdx];
            if (topicIdx !== selectedTopics.length - 1) {
                topics += " ";
            }
        }

        function showFinalResults() {
            let label = document.getElementById("finalResultsLabel");
            let timeUsed = msToTime(new Date().getTime() - exportStartTimestamp);
            let result = "Finished exporting " + files.length + " files in " + timeUsed + ".<br><br>";
            if (trajectoryTopic !== "NOTOPIC") {
                let foundLastPos = false;
                let totalTrajectoryLength = 0.0;
                let tmpResult = "";
                for (let idx = trajectoryInfo.length - 1; idx >= 0; idx--) {
                    let info = trajectoryInfo[idx];
                    totalTrajectoryLength += info.l;
                    if (!foundLastPos && info.t > 0) {
                        foundLastPos = true;
                        tmpResult = "The last position in trajectory is<br><b>(" + info.x + ", " + info.y + ", " + info.z + ")</b><br>"
                            + "and it occurred at time = <b>" + info.t + "</b><br>in bag file <b>" + files[idx].filename + "</b>";
                    }
                }
                result += "The trajectory length across all bags is <b>" + totalTrajectoryLength + "</b><br><br>" + tmpResult + "<br><br>";
            }
            result += "A detailed report is saved to <b>" + saveDetailedResult() + "</b>";
            label.innerHTML = result;
        }

        function finishExport(str) {
            let data = JSON.parse(str);
            console.log(data);
            if (trajectoryTopic !== "NOTOPIC") {
                trajectoryInfo[fileIdx].x = data[0];
                trajectoryInfo[fileIdx].y = data[1];
                trajectoryInfo[fileIdx].z = data[2];
                trajectoryInfo[fileIdx].t = data[3];
                trajectoryInfo[fileIdx].l = data[4];
            }
            count++;
            if (count !== files.length) {
                document.getElementById("swal2-title").innerHTML = "Exporting " + (count + 1) + "/" + files.length + "...";
            } else {
                showFinalResults();
                hideLoading();
                completedStep(4);
            }

        }
        let dataUrl = "pathIn=" + encodeURIComponent(pathIn) +
            "&pathOut=" + encodeURIComponent(pathOut) +
            "&startTime=" + encodeURIComponent(cropFrom) +
            "&topics=" + encodeURIComponent(topics) +
            "&trajectoryTopic=" + encodeURIComponent(trajectoryTopic);

        makeRequest("exportBag", dataUrl, finishExport);
    }
}


function msToTime(ms) {
    console.log("Converting " + ms + " ms");
    let seconds = (ms / 1000).toFixed(1);
    let minutes = (ms / (1000 * 60)).toFixed(1);
    let hours = (ms / (1000 * 60 * 60)).toFixed(1);
    let days = (ms / (1000 * 60 * 60 * 24)).toFixed(1);
    if (seconds < 60) return seconds + " sec";
    else if (minutes < 60) return minutes + " min";
    else if (hours < 24) return hours + " hrs";
    else return days + " days"
}

function getDateTime() {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    if (month.toString().length == 1) {
        month = '0' + month;
    }
    if (day.toString().length == 1) {
        day = '0' + day;
    }
    if (hour.toString().length == 1) {
        hour = '0' + hour;
    }
    if (minute.toString().length == 1) {
        minute = '0' + minute;
    }
    if (second.toString().length == 1) {
        second = '0' + second;
    }
    var dateTime = year + '-' + month + '-' + day + '_' + hour + '-' + minute + '-' + second;
    return dateTime;
}

function saveDetailedResult() {
    let path = files[0].filename.match(/(.*)[\/\\]/)[1] || '';
    path += "/result_" + getDateTime() + ".txt";
    let result = "";
    result += "\n======================= Imported bags =======================\n";
    for (let idx = 0; idx < files.length; idx++) {
        result += files[idx].filename + "\n";
    }

    result += "\n\n\n\n======================= All topics among bags =======================\n";
    result += "file, topic type, total # messages, appeared in # bags\n";
    for (let idx = 0; idx < combinedTopics.length; idx++) {
        result += combinedTopics[idx][0] + ", " + combinedTopics[idx][1] + ", " + combinedTopics[idx][2] + ", " + combinedTopics[idx][3] + "\n";
    }

    result += "\n\n\n\n======================= Calculate trajectory length =======================\n";
    if (document.getElementById("trajectoryLengthSwitch").checked) {
        let foundLastPos = false;
        let totalTrajectoryLength = 0.0;
        let tmpResult = "";
        for (let idx = trajectoryInfo.length - 1; idx >= 0; idx--) {
            let info = trajectoryInfo[idx];
            totalTrajectoryLength += info.l;
            if (!foundLastPos && info.t > 0) {
                foundLastPos = true;
                tmpResult = "The last position in trajectory is\n(" + info.x + "," + info.y + "," + info.z + ")\n"
                    + "and it occurred at time = " + info.t + "\nin bag file " + files[idx].filename + "";
            }
        }
        result += "The trajectory length across all bags is " + totalTrajectoryLength + "\n\n" + tmpResult;
        result += "\n\n\n============ Trajectory info for each bag ============\n";
        result += "file, last pos timestamp, last x pos, last y pos, last z pos, total length\n";
        for (let idx = 0; idx < trajectoryInfo.length; idx++) {
            let info = trajectoryInfo[idx];
            if (info.t > 0) {
                result += files[idx].filename + ", " + info.t + ", " + info.x + ", " + info.y + ", " + info.z + ", " + info.l + "\n";
            } else {
                result += "Bag skipped or trajectory topic not found.\n";
            }
        }

    } else {
        result += "Disabled\n";
    }

    result += "\n\n\n\n======================= Crop data =======================\n";
    if (cropData.length > 0) {
        let blankTime = document.getElementById("standstillTimeInput").value;
        result += "file, duration, first moving at, start crop at\n";
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
            result += files[idx].filename + ", " + files[idx].info.duration + ", " + startMoving + ", " + cropFrom + "\n";
        }
    } else {
        result += "Disabled\n";
    }
    console.log(result);
    console.log(path);
    let dataUrl = "path=" + encodeURIComponent(path) + "&text=" + encodeURIComponent(result);
    makeRequest("saveFile", dataUrl, () => { console.log("File saved!") });
    return path;
}

function checkIfBagsAreContinuous() {
    if (files.length === 0) return;
    let prevEndTime = files[0].info.end;
    let result = "";
    for (let fileIdx = 1; fileIdx < files.length; fileIdx++) {
        let startTime = files[fileIdx].info.start;
        if (Math.abs(startTime - prevEndTime) > 1) {
            result += `Bag #${fileIdx} ends at time ${prevEndTime}<br>`
                + `but bag #${fileIdx + 1} starts at time ${startTime}<br><br>`;
        }
        prevEndTime = files[fileIdx].info.end;
    }

    if (result !== "") {
        showAlert("Bags not continuous", result, "warning", "Got it", () => { });
    }
}