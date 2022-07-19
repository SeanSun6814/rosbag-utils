function makeRequest(url, data, callback) {
    let httpRequest = new XMLHttpRequest();
    if (!httpRequest) return false;

    function receivedResponse() {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                // alert(httpRequest.responseText);
                console.log("RECEIVED RESPONSE: " + httpRequest.responseText);
                callback(httpRequest.responseText);
            } else {
                showAlert("Internal error", httpRequest.responseText + "<br><br>App will restart...", "error", "Restart app", () => {
                    location.reload();
                });
            }
        }
    }

    httpRequest.timeout = 0;
    httpRequest.onreadystatechange = receivedResponse;
    console.log("SENDING REQUEST: " + url);
    httpRequest.open("POST", url, true);
    httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    httpRequest.send(data);
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
    else return days + " days";
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
        month = "0" + month;
    }
    if (day.toString().length == 1) {
        day = "0" + day;
    }
    if (hour.toString().length == 1) {
        hour = "0" + hour;
    }
    if (minute.toString().length == 1) {
        minute = "0" + minute;
    }
    if (second.toString().length == 1) {
        second = "0" + second;
    }
    var dateTime = year + "-" + month + "-" + day + "_" + hour + "-" + minute + "-" + second;
    return dateTime;
}

function saveDetailedResult(summary) {
    let path = files[0].filename.match(/(.*)[\/\\]/)[1] || "";
    path += "/result_" + getDateTime() + ".txt";
    let result = "";
    result += "\n======================= Summary =======================\n";
    result += summary.replaceAll("<br>", "\n").replaceAll("<b>", "").replaceAll("</b>", "");
    result += "\n\n\n\n======================= Imported bags =======================\n";
    result += "file, duration, start time, end time, total # messages, size\n";
    for (let idx = 0; idx < files.length; idx++) {
        result +=
            files[idx].filename +
            ", " +
            files[idx].info.duration +
            ", " +
            files[idx].info.start +
            ", " +
            files[idx].info.end +
            ", " +
            files[idx].info.messages +
            ", " +
            humanFileSize(files[idx].info.size) +
            "\n";
    }

    result += "\n\n\n\n======================= All topics among bags =======================\n";
    result += "file, topic type, total # messages, appeared in # bags\n";
    for (let idx = 0; idx < combinedTopics.length; idx++) {
        result += combinedTopics[idx][0] + ", " + combinedTopics[idx][1] + ", " + combinedTopics[idx][2] + ", " + combinedTopics[idx][3] + "\n";
    }

    result += "\n\n\n\n======================= Selected topics =======================\n";
    for (let idx = 0; idx < selectedTopics.length; idx++) {
        result += selectedTopics[idx] + "\n";
    }

    result += "\n\n\n\n======================= Exported bags =======================\n";
    result += "file, duration, start time, end time, total # messages, size\n";
    for (let idx = 0; idx < outFiles.length; idx++) {
        if (outFiles[idx].info === undefined) {
            result += "Bag skipped\n";
            continue;
        }
        result +=
            outFiles[idx].filename +
            ", " +
            outFiles[idx].info.duration +
            ", " +
            outFiles[idx].info.start +
            ", " +
            outFiles[idx].info.end +
            ", " +
            outFiles[idx].info.messages +
            ", " +
            humanFileSize(outFiles[idx].info.size) +
            "\n";
    }

    result += "\n\n\n\n\n\n\n======================= Calculate trajectory length =======================\n";
    if (document.getElementById("trajectoryLengthSwitch").checked) {
        let foundLastPos = false;
        let totalTrajectoryLength = 0.0;
        let tmpResult = "";
        for (let idx = outFiles.length - 1; idx >= 0; idx--) {
            let info = outFiles[idx].trajectory;
            totalTrajectoryLength += info.l;
            if (!foundLastPos && info.t > 0) {
                foundLastPos = true;
                tmpResult =
                    "The last position in trajectory is\n(" +
                    info.x +
                    "," +
                    info.y +
                    "," +
                    info.z +
                    ")\n" +
                    "and it occurred at time = " +
                    info.t +
                    "\nin bag file " +
                    files[idx].filename +
                    "";
            }
        }
        result += "The trajectory length across all bags is " + totalTrajectoryLength + "\n\n" + tmpResult;
        result += "\n\n\n============ Trajectory info for each bag ============\n";
        result += "file, last pos timestamp, last x pos, last y pos, last z pos, total length\n";
        for (let idx = 0; idx < outFiles.length; idx++) {
            let info = outFiles[idx].trajectory;
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
        result += "file, duration, first moving at, start crop at, end crop at\n";
        for (let idx = 0; idx < files.length; idx++) {
            let cropFrom = cropData[idx].start;
            let cropTo = cropData[idx].end;
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
            result += files[idx].filename + ", " + files[idx].info.duration + ", " + startMoving + ", " + cropFrom + ", " + cropTo + "\n";
        }
    } else {
        result += "Disabled\n";
    }
    result += "\n\n\n\n";
    console.log(result);
    console.log(path);
    let dataUrl = "path=" + encodeURIComponent(path) + "&text=" + encodeURIComponent(result);
    makeRequest("/saveFile", dataUrl, () => {
        console.log("File saved!");
    });
    return path;
}

function doubleEquals(a, b) {
    return Math.abs(a - b) < 1e-8;
}

function round2(a) {
    return Math.round(a * 1e2) / 1e2;
}

function addToTable(table, dataArr, onclick) {
    if (onclick === undefined) onclick = "";
    let html = "<tr>";
    dataArr.forEach((elem, idx, arr) => {
        if (typeof elem === "string") html += "<td onclick='" + onclick + '\' class="mdl-data-table__cell--non-numeric">' + elem + "</td>";
        else html += "<td onclick='" + onclick + "'>" + elem + "</td>";
    });
    html += "</tr>";
    table.innerHTML += html;
}

function showAlert(title, text, icon, buttonText, callback) {
    Swal.fire({
        title: title,
        html: text,
        icon: icon,
        confirmButtonColor: "#3085d6",
        confirmButtonText: buttonText,
    }).then((result) => {
        callback();
    });
}

function showLoading(title) {
    Swal.fire({
        title: title,
        html: "",
        allowEscapeKey: false,
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        },
    }).then((result) => {});
}

function hideLoading() {
    Swal.close();
}

function humanFileSize(bytes, si = true, dp = 2) {
    const thresh = si ? 1000 : 1024;

    if (Math.abs(bytes) < thresh) {
        return bytes + " B";
    }

    const units = si ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"] : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
    let u = -1;
    const r = 10 ** dp;

    do {
        bytes /= thresh;
        ++u;
    } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);

    return bytes.toFixed(dp) + " " + units[u];
}
