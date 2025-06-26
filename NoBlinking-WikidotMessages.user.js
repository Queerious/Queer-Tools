// ==UserScript==
// @name         NoBlinking
// @namespace    http://tampermonkey.net/
// @version      2025-06-26
// @description  Remove the blink from wikidot message notifications.
// @author       Queerious
// @match       *://*.wikidot.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=wikidot.com
// @updateURL   https://github.com/Queerious/Queer-Tools/raw/main/NoBlinking-WikidotMessages.user.js
// @downloadURL https://github.com/Queerious/Queer-Tools/raw/main/NoBlinking-WikidotMessages.user.js
// ==/UserScript==

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

GM_addStyle(
    ' @-webkit-keyframes blinker {      ' +
    '    from { opacity: 1.0; } to { opacity: 1.0; }       ' +
    ' } '
);
