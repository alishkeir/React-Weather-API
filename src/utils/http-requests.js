import axios from 'axios';

export const API_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY
    ? process.env.REACT_APP_OPEN_WEATHER_API_KEY
    : '';

export const latLongURL = 'http://api.openweathermap.org/geo/1.0/direct';

export const geoLocationURL = 'http://api.openweathermap.org/data/2.5/forecast';

const getLatLong = (location) => {
    return axios
        .get(latLongURL, {
            params: {
                appid: API_KEY,
                q: location,
            },
        })
        .then((res) => {
            return {
                lat: res.data[0].lat,
                lon: res.data[0].lon,
                status: 200,
                name: `${res.data[0].name}, ${res.data[0].country}`,
            };
        })
        .catch((err) => {
            return err.response;
        });
};

export const getData = (search) => {
    return getLatLong(search)
        .then((res) => {
            let cityName = res.name ? res.name : '';
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
                        return { data: res.data.list, cityName };
                    })
                    .catch((err) => {
                        return err.response;
                    });
            }
        })
        .catch((err) => err.response);
};
