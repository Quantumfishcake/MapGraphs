import React from 'react'
import axios from 'axios'
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
    this.state = {
      country: '',
      country2: '',
      data: {},
      search: '',
      economy2: {},
      economy: {},
      geography2: {},
      geography: {},
    }
  }
  componentWillReceiveProps = (newProps) => {
    if (this.state.country != newProps.country) {
      axios.get(`https://raw.githubusercontent.com/factbook/factbook.json/master/${this.convertCountry(newProps.country)}.json`).then((results) => {
        console.log(results)
        this.setState({
          languages: convertstring(results.data['People and Society'].Languages.text),
          ageGroups: convertAgeGroups(results.data['People and Society']['Age structure'])
        })
      }
      )
    } else if (this.state.country != '' && this.state.country2 != newProps.secoundcountry) {
      axios.get(`https://raw.githubusercontent.com/factbook/factbook.json/master/${this.convertCountry(newProps.secondcountry)}.json`).then((results) => {
        this.setState({
          languages2: convertstring(results.data['People and Society'].Languages.text),
          ageGroups2: convertAgeGroups(results.data['People and Society']['Age structure'])
        })
      })
    }
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
    
    const {languages, languages2, ageGroups, ageGroups2} = this.state
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