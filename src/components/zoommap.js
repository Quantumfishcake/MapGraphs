import React, { Component } from "react"
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker,
} from "react-simple-maps"
import { csv } from 'd3-request';
import cities from './Data/simplemaps-worldcities.csv'
import SliderBar from './utilities/slider.js'
import tooltip from "wsdm-tooltip"
import { scaleLinear } from "d3-scale"
import chroma from "chroma-js"
import News from './news/news.js'
import Weather from './weather.js'
import FactBook from './PieCharts/PieCharts.js'
import FactBook2 from './BarCharts/BarCharts.js'
import GeographyContainer from './geography/GeographyContainer.js'
import map from './Data/world-50m-with-population.json'
import { income_group, impCountries, subregions, countries } from './countryData/country_data.js'
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

const colorScale = chroma
  .scale([
    '#FF6E40',
    'FFD740',
    '#00B8D4',
  ])
  .mode('lch')
  .colors(24)

const colorScale2 = chroma
  .scale([
    '#FF6E40',
    'FFD740',
    '#00B8D4',
  ])
  .mode('lch')
  .colors(6)

const popScale = scaleLinear()
  .domain([0, 100000000, 1400000000])
  .range(["#CFD8DC", "#607D8B", "#37474F"])

class ZoomPan extends Component {
  constructor(props) {
    super(props)
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

  switchMapStyle = (e) => {
    this.setState({ populationData: e.currentTarget.dataset.id})
  }

  componentDidMount() {
    this.tip = tooltip()
    this.tip.create()
  }
  handleMouseMove = (geography, evt) => {
    this.tip.show(`
      <div class="tooltip-inner">
         ${this.state.populationData == 1 ? geography.properties.admin : this.state.populationData == 2 ? geography.properties.admin + ' ' + geography.properties.pop_est.toLocaleString() : this.state.populationData == 3 ? geography.properties.admin + ' ' + geography.properties.subregion : geography.properties.admin + ' ' + geography.properties.income_grp}
      </div>
    `)
    this.tip.position({ pageX: evt.pageX, pageY: evt.pageY })
  }

  handleMouseLeave = () => {
    this.tip.hide()
  }
  handleMouseMove2 = (evt) => {
    const cityId = evt.target.getAttribute("data-city")
    const city = this.state.cities2[cityId].name
    this.tip.show(`
      <div class="tooltip-inner">
      ${city}
      </div>
    `)
    this.tip.position({ pageX: evt.pageX, pageY: evt.pageY })
  }
  handleMouseLeave2 = () => {
    this.tip.hide()
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

  convertIdtoCountry = (id) => {
    return countries.filter(x => x['country-code'] == id)
  }

  handleSliderChange = (value) => {
    this.setState({ population: value })
  }

  onUpdateSelectedCountry = (i) => {
    if(this.state.selectedCountry){
      this.props.onUpdateSecondCountry(i.properties.admin);
      factBookAPI(i.properties.admin).then(data => {
        this.props.onUpdateSecondCountryData(data);
        this.setState({
          secondCountryData: data,
          secondCountry: i.properties.admin
        })
      })

    } else {
      this.props.onUpdateSelectedCountry(i.properties.admin);
      
      // this.state.isZoom ? this.setState({
      //   lon: !i.geometry.coordinates[0][0].some(isNaN) ? i.geometry.coordinates[0][0][0] : i.geometry.coordinates[0][0][0][0],
      //   lat: !i.geometry.coordinates[0][0].some(isNaN) ? i.geometry.coordinates[0][0][1] : i.geometry.coordinates[0][0][0][1],
      //   selectedCountry: i.properties.admin,
      //   center: !i.geometry.coordinates[0][0].some(isNaN) ? i.geometry.coordinates[0][0] : i.geometry.coordinates[0][0][0],
      //   zoom: 3,
      // }) :
      //   this.setState({
      //     lon: !i.geometry.coordinates[0][0].some(isNaN) ? i.geometry.coordinates[0][0][0] : i.geometry.coordinates[0][0][0][0],
      //     lat: !i.geometry.coordinates[0][0].some(isNaN) ? i.geometry.coordinates[0][0][1] : i.geometry.coordinates[0][0][0][1],
      //     selectedCountry: i.properties.admin,
      //     weather: 'show'
      //   })
      factBookAPI(i.properties.admin).then(data => {
        this.props.onUpdateCountryData(data);
        this.setState({
          lon: !i.geometry.coordinates[0][0].some(isNaN) ? i.geometry.coordinates[0][0][0] : i.geometry.coordinates[0][0][0][0],
          lat: !i.geometry.coordinates[0][0].some(isNaN) ? i.geometry.coordinates[0][0][1] : i.geometry.coordinates[0][0][0][1],
          selectedCountryData: data,
          weather: 'show',
          selectedCountry: i.properties.admin
        })
      })
    }
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

  handleReset = () => {
    this.setState({
      center: [0, 20],
      zoom: 0.9,
      selectedCountry: '',
      secondCountry: '',
      graphs: 'hidden'
    })
  }

  resetCountry = () => {
    this.setState({
      selectedCountry: '',
      secondCountry: '',
      graphs: 'hidden'
    })
  }

  updateMapTestData = (i) => {
    this.setState({
      lon: !i.geometry.coordinates[0][0].some(isNaN) ? i.geometry.coordinates[0][0][0] : i.geometry.coordinates[0][0][0][0],
      lat: !i.geometry.coordinates[0][0].some(isNaN) ? i.geometry.coordinates[0][0][1] : i.geometry.coordinates[0][0][0][1],
      weather: true,
    })
    console.log(i)
  }

  render() {
    const { populationData, selectedCountry, selectedCountryData, secondCountry, secondCountryData, graphs, center, zoom, cities2, population, weather, lon, lat } = this.state
    console.log(this.props.secondCountryData)
    return (
      <div>
        <div className={selectedCountry == '' ? 'MainContainer' : 'MainContainer2'} >
          <div className='MapContainer' style={{ display: selectedCountry == '' ? 'block' : 'inline-block' }}>
            <div style={wrapperStyles}>
              <div className='mapButtons'>
                <button data-id="2" onClick={this.switchMapStyle}>
                  Population data
                </button>
                <button data-id="3" onClick={this.switchMapStyle}>
                  World subregions
                </button>
                <button data-id="1" onClick={this.switchMapStyle}>
                  Standard
                </button>
                <button data-id="4" onClick={this.switchMapStyle}>
                  Income
                </button>
                <button onClick={this.handleReset}>
                  Reset
                </button>
              
              </div>
              <MapTest cities2={this.state.cities2} center={this.state.center} populationData={this.state.populationData} zoom={this.state.zoom} testFunc={this.updateMapTestData}/>
              {/* <ComposableMap
                projectionConfig={{
                  scale: 205,
                }}
                width={900}
                height={500}
                style={{
                  width: "90%",
                  height: "auto",
                }}
              >
                <ZoomableGroup center={center} zoom={zoom}>
                  <Geographies geography={map} disableOptimization>
                    {(geographies, projection) => geographies.map((geography, i) => geography.id !== "ATA" && (
                      <Geography
                        key={i}
                        geography={geography}
                        projection={projection}
                        onMouseMove={this.handleMouseMove}
                        onMouseLeave={this.handleMouseLeave}
                        onClick={this.onUpdateSelectedCountry}
                        onDoubleClick={this.resetCountry}

                        style={{
                          default: {
                            fill: populationData == 1 ? selectedCountry == geography.properties.admin ? 'red' : secondCountry == geography.properties.admin ? 'blue' : 'lightgrey'  : populationData == 2 ? popScale(geography.properties.pop_est) : populationData == 4 ? colorScale2[income_group.indexOf(geography.properties.income_grp)] : colorScale[subregions.indexOf(geography.properties.subregion)],
                            fillOpacity: populationData == 1 ? (impCountries.includes(geography.properties.admin) ? 1 : 0.8) : 1 ,
                            stroke: "#607D8B",
                            strokeWidth: 0.75,
                            outline: "none",
                          },
                          hover: {
                            fill: "yellow",
                            stroke: "#607D8B",
                            strokeWidth: 0.75,
                            outline: "none",
                          },
                          pressed: {
                            fill: "darkgrey",
                            stroke: "#607D8B",
                            strokeWidth: 0.75,
                            outline: "none",
                          },
                        }}
                      />
                    ))}
                  </Geographies>
                  <Markers>
                    {
                      cities2.map((city, i) => (
                        <Marker key={i} marker={city}>
                          <circle
                            index={i}
                            cx={0}
                            cy={0}
                            r={zoom == 1 ? city.population / 1000000 : 10 / 10000000 * (city.population * 2) + 5}
                            onClick={this.handleCitySelection}
                            onMouseMove={this.handleMouseMove2}
                            onMouseLeave={this.handleMouseLeave2}
                            data-city={i}
                            style={{
                              default: { fill: "#666" },
                              hover: { fill: "#999" },
                              pressed: { fill: "#000" },
                            }}
                            stroke="green"
                            fill='rgba(201,152,255, 0.5)'
                          />
                        </Marker>
                      ))
                    }
                  </Markers>
                </ZoomableGroup>
              </ComposableMap> */}
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
          {/* <div className='GraphContainer' style={{ display: graphs == 'hidden' ? 'none' : 'block' }}>
            <button onClick={this.switchToWeather}>
              News
            </button>
            <FactBook country={selectedCountry} secondcountry={secondCountry} graphs={graphs}/>
          </div> */}
        </div>
         {/* <div className='GraphContainer2' style={{ display: graphs == 'hidden' ? 'none' : 'block' }}>
          <FactBook2 country={selectedCountry} secondcountry={secondCountry} graphs={graphs}/>
        </div> */}
      </div>

    )
  }
}

const countrySelector = createSelector(
  state => state.selectedCountry,
  selectedCountry => selectedCountry,
);
const secondCountrySelector = createSelector(
  state => state.secondCountry,
  secondCountry => secondCountry,
);
const selectedCountryDataSelector = createSelector(
  state => state.selectedCountryData,
  selectedCountryData => selectedCountryData,
);
const secondCountryDataSelector = createSelector(
  state => state.secondCountryData,
  secondCountryData => secondCountryData,
);

const mapStateToProps = createSelector(
  countrySelector,
  secondCountrySelector,
  selectedCountryDataSelector,
  secondCountryDataSelector,
  ( selectedCountry, secondCountry, selectedCountryData, secondCountryData) => ({
    selectedCountry, secondCountry, selectedCountryData, secondCountryData
  })
);

const mapActionsToProps = {
  onUpdateSelectedCountry: updateCountry,
  onUpdateCountryData: updateCountryData,
  onUpdateSecondCountryData: updateSecondCountryData,
  onUpdateSecondCountry: updateSecondCountry,
};

export default connect(mapStateToProps, mapActionsToProps)(ZoomPan)