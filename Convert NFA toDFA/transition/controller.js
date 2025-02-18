function getQueryParam(param) {
    let urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

var x = getQueryParam("numberOfState");
var y = getQueryParam("validLetters");

document.getElementById('lolo').innerHTML = x + '\n' + y;