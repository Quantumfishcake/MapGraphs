import React from 'react';
import '../App.css';
import { Group } from '@vx/group';
import { scaleTime, scaleLinear } from '@vx/scale';
import { AreaClosed } from '@vx/shape';
import { AxisLeft, AxisBottom } from '@vx/axis';
import { LinearGradient } from '@vx/gradient';
import { extent, max } from 'd3-array';
import Slider from 'react-rangeslider'

import 'react-rangeslider/lib/index.css'
import { csv } from 'd3-request';
import population from './population1.csv'



class Population extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            country: 'Australia',
            age: 18
        };

    }
    componentWillReceiveProps = (newProps) => {
     csv(population, (data) => {
                 var result = data.filter((x) => {
                     return x['Country Name'] == newProps.country
                 })
                 console.log(result)
                 if (result != '') {
                 var result2 = Object.keys(result[0]).map(function (e) {
                     return { year: e, population: result[0][e] }
                 })
                 var result3 = result2.slice(0, -5)
                 this.setState({data: result3})
                }
             });
     
         }
    


    render() {
        const data = this.state.data

        const width = 750;
        const height = 400;

        const x = d => d.year;
        const y = d => d.population;

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
            <div className='populationcontainer'>
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

export default Population