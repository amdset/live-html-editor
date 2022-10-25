const baseHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Document</title>
<style id="injected-css"></style>
</head>
<body>
    write your code here !<a href="">link am</a>
<\/body>
<script id="script.js"></script>
<html>`;

const baseCss = `
a{
    text-decoration: none;
    font-weight: bold;
}`;

const jsBase = `<script>
const l = document.getElementById("link");
if(l){
    l.addEventListener("click", ()=>{
        alert("Javascript dynamic injected (*,*)");
   });
}
</script>`;

const htmlCssToReplace = `<style id="injected-css"></style>`;
const jsToReplace = `<script id="script.js"></script>`;

window.addEventListener("load", () => {
    document.querySelector(".editor-html").textContent = baseHtml;
    document.querySelector(".editor-css").textContent = baseCss;
    enableWindows("editor-html");
    addMenuEvents();
    addEditorEvents();
});

function getEditors() {
    const editors = document.getElementsByClassName("editor");
    return editors;
}

function enableWindows(className) {
    const editors = getEditors();
    if (editors) {
        for (let index = 0; index < editors.length; index++) {
            var currentEditor = editors[index];

            if (currentEditor.classList.contains(className)) {
                currentEditor.style.display = "block";
            } else {
                currentEditor.style.display = "none";
            }
        }
    }
}

const divEditor = document.querySelector(".editor-html");
const iframe = document.querySelector(".output-code");
const btnRun = document.querySelector(".run-code-btn");

function loadCode() {
    var htmlStr = divEditor.textContent;
    let user_css = document.querySelector(".editor-css").textContent;
    if (user_css) {
        user_css = "<style>" + user_css + "</style>"
        htmlStr = htmlStr.replace(htmlCssToReplace, user_css);
       // htmlStr = htmlStr.replace("#", "&#35;");
    }

    let user_js = document.querySelector(".editor-js").textContent;
    if (user_js) {
        user_js = "<script>" + user_js + "</script>";
        htmlStr = htmlStr.replace(jsToReplace, user_js);
    }

   // console.log(typeof (htmlStr) + ": " + htmlStr);
    iframe.srcdoc = htmlStr
   // iframe.src = "data:text/html;charset=utf8," + encodeURI(htmlStr);
}

btnRun.addEventListener("click", () => {
    loadCode();
});

function addEditorEvents() {
    const editors = getEditors();
    if (editors) {
        for (let index = 0; index < editors.length; index++) {
            var currentEditor = editors[index];
            currentEditor.addEventListener("keyup", (e) => {
                e.preventDefault();
                loadCode();
            });
            currentEditor.addEventListener("keydown", (e) => {
                if (e.key === "Tab") {
                    e.preventDefault();
                    document.execCommand("insertText", false, "   ");
                }
            });
            currentEditor.addEventListener("paste", (e) => {
                e.preventDefault();
                var text = e.clipboardData.getData("text/plain");
                document.execCommand("insertText", false, text);
            });
        }
    }
}

function addMenuEvents() {
    const menu_editor = document.querySelector(".header-editor");
    let btns = menu_editor.childNodes;
    btns.forEach(function (btn) {
        if (btn.nodeName == "BUTTON") {
            const className = btn.dataset.editor;
            btn.addEventListener("click", (evt) => {
                enableWindows(className);
                selectBtn(btn, btns);
            });
        }
    });
}

function selectBtn(btnSelected, buttons) {
    btnSelected.classList.add("btn-selected");

    buttons.forEach(function (currentBtn) {
        if (currentBtn.nodeName == "BUTTON") {
            if (currentBtn != btnSelected) {
                currentBtn.classList.remove("btn-selected");
            }
        }
    });
}

