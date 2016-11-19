(function() {
    "use strict";

    
    var creativeVersion = "1.0.0",  // format versioning code, please do not alter or remove this variable
        customJSVersion = null; 	// format versioning code, please do not alter or remove this variable
    
		
	window.addEventListener("load", checkIfEBInitialized);
	window.addEventListener("message", onMessageReceived);

    
	function checkIfEBInitialized(event) { (EB.isInitialized()) ? initializeCreative() : EB.addEventListener(EBG.EventName.EB_INITIALIZED, initializeCreative);	}

    
	function initCustomVars() { setCustomVar("mdShouldAutoExpand", false); }

    
	function initializeCreative(event) {
		setCreativeVersion(); // format versioning code, please do not alter or remove this function
		initCustomVars();
		if (!mdShouldAutoExpand) expand();
	}
	
    
	function expand() { EB.expand({actionType: EBG.ActionType.AUTO}); }

    
	function getAdID() {
		if (EB._isLocalMode) {
            return null;
		} else {
            return EB._adConfig.adId;
		}
	}

    
	function onMessageReceived(event) {
		var messageData = JSON.parse(event.data);
        
		if (messageData.adId && messageData.adId === getAdID()) {
			if (messageData.type && messageData.type === "panelExpanded") {
				//panel expanded;
			} else if (messageData.type && messageData.type === "panelCollapsed") {
				//panel collapsed;
			}
		}
	}
	
    
	function setCustomVar(customVarName, defaultValue, parseNum) {	
        //create global var with name = str, taking value from adConfig if it's there, else use default
		var value = defaultValue;
		
        if (!EB._isLocalMode) { var value = EB._adConfig.hasOwnProperty(customVarName) ? EB._adConfig[customVarName] : defaultValue; }
        
		if (value === "true") value = true; //PENDING if we really need this check
		if (value === "false") value = false; //PENDING if we really need this check
		if (value === "undefined") value = undefined;
		if (arguments.length == 3 && parseNum && typeof value === "string") value = parseFloat(value);
		
        window[customVarName] = value;
	}
	
    
	/* format versioning code starts, please do not alter or remove these functions */
	function setCreativeVersion() {
	    EB._sendMessage("SET_CREATIVE_VERSION", {
	        creativeVersion: creativeVersion,
	        uid: EB._adConfig.uid
	    });
        
	    /*if (typeof displayCreativeVersion === "function") {
	        displayCreativeVersion();
	    }*/
        
	    setCustomJSVersion();
	}

    
	function setCustomJSVersion() {
	    window.addEventListener("message", function(event) {
	        try {
                var data = JSON.parse(event.data);
	            if (!data.data.hasOwnProperty("uid") || data.data.uid !== EB._adConfig.uid) {
	                return;
	            }
                
	            if (data.type === "SET_CUSTOMJS_VERSION") {
	                if (data.data.hasOwnProperty("customJSVersion")) {
	                    customJSVersion = data.data.customJSVersion;
	                    /*if (typeof displayCustomJSVersion === "function") {
	                        displayCustomJSVersion();
	                    }*/
	                }
	            }
	        } catch (error) {}
	    });
	}

	/* format versioning code ends, please do not alter or remove these functions */
}());