var imgPath=getImage();

function getImage(){
	var path = Titanium.Filesystem.getTempDirectory;
	return path + "/pendingImage.jpg";
}
