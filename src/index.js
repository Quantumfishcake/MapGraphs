import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import thunk from 'redux-thunk';
import { applyMiddleware, compose, combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import {countryReducer, countryDataReducer, secondCountryDataReducer, secondCountryReducer} from './reducers/country-reducer';

const allReducers = combineReducers({
    selectedCountry: countryReducer,
    selectedCountryData: countryDataReducer,
    secondCountry: secondCountryReducer,
    secondCountryData: secondCountryDataReducer
});

const allStoreEnhancers = compose(
    applyMiddleware(thunk),
    window.devToolsExtension && window.devToolsExtension()

);

const store = createStore(
    allReducers,
    {
        selectedCountry: '',
        selectedCountryData: '',
        secondCountry: '',
        secondCountryData: ''
    },
    allStoreEnhancers
);

console.log(store.getState())

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'))
registerServiceWorker()
