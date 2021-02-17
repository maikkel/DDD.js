export function logError(text) {
    log(text, "#ff0000");
}

export function log (text, colorBg = "#aaa", colorText = "#000") {
    console.log(
        '%c DDD %c %c '+text+' ',
        'background: #ccc; color: #000; font-weight: bold;',
        'background: transparent; color: #000;',
        'background: ' + colorBg + '; color: ' + colorText + ';'
    );
}

export function logGroup(text, data) {
    console.groupCollapsed(
        '%c DDD %c %c '+text+' ',
        'background: #ccc; color: #000; font-weight: bold;',
        'background: transparent; color: #000;',
        'background: #aaa; color: #000; font-weight: normal;');
    for (let d of data) {
        console.log(d);
    }
    console.groupEnd();
}