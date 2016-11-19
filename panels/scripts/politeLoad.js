// lazyload script
// ref: http://www.nczonline.net/blog/2009/07/28/the-best-way-to-load-external-javascript/

function loadScript($url, $callback) {
    console.log(String(":: LOADER - loading " + $url + " ::"));

    var filetype = $url.split('.').pop();

    switch (filetype) {
        case "js":
            var script  = document.createElement("script");
            script.type = "text/javascript";
            if (script.readyState) {  //IE
                script.onreadystatechange = function() {
                    if (script.readyState == "loaded" || script.readyState == "complete") {
                        script.onreadystatechange = null;
                        console.log(String(":: LOADER - successfully loaded " + $url + " ::"));
                        $callback();
                    }
                };
            } else {  //Others
                script.onload = function() { 
                    $callback(); 
                    console.log(String(":: LOADER - successfully loaded " + $url + " ::"));
                };
            }

            script.src = $url;
            document.getElementsByTagName("head")[0].appendChild(script);
            break;

        case "css":
            var extCSS = document.createElement("link");
            extCSS.setAttribute("rel", "stylesheet");
            extCSS.setAttribute("type", "text/css");
            extCSS.setAttribute("href", $url); 
            document.getElementsByTagName("head")[0].appendChild(extCSS);
            console.log(String(":: LOADER - successfully loaded " + $url + " ::"));
            $callback();
            break;
    }
}

function loadImage($object, $callback) {
    console.log(String(":: LOADER - loading " + $object.url + " ::"));

    var holder  = document.getElementById($object.div),			
        image   = new Image();

    image.onload =	function() {
        holder.style.backgroundImage = "url('" + image.src + "')";
        console.log(String(":: LOADER - successfully loaded " + image.src + " ::"));
        $callback();
    };

    image.src = $object.url;
}

//Thanks to Jack @ Greensock for this sweet loader https://greensock.com/
function politeLoad($urls, $onComplete) {
    var l 				= $urls.length,
        loaded 			= 0,
        checkProgress 	= function() { if (++loaded === l && $onComplete) $onComplete(); },
        i, varType;

    for (i = 0; i < l; i++) {					
        varType = typeof $urls[i];
        //console.log(varType);

        switch (varType) {
            case "string":					
                loadScript($urls[i], checkProgress); //Using the Enabler script loader to politely load the javascript
                break;	

            case "object":
                loadImage($urls[i], checkProgress); //Politely load images
                break;
        }
    }
}