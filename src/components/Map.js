import React from 'react';
import { GradientTealBlue, RadialGradient } from '@vx/gradient';
import { Mercator } from '@vx/geo';
import * as topojson from 'topojson-client';
import topology from './world-topo.json';
import News from './news.js'
import Chart from './Chart.js'
import Population from './population2.js'
import Population22 from './population.js'

class Map extends React.Component {
constructor() {
    super()
    this.state = {
        country: 'us',
        hoverCountry: '',
        selectedCountry: ''
    }
}
  
  render(){
    const world = topojson.feature(topology, topology.objects.units);

    const impCountries = ['Argentina', 'Australia', 'Austria', 'Belgium', 'Brazil', 'Bulgaria', 'Canada', 'China', 'Colombia', 'Cuba', 'Czech Republic', 'Egypt', 'France', 'Germany', 'Greece', 'Hong Kong', 'Hungary', 'India', 'Indonesia', 'Ireland', 'Israel', 'Italy', 'Japan', 'Latvia', 'Lithuania', 'Malaysia', 'Mexico', 'Morocco', 'Netherlands', 'New Zealand', 'Nigeria', 'Norway', 'Philippines', 'Poland', 'Portugal', 'Romania', 'Russia', 'Saudi Arabia', 'Serbia', 'Singapore', 'Slovakia', 'Slovenia', 'South Africa', 'South Korea', 'Sweden', 'Switzerland', 'Taiwan', 'Thailand', 'Turkey', 'UAE', 'Ukraine', 'United Kingdom', 'United States', 'Venezuela']
    const width = 1500
    const height = 800
    return (
        <div className='mapContainer'>
      <svg width={width} height={height}>
        <RadialGradient
          id="geo_mercator_radial"
          from="#55bdd5"
          to="#4f3681"
          r={'80%'}
        />
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill={'lightblue'}
          rx={14}
        />
        <Mercator
          data={world.features}
          scale={width / 630 * 100}
          translate={[width / 2, height / 2 + 50]}
          fill={d => this.state.selectedCountry == d.properties.name ? 'green' : this.state.hoverCountry == d.properties.name ? 'red' :'darkgrey'}
          // fillOpacity={d => 1 / (Math.random() * d.index) }
          fillOpacity={d => impCountries.includes(d.properties.name) ? 1 : 0.1 }
          stroke={() => 'white'}
          onClick={data => event => {
            {this.setState({country: data.properties.name})}
            {this.setState({selectedCountry: data.properties.name})}
            // alert(`Clicked: ${data.properties.name} (${data.id})`);
            console.log('map country state', this.state.country)
          }}
          onMouseOver = {data => event => {
              this.setState({hoverCountry: data.properties.name})
          }}
        />
      </svg>
      <News country={this.state.country}/>
      <Population country={this.state.selectedCountry}/>
      </div>
    )
  };
  
};
export default Map