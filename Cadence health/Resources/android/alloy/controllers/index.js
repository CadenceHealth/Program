function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function doClick() {
        Titanium.Media.showCamera({
            success: function(event) {
                Ti.API.debug("Our type was: " + event.mediaType);
                if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
                    var imageView = Ti.UI.createImageView({
                        width: Ti.UI.SIZE,
                        height: Ti.UI.SIZE,
                        image: event.media
                    });
                    newImage = imageView.toImage();
                    var file = Titanium.Filesystem.createTempFile();
                    file.write(newImage);
                    var arg = {
                        link: file.nativePath
                    };
                    var tag = Alloy.createController("tag", arg).getView();
                    tag.open();
                } else alert("got the wrong type back =" + event.mediaType);
            },
            cancel: function() {},
            error: function(error) {
                var a = Titanium.UI.createAlertDialog({
                    title: "Camera"
                });
                a.setMessage(error.code == Titanium.Media.NO_CAMERA ? "Please run this test on device" : "Unexpected error: " + error.code);
                a.show();
            },
            saveToPhotoGallery: false
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.win = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "win"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    $.__views.testbutton = Ti.UI.createButton({
        id: "testbutton",
        title: "Snap & Tag",
        top: "10",
        left: "10",
        width: "100",
        height: "200"
    });
    $.__views.win.add($.__views.testbutton);
    doClick ? $.__views.testbutton.addEventListener("click", doClick) : __defers["$.__views.testbutton!click!doClick"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.win.open();
    __defers["$.__views.testbutton!click!doClick"] && $.__views.testbutton.addEventListener("click", doClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;