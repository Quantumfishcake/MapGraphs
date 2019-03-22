import React from 'react'
import Geography from './geography.js' 

class GeographyContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log(this.props.selectedCountryData,  this.props.selectedCountry, this.props.secondCountry, this.props.secondCountryData)
    let geo, geo2
    const { selectedCountry, selectedCountryData, secondCountry, secondCountryData} = this.props

    if (secondCountryData == ''){
      geo  = <Geography data={selectedCountryData} country={selectedCountry}/> 
    } else {
      geo = <Geography data={selectedCountryData} country={selectedCountry}/>
      geo2 = <Geography data={secondCountryData} country={secondCountry}/>
    }
    return (
      <div>
        <div >
          {geo}
          {geo2}
        </div>
      </div>
    )
  }
}

export default GeographyContainer