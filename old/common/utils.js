function makeRequest(url, data, callback, errorCallback) {
    let httpRequest = new XMLHttpRequest();
    if (!httpRequest) return false;

    function receivedResponse() {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                // alert(httpRequest.responseText);
                console.log("RECEIVED RESPONSE: " + httpRequest.responseText);
                callback(httpRequest.responseText);
            } else {
                console.log("REQUEST ERROR: " + httpRequest.status);
                if (errorCallback !== undefined)
                    return errorCallback(httpRequest.status);
                showAlert(
                    "Internal Error",
                    httpRequest.responseText +
                        "<br><br><a style='color: #3085d6;' target='_blank' href='https://github.com/SeanSun6814/rosbag-utils'>Create an issue</a><br><br>App will restart",
                    "error",
                    "Restart app",
                    () => {
                        location.reload();
                    }
                );
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

function openInputBox(title, text, icon, buttonText, placeholder, selectPlaceholder, callback, canceledCallback) {
    Swal.fire({
        title: title,
        input: "text",
        icon: icon,
        inputLabel: text,
        inputValue: placeholder,
        confirmButtonColor: "#3085d6",
        confirmButtonText: buttonText,
        didOpen: (swalElem) => {
            let input = document.getElementById("swal2-input");
            input.focus();
            if (selectPlaceholder) input.setSelectionRange(0, input.value.length);
        },
        preConfirm: (value) => {
            if (value && value !== "") {
                callback(value);
            } else {
                canceledCallback();
            }
        },
    }).then((result) => {
        if (!result.isConfirmed) {
            canceledCallback();
        }
    });
}
