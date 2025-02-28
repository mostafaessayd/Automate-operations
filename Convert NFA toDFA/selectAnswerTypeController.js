function getQueryParam(param) {
    let urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function submit1() {
    var x = getQueryParam("numberOfState");
    var y = getQueryParam("initialState");
    var z = getQueryParam("finalStates");
    var n = getQueryParam("validSymbols");
    var leftStateList = getQueryParam("leftStateList");
    var symbolList = getQueryParam("symbolList");
    var rightStateList = getQueryParam("rightStateList");

    document.location = "try.html";
    window.location.href = 'try.html?'
        + 'numberOfState=' + encodeURIComponent(x)
        + '&initialState=' + encodeURIComponent(y)
        + '&finalStates=' + encodeURIComponent(z)
        + '&validSymbols=' + encodeURIComponent(n)
        + '&leftStateList=' + encodeURIComponent(leftStateList)
        + '&symbolList=' + encodeURIComponent(symbolList)
        + '&rightStateList=' + encodeURIComponent(rightStateList);
}

function submit2() {
    var x = getQueryParam("numberOfState");
    var y = getQueryParam("initialState");
    var z = getQueryParam("finalStates");
    var n = getQueryParam("validSymbols");
    var leftStateList = getQueryParam("leftStateList");
    var symbolList = getQueryParam("symbolList");
    var rightStateList = getQueryParam("rightStateList");

    document.location = "checkAnswer.html";
    window.location.href = 'checkAnswer.html?'
        + 'numberOfState=' + encodeURIComponent(x)
        + '&initialState=' + encodeURIComponent(y)
        + '&finalStates=' + encodeURIComponent(z)
        + '&validSymbols=' + encodeURIComponent(n)
        + '&leftStateList=' + encodeURIComponent(leftStateList)
        + '&symbolList=' + encodeURIComponent(symbolList)
        + '&rightStateList=' + encodeURIComponent(rightStateList);
}