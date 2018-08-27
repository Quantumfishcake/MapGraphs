import React from 'react';
import { Bar } from '@vx/shape';
import { Group } from '@vx/group';
import { GradientTealBlue } from '@vx/gradient';
import { letterFrequency } from '@vx/mock-data';
import { scaleBand, scaleLinear } from '@vx/scale';
import { extent, max } from 'd3-array';
import { csv } from 'd3-request';
import population from './population1.csv'
import { AxisLeft, AxisBottom } from '@vx/axis';
import { cityTemperature } from '@vx/mock-data';
import _ from 'lodash'



// accessors


class BarPop extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            data2: [],
            dataJoined: [],
        };
    }

    componentWillReceiveProps = (newProps) => {
        csv(population, (data) => {
            var result = data.filter((x) => {
                return x['Country Name'] == newProps.country
            })
          

            if (result != '') {
                var result2 = Object.keys(result[0]).map(function (e) {
                    return { year: e, population: result[0][e] }
                })
                var result3 = result2.slice(0, -5)
              
    
                this.setState({ 
                    data: result3 ,
        
                })
            }
        });

    }

    round = (value, precision) => {
        var multiplier = Math.pow(10, precision || 0);
        return Math.round(value * multiplier) / multiplier;
    }


    render() {
        const data = this.state.data
        const width = 400
        const height = 300
        const x = d => d.year;
        const y = d => +d.population;
        if (width < 10) return null;

        // bounds
        const xMax = width - 75
        const yMax = height - 120;

        // scales
        const xScale = scaleBand({
            rangeRound: [0, xMax],
            domain: data.map(x),
            padding: 0.4,
        });
        const yScale = scaleLinear({
            rangeRound: [yMax, 0],
            domain: [0, max(data, y)],
        });

        return (
            <svg width={width} height={height}>
                <GradientTealBlue id="teal" />
                <rect
                    x={0}
                    y={0}
                    width={width}
                    height={height}
                    fill={`white`}
                    rx={14}
                />
                <Group top={40}>
                    {data.map((d, i) => {
                        const barHeight = yMax - yScale(y(d));
                        return (
                            <Group key={`bar-${x(d)}`}>
                                <Bar
                                    width={xScale.bandwidth()}
                                    height={barHeight}
                                    x={xScale(x(d))}
                                    y={yMax - barHeight}
                                    fill="rgba(23, 233, 217, .5)"
                                    data={{ x: x(d), y: y(d) }}
                                    onClick={data => event => {
                                        alert(`clicked: ${JSON.stringify(data)}`)
                                    }}
                                />
                                <AxisLeft
                                    scale={yScale}
                                    top={0}
                                    left={0}
                                    label={'Population'}
                                    stroke={'#1b1a1e'}
                                    tickTextFill={'#1b1a1e'}
                                />

                                <AxisBottom
                                    scale={xScale}
                                    top={yMax}
                                    left={0}
                                    label={'Year'}
                                    stroke={'#1b1a1e'}
                                    tickTextFill={'#1b1a1e'}
                                />
                            </Group>
                        );
                    })}
                </Group>
            </svg>
        );
    }
}
export default BarPop