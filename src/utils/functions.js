import { Swiper, SwiperSlide } from 'swiper/react';

import storm from '../assets/images/weather-icons/storm.svg';
import drizzle from '../assets/images/weather-icons/drizzle.svg';
import rain from '../assets/images/weather-icons/rain.svg';
import snow from '../assets/images/weather-icons/snow.svg';
import fog from '../assets/images/weather-icons/fog.svg';
import clear from '../assets/images/weather-icons/clear.svg';
import partlycloudy from '../assets/images/weather-icons/partlycloudy.svg';
import mostlycloudy from '../assets/images/weather-icons/mostlycloudy.svg';

export const getWeatherImage = (id) => {
    switch (true) {
        case id < 300:
            return storm;
        case id >= 300 && id <= 499:
            return drizzle;

        case id >= 500 && id <= 599:
            return rain;

        case id >= 600 && id <= 699:
            return snow;

        case id >= 700 && id <= 799:
            return fog;

        case id === 800:
            return clear;

        case id === 801:
            return partlycloudy;

        case id >= 802 && id <= 805:
            return mostlycloudy;

        default:
            return null;
    }
};

export const getWeatherColor = (id) => {
    switch (true) {
        case id < 300:
            return '#c2c9cd';
        case id >= 300 && id <= 499:
            return '#b2cbde';

        case id >= 500 && id <= 599:
            return '#b7cad8';

        case id >= 600 && id <= 699:
            return '#bdc9d3';

        case id >= 700 && id <= 799:
            return '#accce3';

        case id === 800:
            return '#9ccef4';

        case id === 801:
            return '#a1cdee';

        case id >= 802 && id <= 805:
            return '#a7cce9';

        default:
            return '#9ccef4';
    }
};

export const ShowFirst = ({ firstData, name }) => {
    let temp = '';

    if (
        parseInt(firstData.main.temp_min) === parseInt(firstData.main.temp_max)
    ) {
        temp = `${parseInt(firstData.main.temp_min)}℃`;
    } else {
        temp = `${parseInt(firstData.main.temp_min)}℃  to  ${parseInt(
            firstData.main.temp_max
        )}℃`;
    }

    return firstData ? (
        <div className='weather-now'>
            <div className='container container-big'>
                <div className='container-big-image'>
                    <img
                        src={getWeatherImage(firstData.weather[0].id)}
                        alt={firstData.weather[0].description}
                    />
                </div>
                {name ? <div className='container-big-name'>{name}</div> : null}
                <div className='container-big-name'></div>
                <div className='container-big-title'>
                    {firstData.weather[0].description}
                </div>
                <div className='container-big-temp'>
                    <span>Temperature</span> {temp}
                </div>
                <div className='container-big-humidity'>
                    <div className='humidity'>
                        <span>Humidity</span>
                        {firstData.main.humidity}%
                    </div>
                    <div className='pressure'>
                        <span>Pressure</span>
                        {firstData.main.pressure}
                    </div>
                </div>
            </div>
        </div>
    ) : null;
};

export const ShowRest = ({ wetherData }) => {
    if (wetherData.length === 0) {
        return null;
    }

    return (
        <Swiper
            spaceBetween={2}
            slidesPerView={1}
            grabCursor={true}
            className='weather-today'
            breakpoints={{
                374: {
                    slidesPerView: 1,
                },
                575: {
                    slidesPerView: 2,
                },

                767: {
                    slidesPerView: 3,
                },

                1023: {
                    slidesPerView: 4,
                },
                1199: {
                    slidesPerView: 5,
                },
                1399: {
                    slidesPerView: 6,
                },
                1440: {
                    slidesPerView: 7,
                },
            }}
        >
            {wetherData.map((weatherItem) => {
                let time = new Date(weatherItem.dt_txt).toLocaleTimeString(
                    'en-GB',
                    {
                        hour: '2-digit',
                        minute: '2-digit',
                    }
                );
                let date = new Date(weatherItem.dt_txt).toLocaleDateString(
                    'en-GB'
                );

                return (
                    <SwiperSlide key={weatherItem.dt}>
                        <div className='container container-small'>
                            <div className='container-small-time'>
                                <span>{date.split('/').join(' - ')}</span>
                                <span>{time}</span>
                            </div>
                            <div className='container-small-image'>
                                <img
                                    src={getWeatherImage(
                                        weatherItem.weather[0].id
                                    )}
                                    alt={weatherItem.weather[0].description}
                                />
                            </div>
                            <div className='container-small-temp'>
                                {parseInt(weatherItem.main.temp)}℃
                            </div>
                        </div>
                    </SwiperSlide>
                );
            })}
        </Swiper>
    );
};
