function onShowPanel3() {
    let label = document.getElementById("summaryLabel");
    let value = document.getElementById("imageTopicSelect").value;
    label.innerHTML = "We'll export the video of <b>" + value + "</b> from " + files.length + " bag files.";
}

function onExportButton() {
    let imageTopic = document.getElementById("imageTopicSelect").value;
    let speed = document.getElementById("speedUpInput").value;
    let fps = document.getElementById("fpsInput").value;
    let printTimestamp = document.getElementById("printTimestampSwitch").checked ? "true" : "false";
    let exportStartTimestamp = new Date().getTime();
    let sourcePath = files[0].filename.replace(/\/[^\/]+$/, "");
    let exportPath = sourcePath + "/video_" + getDateTime() + "/";
    let pathIn = "";
    for (let fileIdx = 0; fileIdx < files.length; fileIdx++) {
        pathIn += files[fileIdx].filename + "\n";
    }
    let dataUrl =
        "pathIn=" +
        encodeURIComponent(pathIn) +
        "&pathOut=" +
        encodeURIComponent(exportPath + "video.mp4") +
        "&topic=" +
        encodeURIComponent(imageTopic) +
        "&speed=" +
        encodeURIComponent(speed) +
        "&fps=" +
        encodeURIComponent(fps) +
        "&printTimestamp=" +
        encodeURIComponent(printTimestamp);
    showLoading("Exporting Video...");
    makeRequest("/mkdir", "path=" + encodeURIComponent(exportPath), (str) => {
        makeRequest("/exportVideo", dataUrl, (str) => {
            let data = JSON.parse(str);
            console.log(data);
            let label = document.getElementById("finalResultsLabel");
            let timeUsed = msToTime(new Date().getTime() - exportStartTimestamp);
            let result = "";
            let numFrames = data.numFrames;
            result += "Finished exporting " + numFrames + " images in " + timeUsed + "<br><br>";
            let exportDetailsPath = exportPath + "results.txt";
            saveDetailedResult(result, exportDetailsPath);
            result += "A more detailed report is saved to <b>" + exportDetailsPath + "</b>";
            result += "<br><br><i style='color: #757575;'>This is a beta release of Rosbag Utils. Please double check the results are correct.</i>";
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
    result += "\nSelected image topic: " + document.getElementById("imageTopicSelect").value + "\n";
    result += "Video speed up by: " + document.getElementById("speedUpInput").value + "x\n";
    result += "Output video FPS: " + document.getElementById("fpsInput").value + "\n";
    result += "Timestamp included: " + (document.getElementById("printTimestampSwitch").checked ? "true" : "false") + "\n";

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

    result += "\n\n\n\n";
    console.log(result);
    console.log(path);
    let dataUrl = "path=" + encodeURIComponent(path) + "&text=" + encodeURIComponent(result);
    makeRequest("/saveFile", dataUrl, () => {
        console.log("File saved!");
    });
}
