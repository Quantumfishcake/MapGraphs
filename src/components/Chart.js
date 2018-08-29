import React from 'react';
import '../App.css';
import { Group } from '@vx/group';
import { scaleTime, scaleLinear } from '@vx/scale';
import { AreaClosed } from '@vx/shape';
import { AxisLeft, AxisBottom } from '@vx/axis';
import { LinearGradient } from '@vx/gradient';
import { extent, max } from 'd3-array';
import Slider from 'react-rangeslider'
import { csvParse } from 'd3-dsv';
import {csv} from 'd3-fetch';
import population from './population1.csv'
import 'react-rangeslider/lib/index.css'

class Chart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {},
      country: 'Australia',
      age: 18
    };
    this._handleChange = this._handleChange.bind(this)
    this._handleSubmit = this._handleSubmit.bind(this)
  }

  componentWillReceiveProps = (newProps) =>{
    
    fetch(`http://api.population.io/1.0/population/${newProps.country}/18/`)
      .then(res => {
        return res.json();
      })
      .then(json => {
        console.log(json)
        this.setState({
          data: json
        });
        console.log(this.state.data)
      });

  }
  _handleChange(event) {
    this.setState({ country: event.target.value })
    console.log(this.state)
  }
 
  handleChange2 = value => {
    this.setState({
      age: value
    })
    fetch(`http://api.population.io/1.0/population/${this.state.country}/${this.state.age}/`)
      .then(res => {
        return res.json();
      })
      .then(json => {
        console.log(json)
        this.setState({
          data: json
        });
        console.log(this.state.data)
      });
  };
  handleChangeStart = () => {
    console.log('Change event started')
  };
  handleChangeComplete = () => {
    console.log('Change event completed')
  };

  _handleSubmit(event ){
    event.preventDefault();
    console.log(this.state)
    fetch(`http://api.population.io/1.0/population/${this.state.country}/${this.state.age}/`)
      .then(res => {
        return res.json();
      })
      .then(json => {
        this.setState({
          data: json
        });
      });
  }
  

  render() {
    const data = this.state.data;

    const width = 750;
    const height = 400;

    const x = d => d.year;
    const y = d => d.males + d.females;

    // Bounds
    const margin = {
      top: 60,
      bottom: 60,
      left: 80,
      right: 80,
    };
    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;

    const xScale = scaleLinear({
      range: [0, xMax],
      domain: extent(data, x)
    });
    const yScale = scaleLinear({
      range: [yMax, 0],
      domain: [0, max(data, y)],
    });

      
  
    return (
      <div>
        <form onSubmit={this._handleSubmit}>
          <label>
            Country:
            <input type='text' onChange={this._handleChange} value={this.state.country} />
          </label>
          <div className='slider'>
        <Slider
          min={1}
          max={100}
          step={1}
          value={this.state.age}
          onChangeStart={this.handleChangeStart}
          onChange={this.handleChange2}
          onChangeComplete={this.handleChangeComplete}
        />
        <div className='sliderdiv'>{this.state.age}</div>
      </div>
 
          <button type="submit" >Go</button>
        </form>
        <svg width={width} height={height}>
          <LinearGradient
            from='red'
            to='blue'
            id='gradient'
          />

          <Group top={margin.top} left={margin.left}>

            <AreaClosed
              data={data}
              xScale={xScale}
              yScale={yScale}
              x={x}
              y={y}
              fill={"url(#gradient)"}
              stroke={"black"}
            />

            <AxisLeft
              scale={yScale}
              top={0}
              left={0}
              label={''}
              stroke={'#1b1a1e'}
              tickTextFill={'#1b1a1e'}
            />

            <AxisBottom
              scale={xScale}
              top={yMax}
              label={'Year'}
              stroke={'#1b1a1e'}
              tickTextFill={'#1b1a1e'}
            />

          </Group>
        </svg>
      </div>
    )
  }

}

export default Chart