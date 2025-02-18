var initialStates = [];
// add new initial states
function addNewInitialStates() {
    var state = parseInt(document.getElementById('Initial-states').value);

    initialStates.push(state);
    var newInner = ``;
    for (let i = 0; i < initialStates.length; i++) {
        newInner += `<div class = "container-of-number">${initialStates[i]}</div>`;
    }
    document.getElementById('display-initial-states').innerHTML = newInner;
}

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

var transitionList = [];
// add new transition
function addNewTransition() {
    var leftState = parseInt(document.getElementById('left-state').value);
    var rightState = parseInt(document.getElementById('right-state').value);
    var symbol = document.getElementById('symbol-in-transition').value;

    transitionList.push({ leftState: leftState, symbol: symbol, rightState: rightState });

    var newInner = ``;
    for (let i = 0; i < transitionList.length; i++) {
        var s = transitionList[i].leftState + "";
        s += transitionList[i].symbol;
        s += transitionList[i].rightState;
        newInner += `<div class = "container-of-number">${s}</div>`;
    }
    document.getElementById('display-transitions').innerHTML = newInner;
}

// submit inputs
function submit() {
    var numberOfState = document.getElementById('number-of-states').value;
    console.log('state number : ' + numberOfState);
    console.log('initial states : ' + initialStates);
    console.log('final states : ' + finalStates);
    console.log('valid symbols : ' + validSymbols);
    console.log('transitions : ' + transitionList);
    document.location = "try.html";
    window.location.href = 'try.html?' 
    + 'numberOfState=' + encodeURIComponent(numberOfState) 
    + '&initialStates=' + encodeURIComponent(initialStates)
    + '&finalStates=' + encodeURIComponent(finalStates)
    + '&validSymbols=' + encodeURIComponent(validSymbols)
    + '&transitionList=' + encodeURIComponent(transitionList) ;
}