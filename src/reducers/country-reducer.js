
export function countryReducer(state = '', { type, payload }) {
    switch (type) {
        case 'updateSelectedCountry':
            return payload.selectedCountry;
        default:
            return state;
    }
}

export function countryDataReducer(state = '', { type, payload }) {
    switch (type) {
        case 'updateCountryData':
            return payload.selectedCountryData;
        default:
            return state;
    }
}

export function secondCountryDataReducer(state = '', { type, payload }) {
    switch (type) {
        case 'updateSecondCountryData':
            return payload.secondCountryData;
        default:
            return state;
    }
}

export function secondCountryReducer(state = '', { type, payload }) {
    switch (type) {
        case 'updateSecondCountry':
            return payload.secondCountry;
        default:
            return state;
    }
}
