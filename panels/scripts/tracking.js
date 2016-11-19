var clickthroughArray, clickthroughAsset,
	userInteractionArray, userInteractionAsset,
	i;


function trackingInit() {

    //Set to false if you don't want the ad to fade/close when clicking around the ad for testing
    fadeOut = false;

	clickthroughArray =	[
							background, preBackground, unitBackground, initialBackground, preBackgroundClouds, barometer, frame2heading, cta, t1, t2, logo, legal
    ];

	userInteractionArray = [
							closeButton
    ];


	for (i = 0; i < clickthroughArray.length; i++) {
		clickthroughAsset = clickthroughArray[i];
		clickthroughAsset.addEventListener("click", clickthroughHandler, false);
	}

	for (i = 0; i < userInteractionArray.length; i++) {
		userInteractionAsset = userInteractionArray[i];
		userInteractionAsset.addEventListener("click", userInteractionHandler, false);
	}
}


function clickthroughHandler($e) {
	clickthroughAsset = $e.currentTarget;

	console.log("clickthrough: " + clickthroughAsset.id);

	// Populate the switch case below with the corresponding assets within the clickthrough array and change the clickthrough label accordingly.
	// Keep all label names lowercase and keep every word separated by an underscore e.g. ct_cta_button
	// Keep labels as detailed and as short as possible for the account managers, especially thumbnails.

	switch (clickthroughAsset) {
		case background:					EB.clickthrough("ct_stage-background");			break;
		case preBackground:				EB.clickthrough("ct_background");				break;
		case unitBackground:				EB.clickthrough("ct_background");				break;
		case initialBackground:				EB.clickthrough("ct_background");				break;
		case preBackgroundClouds:				EB.clickthrough("ct_cloud-background");				break;
		case barometer:					EB.clickthrough("ct_barometer");						break;
		case frame2heading:					EB.clickthrough("ct_frame2-heading");						break;
		case cta:					EB.clickthrough("ct_cta");						break;
		case t1:							EB.clickthrough("ct_headline1");				break;
		case t2:							EB.clickthrough("ct_energy-lives-here");				break;
		case legal:							EB.clickthrough("ct_tcs");						break;
		case logo:							EB.clickthrough("ct_logo");						break;
	}

    collapse();
}


function userInteractionHandler($e) {
	userInteractionAsset = $e.currentTarget;

	console.log("interaction: " + userInteractionAsset.id);

	// Populate the switch case below with the corresponding assets within the interaction array and change the counter label accordingly.
	// Keep all label names lowercase and keep every word separated by an underscore e.g. int_back_button
	// Keep labels as detailed and as short as possible for the account managers, especially thumbnails.

	switch (userInteractionAsset) {
		case closeButton:
            EB.userActionCounter("int_close_button");
            collapse();
            break;
	}
}
