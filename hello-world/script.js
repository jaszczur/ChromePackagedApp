document.observe("dom:loaded", function() {
    var placeChanged = function(newPlace) {   
        $('place').update(newPlace);
    };

    var position = new Position(placeChanged);
    var visible = false;
    
    // setup context menu
    try {
        chrome.contextMenus.removeAll();
        var child1 = chrome.contextMenus.create({
            "title": "Change location type",
            "onclick": position.askForGeolocationType.bind(position)
        });
    } catch (ex) {
        console.log("We don't have permissions to setup context menus");
    }

    // user event handlers
    $('button').observe("click", function(event) {
        if (!visible) {
            $('welcomeMessage').show();
            new Effect.Morph('welcomeMessage', {
                style: "opacity: 0.999; top: -20px",
                duration: 0.5
            });
        } else {
            new Effect.Morph('welcomeMessage', {
                style: "opacity: 0.0; top: -40px",
                duration: 0.5
            }, {
                afterFinish: function(eff) {
                    $('welcomeMessage').hide();
                }
            });
        }
        visible = !visible;
    });
});

