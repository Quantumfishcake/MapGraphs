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
import tooltip from "wsdm-tooltip"
import { scaleLinear } from "d3-scale"
import chroma from "chroma-js"
import map from './Data/world-50m-with-population.json'
import { countries } from './countryData/country_data.js'
import { subregions } from './countryData/country_data.js'
import { income_group } from './countryData/country_data.js'
import { impCountries } from './countryData/country_data.js'
import { factBookAPI } from './utilities/factbookAPI.js';
import { updateCountry, updateCountryData, updateSecondCountry, updateSecondCountryData } from '../actions/country-actions.js';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

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

    onUpdateCountry = (i) => {
        if(this.props.selectedCountry !== ''){
        this.props.onUpdateSecondCountry(i.properties.admin);
          factBookAPI(i.properties.admin).then(data => {
            this.props.onUpdateSecondCountryData(data);
            // this.setState({
            //   secondCountryData: data,
            //   secondCountry: i.properties.admin
            // })
          })
    
        } else {
          this.props.onUpdateSelectedCountry(i.properties.admin);
          this.props.testFunc(i)
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
            // this.setState({
            //   lon: !i.geometry.coordinates[0][0].some(isNaN) ? i.geometry.coordinates[0][0][0] : i.geometry.coordinates[0][0][0][0],
            //   lat: !i.geometry.coordinates[0][0].some(isNaN) ? i.geometry.coordinates[0][0][1] : i.geometry.coordinates[0][0][0][1],
            //   selectedCountryData: data,
            //   weather: 'show',
            //   selectedCountry: i.properties.admin
            // })
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

      componentDidMount() {
        this.tip = tooltip()
        this.tip.create()
      }
      handleMouseMove = (geography, evt) => {
        this.tip.show(`
          <div class="tooltip-inner">
             ${this.props.populationData == 1 ? geography.properties.admin : this.props.populationData == 2 ? geography.properties.admin + ' ' + geography.properties.pop_est.toLocaleString() : this.state.this.props.populationData == 3 ? geography.properties.admin + ' ' + geography.properties.subregion : geography.properties.admin + ' ' + geography.properties.income_grp}
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

    render(){
        return(
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
                <ZoomableGroup center={this.props.center} zoom={this.props.zoom}>
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
                            fill: this.props.populationData == 1 ? this.props.selectedCountry == geography.properties.admin ? 'red' : this.props.secondCountry == geography.properties.admin ? 'blue' : 'lightgrey'  : this.props.populationData == 2 ? popScale(geography.properties.pop_est) : this.props.populationData == 4 ? colorScale2[income_group.indexOf(geography.properties.income_grp)] : colorScale[subregions.indexOf(geography.properties.subregion)],
                            fillOpacity: this.props.populationData == 1 ? (impCountries.includes(geography.properties.admin) ? 1 : 0.8) : 1 ,
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
  const selectedCountryData = createSelector(
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
    selectedCountryData,
    secondCountryDataSelector,
    ( selectedCountry, secondCountry, selectedCountryData, secondCountryData) => ({
      selectedCountry, secondCountry, selectedCountryData, secondCountryData
    })
  );;
  
  const mapActionsToProps = {
    onUpdateSelectedCountry: updateCountry,
    onUpdateCountryData: updateCountryData,
    onUpdateSecondCountryData: updateSecondCountryData,
    onUpdateSecondCountry: updateSecondCountry,
  };

export default connect(mapStateToProps, mapActionsToProps)(MapTest)