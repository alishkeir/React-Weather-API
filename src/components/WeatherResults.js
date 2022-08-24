import { useContext, useEffect } from 'react';
import { WeatherDataContext } from '../context/WeatherDataContext';

const WeatherResults = () => {
    const { wetherData } = useContext(WeatherDataContext);
    let canShowEmpty = false;

    useEffect(() => {
        console.log('_______________');
        console.log(wetherData);
        console.log('_______________');
    }, [wetherData]);

    const ReturnWeatherData = () => {
        if (wetherData.length > 0) {
            canShowEmpty = true;
            return wetherData.forEach((weatherItem) => {
                console.log(
                    new Date(weatherItem.dt_txt).toLocaleTimeString('en-uk', {
                        hour: '2-digit',
                        minute: '2-digit',
                    })
                );
                console.log(weatherItem);
                console.log(weatherItem.weather[0]);
            });
        }

        if (canShowEmpty) return '<h2>No weather data for this location</h2>';
    };

    return (
        <div className='weather-container'>
            <ReturnWeatherData />
            <div className='weather-now'></div>
            <div className='weather-today'></div>
        </div>
    );
};

export default WeatherResults;
