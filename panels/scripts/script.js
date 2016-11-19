
"use strict";

var	panelContainerRatio,
    panelCurrentDimension,
    isAutoExpand = false,
    isAutoCollapse = true,
    autoCollapseInterval,
    fadeOut = false;


window.addEventListener("message", onMessageReceived);
window.addEventListener("resize", onPageResize);


function divCheck() { if (divScraper()) initializeCreative(); }


function initializeCreative(event) {
    initCustomVars();
    initializeGlobalVariables();
    
    (mdShouldAutoExpand) ? autoExpand() : expandInit();
}


function initializeGlobalVariables() {
    panelContainerRatio = {
        maxHeight:parseFloat(Utils.getComputedStyle(panelContainer, 'max-height'), 10),
        maxWidth:parseFloat(Utils.getComputedStyle(panelContainer, 'max-width'), 10)
    };
}


function initCustomVars() {
    console.log(":: init custom vars ::");
    setCustomVar("mdisIE9", false);
    setCustomVar("mdShouldAutoExpand", false);
    setCustomVar("mdDefaultPanel", 'panel1');
    setCustomVar("mdEnableExpandCollapseAnim", true);	
    setCustomVar("mdAutoCollapseTimeout", 20);	
}


function autoExpand() {
    panel.style.display = 'block';
    container.className = "expanded";
    isAutoExpand 		= true;
    if (isAutoExpand) {  }
    expand();
}


function drawExpansion() { (mdisIE9) ? setTimeout(expanded, 100) : expanded(); }


function expanded() {
    startAutoCollapse();
    setOrientation();
}


function collapse() {
    if (document.getElementById("video")) document.getElementById("video").pause(); 
    
   	TweenLite.to(container, 0.3, {css:{autoAlpha:0}, ease:Quad.easeOut, overwrite:false, onComplete:collapsed}); 
    
    if (fadeOut) TweenLite.to(container, 0.3, {autoAlpha:0, ease:Quad.easeInOut, overwrite:false});
}


function drawCollapse() {panel.style.display = "none"; }


function collapsed() {
    drawCollapse();
    var actionType = EBG.ActionType.AUTO;
    if (!isAutoCollapse) actionType =  EBG.ActionType.USER;
    
    EB.collapse({
        panelName: mdDefaultPanel,
        actionType: actionType
    });
}


function onPageResize() {
    setOrientation();
    setTimeout(setOrientation, 100);
}


function setOrientation() {
    var vp = Utils.getViewPort();
    
    panelCurrentDimension = {width:panelContainerRatio.maxWidth, height:panelContainerRatio.maxHeight};
    panelContainer.style.maxHeight = panelCurrentDimension.height + 'px';
    panelContainer.style.maxWidth  = panelCurrentDimension.width + 'px';
    resizeContainer();
}


function resizeContainer() {
    var viewport 	= Utils.getViewPort(),
        panelWidth 	= panelCurrentDimension.width,
        panelHeight	= panelCurrentDimension.height,
        rval 		= Utils.calculateAspectRatioFit(panelWidth, panelHeight, viewport.width, viewport.height);
    
    panelContainer.style.width  = (rval.width) + 'px';
    panelContainer.style.height = (rval.height) + 'px';
    panelCreative.style.height 	= (panelContainer.offsetHeight - 4) + 'px';
    
    var creativeElement = document.querySelector('#panel'),
        adContent       = document.querySelector('#panelContainer');

    // fit bar into foo
    // the third options argument is optional, see the README for defaults
    // https://github.com/soulwire/fit.js
    fit (adContent, creativeElement, {
        hAlign: fit.CENTER,
        vAlign: fit.CENTER,
        cover: false,
        watch: false,
        apply: true
    });
}


function startAutoCollapse() {
    autoCollapseInterval = setTimeout(function() {
        clearAutoCollapse();
        collapse();
        console.log(":: auto collapse ::");
    }, mdAutoCollapseTimeout * 1000);
    
    document.addEventListener('mousedown', clearAutoCollapse);
    document.addEventListener('touchstart', clearAutoCollapse);
}


function clearAutoCollapse() {
    document.removeEventListener('mousedown', clearAutoCollapse);
    document.removeEventListener('touchstart', clearAutoCollapse);
    clearTimeout(autoCollapseInterval);
}


/*
    Update element class name when Ad goes to portrat or landscape mode.
    It use element ID and append landscape or portrait to create class name.
    For example : If you want to make Gallery that occupy full width in portrait 
    and occupy few percentage lets say 40% in landscape then you need to create 
    Two class name with gallery id + Mode. So two class name will be create as
    gallery_lanscape and gallery_portrait and applyed to gallery container whenever
    respective mode is displayed.
    This will help you to style each element depending or the portrait or landscape mode.
*/


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
        if (messageData.type && messageData.type === "resize") {

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


function postMessageToParent(message) { window.parent.postMessage(JSON.stringify(message), "*"); }

function registerAction() { /*this func is never called, it's parsed by the ad platform on upload of the ad*/ }