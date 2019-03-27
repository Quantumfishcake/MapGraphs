import React from 'react'
import axios from 'axios'
import Economy from './BarChartComponents/economy.js'
import People from './BarChartComponents/people.js'
import Population3 from './BarChartComponents/population3.js'
import JoinBars from './BarChartComponents/joinbars.js'
import { countries2 } from '../countryData/country_data.js' 

const MoneyConversion = (arr) => {
  return arr[1] == 'trillion' ? arr[0].replace('$', '') * 1000 : arr[0].replace('$', '')
}

class FactBook2 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedCountry: props.selectedCountry,
      secondCountry: '',
      selectedCountryData: props.selectedCountryData,
      secondCountryData: '',
      search: '',
      economy2: {},
      economy: {},
      geography2: {},
      geography: {},
    }
  }
  componentWillReceiveProps = (newProps) => {
    console.log(newProps)
    if (this.state.country2 != newProps.secondCountry) {
        this.setState({
          secondCountry: newProps.secondCountry,
          secondCountryData: newProps.secondCountryData,
          // economy2: newProps.secondCountryData.Economy,
          // geography2: newProps.secondCountryData.Geography,
          // government2: newProps.secondCountryData.Government,
          // intro2: newProps.secondCountryData.Introduction,
          // military2: newProps.secondCountryData['Military and Security'],
          // people2: newProps.secondCountryData['People and Society'],
          // transportaion2: newProps.secondCountryData.Transportation
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

  geographyData = () => {
    const { selectedCountryData, secondCountryData, selectedCountry, secondCountry} = this.state

    const countryRevenue = selectedCountryData.Economy.Budget && selectedCountryData.Economy.Budget.revenues.text.split(' ')[0].replace('$', '')
    const countryExpenditure = selectedCountryData.Economy.Budget && selectedCountryData.Economy.Budget.expenditures.text.split(' ')[0].replace('$', '')
    const GDP = selectedCountryData.Economy['GDP (official exchange rate)'] && MoneyConversion(selectedCountryData.Economy['GDP (official exchange rate)'].text.split(' '))
    const Debt = selectedCountryData.Economy['Debt - external'] && MoneyConversion(selectedCountryData.Economy['Debt - external'].text.split(' '))
    const unemploymentRate = selectedCountryData.Economy['Unemployment rate'] && selectedCountryData.Economy['Unemployment rate'].text.split(' ')[0].replace('%', '')
    const PovertyRate = selectedCountryData.Economy['Population below poverty line'] && selectedCountryData.Economy['Population below poverty line'].text.split(' ')[0].replace('%', '')
    const GDPperCapita = selectedCountryData.Economy['GDP - per capita (PPP)'] && selectedCountryData.Economy['GDP - per capita (PPP)'].text.split(' ')[0].replace('$', '').replace(',', '')

    let  geographyData =  [
      { Budget: 'Revenue', [selectedCountry]: (countryRevenue) /10 },
      { Budget: 'Expenditure', [selectedCountry]: countryExpenditure /10 },
      { Budget: 'Unemployment', [selectedCountry]: unemploymentRate },
      { Budget: 'Debt', [selectedCountry]: Debt /10  },
      { Budget: 'Poverty Rate', [selectedCountry]: PovertyRate },
      { Budget: 'GDP PPP', [selectedCountry]: GDPperCapita / 1000 },
      { Budget: 'GDP', [selectedCountry]: GDP /10 }
    ]

    if(secondCountryData !== ''){
        const countryRevenue2 = secondCountryData.Economy.Budget && secondCountryData.Economy.Budget.revenues.text.split(' ')[0].replace('$', '')
        const countryExpenditure2 = secondCountryData.Economy.Budget && secondCountryData.Economy.Budget.expenditures.text.split(' ')[0].replace('$', '')
        const GDP2 = secondCountryData.Economy['GDP (official exchange rate)'] && MoneyConversion(secondCountryData.Economy['GDP (official exchange rate)'].text.split(' '))
        const Debt2 = secondCountryData.Economy['Debt - external'] && MoneyConversion(secondCountryData.Economy['Debt - external'].text.split(' '))
        const unemploymentRate2 = secondCountryData.Economy['Unemployment rate'] && secondCountryData.Economy['Unemployment rate'].text.split(' ')[0].replace('%', '')
        const PovertyRate2 = secondCountryData.Economy['Population below poverty line'] && secondCountryData.Economy['Population below poverty line'].text.split(' ')[0].replace('%', '')
        const GDPperCapita2 = secondCountryData.Economy['GDP - per capita (PPP)'] && secondCountryData.Economy['GDP - per capita (PPP)'].text.split(' ')[0].replace('$', '').replace(',', '')
        
        geographyData =  [
            { Budget: 'Revenue', [selectedCountry]: (countryRevenue) /10, [secondCountry]: (countryRevenue2) /10 },
            { Budget: 'Expenditure', [selectedCountry]: countryExpenditure /10, [secondCountry]: countryExpenditure2 /10 },
            { Budget: 'Unemployment', [selectedCountry]: unemploymentRate, [secondCountry]: unemploymentRate2 },
            { Budget: 'Debt', [selectedCountry]: Debt /10 , [secondCountry]: Debt2 /10 },
            { Budget: 'Poverty Rate', [selectedCountry]: PovertyRate, [secondCountry]: PovertyRate2 },
            { Budget: 'GDP PPP', [selectedCountry]: GDPperCapita / 1000, [secondCountry]: GDPperCapita2 / 1000 },
            { Budget: 'GDP', [selectedCountry]: GDP /10, [secondCountry]: GDP2/10 }
        ]
      
      }
  
    const keys = Object.keys(geographyData[0]).filter(d => d !== 'Budget')

    const totals = geographyData.reduce((ret, cur) => {
      const t = keys.reduce((dailyTotal, k) => {
        dailyTotal += +cur[k]
        return dailyTotal
      }, 0)
      ret.push(t)
      return ret
    }, [])
   
    return { keys, totals, geographyData }
  }

  render() {
    console.log(this.geographyData())
      const geographyData = this.geographyData()
    return (
      <div>
        <div className='Graphs2'>
          <Economy allData={geographyData} width={350} height={300} className='chart1'/>
          {/* <People people={people && people} people2={people2 && people2} country={country && country} country2={country2 && country2} width={350} height={250} className='chart2'/>
          <Population3 country={country && country} className='chart3'/>
          <JoinBars country={country && country} width={300} secondcountry={country2 && country2} className='chart5'/> */}
        </div>
      </div>
    )
  }

}

export default FactBook2