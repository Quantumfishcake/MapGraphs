import axios from 'axios'
import { countries2 } from '../countryData/country_data.js' 

export const factBookAPI = (country1) => {
    
    const convertCountry = (country) => {
        const index = countries2.indexOf(country)
        const result = countries2[index - 1]
        return result
      }
    return axios.get(`https://raw.githubusercontent.com/factbook/factbook.json/master/${convertCountry(country1)}.json`).then(res => res.data)
}
