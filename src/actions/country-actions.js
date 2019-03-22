

export function updateCountry(newCountry){
    console.log(newCountry)
    return {
        type: 'updateSelectedCountry',
        payload: {
            selectedCountry: newCountry
        }
    }
}

export function updateCountryData(newData){
    return {
        type: 'updateCountryData',
        payload: {
            selectedCountryData: newData
        }
    }
}

export function updateSecondCountry(newData){
    return {
        type: 'updateSecondCountry',
        payload: {
            secondCountry: newData
        }
    }
}

export function updateSecondCountryData(newData){
    return {
        type: 'updateSecondCountryData',
        payload: {
            secondCountryData: newData
        }
    }
}