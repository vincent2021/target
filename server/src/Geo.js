const IPGeolocationAPI = require('ip-geolocation-api-javascript-sdk');
const GeolocationParams = require('ip-geolocation-api-javascript-sdk/GeolocationParams.js');
const db = require("./db");

function getPos(uid, ip) {
        const api_key = 'a8df2c6b5c02482baeae3fb17c70c98b';
        const api = new IPGeolocationAPI(api_key, false); 
        const params = new GeolocationParams(); 
        params.setFields('city, latitude, longitude');
        params.setIPAddress(ip); 
        const handleResponse = (json) => {
            db.setLocation(uid, json.city, json.latitude, json.longitude).then((ret) => {
            })
        };
        api.getGeolocation(handleResponse, params);
}


function setPosFromUser(uid, ip, lat, lon) {
    const api_key = 'a8df2c6b5c02482baeae3fb17c70c98b';
    const api = new IPGeolocationAPI(api_key, false); 
    const params = new GeolocationParams(); 
    params.setFields('city');
    params.setIPAddress(ip); 
    const handleResponse = (json) => {
        db.setLocation(uid, json.city, lat, lon).then((ret) => {
        })
    };
    api.getGeolocation(handleResponse, params);
}

module.exports = {
    getPos: getPos,
    setPosFromUser: setPosFromUser
};