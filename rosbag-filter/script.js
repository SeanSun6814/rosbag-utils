let files = [];
let outFiles = [];
let combinedTopics = [];
let selectedTopics = [];
let cropData = [];

window.onload = function () {
    showPanel(1);
    completedStep(0);
};

function showPanel(panelIdx) {
    for (let i = 1; i < 5; i++) {
        document.getElementById("panel" + i).style.display = panelIdx === i ? "block" : "none";
        if (i > 0)
            document.getElementById("nav" + i).style.backgroundColor =
                panelIdx === i ? "rgb(224, 224, 224)" : "rgb(250, 250, 250)";
    }
    if (panelIdx - 1 > completedStepIdx) {
        return showAlert(
            "One step at a time",
            "It looks like you haven't completed step " +
                (completedStepIdx + 1) +
                " yet.<br>Let's do that first.",
            "warning",
            "Go to step " + (completedStepIdx + 1),
            () => {
                showPanel(completedStepIdx + 1);
            }
        );
    }
    if (panelIdx === 3) onShowPanel3();
    if (panelIdx === 4) onShowPanel4();
}

let completedStepIdx = 0;
const greenCheckIcon = `<i style="margin: 5px; color: green; float:right;" class="fa fa-check-circle fa-lg" aria-hidden="true"></i>`;
const orangeBangIcon = `<i style="margin: 5px; color: #ff6200; float:right;" class="fa fa-exclamation-triangle fa-lg" aria-hidden="true"></i>`;
function completedStep(idx) {
    completedStepIdx = idx;
    let text = [
        ``,
        `<b>1. Select bags</b>`,
        `<b>2. Select topics</b>`,
        `<b>3. More options</b>`,
        `<b>4. Finish</b>`,
    ];
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
