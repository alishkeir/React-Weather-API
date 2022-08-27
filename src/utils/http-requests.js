import axios from 'axios';

export const API_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY
    ? process.env.REACT_APP_OPEN_WEATHER_API_KEY
    : '';

export const LOCATION_KEY = process.env.REACT_APP_LOCATION_IQ_API_KEY
    ? process.env.REACT_APP_LOCATION_IQ_API_KEY
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

export const getData = (search, lat, lon) => {
    if (lat && lon) {
        return axios
            .get(geoLocationURL, {
                params: {
                    appid: API_KEY,
                    lat: lat,
                    lon: lon,
                    units: 'metric',
                },
            })
            .then((res) => {
                return {
                    data: res.data.list,
                    cityName: `${res.data.city.name}, ${res.data.city.country}`,
                };
            })
            .catch((err) => {
                return err.response;
            });
    }

    return getLatLong(search)
        .then((res) => {
            if (res.status === 200) {
                return axios
                    .get(geoLocationURL, {
                        params: {
                            appid: API_KEY,
                            lat: res.lat,
                            lon: res.lon,
                            units: 'imperial',
                        },
                    })
                    .then((res) => {
                        return {
                            data: res.data.list,
                            cityName: `${res.data.city.name}, ${res.data.city.country}`,
                        };
                    })
                    .catch((err) => {
                        return err.response;
                    });
            }
        })
        .catch((err) => err.response);
};

export const getCurrentLocation = async () => {
    let location = null;
    await navigator.geolocation.getCurrentPosition((res) => {
        if (res.coords) {
            location = res.coords;
        }
    });

    if (location) {
        let params = {
            format: 'json',
            key: LOCATION_KEY,
            lat: location.latitude,
            lon: location.longitude,
        };

        return await axios
            .get('https://us1.locationiq.com/v1/reverse.php', { params })
            .then((res) => {
                if (res.status === 200) {
                    let city = '';

                    if (res.data.address.region) {
                        city = res.data.address.region;
                    }

                    if (res.data.address.district) {
                        city = res.data.address.district
                            .replace('District', '')
                            .replace(/ /g, '');
                    }

                    if (res.data.address.city_district) {
                        city = res.data.address.city_district;
                    }

                    if (res.data.address.village) {
                        city = res.data.address.village;
                    }

                    if (res.data.address.municipality) {
                        city = res.data.address.municipality;
                    }

                    if (res.data.address.county) {
                        city = res.data.address.county;
                    }
                    if (res.data.address.state) {
                        city = res.data.address.state;
                    }

                    if (res.data.address.town) {
                        city = res.data.address.town;
                    }
                    if (res.data.address.city) {
                        city = res.data.address.city;
                    }

                    return `${city}, ${res.data.address.country_code.toUpperCase()}`;
                }

                return 'Beirut, LB';
            })
            .catch((err) => err.response);
    }

    return 'Beirut, LB';
};
