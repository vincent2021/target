const IPGeolocationAPI = require('ip-geolocation-api-javascript-sdk');
const GeolocationParams = require('ip-geolocation-api-javascript-sdk/GeolocationParams.js');

export function getPos() {
        const api_key = 'a8df2c6b5c02482baeae3fb17c70c98b';
        const api = new IPGeolocationAPI(api_key, false); 
        const params = new GeolocationParams(); 
        params.setFields('city, latitude, longitude');
        api.getGeolocation((json) => {
            console.log(json);
            return(json);
        }, params);

}
