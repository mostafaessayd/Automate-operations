// send data to check and get right answer
function submit() {
    var data = document.getElementById('automate-data').value.trim();

    let i = 0;
    var temp = "";
    while (i < data.length && data[i] != '\n') {
        temp += data[i];
        i++;
    }
    var numberOfState = parseInt(temp);
    temp = "";
    i++;
    while (i < data.length && data[i] != '\n') {
        temp += data[i];
        i++;
    }
    var initialState = parseInt(temp);

    temp = "";
    i++;
    while (i < data.length && data[i] != '\n') {
        temp += data[i];
        i++;
    }

    var validSymbols = [];
    for (let i = 0; i < temp.length; i++) {
        if (checkContain(validSymbols, temp[i])) {
            continue;
        }
        validSymbols.push(temp[i]);
    }

    temp = "";
    i++;
    while (i < data.length && data[i] != '\n') {
        temp += data[i];
        i++;
    }

    var finalStates = [];
    for (let i = 0; i < temp.length;) {
        var s = "";
        while (i < temp.length && temp[i] != ' ') {
            s += temp[i];
            i++;
        }

        var state = parseInt(s);
        if (!checkContain(finalStates, state)) {
            finalStates.push(state);
        }
        while (i < temp.length && temp[i] == ' ') {
            i++;
        }
    }
    
    var rightStateList = [];
    var symbolList = [];
    var leftStateList = [];

    i++;
    while (i < data.length) {
        temp = "";
        while (i < data.length && data[i] != '\n') {
            temp += data[i];
            i++;
        }
        
        var transition = getComponantOfTransition(temp);
        rightStateList.push(transition.rightState);
        symbolList.push(transition.symbol);
        leftStateList.push(transition.leftState);
        i++;
    }

    console.log('-number of states : ' + numberOfState
        + '\ninitial state : ' + initialState
        + '\nvalid symbols : ' + validSymbols
        + '\nfinal states : ' + finalStates
    );

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


function checkContain(list, targetValue) {
    for (let i = 0; i < list.length; i++) {
        if (list[i] == targetValue) {
            return true;
        }
    }

    return false;
}

function getComponantOfTransition(line) {
    var temp = "";
    var i = 0;
    while (i < line.length && line[i] != ' ') {
        temp += line[i];
        i++;
    }

    var leftState = parseInt(temp);

    while (i < line.length && line[i] == ' ') {
        i++;
    }

    var symbol = line[i];
    i++;
    while (i < line.length && line[i] == ' ') {
        i++;
    }
    temp = "";
    while (i < line.length && line[i] != ' ') {
        temp += line[i];
        i++;
    }
   
    var rightState = parseInt(temp);

    return { leftState: leftState, symbol: symbol, rightState: rightState };
}

var MAX_NUMBER_OF_STATES = 8;
var MAX_NUMBER_OF_SYMBOLS = 6;
function generateRandomAutomate() {
    var numberOfState = 1 + Math.floor(Math.random() * MAX_NUMBER_OF_STATES);
    var initialState = Math.floor(Math.random() * numberOfState);
    var finalStates = [];
    for(let i = 0 ; i < numberOfState ; i++) {
        var randomState = Math.floor(Math.random() * numberOfState);
        if(!checkContain(finalStates , randomState)) {
            finalStates.push(randomState);
        }
    }
    
    const allCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var validSymbols = [];
    var randomSize = 1 + Math.floor(Math.random() * MAX_NUMBER_OF_SYMBOLS);
    for(let i = 0 ; i < randomSize ; i++) {
        var randomSymbol = allCharacters[Math.floor(Math.random() * allCharacters.length)];
        if(!checkContain(validSymbols , randomSymbol)) {
            validSymbols.push(randomSymbol);
        }
    }
    
    var leftStateList = [];
    var symbolList = [];
    var rightStateList = [];
    randomSize = 1 + Math.floor(Math.random() * (validSymbols.length * numberOfState));
    for(let i = 0 ; i < randomSize ; i++) {
        var randomLeftstate = Math.floor(Math.random() * numberOfState);
        var randomRightState = Math.floor(Math.random() * numberOfState);
        var randomSymbol = validSymbols[Math.floor(Math.random() * validSymbols.length)];
        var found = false;
        for(let j = 0 ; j < leftStateList.length ; j++) {
            found |= (leftStateList[j] == randomLeftstate && symbolList[j] == randomSymbol);
        }
        if(!found) {
            leftStateList.push(randomLeftstate);
            symbolList.push(randomSymbol);
            rightStateList.push(randomRightState);
        }
    }

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