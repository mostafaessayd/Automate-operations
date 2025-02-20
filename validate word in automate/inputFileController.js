// send data to check and get right answer
function submit() {
    var data = document.getElementById('automate-data').value.trim();

    let i = 0;
    var temp = "";
    while (i < data.length && data[i] != '\n') {
        temp += data[i];
        i++;
    }
    var numberOfStates = parseInt(temp);
    temp = ""; 
    i++;
    while (i < data.length && data[i] != '\n') {
        temp += data[i];
        i++;
    }
    var initialState = parseInt(temp);
    console.log('-number of states : ' + numberOfStates
        + '\ninitial state : ' + temp
    );
}
