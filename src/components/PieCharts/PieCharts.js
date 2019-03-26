import React from 'react'
import Pies from '../charts/Pie.js'
import { countries2 } from '../countryData/country_data.js' 
import { flow, split, map, mapValues } from 'lodash/fp'
import { replace } from 'lodash'

const convertstring = flow(
  split(', '),
  map(split(' ')),
  map(item => ({
    language: item[0],
    percent: item.length == 2 ? replace(item[1], '%', '') : replace(item[item.length - 1], '%', '')
  }))
)

const mapWithKey = map.convert({cap: false})

const convertAgeGroups = mapWithKey((value, key) => ({
  group: key.split(' ')[0],
  percent: value.text.split(' ')[0].replace('%', ''),
}))

class FactBook extends React.Component {
  constructor(props) {
    super(props)
  }

  convertCountry = (country) => {
    const index = countries2.indexOf(country)
    const result = countries2[index - 1]
    return result
  }

  _handleChange = (event) => {
    this.setState({ search: event.target.value })
  }
  
  render() {
    const { selectedCountryData, secondCountryData} = this.props
    const languages = convertstring(selectedCountryData['People and Society'].Languages.text)
    const ageGroups = convertAgeGroups(selectedCountryData['People and Society']['Age structure'])
    const languages2 = secondCountryData !== '' ? convertstring(secondCountryData['People and Society'].Languages.text) : ''
    const ageGroups2 = secondCountryData !== '' ? convertAgeGroups(secondCountryData['People and Society']['Age structure']) : ''
   
    return (
      <div>
        <div className='pies'>
            <Pies country1={languages} country2={languages2} /> 
            <Pies country1={ageGroups} country2={ageGroups2} />
        </div>
      </div>
    )
  }

}

export default FactBook