
function onShowPanel4() {
    updateSelectedTopics();
    let label = document.getElementById("summaryLabel");
    label.innerHTML = "We'll export " + selectedTopics.length + "/" + combinedTopics.length + " topics from " + files.length + " bag files.";
}

function updateSelectedTopics() {
    let boxes = allTopicsTable.querySelectorAll("tbody .is-checked");
    selectedTopics = [];
    for (let i = 0; i < boxes.length; i++) {
        selectedTopics.push(boxes[i].parentElement.nextSibling.innerHTML);
    }
}

function onExportButton() {
    let trajectoryTopic = document.getElementById("trajectoryLengthSwitch").checked
        ? document.getElementById("trajectoryTopicSelect").value
        : "NOTOPIC";
    let blankTime = document.getElementById("standstillTimeInput").value;
    blankTime *= 1e9;
    outFiles = [];
    for (let _ in files) {
        outFiles.push({ filename: "" });
    }
    let count = 0;
    let exportStartTimestamp = new Date().getTime();
    showLoading("Exporting 1/" + files.length + "...");
    for (let fileIdx = 0; fileIdx < files.length; fileIdx++) {
        let startMoving = cropData.length === 0 ? 0 : cropData[fileIdx];
        let pathIn = files[fileIdx].filename;
        let cropFrom = startMoving < 0 ? -1 : Math.max(0, startMoving - blankTime);
        let pathOut = pathIn.replace(new RegExp(".bag$"), "_processed.bag");
        let topics = "";
        outFiles[fileIdx].filename = pathOut;
        for (let topicIdx = 0; topicIdx < selectedTopics.length; topicIdx++) {
            topics += selectedTopics[topicIdx];
            if (topicIdx !== selectedTopics.length - 1) {
                topics += " ";
            }
        }

        function showFinalResults() {
            let label = document.getElementById("finalResultsLabel");
            let timeUsed = msToTime(new Date().getTime() - exportStartTimestamp);
            let result = "";
            let totalSize = 0;
            let totalDuration = 0;
            let totalFileCount = 0;
            for (let idx = 0; idx < outFiles.length; idx++) {
                if (outFiles[idx].info == undefined) continue;
                totalSize += outFiles[idx].info.size;
                totalDuration += outFiles[idx].info.end - outFiles[idx].info.start;
                totalFileCount++;
            }
            result += "Finished exporting " + totalFileCount + " files in " + timeUsed + "<br><br>";
            result += "Total size on disk: <b>" + humanFileSize(totalSize) + "</b><br><br>";
            result += "Total trajectory duration: <b>" + round2(totalDuration) + "s</b><br><br>";
            if (trajectoryTopic !== "NOTOPIC") {
                let foundLastPos = false;
                let totalTrajectoryLength = 0.0;
                let tmpResult = "";
                for (let idx = outFiles.length - 1; idx >= 0; idx--) {
                    let info = outFiles[idx].trajectory;
                    totalTrajectoryLength += info.l;
                    if (!foundLastPos && info.t > 0) {
                        foundLastPos = true;
                        tmpResult =
                            "The final trajectory position: <b>(" + round2(info.x) + ", " + round2(info.y) + ", " + round2(info.z) + ")</b><br>";
                    }
                }
                result += "Total trajectory length: <b>" + round2(totalTrajectoryLength) + "</b><br><br>";
                result += tmpResult + "<br><br>";
            }
            result += "A more detailed report for each bag is saved to <b>" + saveDetailedResult(result) + "</b>";
            result += "<br><br> <i>This is a beta release of Rosbag Utils. Please double check the results are correct.</i>";
            label.innerHTML = result;
        }

        function getOutFileInfo() {
            count = 0;
            let totalFiles = outFiles.length;
            for (let idx = 0; idx < outFiles.length; idx++) {
                let fileIdx = idx;
                if (cropData.length > 0 && cropData[idx] < 0) {
                    totalFiles--;
                    continue;
                }
                function finishOutFileInfo(str) {
                    let bagInfo = JSON.parse(str);
                    outFiles[fileIdx].info = bagInfo;
                    count++;
                    if (count !== totalFiles) {
                        document.getElementById("swal2-title").innerHTML = "Finishing up " + (count + 1) + "/" + totalFiles + "...";
                    } else {
                        showFinalResults();
                        hideLoading();
                        completedStep(4);
                    }
                }
                makeRequest("/bagInfo", "path=" + encodeURIComponent(outFiles[idx].filename), finishOutFileInfo);
            }
            showLoading("Finishing up 1/" + totalFiles + "...");
        }

        function finishExport(str) {
            let data = JSON.parse(str);
            console.log(data);
            if (trajectoryTopic !== "NOTOPIC") {
                outFiles[fileIdx].trajectory = {};
                outFiles[fileIdx].trajectory.x = data[0];
                outFiles[fileIdx].trajectory.y = data[1];
                outFiles[fileIdx].trajectory.z = data[2];
                outFiles[fileIdx].trajectory.t = data[3];
                outFiles[fileIdx].trajectory.l = data[4];
            }
            count++;
            if (count !== files.length) {
                document.getElementById("swal2-title").innerHTML = "Exporting " + (count + 1) + "/" + files.length + "...";
            } else {
                getOutFileInfo();
            }
        }
        let dataUrl =
            "pathIn=" +
            encodeURIComponent(pathIn) +
            "&pathOut=" +
            encodeURIComponent(pathOut) +
            "&startTime=" +
            encodeURIComponent(cropFrom) +
            "&topics=" +
            encodeURIComponent(topics) +
            "&trajectoryTopic=" +
            encodeURIComponent(trajectoryTopic);

        makeRequest("/exportBag", dataUrl, finishExport);
    }
}
