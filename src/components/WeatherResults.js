import { useContext, useEffect, useState } from 'react';
import { WeatherDataContext } from '../context/WeatherDataContext';
import { getWeatherColor, ShowFirst, ShowRest } from '../utils/functions';

const WeatherResults = () => {
    const [id, setId] = useState(800);
    const { wetherData, name } = useContext(WeatherDataContext);
    let canShowEmpty = false;

    useEffect(() => {
        if (wetherData) {
            if (wetherData.length > 0) {
                setId(wetherData[0].weather[0].id);
            }
        }
    }, [wetherData]);

    const ReturnWeatherData = () => {
        if (wetherData) {
            if (wetherData.length > 0) {
                canShowEmpty = true;

                let firstData = wetherData.shift();
                return (
                    <>
                        <ShowFirst firstData={firstData} name={name} />
                        <ShowRest NewWeatherData={wetherData} />
                    </>
                );
            }
            if (canShowEmpty)
                return (
                    <h2 className='empty-results'>
                        No weather data for this location
                    </h2>
                );
        } else {
            return (
                <h2 className='empty-results'>
                    No weather data for this location
                </h2>
            );
        }
    };
    return (
        <div
            className='weather-container'
            style={{ background: getWeatherColor(id) }}
        >
            {wetherData.length === 0 ? (
                <h2 className='empty-results'>
                    No weather data for this location
                </h2>
            ) : (
                <ReturnWeatherData />
            )}
        </div>
    );
};

export default WeatherResults;
