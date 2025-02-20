// number of states
var numberOfStates;
// list of valid symbol
var validSymbols = [];
// list of initial states
var initialState;
// list of final states
var finalStates = [];
// list of transitions
var listOfTransition = [];

function Init() {

    //-----------------------------------------------------------------
    var z = getQueryParam("finalStates");
    var n = getQueryParam("validSymbols");
    var leftStateList = getQueryParam("leftStateList");
    var symbolList = getQueryParam("symbolList");
    var rightStateList = getQueryParam("rightStateList");
    //------------------------------------------------------------------
    numberOfStates = 4;
    numberOfStates = getQueryParam("numberOfState");
    // validSymbols = ['a', 'b', 'c'];
    validSymbols = [];
    for (let i = 0; i < n.length; i += 2) {
        validSymbols.push(n[i]);
    }

     //initialState = 0;
     initialState = getQueryParam("initialStates");
     //finalStates = [3, 2];
    finalStates = [];
    for (let i = 0; i < z.length; i += 2) {
        finalStates.push(parseInt(z[i]));
    }
    // console.log(finalStates);

    // listOfTransition = [
    //     { leftState: 0, symbol: 'a', rightState: 1 },
    //     { leftState: 1, symbol: 'a', rightState: 1 },
    //     { leftState: 1, symbol: 'b', rightState: 3 },
    //     { leftState: 3, symbol: 'c', rightState: 3 },
    //     { leftState: 2, symbol: 'a', rightState: 2 },
    //     { leftState: 1, symbol: 'c', rightState: 2 },
    // ];

    listOfTransition = [];
    for (let i = 0; i < leftStateList.length; i += 2) {
        listOfTransition.push({ leftState: parseInt(leftStateList[i]), symbol: symbolList[i], rightState: parseInt(rightStateList[i]) });
    }

     console.log(listOfTransition);
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
                   ${getRightOf(i, validSymbols[j])}
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

function getQueryParam(param) {
    let urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function getDescriptionOfAnswer() {
    var NewfinalStates = ``;
    var description = `
    <h3>- Number of sates : ${numberOfStates}</h3>
    <h3>- initial state : ${initialState}</h3>
    <h3>- final sates : ` + NewfinalStates + `</h3>
    `;
    document.getElementById('description').innerHTML = description;
}

// check if the given state is final or not
function isFianalState(state) {
    for (let i = 0; i < finalStates.length; i++) {
        if (finalStates[i] == state) {
            return true;
        }
    }

    return false;
}

var acceptedWords = [];
function check() {
    var text = document.getElementById('input-text').value;
    var state = initialState;
    var accepted = true;
    for (let i = 0; i < text.length;) {
        var j = i;
        var word = "";
        var temp = "";
        var nextStart = -1;
        while(j < text.length) {
            var nextState = getRightOf(state , text[j]);
            console.log(state + ' ' + text[j] + ' ' + nextState);
            if(nextState == '') {
                break;
            } else {
                temp += text[j];
                if(isFianalState(nextState)) {
                    word += temp;
                    temp  = "";
                    nextStart = j + 1;
                }
            }
            state = nextState;
            j++;
        }

        if(nextStart == -1) {
            accepted = false;
            break;
        }
        i = nextStart;
        state = initialState;
    }

    document.getElementById('resulte').innerHTML = accepted;
}

Init();
draw();