import axios from 'axios';

let API_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY
    ? process.env.REACT_APP_OPEN_WEATHER_API_KEY
    : null;

let latLongURL = 'http://api.openweathermap.org/geo/1.0/direct';

let geoLocationURL = 'http://api.openweathermap.org/data/2.5/forecast';

const getLatLong = (location) => {
    return axios
        .get(latLongURL, {
            params: {
                appid: API_KEY,
                q: location,
            },
        })
        .then((res) => {
            return { lat: res.data[0].lat, lon: res.data[0].lon, status: 200 };
        })
        .catch((err) => {
            return err.response;
        });
};

export const getData = (search) => {
    return getLatLong(search).then((res) => {
        if (res.status === 200) {
            return axios
                .get(geoLocationURL, {
                    params: {
                        appid: API_KEY,
                        lat: res.lat,
                        lon: res.lon,
                        units: 'metric',
                    },
                })
                .then((res) => {
                    return res.data.list.slice(0, 8);
                })
                .catch((err) => {
                    return err.response;
                });
        }
    });
};
