function showFileDialog() {
    let initialFileLength = files.length;
    function addFilesToTable(str) {
        function generateTable() {
            let table = document.getElementById("fileTable");
            for (let fileIdx = initialFileLength; fileIdx < files.length; fileIdx++) {
                addToTable(
                    table,
                    [
                        fileIdx + 1,
                        files[fileIdx].filename,
                        Math.round(files[fileIdx].info.duration * 100) / 100 + "s",
                        humanFileSize(files[fileIdx].info.size),
                        files[fileIdx].info.messages,
                    ],
                    "showBagInfoTable(" + fileIdx + ")"
                );
            }
            showBagInfoTable(files.length - 1);
            generatePanel2();
            completedStep(1);
            hideLoading();
            checkIfBagsAreContinuous();
        }

        let data = JSON.parse(str);
        console.log(data);
        if (data.length === 0) hideLoading();
        else showLoading("Opening 1/" + data.length + "...");

        let count = 1;
        for (let idx = 0; idx < data.length; idx++) {
            let filename = data[idx];
            files.push({ filename: filename });
            console.log("getting info for bag idx" + (files.length - 1));
            let fileIdx = files.length - 1;
            let numFiles = data.length;
            function saveBagInfo(str) {
                let bagInfo = JSON.parse(str);
                files[fileIdx].info = bagInfo;
                if (count === numFiles) {
                    generateTable();
                } else {
                    document.getElementById("swal2-title").innerHTML =
                        "Opening " + (count + 1) + "/" + numFiles + "...";
                    count++;
                }
            }
            makeRequest("/bagInfo", "path=" + encodeURIComponent(files[fileIdx].filename), saveBagInfo);
        }
    }
    showLoading("Select file...");
    makeRequest("/selectBag", "", addFilesToTable);
    let headerCheckbox = allTopicsTable.querySelector("thead .mdl-data-table__select");
    headerCheckbox.MaterialCheckbox.uncheck();
    headerCheckbox.MaterialCheckbox.updateClasses_();
    document.getElementById("standstillSwitch").parentElement.MaterialSwitch.off();
    document.getElementById("trajectoryLengthSwitch").parentElement.MaterialSwitch.off();
    checkEnableStandstill();
    checkTrajectoryLength();
}

function showBagInfoTable(idx) {
    let title = document.getElementById("bagName");
    let table = document.getElementById("bagInfoTable");

    title.innerHTML = files[idx].filename;
    table.innerHTML = "";

    let info = files[idx].info.topics;
    for (let topic in info) {
        addToTable(table, [
            topic,
            info[topic][0],
            info[topic][1],
            info[topic][3] == null ? 0 : info[topic][3],
        ]);
    }
}

function checkIfBagsAreContinuous() {
    if (files.length === 0) return;
    let prevEndTime = files[0].info.end;
    let result = "";
    for (let fileIdx = 1; fileIdx < files.length; fileIdx++) {
        let startTime = files[fileIdx].info.start;
        if (Math.abs(startTime - prevEndTime) > 1) {
            result +=
                `Bag #${fileIdx} ends at time ${prevEndTime}<br>` +
                `but bag #${fileIdx + 1} starts at time ${startTime}<br><br>`;
        }
        prevEndTime = files[fileIdx].info.end;
    }

    if (result !== "") {
        result += "<br>If that is intended, please ignore this warning.";
        showAlert("Bags are not continuous", result, "warning", "Got it", () => {});
    }
}

function checkTreatAsOneRun() {
    let checkbox = document.getElementById("oneRunSwitch");
    if (!checkbox.checked) {
        document.getElementById("standstillSwitch").parentElement.MaterialSwitch.off();
        document.getElementById("trajectoryLengthSwitch").parentElement.MaterialSwitch.off();
        checkEnableStandstill();
        checkTrajectoryLength();
    }
}
