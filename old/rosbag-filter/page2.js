function generatePanel2() {
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
                    allTopics[topic] = [topic, info[topic][0], info[topic][1], 1];
                } else {
                    if (info[topic][0] !== allTopics[topic][1]) {
                        alert(
                            "Sneaky! Some topics have same names but different types!\n" +
                                "This display might only show one type but everything else should work though. " +
                                "This part of the code is not tested, so double check the results."
                        );
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
        combinedTopics = arr;
        return { arr: arr, topicsAllTheSame: allTheSame };
    }
    let result = getAllTopics();
    if (!result.topicsAllTheSame) {
        document.getElementById(
            "bagDiffWarning"
        ).innerHTML = `<br><i class="fa fa-info-circle fa-lg" aria-hidden="true"></i> &nbsp Some bags have different topics.`;
    } else {
        document.getElementById(
            "bagDiffWarning"
        ).innerHTML = `<br><i class="fa fa-info-circle fa-lg" aria-hidden="true"></i> &nbsp All bags have the same topics.`;
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
    let itemChecks = allTopicsTable.querySelectorAll("tbody .mdl-data-table__select input");
    itemChecks.forEach((elem) => elem.addEventListener("change", itemCheckHandler));
}

let allTopicsTableItemCount = 0;
let allTopicsTable = document.querySelector("#allTopicsTableOuter");
let headerCheckbox = allTopicsTable.querySelector("thead .mdl-data-table__select input");
let headerCheckHandler = function (event) {
    let boxes = allTopicsTable.querySelectorAll("tbody .mdl-data-table__select");
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
    let boxes = allTopicsTable.querySelectorAll("tbody .is-checked");
    let headerCheckbox = allTopicsTable.querySelector("thead .mdl-data-table__select");
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
};

headerCheckbox.addEventListener("change", headerCheckHandler);
