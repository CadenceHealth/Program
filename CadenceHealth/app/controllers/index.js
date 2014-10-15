function navigateSearch(e) {
	var searchView = Alloy.createController('search').getView();
	searchView.open();
}

function navigateSaved(e) {
	var storageView = Alloy.createController('storage').getView();
	storageView.open();
}

function navigateCapture(e) {
    Titanium.Media.showCamera({
	success:function(event) {
		// called when media returned from the camera
		Ti.API.debug('Our type was: '+event.mediaType);
		if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
			var imageView = Ti.UI.createImageView({
				width:Ti.UI.SIZE,
				height:Ti.UI.SIZE,
				image:event.media
			});
			
			//save image to temp 
			newImage = imageView.toBlob();
	
			//pass image location to Tag
			var arg = {
				image : newImage	
				};
			
			//create controller and pass image location
			var tag = Alloy.createController('tag',arg).getView();
			tag.open();
		} else {
			alert("got the wrong type back ="+event.mediaType);
		}
	},
	cancel:function() {
		// called when user cancels taking a picture
		alert("Meal Creation cancelled");
	},
	error:function(error) {
		// called when there's an error
		var a = Titanium.UI.createAlertDialog({title:'Camera'});
		if (error.code == Titanium.Media.NO_CAMERA) {
			a.setMessage('Please run this test on device');
		} else {
			a.setMessage('Unexpected error: ' + error.code);
		}
		a.show();
	},
	saveToPhotoGallery:false,
});
}

$.navigation.open();