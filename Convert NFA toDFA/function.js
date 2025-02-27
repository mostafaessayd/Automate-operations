// number of states
var numberOfStates;
// list of valid symbol
var validSymbols = [];
// list of initial states
var initialStates = [];
// list of final states
var finalStates = [];
// list of transitions
var listOfTransition = [];

function Init() {

    //-----------------------------------------------------------------
    var x = getQueryParam("numberOfState");
    var y = getQueryParam("initialState");
    var z = getQueryParam("finalStates");
    var n = getQueryParam("validSymbols");
    var leftStateList = getQueryParam("leftStateList");
    var symbolList = getQueryParam("symbolList");
    var rightStateList = getQueryParam("rightStateList");
    //------------------------------------------------------------------
    //numberOfStates = 7;
    numberOfStates = getQueryParam("numberOfState");
    //validSymbols = ['a', 'b', 'c'];
    validSymbols = [];
    for(let i = 0 ; i < n.length ; i += 2) {
        validSymbols.push(n[i]);
    }
    
    // initialStates = [0, 1];
    initialStates = [];
    for(let i = 0 ; i < y.length ; i += 2) {
        initialStates.push(parseInt(y[i]));
    }
    // finalStates = [3, 4, 6];
    finalStates = [];
    for(let i = 0 ; i < z.length ; i += 2) {
        finalStates.push(parseInt(z[i]));
    }
    // console.log(finalStates);

    // listOfTransition = [
    //     { leftState: 0, symbol: 'a', rightState: 1 },
    //     { leftState: 0, symbol: 'b', rightState: 3 },
    //     { leftState: 0, symbol: 'c', rightState: 3 },
    //     { leftState: 1, symbol: 'c', rightState: 3 },
    //     { leftState: 1, symbol: 'b', rightState: 2 },
    //     { leftState: 1, symbol: 'b', rightState: 5 },
    //     { leftState: 2, symbol: 'b', rightState: 2 },
    //     { leftState: 2, symbol: 'c', rightState: 3 },
    //     { leftState: 2, symbol: 'b', rightState: 5 },
    //     { leftState: 3, symbol: 'c', rightState: 4 },
    //     { leftState: 4, symbol: 'c', rightState: 4 },
    //     { leftState: 4, symbol: 'c', rightState: 6 },
    //     { leftState: 5, symbol: 'c', rightState: 4 },
    //     { leftState: 0, symbol: 'c', rightState: 4 }
    // ];

    listOfTransition = [];
    for(let i = 0 ; i < leftStateList.length ; i += 2) {
        listOfTransition.push({ leftState: parseInt(leftStateList[i]) , symbol: symbolList[i] , rightState: parseInt(rightStateList[i]) });
    }

    // console.log(listOfTransition);
}

// get index of symbol
function getIndexOfSymbol(symbol) {
    for (let i = 0; i < validSymbols.length; i++) {
        if (validSymbols[i] == symbol) {
            return i;
        }
    }
    return -1;
}

// get list of rights 
function getListOfRights(leftState, symbol) {
    var ans = [];
    for (let i = 0; i < listOfTransition.length; i++) {
        if (listOfTransition[i].leftState == leftState && listOfTransition[i].symbol == symbol) {
            ans.push(listOfTransition[i].rightState);
        }
    }

    return ans;
}

// check if two list are equals
function sameList(list1, list2) {

    if (list1.length != list2.length) {
        return false;
    }

    for (let i = 0; i < list1.length; i++) {
        var found = false;
        for (let j = 0; j < list2.length; j++) {
            found |= (list2[j] == list1[i]);
        }

        if (found == false) {
            return false;
        }
    }

    return true;
}

// add new state in pile of states and new row in matrice of algorithm steps
function addNewRow(newList) {

    var list = [];
    for (let i = 0; i < newList.length; i++) {
        list.push(newList[i]);
    }
    pileOfStates.push(list);

    var row = [];
    for (let i = 0; i < validSymbols.length; i++) {
        list = [];
        row.push(list);
    }
    matriceOfAlgorithm.push(row);
}

// check if the given array contain the given value or not
function checkContain(list, value) {
    for (let i = 0; i < list.length; i++) {
        if (list[i] == value) {
            return true;
        }
    }

    return false;
}

// check if the given state are new state or not
function isNewState(list) {

    for (let i = 0; i < pileOfStates.length; i++) {
        if (sameList(pileOfStates[i], list) == true) {
            return false;
        }
    }

    return true;
}


var matriceOfAlgorithm = [];
var pileOfStates = [];

function CONVERT_NFA_INTO_DFA() {
    Init();

    // init the first state in the pile
    var list = [];
    for (let i = 0; i < initialStates.length; i++) {
        list.push(initialStates[i]);
    }
    pileOfStates.push(list);

    // init the first row in the matrice of algorithm
    var row = [];
    for (let i = 0; i < validSymbols.length; i++) {
        list = [];
        row.push(list);
    }
    matriceOfAlgorithm.push(row);

    // start algorithm
    var currentCell = 0;
    var lengthOfPileOfStates = 1;
    while (currentCell < lengthOfPileOfStates) {
        for (let i = 0; i < pileOfStates[currentCell].length; i++) {
            for (let j = 0; j < validSymbols.length; j++) {
                var listOfRights = getListOfRights(pileOfStates[currentCell][i], validSymbols[j]);
                for (let k = 0; k < listOfRights.length; k++) {
                    if (checkContain(matriceOfAlgorithm[currentCell][j], listOfRights[k]) == false) {
                        matriceOfAlgorithm[currentCell][j].push(listOfRights[k]);
                    }
                }
            }
        }

        // add new states and new rows
        for (let i = 0; i < validSymbols.length; i++) {
            if (isNewState(matriceOfAlgorithm[currentCell][i]) && matriceOfAlgorithm[currentCell][i].length > 0) {
                addNewRow(matriceOfAlgorithm[currentCell][i]);
            }
        }

        currentCell++;
        lengthOfPileOfStates = pileOfStates.length;
        // break;
    }

}

