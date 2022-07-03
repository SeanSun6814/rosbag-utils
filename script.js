let files = [];
let topics = [];
let selectedTopics = [];

function showPanel(panelIdx) {
    for (let i = 0; i < 5; i++) {
        document.getElementById("panel" + i).style.display = (panelIdx === i ? "block" : "none");
        if (i > 0) document.getElementById("nav" + i).style.backgroundColor = (panelIdx === i ? "rgb(224, 224, 224)" : "rgb(250, 250, 250)");
    }
    if (panelIdx - 1 > completedStepIdx) {
        showAlert("One step at a time", "It looks like you haven't completed step " + (completedStepIdx + 1) + " yet.<br>Let's do that first.",
            "warning", "Go to step " + (completedStepIdx + 1), () => { showPanel(completedStepIdx + 1) });
    }
    if (panelIdx === 2) onShowPanel2();
}

function onShowPanel2() {
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
    function addFilesToTable(str) {
        let data = JSON.parse(str);
        console.log(data);
        if (data.length === 0)
            hideLoading();
        else
            showLoading("Opening files...");
        for (let idx = 0; idx < data.length; idx++) {
            let filename = data[idx];
            files.push({ filename: filename });
            console.log("getting info for bag idx" + (files.length - 1));
            if (idx == data.length - 1)
                getBagInfo(files.length - 1, () => { showBagInfoTable(files.length - 1); completedStep(1); hideLoading(); });
            else
                getBagInfo(files.length - 1, () => { });
        }
    }
    showLoading("Select file...");
    makeRequest("/selectBag", addFilesToTable)
}

function getBagInfo(fileIdx, callback) {
    function saveBagInfo(str) {
        let table = document.getElementById("fileTable");
        let data = JSON.parse(str);
        files[fileIdx].info = data;
        addToTable(table,
            [data.path,
            Math.round(data.duration * 100) / 100 + "s",
            humanFileSize(data.size),
            data.messages
            ],
            "showBagInfoTable(" + fileIdx + ")");
        callback();
    }
    makeRequest("bagInfo?path=" + encodeURIComponent(files[fileIdx].filename), saveBagInfo);
}

window.onload = function () {
    showPanel(0);
    completedStep(0);
}

function makeRequest(url, callback) {
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
                alert('Internal error: \n\n' + httpRequest.responseText + "\n\nApp will restart...");
                location.reload();
            }
        }
    }

    httpRequest.timeout = 0
    httpRequest.onreadystatechange = receivedResponse;
    console.log("SENDING REQUEST: " + url);
    httpRequest.open('GET', url);
    httpRequest.send();
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
    let text = [``, `<b>1. Select bags</b>`, `<b>2. Select topics</b>`, `<b>3. Export options</b>`, `<b>4. Finish</b>`];
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
    }
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