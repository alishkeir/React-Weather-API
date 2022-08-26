import { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentLocation, getData } from '../utils/http-requests';
import { WeatherDataContext } from './WeatherDataContext';

export const SearchContext = createContext();

const SearchContextProvider = ({ children }) => {
    const [search, setSearch] = useState('');

    let { handleSetWeatherData } = useContext(WeatherDataContext);

    useEffect(() => {
        getCurrentLocation()
            .then((res) => {
                console.log(res);
                if (res) {
                    setSearch(res);
                }
            })
            .catch((err) => console.log(err));

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (search && search !== '') {
            getData(search).then((res) => {
                handleSetWeatherData(res);
            });
        }
        // eslint-disable-next-line
    }, [search]);

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
