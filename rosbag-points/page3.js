function onShowPanel3() {
    let label = document.getElementById("summaryLabel");
    let value = document.getElementById("pointCloudTopicSelect").value;
    label.innerHTML = "We'll export the point clouds of <b>" + value + "</b> from " + files.length + " bag files.";
}

function onExportButton() {
    let pointCloudTopic = document.getElementById("pointCloudTopicSelect").value;
    let exportStartTimestamp = new Date().getTime();
    let sourcePath = files[0].filename.replace(/\/[^\/]+$/, "");
    let exportPath = sourcePath + "/pointcloud_" + getDateTime() + "/";
    let pathIn = "";
    for (let fileIdx = 0; fileIdx < files.length; fileIdx++) {
        pathIn += files[fileIdx] + "\n";
    }
    let dataUrl =
        "pathIn=" +
        encodeURIComponent(pathIn) +
        "&pathOut=" +
        encodeURIComponent(pathOut) +
        "&topics=" +
        encodeURIComponent(topics) +
        "&maxPoints=" +
        encodeURIComponent(maxPoints);
    showLoading("Exporting PointCloud...");
    makeRequest("/mkdir", "path=" + encodeURIComponent(exportPath), (str) => {
        makeRequest("/exportPointCloud", dataUrl, (str) => {
            let data = JSON.parse(str);
            console.log(data);
            let label = document.getElementById("finalResultsLabel");
            let timeUsed = msToTime(new Date().getTime() - exportStartTimestamp);
            let result = "";
            let numPoints = 0;
            let numFiles = 0;
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
        });
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