CONVERT_NFA_INTO_DFA();
drawTableOfAlgorithmSteps();
drawTableOfAnswer();
getDescriptionOfAnswer();

function drawTableOfAlgorithmSteps() {
    var table = ``;
    var rowInMatriceOfAlgorithmSteps = ``;
    for (let j = 0; j < validSymbols.length; j++) {
        rowInMatriceOfAlgorithmSteps += `<div class="cell-row-of-matrice-of-algorithm-steps">${validSymbols[j]}</div>`
    }
    table +=
        `<div class="one-row">
      <div class="empty-cell"></div>` + rowInMatriceOfAlgorithmSteps +
        `</div>`;
    for (let i = 0; i < pileOfStates.length; i++) {
        rowInMatriceOfAlgorithmSteps = ``;
        for (let j = 0; j < validSymbols.length; j++) {
            rowInMatriceOfAlgorithmSteps +=
                `<div class="cell-row-of-matrice-of-algorithm-steps">
               ${matriceOfAlgorithm[i][j]}
            </div>`
        }
        table +=
            `<div class="one-row">
          <div class="cell-of-pile-of-states">${pileOfStates[i]}</div>` + rowInMatriceOfAlgorithmSteps +
            `</div>`;
    }

    document.getElementById('algorithm-steps').innerHTML = table;
}

function drawTableOfAnswer() {
    var table = ``;
    var rowInMatriceOfAlgorithmSteps = ``;
    for (let j = 0; j < validSymbols.length; j++) {
        rowInMatriceOfAlgorithmSteps += `<div class="cell-row-of-matrice-of-algorithm-steps">${validSymbols[j]}</div>`
    }
    table +=
        `<div class="one-row">
      <div class="empty-cell"></div>` + rowInMatriceOfAlgorithmSteps +
        `</div>`;
    for (let i = 0; i < pileOfStates.length; i++) {
        rowInMatriceOfAlgorithmSteps = ``;
        for (let j = 0; j < validSymbols.length; j++) {
            rowInMatriceOfAlgorithmSteps +=
                `<div class="cell-row-of-matrice-of-algorithm-steps">
               ${getIndexeOfList(matriceOfAlgorithm[i][j])}
            </div>`
        }
        table +=
            `<div class="one-row">
          <div class="cell-of-pile-of-states">${getIndexeOfList(pileOfStates[i])}</div>` + rowInMatriceOfAlgorithmSteps +
            `</div>`;
    }

    document.getElementById('answer').innerHTML = table;
}

function getQueryParam(param) {
    let urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function getIndexeOfList(list) {
    for(let i = 0 ; i < pileOfStates.length ; i++) {
        if(sameList(list , pileOfStates[i])) {
            return i;
        }
    }

    return '';
}

function getDescriptionOfAnswer() {
    var NewfinalStates = ``;
    let i = 0;
    for( ; i < pileOfStates.length ; i++) {
        var found = false;
        for(let j = 0 ; j < pileOfStates[i].length ; j++) {
          for(let k = 0 ; k < finalStates.length ; k++) {
            found |= (checkContain(pileOfStates[i] , finalStates[k]));
          }
        }

        if(found) {
            NewfinalStates += `${getIndexeOfList(pileOfStates[i])}`;
            i++;
            break;
        }
    }
    for( ; i < pileOfStates.length ; i++) {
        var found = false;
        for(let j = 0 ; j < pileOfStates[i].length ; j++) {
          for(let k = 0 ; k < finalStates.length ; k++) {
            found |= (checkContain(pileOfStates[i] , finalStates[k]));
          }
        }

        if(found) {
            NewfinalStates += `,${getIndexeOfList(pileOfStates[i])}`;
            i++;
            break;
        }
    }

    var description = `
    <h3>- Number of sates : ${pileOfStates.length}</h3>
    <h3>- initial state : 0</h3>
    <h3>- final sates : ` + NewfinalStates + `</h3>
    `;
    document.getElementById('description').innerHTML = description;
}

function draw() {
    var table = ``;
    var row = ``;
    for (let j = 0; j < validSymbols.length; j++) {
        row += `<div class="cell-row-of-matrice-of-algorithm-steps">${validSymbols[j]}</div>`
    }
    table +=
        `<div class="one-row">
      <div class="empty-cell"></div>` + row +
        `</div>`;

    for (let i = 0; i < numberOfStates; i++) {
        row = ``;
        for (let j = 0; j < validSymbols.length; j++) {
            row +=
                `<div class="cell-row-of-matrice-of-algorithm-steps">
                   ${getListOfRights(i, validSymbols[j])}
                </div>`
        }
        table +=
            `<div class="one-row">
              <div class="cell-of-pile-of-states">${i}</div>` + row +
            `</div>`;
    }

    document.getElementById('show-automate').innerHTML = table;
}

// function to get right of transition L-S-?
function getRightOf(left, symbol) {
    for (let i = 0; i < listOfTransition.length; i++) {
        if (listOfTransition[i].leftState == left && listOfTransition[i].symbol == symbol) {
            return listOfTransition[i].rightState;
        }
    }
    return '';
}

draw();