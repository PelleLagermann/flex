const html = document.documentElement;
let tabActive = false;

function isTab(e) {
    return e.keyCode === 9 || e.which === 9;
}

//HANDLERS
function keyDownHandler(e) {
    tabActive = isTab(e);
}

function keyUpHandler() {
    tabActive = false;
}

function focusHandler(e) {
    e.target.dataset.foucsSource = tabActive ? "tab" : "";
}

function blurHandler(e) {
    e.target.dataset.foucsSource = "";
}


html.addEventListener('keydown', keyDownHandler, true);
html.addEventListener('keyup', keyUpHandler, true);
html.addEventListener("focusin", focusHandler);
html.addEventListener("focusout", blurHandler);