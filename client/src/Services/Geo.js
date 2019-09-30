import { decode } from './Token';
import axios from './Axios';
const IPGeolocationAPI = require('ip-geolocation-api-javascript-sdk');
const GeolocationParams = require('ip-geolocation-api-javascript-sdk/GeolocationParams.js');

function getPos(token) {
    const api_key = "a8df2c6b5c02482baeae3fb17c70c98b";
    const api = new IPGeolocationAPI(api_key, false); 
    const params = new GeolocationParams(); 
    
    const uid = decode(token).payload.uid;
    params.setFields('city, latitude, longitude');
    const handleResponse = (json) => {
       axios.post(`/user/setLocation?uid=${uid}`, json).then((res) => {})
    }
    api.getGeolocation(handleResponse, params);
};

export {getPos};