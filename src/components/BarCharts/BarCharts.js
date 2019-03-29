import React from 'react'
import axios from 'axios'
import Economy from './BarChartComponents/economy.js'
import People from './BarChartComponents/people.js'
import Population3 from './BarChartComponents/population3.js'
import JoinBars from './BarChartComponents/joinbars.js'
import { countries2 } from '../countryData/country_data.js' 
import BarGroup from './BarChartComponents/barGroup'

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

    let  data =  [
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
        
        data =  [
            { Budget: 'Revenue', [selectedCountry]: (countryRevenue) /10, [secondCountry]: (countryRevenue2) /10 },
            { Budget: 'Expenditure', [selectedCountry]: countryExpenditure /10, [secondCountry]: countryExpenditure2 /10 },
            { Budget: 'Unemployment', [selectedCountry]: unemploymentRate, [secondCountry]: unemploymentRate2 },
            { Budget: 'Debt', [selectedCountry]: Debt /10 , [secondCountry]: Debt2 /10 },
            { Budget: 'Poverty Rate', [selectedCountry]: PovertyRate, [secondCountry]: PovertyRate2 },
            { Budget: 'GDP PPP', [selectedCountry]: GDPperCapita / 1000, [secondCountry]: GDPperCapita2 / 1000 },
            { Budget: 'GDP', [selectedCountry]: GDP /10, [secondCountry]: GDP2/10 }
        ]
      
      }

    const keys = this.filterDataKeys(data, 'Budget')

    const totals = this.filterDataTotals(data, keys)

    return { keys, totals, data }
  }

  peopleData = () => {
    const { selectedCountryData, secondCountryData, selectedCountry, secondCountry} = this.state
    const lifeExpectancy = selectedCountryData['People and Society']['Life expectancy at birth'] && selectedCountryData['People and Society']['Life expectancy at birth']['total population'].text.split(' ')[0]
    const populationGrowthRate =selectedCountryData['People and Society']['Population growth rate'] && selectedCountryData['People and Society']['Population growth rate'].text.split(' ')[0].replace('%', '')
    const fertilityRate = selectedCountryData['People and Society']['Total fertility rate'] && selectedCountryData['People and Society']['Total fertility rate'].text.split(' ')[0]
    const obesity = selectedCountryData['People and Society']['Obesity - adult prevalence rate'] && selectedCountryData['People and Society']['Obesity - adult prevalence rate'].text.split(' ')[0].replace('%', '')
    const medianAge = selectedCountryData['People and Society']['Median age'] && selectedCountryData['People and Society']['Median age'].total.text.split(' ')[0]

    let data = [
      { People: 'Life Exp', [selectedCountry]: lifeExpectancy },
      { People: 'Pop Growth', [selectedCountry]: populationGrowthRate},
      { People: 'Fert Rate', [selectedCountry]: fertilityRate },
      { People: 'Obesity', [selectedCountry]: obesity },
      { People: 'Med Age', [selectedCountry]: medianAge}

    ]

    if(secondCountryData !== ''){
      const lifeExpectancy2 = secondCountryData['People and Society']['Life expectancy at birth'] && secondCountryData['People and Society']['Life expectancy at birth']['total population'].text.split(' ')[0]
      const populationGrowthRate2 = secondCountryData['People and Society']['Population growth rate'] && secondCountryData['People and Society']['Population growth rate'].text.split(' ')[0].replace('%', '')
      const fertilityRate2 = secondCountryData['People and Society']['Total fertility rate'] && secondCountryData['People and Society']['Total fertility rate'].text.split(' ')[0]
      const obesity2 = secondCountryData['People and Society']['Obesity - adult prevalence rate'] && secondCountryData['People and Society']['Obesity - adult prevalence rate'].text.split(' ')[0].replace('%', '')
      const medianAge2 = secondCountryData['People and Society']['Median age'] && secondCountryData['People and Society']['Median age'].total.text.split(' ')[0]
      
      data = [
        { People: 'Life Exp', [selectedCountry]: (lifeExpectancy), [secondCountry]: (lifeExpectancy2) },
        { People: 'Pop Growth', [selectedCountry]: populationGrowthRate, [secondCountry]: populationGrowthRate2 },
        { People: 'Fert Rate', [selectedCountry]: fertilityRate, [secondCountry]: fertilityRate2 },
        { People: 'Obesity', [selectedCountry]: obesity, [secondCountry]: obesity2 },
        { People: 'Med Age', [selectedCountry]: medianAge, [secondCountry]: medianAge2 }
      ]
    }
    const keys = this.filterDataKeys(data, 'People')

    const totals = this.filterDataTotals(data, keys)

    return { keys, totals, data }
  }

  filterDataKeys = (data, type) => {
    return Object.keys(data[0]).filter(d => d !== type)
  }

  filterDataTotals = (data, keys) => {
    return data.reduce((ret, cur) => {
      const t = keys.reduce((dailyTotal, k) => {
        dailyTotal += +cur[k]
        return dailyTotal
      }, 0)
      ret.push(t)
      return ret
    }, [])
  }

  render() {
      const geographyData = this.geographyData()
      const peopleData = this.peopleData()
      console.log(geographyData, peopleData)
    return (
      <div>
        <div className='Graphs2'>
         
          <Economy allData={geographyData} width={350} height={300} className='chart1' scale={1} name='Budget'/>
          <Economy allData={peopleData} width={350} height={300} className='chart2' scale={2} name='People'/>
          {/* <People people={people && people} people2={people2 && people2} country={country && country} country2={country2 && country2} width={350} height={250} className='chart2'/>
          <Population3 country={country && country} className='chart3'/>
          <JoinBars country={country && country} width={300} secondcountry={country2 && country2} className='chart5'/> */}
        </div>
      </div>
    )
  }

}

export default FactBook2