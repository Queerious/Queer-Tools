// ==UserScript==
// @name         Wikimedia License Box Generator
// @namespace    http://tampermonkey.net/
// @version      2025-02-19
// @description  Generates a licensebox that is compliant with the SCP Wiki, from a Wikimedia Commons page
// @author       Queerious
// @match        *://commons.wikimedia.org/wiki/*
// @match        *://commons.m.wikimedia.org/wiki/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// ==/UserScript==

//Code to add GM_addStyle Clone of Greasemonkey Behavior
function GM_addStyle(css) {
    const style = document.getElementById("GM_addStyleBy8626") || (function() {
        const style = document.createElement('style');
        style.type = 'text/css';
        style.id = "GM_addStyleBy8626";
        document.head.appendChild(style);
        return style;
    })();
    const sheet = style.sheet;
    sheet.insertRule(css, (sheet.rules || sheet.cssRules || []).length);
}

var toolTitle = document.createElement( 'p' );
toolTitle.id = 'title';
toolTitle.innerHTML = "SCP Wiki Licensing Generator";

var licenseWrapper = document.createElement( 'div' );
licenseWrapper.id = 'lbWrapper';

var licensebox = document.createElement( 'div' );
licensebox.id = 'LicenseboxInterface';

const fileName = document.querySelector("span.mw-page-title-main").innerHTML;
const authorElement = document.querySelector("#fileinfotpl_aut").nextSibling;
var imageLicense = "";
var sourceLink = window.location.href;


//License Type (Enumerator)
const licenseTableSource = document.querySelectorAll(".licensetpl");
licenseTableSource.forEach(table => {
    licenseCheck(table);
})
//Each Compatible License, plus a shortform - this checks for a given string, and must be updated per compatible license type
function licenseCheck (table) {
    if (table.innerText.search("Public domain") != -1){
        imageLicense = "Public Domain";
    } else if (table.innerText.search("Creative Commons CC0 1.0 Universal Public Domain Dedication") != -1){
        imageLicense = "CC0 1.0";
    } else if (table.innerText.search("Creative Commons Attribution-Share Alike 4.0 International") != -1){
        imageLicense = "CC-BY-SA 4.0";
    } else if (table.innerText.search("Creative Commons Attribution-Share Alike 3.0 Unported") != -1){
        imageLicense = "CC-BY-SA 3.0";
    } else if (table.innerText.search("ShareAlike 1.0") != -1){ //Bugged?
        imageLicense = "CC-BY-SA 1.0";
    } else if (table.innerText.search("Creative Commons Attribution-Share Alike 2.5") != -1){
        imageLicense = "CC-BY-SA 2.5";
    } else if (table.innerText.search("Creative Commons Attribution 2.0") != -1){
        imageLicense = "CC-BY 2.0";
    } else if (table.innerText.search("Creative Commons Attribution 3.0") != -1){
        imageLicense = "CC-BY 3.0";
    } else if (table.innerText.search("Creative Commons Attribution 4.0") != -1){
        imageLicense = "CC-BY 4.0";
    }

    if (imageLicense == ""){
        imageLicense = "ERROR: Incompatible License or Other Error";
    }
}

if (authorElement){
    var authorText = authorElement.nextSibling.innerText;
    licensebox.innerHTML = "> **Filename:** " + fileName + "<br>> **Author:** " + authorText + "<br>> **License:** " + imageLicense + "<br>> **Source Link:** " + sourceLink;
} else {
    licensebox.innerHTML = "Oops, something broke! Try Again~";
}

GM_addStyle(
    ' #lbWrapper {             ' +
    '    background: white;     ' +
    '    border: 1px solid black; ' +
    '    padding: 4px;          ' +
    '    position: fixed;    ' +
    '    bottom: 0%; right: 0%;   ' +
    '    max-height: 250px;      ' +
    '    width: 400px;      ' +
    '    text-align: center;    ' +
    ' } '
);

GM_addStyle(
    ' #title {             ' +
    '    font-weight: 700;     ' +
    '    margin-bottom: 0.5em;    ' +
    '    font-size: 1.5em;    ' +
    '    text-align: center;    ' +
    ' } '
);


GM_addStyle(
    ' #LicenseboxInterface {             ' +
    '    background: white;     ' +
    '    border: 1px solid black; ' +
    '    padding: 4px;          ' +
    '    position: initial;    ' +
    '    margin: auto;        ' +
    '    height: 100px;      ' +
    '    overflow-x: scroll;    ' +
    '    text-wrap-mode: nowrap;    ' +
    '    max-width: 300px;      ' +
    '    user-select: all;    ' +
    '    text-align: left;    ' +
    ' } '
);

document.body.appendChild( licenseWrapper);
licenseWrapper.appendChild( toolTitle);
licenseWrapper.appendChild( licensebox );

var copyButton = document.createElement ( 'div' );
copyButton.className = 'myCopyButton';
copyButton.textContent = 'Copy to Clipboard';

GM_addStyle(
    ' .myCopyButton {           ' +
    '    background: #ebebeb;       ' +
    '    border: 1px solid #000; ' +
    '    padding: 1px;           ' +
    '    margin: 1em auto;       ' +
    '    max-width: 40%;        '+
    '    float: center;           ' +
    '    cursor: pointer;        ' +
    ' } '
);

licenseWrapper.appendChild( copyButton );
copyButton.addEventListener( 'click', function () {
    navigator.clipboard.writeText(licensebox.innerText);
    copyButton.textContent = 'Copied!'
}, true );

var closeButton = document.createElement( 'div' );
closeButton.className = 'myCloseButton';
closeButton.textContent = 'X';

GM_addStyle(
    ' .myCloseButton {           ' +
    '    background: #aaa;       ' +
    '    border: 1px solid #777; ' +
    '    padding: 1px;           ' +
    '    margin-left: 8px;       ' +
    '    float: right;           ' +
    '    cursor: pointer;        ' +
    ' } '
);

licenseWrapper.insertBefore( closeButton, licenseWrapper.firstChild );
closeButton.addEventListener( 'click', function () {
    licenseWrapper.parentNode.removeChild( licenseWrapper );
}, true );
