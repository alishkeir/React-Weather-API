import { createContext, useEffect, useState } from 'react';

export const WeatherDataContext = createContext();

const WeatherDataContextProvider = ({ children }) => {
    const [wetherData, setWetherData] = useState({});
    const [name, setName] = useState('Beirut, LB');

    useEffect(() => {}, [wetherData]);

    const handleSetWeatherData = (e) => {
        if (e) {
            if (e.data && e.cityName) {
                setWetherData(e.data);
                setName(e.cityName);
            } else {
                setWetherData([]);
                setName('');
            }
        } else {
            setWetherData([]);
            setName('');
        }
    };

    return (
        <WeatherDataContext.Provider
            value={{ wetherData, handleSetWeatherData, name }}
        >
            {children}
        </WeatherDataContext.Provider>
    );
};

export default WeatherDataContextProvider;
