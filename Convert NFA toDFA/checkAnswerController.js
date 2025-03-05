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

   // document.getElementById('answer').innerHTML = table;
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
        console.log('list: ' + pileOfStates[i] + ' found : ' + found);
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
        console.log('list: ' + pileOfStates[i] + ' found : ' + found);
        if(found) {
            NewfinalStates += `,${getIndexeOfList(pileOfStates[i])}`;
            i++;
        }
    }

    var description = `
    <h3>- Number of sates : ${pileOfStates.length}</h3>
    <h3>- initial state : 0</h3>
    <h3>- final sates : ` + NewfinalStates + `</h3>
    `;
    // document.getElementById('description').innerHTML = description;
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

function getDescriptionOfAutomate() {
    var description = `
    <h3>- Number of sates : ${numberOfStates}</h3>
    <h3>- initial states : ` + initialStates + `</h3>
    <h3>- final sates : ` + finalStates + `</h3>
    `;
    document.getElementById('description1').innerHTML = description;
}


draw();
getDescriptionOfAutomate();


var userMatriceOfAlgorithm = [];
var userPileOfStates = [];

function start() {
    // init the first state in the pile
    var list = [];
    for (let i = 0; i < initialStates.length; i++) {
        list.push(initialStates[i]);
    }
    userPileOfStates.push(list);

    // init the first row in the matrice of algorithm
    var row = [];
    for (let i = 0; i < validSymbols.length; i++) {
        list = [];
        row.push(list);
    }
    userMatriceOfAlgorithm.push(row);
}

function drawUserTableOfAlgorithmSteps() {
    var table = ``;
    var rowInMatriceOfAlgorithmSteps = ``;
    for (let j = 0; j < validSymbols.length; j++) {
        rowInMatriceOfAlgorithmSteps += `<div class="cell-row-of-matrice-of-algorithm-steps">${validSymbols[j]}</div>`
    }
    table +=
        `<div class="one-row">
      <div class="empty-cell"></div>` + rowInMatriceOfAlgorithmSteps +
        `</div>`;
    for (let i = 0; i < userPileOfStates.length; i++) {
        rowInMatriceOfAlgorithmSteps = ``;
        for (let j = 0; j < validSymbols.length; j++) {
            rowInMatriceOfAlgorithmSteps +=
                `<div class="cell-row-of-matrice-of-algorithm-steps">
               ${userMatriceOfAlgorithm[i][j]}
            </div>`
        }
        table +=
            `<div class="one-row">
          <div class="cell-of-pile-of-states">${userPileOfStates[i]}</div>` + rowInMatriceOfAlgorithmSteps +
            `</div>`;
    }

    document.getElementById('user-algorithm-steps').innerHTML = table;
}

start();
drawUserTableOfAlgorithmSteps();

// get list from string
function getListFromString(s) {
    var list = [];
    for(var i = 0 ; i < s.length ; ) {
        var t = "";
        while(i < s.length && !isNaN(s[i])) {
            t += s[i];
            i++;
        }
        
        if(t != "") {
            list.push(parseInt(t));
        }

        while(i < s.length && isNaN(s[i])) {
            t += s[i];
            i++;
        }
    }

    return list;
}

// add new row by user
function addNewRowOfUser() {
    var s = document.getElementById('add-new-row-list-in-user-input').value;
    var newList = getListFromString(s);
    
    if(newList.length == 0) {
        return;
    }
    var list = [];
    for (let i = 0; i < newList.length; i++) {
        list.push(newList[i]);
    }
    userPileOfStates.push(list);

    var row = [];
    for (let i = 0; i < validSymbols.length; i++) {
        list = [];
        row.push(list);
    }
    userMatriceOfAlgorithm.push(row);

    drawUserTableOfAlgorithmSteps();
}

// add new state
function addNewStateIntoUserMatriceOfAlgorithm() {
    var s = document.getElementById('add-new-state-list-in-user-input').value;
    var targetList = getListFromString(s);
    var targetSymbol = document.getElementById('add-new-state-symbol-in-user-input').value;
    var newState = document.getElementById('add-new-state-new-state-in-user-input').value;
    var i = 0;
    while(i < userPileOfStates.length && !sameList(targetList , userPileOfStates[i])) {
        i++;
    }
    var j = 0;
    while(j < validSymbols.length && validSymbols[j] != targetSymbol[0]) {
        j++;
    }

    if(i < userPileOfStates.length && j < validSymbols.length) {
        userMatriceOfAlgorithm[i][j].push(parseInt(newState));
    }

    drawUserTableOfAlgorithmSteps();
}

// function to check answer
function check() {
    var okey = true;
    if(userPileOfStates.length != pileOfStates) {
        okey = false;
    }
    
    for(let i = 0 ; i < validSymbols.length ; i++) {
        okey &= (sameList(userMatriceOfAlgorithm[0][i] , matriceOfAlgorithm[0][i]));
    }
    
    for(let i = 1 ; i < userPileOfStates.length ; i++) {
        var found = false;
        for(let j = 0 ; j < i ; j++) {
            for(let k = 0 ; k < validSymbols.length ; k++) {
                found |= (sameList(userPileOfStates[i] , matriceOfAlgorithm[j][k]));
            }
        }
        
        if(found == false) {
            alert('wrong answer');
        } else {
            var idxOfList = getIndexeOfList(userPileOfStates[i]);
            for(let j = 0 ; j < validSymbols.length ; j++) {
                found &= (sameList(userMatriceOfAlgorithm[i][j] , matriceOfAlgorithm[idxOfList][j]));
            }
        }

        okey &= (found == true);
    }

    alert(okey);
}