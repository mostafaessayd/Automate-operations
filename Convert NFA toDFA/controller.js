var initialStates = [];
// add new initial states
function addNewInitialStates() {
    var state = parseInt(document.getElementById('Initial-states').value);
    
    initialStates.push(state);
    var newInner = ``;
    for(let i = 0 ; i < initialStates.length ; i++) {
         newInner += `<div class = "container-of-number">${initialStates[i]}</div>`;
    }
    document.getElementById('display-initial-states').innerHTML = newInner;
}

var finalStates = [];
// add new initial states
function addNewFinalStates() {
    var state = parseInt(document.getElementById('final-states').value);
    
    finalStates.push(state);
    var newInner = ``;
    for(let i = 0 ; i < finalStates.length ; i++) {
         newInner += `<div class = "container-of-number">${finalStates[i]}</div>`;
    }
    document.getElementById('display-final-states').innerHTML = newInner;
}