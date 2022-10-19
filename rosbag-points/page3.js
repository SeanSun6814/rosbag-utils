function onShowPanel3() {
    let label = document.getElementById("summaryLabel");
    let value = document.getElementById("pointCloudTopicSelect").value;
    label.innerHTML =
        "We'll export the point clouds of <b>" + value + "</b> from " + files.length + " bag files.";
}

function onExportButton() {
    let pointCloudTopic = document.getElementById("pointCloudTopicSelect").value;
    let maxPoints = document.getElementById("maxPointsInput").value;
    let speed = document.getElementById("speedUpInput").value;
    let collapseAxis = document.getElementById("collapseAxisSwitch").checked
        ? document.getElementById("collapseAxisSelect").value.toLowerCase()
        : "none";
    let xMin = document.getElementById("minXInput").value;
    let xMax = document.getElementById("maxXInput").value;
    let yMin = document.getElementById("minYInput").value;
    let yMax = document.getElementById("maxYInput").value;
    let zMin = document.getElementById("minZInput").value;
    let zMax = document.getElementById("maxZInput").value;
    if (!document.getElementById("trimPointcloudSwitch").checked)
        xMin = xMax = yMin = yMax = zMin = zMax = "none";
    let exportStartTimestamp = new Date().getTime();
    let sourcePath = files[0].filename.replace(/\/[^\/]+$/, "");
    let exportPath = sourcePath + "/pointcloud_" + getDateTime() + "/";
    let pathIn = "";
    for (let fileIdx = 0; fileIdx < files.length; fileIdx++) {
        pathIn += files[fileIdx].filename + "\n";
    }
    let dataUrl =
        "pathIn=" +
        encodeURIComponent(pathIn) +
        "&pathOut=" +
        encodeURIComponent(exportPath) +
        "&topic=" +
        encodeURIComponent(pointCloudTopic) +
        "&maxPoints=" +
        encodeURIComponent(maxPoints) +
        "&speed=" +
        encodeURIComponent(speed) +
        "&collapseAxis=" +
        encodeURIComponent(collapseAxis) +
        "&xMax=" +
        encodeURIComponent(xMax) +
        "&xMin=" +
        encodeURIComponent(xMin) +
        "&yMax=" +
        encodeURIComponent(yMax) +
        "&yMin=" +
        encodeURIComponent(yMin) +
        "&zMax=" +
        encodeURIComponent(zMax) +
        "&zMin=" +
        encodeURIComponent(zMin);
    showLoading("Exporting PointCloud...");
    makeRequest("/mkdir", "path=" + encodeURIComponent(exportPath), (str) => {
        makeRequest("/exportPointCloud", dataUrl, (str) => {
            let data = JSON.parse(str);
            console.log(data);
            let label = document.getElementById("finalResultsLabel");
            let timeUsed = msToTime(new Date().getTime() - exportStartTimestamp);
            let result = "";
            let numPoints = data.numPoints;
            let numFiles = data.numFiles;
            result +=
                "Finished exporting " +
                numPoints +
                " points to " +
                numFiles +
                " files in " +
                timeUsed +
                "<br><br>";
            let exportDetailsPath = exportPath + "results.txt";
            saveDetailedResult(result, exportDetailsPath);
            result += "A more detailed report is saved to <b>" + exportDetailsPath + "</b>";
            result +=
                "<br><br><i style='color: #757575;'>This is a beta release of Rosbag Utils. Please double check the results are correct.</i>";
            label.innerHTML = result;
            completedStep(3);
            hideLoading();
        });
    });
}

function saveDetailedResult(summary, path) {
    let result = "";
    result += "\n======================= Summary =======================\n";
    result += summary.replaceAll("<br>", "\n").replaceAll("<b>", "").replaceAll("</b>", "");
    result += "\nSelected pointcloud topic: " + document.getElementById("pointCloudTopicSelect").value + "\n";
    result += "Max number of points per file: " + document.getElementById("maxPointsInput").value + "\n";

    let speed = document.getElementById("speedUpInput").value;
    let collapseAxis = document.getElementById("collapseAxisSwitch").checked
        ? document.getElementById("collapseAxisSelect").value.toLowerCase()
        : "none";
    let xMin = document.getElementById("minXInput").value;
    let xMax = document.getElementById("maxXInput").value;
    let yMin = document.getElementById("minYInput").value;
    let yMax = document.getElementById("maxYInput").value;
    let zMin = document.getElementById("minZInput").value;
    let zMax = document.getElementById("maxZInput").value;
    if (!document.getElementById("trimPointcloudSwitch").checked)
        xMin = xMax = yMin = yMax = zMin = zMax = "none";
    result += "Collapse-axis: " + collapseAxis + "\n";
    result += "Include one frame every how many frames: " + speed + "\n";
    result += "Trim pointcloud in the X direction: " + xMin + " to " + xMax + "\n";
    result += "Trim pointcloud in the Y direction: " + yMin + " to " + yMax + "\n";
    result += "Trim pointcloud in the Z direction: " + zMin + " to " + zMax + "\n";

    result += "\n\n\n======================= Imported bags =======================\n";
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

    result += "\n\n\n\n";
    console.log(result);
    console.log(path);
    let dataUrl = "path=" + encodeURIComponent(path) + "&text=" + encodeURIComponent(result);
    makeRequest("/saveFile", dataUrl, () => {
        console.log("File saved!");
    });
}
