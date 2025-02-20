var finalStates = [];
// add new final states
function addNewFinalStates() {
    var state = parseInt(document.getElementById('final-states').value);

    finalStates.push(state);
    var newInner = ``;
    for (let i = 0; i < finalStates.length; i++) {
        newInner += `<div class = "container-of-number">${finalStates[i]}</div>`;
    }
    document.getElementById('display-final-states').innerHTML = newInner;
}

var validSymbols = [];
// add new initial states
function addNewValidSymbol() {
    var symbol = document.getElementById('valid-symbols').value;

    validSymbols.push(symbol);
    var newInner = ``;
    for (let i = 0; i < validSymbols.length; i++) {
        newInner += `<div class = "container-of-number">${validSymbols[i]}</div>`;
    }
    document.getElementById('display-valid-symbols').innerHTML = newInner;
}

var leftStateList = [];
var symbolList = [];
var rightStateList = [];
// add new transition
function addNewTransition() {
    var leftState = parseInt(document.getElementById('left-state').value);
    var rightState = parseInt(document.getElementById('right-state').value);
    var symbol = document.getElementById('symbol-in-transition').value;

    leftStateList.push(leftState);
    symbolList.push(symbol);
    rightStateList.push(rightState);

    var newInner = ``;
    for (let i = 0; i < leftStateList.length; i++) {
        var s = leftStateList[i];
        s += symbolList[i];
        s += rightStateList[i];
        newInner += `<div class = "container-of-number">${s}</div>`;
    }
    document.getElementById('display-transitions').innerHTML = newInner;
}

// submit inputs
function submit() {
    var numberOfState = document.getElementById('number-of-states').value;
    var initialState = document.getElementById('Initial-states').value;
    document.location = "answer.html";
    window.location.href = 'answer.html?' 
    + 'numberOfState=' + encodeURIComponent(numberOfState) 
    + '&initialState=' + encodeURIComponent(initialState)
    + '&finalStates=' + encodeURIComponent(finalStates)
    + '&validSymbols=' + encodeURIComponent(validSymbols)
    + '&leftStateList=' + encodeURIComponent(leftStateList)
    + '&symbolList=' + encodeURIComponent(symbolList)
    + '&rightStateList=' + encodeURIComponent(rightStateList);
}