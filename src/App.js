import Header from './components/Header';
import WeatherResults from './components/WeatherResults';
import SearchContextProvider from './context/SearchContext';
import WeatherDataContextProvider from './context/WeatherDataContext';

import './App.scss';
import 'swiper/css';

function App() {

    return (
        <div className='App'>
            <WeatherDataContextProvider>
                <SearchContextProvider>
                    <Header />
                    <WeatherResults />
                </SearchContextProvider>
            </WeatherDataContextProvider>
        </div>
    );
}

export default App;
