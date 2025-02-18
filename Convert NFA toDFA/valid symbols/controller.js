const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const container = document.getElementById("checkboxContainer");

characters.split("").forEach(char => {
    let label = document.createElement("label");
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = char;
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(char));
    container.appendChild(label);
});

function getQueryParam(param) {
    let urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function showSelected() {
    let resultDiv = document.getElementById("result");
    let selectedChars = Array.from(document.querySelectorAll(".grid input:checked"))
        .map(checkbox => checkbox.value)
        .join(" ");
    document.location = "../transition/insertTransition.html";
    window.location.href = '../transition/insertTransition.html?' + 'numberOfState=' + encodeURIComponent(getQueryParam("numberOfState")) + '&validLetters=' + encodeURIComponent(selectedChars);
}