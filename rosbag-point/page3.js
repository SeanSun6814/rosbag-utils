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
    outFiles = [];
    for (let _ in files) {
        outFiles.push({ filename: "" });
    }
    let count = 0;
    let exportStartTimestamp = new Date().getTime();
    let sourcePath = files[0].filename.replace(/\/[^\/]+$/, "");
    let exportPath = sourcePath + "/export_" + getDateTime() + "/";
    showLoading("Exporting 1/" + files.length + "...");
    makeRequest("/mkdir", "path=" + encodeURIComponent(exportPath), () => {
        for (let fileIdx = 0; fileIdx < files.length; fileIdx++) {
            let cropFrom = cropData.length === 0 ? 0 : cropData[fileIdx].start;
            let cropTo = cropData.length === 0 ? files[fileIdx].info.end : cropData[fileIdx].end;
            let pathIn = files[fileIdx].filename;
            let filename = pathIn.replace(/^.*[\\\/]/, "");
            let pathOut = exportPath + filename;
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
                let exportDetailsPath = exportPath + "results.txt";
                saveDetailedResult(result, exportDetailsPath);
                result += "A more detailed report for each bag is saved to <b>" + exportDetailsPath + "</b>";
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
                "&endTime=" +
                encodeURIComponent(cropTo) +
                "&topics=" +
                encodeURIComponent(topics) +
                "&trajectoryTopic=" +
                encodeURIComponent(trajectoryTopic);

            makeRequest("/exportBag", dataUrl, finishExport);
        }
    });
}


function saveDetailedResult(summary, path) {
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
            let cropFrom = Math.max(0, cropData[idx].start - files[idx].info.start);
            let cropTo = cropData[idx].end - files[idx].info.start;
            let startMoving = cropData[idx].start + blankTime - files[idx].info.start;
            if (doubleEquals(cropData[idx].start, -1)) {
                startMoving = "No movement";
                cropFrom = "Skip entire bag";
                cropTo = "Skip entire bag";
            } else if (doubleEquals(cropData[idx].start, -2)) {
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
}