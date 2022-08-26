import { Swiper, SwiperSlide } from 'swiper/react';
import { useContext, useEffect, useRef, useState } from 'react';
import { A11y, Controller, Navigation, Pagination, Scrollbar } from 'swiper';
import storm from '../assets/images/weather-icons/storm.svg';
import drizzle from '../assets/images/weather-icons/drizzle.svg';
import rain from '../assets/images/weather-icons/rain.svg';
import snow from '../assets/images/weather-icons/snow.svg';
import fog from '../assets/images/weather-icons/fog.svg';
import clear from '../assets/images/weather-icons/clear.svg';
import partlycloudy from '../assets/images/weather-icons/partlycloudy.svg';
import mostlycloudy from '../assets/images/weather-icons/mostlycloudy.svg';
import rightArrow from '../assets/images/svg/right-arrow.svg';
import leftArrow from '../assets/images/svg/left-arrow.svg';
import { WeatherDataContext } from '../context/WeatherDataContext';

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

const styles = {
    enabled: {
        opacity: 1,
    },
    disabled: {
        opacity: 0.5,
        pointerEvents: 'none',
    },
};

export const ShowRest = ({ NewWeatherData }) => {
    const [id, setId] = useState(800);
    const { wetherData } = useContext(WeatherDataContext);
    const [canClickPrev, setCanClickPrev] = useState(false);
    const [canClickNext, setCanClickNex] = useState(true);
    const [swiper, setSwiper] = useState();

    const prevRef = useRef();
    const nextRef = useRef();

    useEffect(() => {
        if (wetherData) {
            if (wetherData.length > 0) {
                setId(wetherData[0].weather[0].id);
            }
        }
    }, [wetherData]);

    useEffect(() => {
        if (swiper) {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
        }
    }, [swiper]);

    if (wetherData.length === 0) {
        return null;
    }

    return (
        <>
            <Swiper
                style={{}}
                onReachEnd={() => {
                    setCanClickNex(false);
                }}
                onReachBeginning={() => {
                    setCanClickPrev(false);
                }}
                modules={[Navigation, Pagination, Scrollbar, A11y, Controller]}
                spaceBetween={2}
                slidesPerView={1}
                className='weather-today'
                navigation={{
                    prevEl: prevRef?.current,
                    nextEl: nextRef?.current,
                }}
                updateOnWindowResize
                observer
                observeParents
                initialSlide={0}
                onSwiper={setSwiper}
                onSlideChange={(swiper) => {
                    if (swiper.activeIndex !== 0) {
                        setCanClickPrev(true);
                    }
                }}
                breakpoints={{
                    374: {
                        slidesPerView: 1,
                    },
                    500: {
                        slidesPerView: 2,
                    },

                    600: {
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
                <span
                    style={{ background: getWeatherColor(id) }}
                    className='weather-today-prev'
                    ref={prevRef}
                >
                    <img
                        style={canClickPrev ? styles.enabled : styles.disabled}
                        alt='prev'
                        src={leftArrow}
                    />
                </span>
                {NewWeatherData.map((weatherItem) => {
                    let time = new Date(weatherItem.dt * 1000)
                        .toLocaleString('en-GB')
                        .replace(' ', '')
                        .split(',')[1];
                    let date = new Date(weatherItem.dt * 1000)
                        .toLocaleString('en-GB')
                        .replace(' ', '')
                        .split(',')[0];

                    return (
                        <SwiperSlide key={weatherItem.dt}>
                            <div className='container container-small'>
                                <div className='container-small-time'>
                                    <span>{date.split('/').join(' - ')}</span>
                                    <span>
                                        {time.substring(0, time.length - 3)}
                                    </span>
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

                <span
                    style={{ background: getWeatherColor(id) }}
                    className='weather-today-next'
                    ref={nextRef}
                >
                    <img
                        style={canClickNext ? styles.enabled : styles.disabled}
                        alt='next'
                        src={rightArrow}
                    />
                </span>
            </Swiper>
        </>
    );
};
