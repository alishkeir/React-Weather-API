import React, { useContext } from 'react';
import { SearchContext } from '../context/SearchContext';

const Header = () => {
    let { search, handleSearch, handleSubmit } = useContext(SearchContext);

    return (
        <header className='header'>
            <form className='form' onSubmit={handleSubmit}>
                <input
                    className='field'
                    type='text'
                    value={search}
                    onChange={handleSearch}
                    placeholder='Type in city name'
                    id='weather-search'
                />

                <button type='submit' className='btn'>
                    Find Weather
                </button>
            </form>
        </header>
    );
};

export default Header;
