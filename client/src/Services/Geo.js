import { decode } from './Token';
import axios from './Axios';
const IPGeolocationAPI = require('ip-geolocation-api-javascript-sdk');
const GeolocationParams = require('ip-geolocation-api-javascript-sdk/GeolocationParams.js');

export function getPos(token) {
    const uid = decode(token).payload.uid;
    const api_key = 'a8df2c6b5c02482baeae3fb17c70c98b';
    const IPGeolocationAPI = require('ip-geolocation-api-javascript-sdk');
    const api = new IPGeolocationAPI(api_key, false); 
    const params = new GeolocationParams(); 
    params.setFields('city, latitude, longitude');
    function handleResponse(json) {
        console.log(json);
        axios.post(`/user/setLocation?uid=${uid}`, json).then((res) => {
            console.log(res);
        })
    }
    return(api.getGeolocation(handleResponse, params));
}