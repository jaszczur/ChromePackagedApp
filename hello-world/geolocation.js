
var Position = function(locationChangedCallback) {
    this._locationChangedCallback = locationChangedCallback;
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
                    this._locationChangedCallback(this.placeName);
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
        this.GEOLOCATION_RESULTS_POSITION = prompt("Geolocation precision (num >= 0, 0 = max precision)", this.GEOLOCATION_RESULTS_POSITION);
        this._updatePlaceName();
    }
};

