
var Position = function() {
    this._coordinates = null;
    this._geocoder = new google.maps.Geocoder();
    this.placeName = null;
    this.GEOLOCATION_RESULTS_POSITION = 1;
    
//    navigator.geolocation.getCurrentPosition(this._setCoordinates.bind(this));
    navigator.geolocation.watchPosition(this._setCoordinates.bind(this));
};

Position.prototype = {
    
    _updatePlaceName: function() {
        console.log(this._coordinates);
        var latlng = new google.maps.LatLng(this._coordinates.latitude, this._coordinates.longitude);
        
        this._geocoder.geocode({'latLng': latlng}, (function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[this.GEOLOCATION_RESULTS_POSITION]) {
                    this.placeName = results[this.GEOLOCATION_RESULTS_POSITION].formatted_address
                }
            } else {
                log.console("Geocoder failed due to: " + status);
            }
        }).bind(this));
    },
    
    _setCoordinates: function(position) {
        this._coordinates = position.coords;
        this._updatePlaceName();
    },
    
    
    askForGeolocationType: function(info, tab) {
        this.GEOLOCATION_RESULTS_POSITION = prompt("GEOLOCATION_RESULTS_POSITION", this.GEOLOCATION_RESULTS_POSITION);
        this._updatePlaceName();
    }
};


document.observe("dom:loaded", function() {
    var position = new Position();
    
    chrome.contextMenus.removeAll();
    var child1 = chrome.contextMenus.create(
        {"title": "Change location type", "onclick": position.askForGeolocationType.bind(position)});

    $('button').observe("click", function(event) {
        $('place').update(position.placeName);
        $('welcomeMessage').toggle();
    });
});

