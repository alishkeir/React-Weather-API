import { createContext, useContext, useEffect, useState } from 'react';
import { getData } from '../utils/http-requests';
import { WeatherDataContext } from './WeatherDataContext';

export const SearchContext = createContext();

const SearchContextProvider = ({ children }) => {
    const [search, setSearch] = useState('Beirut, LB');

    let { handleSetWeatherData } = useContext(WeatherDataContext);

    useEffect(() => {
        getData(search).then((res) => {
            handleSetWeatherData(res);
        });
        // eslint-disable-next-line
    }, []);

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        getData(search).then((res) => handleSetWeatherData(res));

        document.getElementById('weather-search').blur();
    };

    return (
        <SearchContext.Provider value={{ search, handleSearch, handleSubmit }}>
            {children}
        </SearchContext.Provider>
    );
};

export default SearchContextProvider;
