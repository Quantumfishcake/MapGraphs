import React, { Component } from "react"
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker,
} from "react-simple-maps"
import tooltip from "wsdm-tooltip"
import { scaleLinear } from "d3-scale"
import chroma from "chroma-js"
import map from './Data/world-50m-with-population.json'
import { subregions } from './countryData/country_data.js'
import { income_group } from './countryData/country_data.js'
import { impCountries } from './countryData/country_data.js'
import { factBookAPI } from './utilities/factbookAPI.js';
import { updateCountry, updateCountryData, updateSecondCountry, updateSecondCountryData } from '../actions/country-actions.js';
import { connect } from 'react-redux';
import MapButtons from './utilities/mapButtons'

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

class MapTest extends Component {
  constructor(props) {
    super(props)
    this.state = {
      center: [0, 20],
      zoom: 0.9,
      lon: '',
      lat: '',
      isZoom: false,
      populationData: 1
    }
  }

  onUpdateCountry = (i) => {
    if (this.props.selectedCountry !== '') {
      this.props.onUpdateSecondCountry(i.properties.admin);
      factBookAPI(i.properties.admin).then(data => {
        this.props.onUpdateSecondCountryData(data);
      })
    } else {
      this.props.onUpdateSelectedCountry(i.properties.admin);
      this.props.updateMap(i)
      this.state.isZoom ? this.setState({
        lon: !i.geometry.coordinates[0][0].some(isNaN) ? i.geometry.coordinates[0][0][0] : i.geometry.coordinates[0][0][0][0],
        lat: !i.geometry.coordinates[0][0].some(isNaN) ? i.geometry.coordinates[0][0][1] : i.geometry.coordinates[0][0][0][1],
        center: !i.geometry.coordinates[0][0].some(isNaN) ? i.geometry.coordinates[0][0] : i.geometry.coordinates[0][0][0],
        zoom: 3,
      }) :
        this.setState({
          lon: !i.geometry.coordinates[0][0].some(isNaN) ? i.geometry.coordinates[0][0][0] : i.geometry.coordinates[0][0][0][0],
          lat: !i.geometry.coordinates[0][0].some(isNaN) ? i.geometry.coordinates[0][0][1] : i.geometry.coordinates[0][0][0][1],
        })
      factBookAPI(i.properties.admin).then(data => {
        this.props.onUpdateCountryData(data);
      })
    }

  }

  handleCitySelection = (evt) => {
    const cityId = evt.target.getAttribute("data-city")
    const city = this.props.cities2[cityId]
    this.setState({
      lon: city.coordinates[0],
      lat: city.coordinates[1],
      center: city.coordinates,
      zoom: 3,
    })
  }

  componentDidMount() {
    this.tip = tooltip()
    this.tip.create()
  }
  handleMouseMove = (geography, evt) => {
    const { populationData } = this.state
    const { admin, pop_est, subregion, income_grp } = geography.properties
    this.tip.show(`
          <div class="tooltip-inner">
             ${populationData == 1 ? admin
                                  : populationData == 2
                                  ? admin + ' ' + pop_est.toLocaleString()
                                  : populationData == 3
                                  ? admin + ' ' + subregion
                                  : admin + ' ' + income_grp}
          </div>
        `)
    this.tip.position({ pageX: evt.pageX, pageY: evt.pageY })
  }

  handleMouseLeave = () => {
    this.tip.hide()
  }
  handleMouseMove2 = (evt) => {
    const cityId = evt.target.getAttribute("data-city")
    const city = this.props.cities2[cityId].name
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

  handleReset = () => {
    this.setState({
      center: [0, 20],
      zoom: 0.9,
      populationData: 1
    })
  }

  switchMapStyle = (e) => {
    this.setState({ populationData: e.currentTarget.dataset.id })
  }

  render() {
    const { selectedCountry, secondCountry } = this.props
    const { zoom, center, populationData } = this.state
    return (
      <div>
        <MapButtons switchMapStyle={this.switchMapStyle} handleReset={this.handleReset} />
        <ComposableMap
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
                  onClick={this.onUpdateCountry}
                  onDoubleClick={this.resetCountry}

                  style={{
                    default: {
                      fill: populationData == 1 ? selectedCountry == geography.properties.admin ? 'red' : secondCountry == geography.properties.admin ? 'blue' : 'lightgrey' : populationData == 2 ? popScale(geography.properties.pop_est) : populationData == 4 ? colorScale2[income_group.indexOf(geography.properties.income_grp)] : colorScale[subregions.indexOf(geography.properties.subregion)],
                      fillOpacity: populationData == 1 ? (impCountries.includes(geography.properties.admin) ? 1 : 0.8) : 1,
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
                this.props.cities2.map((city, i) => (
                  <Marker key={i} marker={city}>
                    <circle
                      index={i}
                      cx={0}
                      cy={0}
                      r={this.props.zoom == 1 ? city.population / 1000000 : 10 / 10000000 * (city.population * 2) + 5}
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
        </ComposableMap>
      </div>
    )
  }

}

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

export default connect(mapStateToProps, mapActionsToProps)(MapTest)