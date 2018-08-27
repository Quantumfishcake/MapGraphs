import React from 'react';
import { Bar, BarGroup } from '@vx/shape';
import { Group } from '@vx/group';
import { GradientTealBlue } from '@vx/gradient';
import { letterFrequency } from '@vx/mock-data';
import { scaleBand, scaleLinear, scaleOrdinal } from '@vx/scale';
import { extent, max } from 'd3-array';
import { csv } from 'd3-request';
import population from './population1.csv'
import { AxisLeft, AxisBottom } from '@vx/axis';
import { cityTemperature } from '@vx/mock-data';
import _ from 'lodash'



// accessors
const height = 300
const  width = 400

class JoinBars extends React.Component {
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
            var resultHover = data.filter((x) => {
                return x['Country Name'] == newProps.secondcountry
            })

            if (result != '') {
                var result2 = Object.keys(result[0]).map(function (e) {
                    return { year: e, population: result[0][e] }
                })
                var result3 = result2.slice(0, -5)
                var resultHover2 = Object.keys(resultHover[0]).map(function (e) {
                    return { year: e, population: resultHover[0][e] }
                })
                var resultHover3 = resultHover2.slice(0, -5)
                var resultJoined = _.zipWith(result3, resultHover3, function (a, b) {
                    return { year: a.year, countryA: a.population, countryB: b.population }
                })
                this.setState({
                    data: result3,
                    data2: resultHover3,
                    dataJoined: resultJoined
                })
            }
        });

    }

    render() {
        const x0 = d => d.year;
      
        const margin = 0
        const data = this.state.dataJoined
        const keys = ['countryA', 'countryB']
        
        // bounds
        const xMax = width;
        const yMax = height;

        // // scales
        const x0Scale = scaleBand({
            range: [0, xMax],
            domain: data.map(x0),
            padding: 0,
        });
        const x1Scale = scaleBand({
            range: [0, x0Scale.bandwidth()],
            domain: keys,
            padding: 0
        });
        const yScale = scaleLinear({
            rangeRound: [yMax, 0],
            domain: [0, max(data, (d) => {
                return max(keys, (key) => d[key] - 100)
            })],
        });
        const zScale = scaleOrdinal({
            domain: keys,
            range: ['#aeeef8', '#e5fd3d', '#9caff6']
        })

        return (
            <svg width={width} height={height}>
            {console.log(data)}
            {console.log(keys)}
                <rect
                    x={0}
                    y={0}
                    width={width}
                    height={height}
                    fill='#612efb'
                    rx={14}
                />
                <BarGroup
                    top={margin.top}
                    data={data}
                    keys={keys}
                    height={yMax}
                    x0={x0}
                    x0Scale={x0Scale}
                    x1Scale={x1Scale}
                    yScale={yScale}
                    zScale={zScale}
                    rx={4}
                    onClick={data => event => {
                        alert(`clicked: ${JSON.stringify(data)}`)
                    }}
                />
                <AxisBottom
                    scale={x0Scale}
                    top={yMax + margin.top}
                    stroke='#e5fd3d'
                    tickStroke='#e5fd3d'
                    hideAxisLine
                    tickLabelProps={(value, index) => ({
                        fill: '#e5fd3d',
                        fontSize: 11,
                        textAnchor: 'middle',
                    })}
                />
            </svg>
        );
    }
}
export default JoinBars