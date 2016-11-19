"use strict";

var	buttonArray, button,
    assetArray, asset,
    disablerArray, disabledAsset,
    i, type;

var wrapper, background, background_area, panel,
    unitBackground, closeButton,
    unmuteButton, cta, clickButton, logo,  t1, t2, t3, copy2, tap, legal,
    expandedIn = false;

var dM = 0;

var date = new Date(), day = date.getDate(), month = date.getMonth();



function expandInit() {
    console.log(":: expanded ::");

    trackingInit();
    onPageResize();
    (mdEnableExpandCollapseAnim) ? drawExpansion() : expanded();



/*
    initVideo();
    mutedVideo = "videos/autoplay.mp4";
    videoArray = [
        "videos/video.mp4"
    ];
  */




	if (!expandedIn) {
        wrapper             = document.getElementById('wrapper');
        background          = document.getElementById('background');
        background_area     = document.getElementById('background_area');
        panel				= document.getElementById('panel');
        preBackground      = document.getElementById('preBackground');
        unitBackground      = document.getElementById('unitBackground');
        initialBackground      = document.getElementById('initialBackground');
        preBackgroundClouds =  document.getElementById('preBackgroundClouds');
        barometer			= document.getElementById('barometer');
        frame2heading			= document.getElementById('frame2heading');
		    cta			= document.getElementById('cta');
        closeButton         = document.getElementById('closeButton');
        unmuteButton        = document.getElementById('unmuteButton');
        clickButton        = document.getElementById('clickButton');
        logo               = document.getElementById('logo');
        t1              = document.getElementById('t1');
		    t2              = document.getElementById('t2');
		    legal             = document.getElementById('legal');





        expandedIn = true;

        TweenLite.to(background, 0, {autoAlpha:0, ease:Quad.easeInOut, overwrite:false});
        //TweenLite.to(ad, 0, {autoAlpha:0, ease:Quad.easeInOut, overwrite:false});

        buttonArray = [closeButton, cta];
        for (i = 0; i < buttonArray.length; i++) {
            button = buttonArray[i];
            button.addEventListener("mouseover", expandButtonHandler, false);
            button.addEventListener("mouseout", expandButtonHandler, false);
            button.addEventListener("click", expandButtonHandler, false);
        }

        assetArray = [preBackground,unitBackground,initialBackground, preBackgroundClouds, barometer, frame2heading, closeButton, logo, t1, t2, legal, cta];
        for (i = 0; i < assetArray.length; i++) {
            asset       = assetArray[i];
            asset.ox    = asset.offsetLeft;
            asset.oy    = asset.offsetTop;

            switch (asset) {
                case preBackground:
                case unitBackground:
                case initialBackground:
                case preBackgroundClouds:
                case barometer:
                case frame2heading:
                case logo:
                case t1:
				case t2:
				case legal:
        TweenLite.to(asset, 0, {autoAlpha:0, ease:Quad.easeInOut, overwrite:false});
                          break;

            }
        }

    }

    politeLoad( [

                ],
                    function() { console.log(":: LOADER - all secondary loads complete ::"); }
              );


    TweenLite.delayedCall(0.1, stepAnim, [1]);
}


function stepAnim($stepNum) {
    console.log("frame: " + $stepNum);

    switch ($stepNum) {
      case 1:
        TweenLite.to(background, 1.5, {autoAlpha:1, ease:Quad.easeInOut, overwrite:false});
        TweenLite.to(panel, 1.5, {autoAlpha:1, ease:Quad.easeInOut, overwrite:false});
        TweenLite.to(initialBackground, 1.5, {autoAlpha:1, ease:Quad.easeOut, overwrite:false});
        TweenLite.delayedCall(0.7, stepAnim, [2]);
        break;
      case 2:
        TweenLite.to(barometer, 0.8, {delay:0.2, autoAlpha:1, ease:Quad.easeOut, overwrite:false});
        TweenLite.to(barometer, 0.5, {delay:2,autoAlpha:0, ease:Quad.easeOut, overwrite:false});
        TweenLite.delayedCall(2.5, stepAnim, [3]);
        break;
      case 3:
        TweenLite.to(frame2heading, 1, {delay: 0.2, autoAlpha:1, ease:Quad.easeOut, overwrite:false});
        TweenLite.to(preBackgroundClouds, 0.5, {autoAlpha:1, ease:Quad.easeOut, overwrite:false});
        TweenLite.to(preBackgroundClouds, 4, {delay:0, x:40, ease:Linear.easeNone, overwrite:false});
        TweenLite.to(preBackgroundClouds, 1, {delay:4,autoAlpha:0, ease:Quad.easeOut, overwrite:false});
        TweenLite.to(frame2heading, 1, {delay:4, autoAlpha:0, ease:Quad.easeOut, overwrite:false});
        //TweenLite.to(initialBackground, 0.5, {delay:2,autoAlpha:0, ease:Quad.easeOut, overwrite:false});
        TweenLite.to(unitBackground, 1, {delay:4, autoAlpha:1, ease:Quad.easeOut, overwrite:false});
        TweenLite.delayedCall(4.5, stepAnim, [4]);
        break;
    	case 4:
        TweenLite.to(logo, 0.5, {delay:0,autoAlpha:1, ease:Quad.easeInOut, overwrite:false});
        TweenLite.to(t2, 0.5, {delay:0, autoAlpha:1, ease:Quad.easeInOut, overwrite:false});
        TweenLite.to(t1, 1.5, {delay:0.2, autoAlpha:1, ease:Quad.easeInOut, overwrite:false});
        TweenLite.to(cta, 1, {delay:0.4, autoAlpha:1, ease:Quad.easeOut, overwrite:false});
        TweenLite.to(legal, 0.8, {delay:0.6,autoAlpha:1, ease:Quad.easeInOut, overwrite:false});
    		TweenLite.delayedCall(1, stepAnim, [5]);
        break;
    	case 5:


        break;
    }
}


function expandButtonHandler($e) {
  button    = $e.currentTarget;
  type      = $e.type;

  switch (button) {
      case closeButton:
          if        (type == "mouseover")		{ TweenLite.to(button, 0.2, {autoAlpha:0.5, ease:Quad.easeInOut, overwrite:false}); }
          else if   (type == "mouseout")		{ TweenLite.to(button, 0.2, {autoAlpha:1, ease:Quad.easeInOut, overwrite:false}); }
          else if   (type == "click")			{  }
          break;
    /*
    case cta:
            if      (type == "mouseover")       { TweenLite.to(button, 0.3, {alpha:1, ease:Quad.easeInOut, overwrite:false}); }
            else if (type == "mouseout")        { TweenLite.to(button, 0.3, {alpha:0, ease:Quad.easeInOut, overwrite:false}); }
            break;*/
  }
}
