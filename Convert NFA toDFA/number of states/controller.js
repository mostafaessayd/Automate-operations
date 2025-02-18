function confirm() {
    document.location = "../valid symbols/valideSymbol.html";
    var numberOfState = document.getElementById('number-of-states').value;
    window.location.href = '../valid symbols/valideSymbol.html?numberOfState=' + encodeURIComponent(numberOfState); 
}

