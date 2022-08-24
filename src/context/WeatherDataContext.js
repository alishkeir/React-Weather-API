import { createContext, useState } from 'react';

export const WeatherDataContext = createContext();

const WeatherDataContextProvider = ({ children }) => {
    const [wetherData, setWetherData] = useState({});

    const handleSetWeatherData = (e) => {
        setWetherData(e);
    };

    return (
        <WeatherDataContext.Provider
            value={{ wetherData, handleSetWeatherData }}
        >
            {children}
        </WeatherDataContext.Provider>
    );
};

export default WeatherDataContextProvider;
