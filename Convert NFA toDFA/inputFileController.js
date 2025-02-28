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

    var initialState = [];
    for (let i = 0; i < temp.length;) {
        var s = "";
        while (i < temp.length && temp[i] != ' ') {
            s += temp[i];
            i++;
        }

        var state = parseInt(s);
        if (!checkContain(initialState, state)) {
            initialState.push(state);
        }
        while (i < temp.length && temp[i] == ' ') {
            i++;
        }
    }


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

     document.location = "selectAnswerType.html";
    window.location.href = 'selectAnswerType.html?' 
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
