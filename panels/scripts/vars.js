var reservedWords = ["abstract", "else", "instanceof", "super", "boolean", "enum", "int", "switch", "break", "export", "interface", "synchronized", "byte", "extends", "let", "this", "case", "false", "long", "throw", "catch", "final", "native", "throws", "char", "finally", "new", "transient", "class", "float", "null", "true", "const", "for", "package", "try", "continue", "function", "private", "typeof ", "debugger", "goto", "protected", "var", "default", "if", "public", "void", "delete", "implements", "return", "volatile", "do", "import", "short", "while", "double", "in", "static", "with", "alert", "frames", "outerHeight", "all", "frameRate", "outerWidth", "anchor", "function", "packages", "anchors", "getClass", "pageXOffset", "area", "hasOwnProperty", "pageYOffset", "Array", "hidden", "parent", "assign", "history", "parseFloat", "blur", "image", "parseInt", "button", "images", "password", "checkbox", "Infinity", "pkcs11", "clearInterval", "isFinite", "plugin", "clearTimeout", "isNaN", "prompt", "clientInformation", "isPrototypeOf", "propertyIsEnum", "close", "java", "prototype", "closed", "JavaArray", "radio", "confirm", "JavaClass", "reset", "constructor", "JavaObject", "screenX", "crypto", "JavaPackage", "screenY", "Date", "innerHeight", "scroll", "decodeURI", "innerWidth", "secure", "decodeURIComponent", "layer", "select", "defaultStatus", "layers", "self", "document", "length", "setInterval", "element", "link", "setTimeout", "elements", "location", "status", "embed", "Math", "String", "embeds", "mimeTypes", "submit", "encodeURI", "name", "taint", "encodeURIComponent", "NaN", "text", "escape", "navigate", "textarea", "eval", "navigator", "top", "event", "Number", "toString", "fileUpload", "Object", "undefined", "focus", "offscreenBuffering", "unescape", "form", "open", "untaint", "forms", "opener", "valueOf", "frame", "option", "window", "onbeforeunload", "ondragdrop", "onkeyup", "onmouseover", "onblur", "onerror", "onload", "onmouseup", "ondragdrop", "onfocus", "onmousedown", "onreset", "onclick", "onkeydown", "onmousemove", "onsubmit", "oncontextmenu", "onkeypress", "onmouseout", "onunload"], syntaxClear = true;


function divScraper() {
    var divs = document.getElementsByTagName("div"), tempDiv, i, j, divID, tID, rW;
    
    for (i = 0; i < divs.length; i++) {        
        divID           = String(divs[i].id);
        tempDiv         = document.getElementById(divID);
        
        for (j = 0; j < reservedWords.length; j++) {
            tID         = divID.toLowerCase();
            rW          = reservedWords[j].toLowerCase();
            
            //console.log(tID, rW);
            
            if (tID == rW) {
                console.log("Not only have you let me down, you've let yourself down. \nYou've used '" + divID + "' as a div name.\nChange it.");
                syntaxClear = false;
                break;   
            }
        }
        
        if (syntaxClear) window[divID]   = tempDiv;
        
        //console.log(divID, tempDiv);
    }
    
    if (syntaxClear) console.log(":: div scraper successful ::");
    
    return syntaxClear;
}