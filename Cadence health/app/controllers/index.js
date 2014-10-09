function doClick(e) {
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
			newImage = imageView.toImage();
			var file = Titanium.Filesystem.createTempFile();
			file.write(newImage);
			
			//pass image location to Tag
			var arg = {
				link : file.nativePath			
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
	//button.open();
}



$.win.open();
