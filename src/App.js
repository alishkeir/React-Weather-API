import './App.scss';
import Header from './components/Header';
import WeatherResults from './components/WeatherResults';
import SearchContextProvider from './context/SearchContext';
import WeatherDataContextProvider from './context/WeatherDataContext';

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
