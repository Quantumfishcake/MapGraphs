import React, { Component } from "react"
import { csv } from 'd3-request';
import cities from './Data/simplemaps-worldcities.csv'
import SliderBar from './utilities/slider.js'
import tooltip from "wsdm-tooltip"
import News from './news/news.js'
import Weather from './weather.js'
import FactBook from './PieCharts/PieCharts.js'
import FactBook2 from './BarCharts/BarCharts.js'
import GeographyContainer from './geography/GeographyContainer.js'
import { updateCountry, updateCountryData, updateSecondCountry, updateSecondCountryData } from '../actions/country-actions.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { factBookAPI } from './utilities/factbookAPI.js';
import MapTest from './mapTest.js';

const wrapperStyles = {
  width: "100%",
  maxHeight: window.innerHeight + 'px',
  maxWidth: window.innerWidth  + 'px',
  margin: "auto",
}

class ZoomPan extends React.Component {
  constructor(props) {
    super(props)
    this.mapElement = React.createRef()
    this.state = {
      populationData: 1,
      center: [0, 20],
      zoom: 0.9,
      cities2: [],
      selectedCountry: '',
      secondCountry: '',
      selectedCountryId: '',
      lon: '',
      lat: '',
      isZoom: false,
      weather: false,
      graphs: false,
      selectedCountryData: {},
      secondCountryData: {},
    }
  }

  componentDidMount() {
    this.tip = tooltip()
    this.tip.create()
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.population !== this.state.population) {
      if(this.state.population > 100000){
        csv(cities, (data) => {
          var result = data.filter((x) => {
            return x['pop'] > this.state.population
          })
          var result2 = result.map((d) => {
            return { name: Object.values(d)[0], coordinates: [Object.values(d)[3], + Object.values(d)[2]], population: Object.values(d)[4] }
          })
          this.setState({ cities2: result2 })
        })
      }
      else {
        this.setState({ cities2: [] })
      }
    }
  }

  handleSliderChange = (value) => {
    this.setState({ population: value })
  }

  handleCitySelection = (evt) => {
    const cityId = evt.target.getAttribute("data-city")
    const city = this.state.cities2[cityId]
    this.setState({
      lon: city.coordinates[0],
      lat: city.coordinates[1],
      center: city.coordinates,
      zoom: 3,
    })
  }

  switchToData = () => {
    this.setState({ graphs: !this.state.graphs, weather: !this.state.weather })
  }
  switchToWeather = () => {
    this.setState({ graphs: 'hidden', weather: 'show' })
  }

  updateMap = (i) => {
    this.setState({
      lon: !i.geometry.coordinates[0][0].some(isNaN) ? i.geometry.coordinates[0][0][0] : i.geometry.coordinates[0][0][0][0],
      lat: !i.geometry.coordinates[0][0].some(isNaN) ? i.geometry.coordinates[0][0][1] : i.geometry.coordinates[0][0][0][1],
      weather: true,
    })
  }
  handleReset = () => {
    this.mapElement.current.handleReset2()
  }

  render() {
    const { populationData, selectedCountry, graphs, cities2, population, weather, lon, lat } = this.state
    console.log(this.props.secondCountry)
    return (
      <div>
        <div className={this.props.selectedCountry == '' ? 'MainContainer' : 'MainContainer2'} >
          <div className='MapContainer' style={{ display: selectedCountry == '' ? 'block' : 'inline-block' }}>
            <div style={wrapperStyles}>
              <MapTest ref={this.mapElement} cities2={cities2}  populationData={populationData}  updateMap={this.updateMap}/>
              <div>{population}</div> 
              <SliderBar updatePop={this.handleSliderChange} value={population} />
              {/* geography */}
              <div className='GeographyContainer' style={{
                 display: this.props.selectedCountryData == ''  ? 'none' : 'block'
                }}>
                {this.props.selectedCountryData && this.props.selectedCountryData.Economy && <GeographyContainer selectedCountry={this.props.selectedCountry} selectedCountryData={this.props.selectedCountryData} secondCountryData={this.props.secondCountryData} secondCountry={this.props.secondCountry} graphs={graphs}/>}
              </div>
            </div>

          </div>
          <div className='InfoContainer' style={{ display: weather == false ? 'none' : 'block' }}>
            <button onClick={this.switchToData}>
              Data
            </button>
            <div style={{
              display: weather == false  ? 'none' : 'block'
            }}>
              <Weather lon={lon} lat={lat} />
            </div>
            <div style={{
              display: weather == false  ? 'none' : 'block'
            }}>
              <News country={this.props.selectedCountry} />
            </div>
          </div>
          <div className='GraphContainer' >
            <button onClick={this.switchToWeather}>
              News
            </button>
            {this.props.selectedCountryData && this.props.selectedCountryData['People and Society'] && <FactBook selectedCountry={this.props.selectedCountry} secondcountry={this.props.secondCountry} selectedCountryData={this.props.selectedCountryData} secondCountryData={this.props.secondCountryData} graphs={graphs}/>}
            </div>
        </div>
         <div className='GraphContainer2'>
          {this.props.selectedCountryData && <FactBook2 selectedCountry={this.props.selectedCountry} secondCountry={this.props.secondCountry} selectedCountryData={this.props.selectedCountryData} secondCountryData={this.props.secondCountryData} graphs={graphs}/>}
        </div>
      </div>

    )   
  }
}

// const countrySelector = createSelector(
//   state => state.selectedCountry,
//   selectedCountry => selectedCountry,
// );
// const secondCountrySelector = createSelector(
//   state => state.secondCountry,
//   secondCountry => secondCountry,
// );
// const selectedCountryDataSelector = createSelector(
//   state => state.selectedCountryData,
//   selectedCountryData => selectedCountryData,
// );
// const secondCountryDataSelector = createSelector(
//   state => state.secondCountryData,
//   secondCountryData => secondCountryData,
// );

// const mapStateToProps = createSelector(
//   countrySelector,
//   secondCountrySelector,
//   selectedCountryDataSelector,
//   secondCountryDataSelector,
//   ( selectedCountry, secondCountry, selectedCountryData, secondCountryData) => ({
//     selectedCountry, secondCountry, selectedCountryData, secondCountryData
//   })
// );

const mapStateToProps = (state) => {
  return {
    selectedCountry: state.selectedCountry,
    secondCountry: state.secondCountry,
    selectedCountryData: state.selectedCountryData,
    secondCountryData: state.secondCountryData
  }
}

const mapActionsToProps = {
  onUpdateSelectedCountry: updateCountry,
  onUpdateCountryData: updateCountryData,
  onUpdateSecondCountryData: updateSecondCountryData,
  onUpdateSecondCountry: updateSecondCountry,
};

export default connect(mapStateToProps, mapActionsToProps)(ZoomPan)