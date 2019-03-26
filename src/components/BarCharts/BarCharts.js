import React from 'react'
import axios from 'axios'
import Economy from './BarChartComponents/economy.js'
import People from './BarChartComponents/people.js'
import Population3 from './BarChartComponents/population3.js'
import JoinBars from './BarChartComponents/joinbars.js'
import { countries2 } from '../countryData/country_data.js' 

class FactBook2 extends React.Component {
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
        this.setState({
          country: newProps.country,
          economy: results.data.Economy,
          geography: results.data.Geography,
          government: results.data.Government,
          intro: results.data.Introduction,
          military: results.data['Military and Security'],
          people: results.data['People and Society'],
          transportaion: results.data.Transportation
        })
      }
      )
    } else if (this.state.country2 != newProps.secoundcountry) {
      axios.get(`https://raw.githubusercontent.com/factbook/factbook.json/master/${this.convertCountry(newProps.secondcountry)}.json`).then((results) => {
        this.setState({
          country2: newProps.secondcountry,
          economy2: results.data.Economy,
          geography2: results.data.Geography,
          government2: results.data.Government,
          intro2: results.data.Introduction,
          military2: results.data['Military and Security'],
          people2: results.data['People and Society'],
          transportaion2: results.data.Transportation
        })
      }
      )
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
    // const { economy, people, people2, economy2, country, country2 } = this.state
    const { selectedCountryData, secondCountryData, selectedCountry, secondCountry} = this.props
    const economy = selectedCountryData.Economy
    const economy2 = secondCountryData.Economy !== '' ? secondCountryData.Economy : ''
    const people = selectedCountryData.Economy
    const country = selectedCountry
    const country2 = secondCountry !== ''  ? secondCountry : ''
    console.log(country2)

    return (
      <div>
        <div className='Graphs2'>
          <Economy economy={economy && economy}  country={country && country} country2={country2 && country2} economy2={economy2 && economy2} width={350} height={250} className='chart1'/>
          {/* <People people={people && people} people2={people2 && people2} country={country && country} country2={country2 && country2} width={350} height={250} className='chart2'/>
          <Population3 country={country && country} className='chart3'/>
          <JoinBars country={country && country} width={300} secondcountry={country2 && country2} className='chart5'/> */}
        </div>
      </div>
    )
  }

}

export default FactBook2