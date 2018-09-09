import React from 'react';
import { Bar, BarGroup } from '@vx/shape';
import { scaleBand, scaleLinear, scaleOrdinal } from '@vx/scale';
import { extent, max } from 'd3-array';
import { csv } from 'd3-request';
import population from './population1.csv'
import { AxisLeft, AxisBottom } from '@vx/axis';
import _ from 'lodash'



// accessors
const height = 200
const width = 350

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
                return x['Country Name'] == this.convertRussia(newProps.country)
            })
            var resultHover = data.filter((x) => {
                return x['Country Name'] == this.convertRussia(newProps.secondcountry)
            })

            if (result != '' && (resultHover != undefined || null) || '') {
                var result2 = Object.keys(result[0]).map(function (e) {
                    return { year: e, population: result[0][e] }
                })
                
                var result3 = result2.slice(0, -5)
                var result4 = this.getFifthYears(result3)
                var resultHover2 = resultHover[0] && Object.keys(resultHover[0]).map(function (e) {
                    return { year: e, population: resultHover[0][e] }
                })
                console.log(resultHover2)
                if (resultHover2 != undefined){
                var resultHover3 =  resultHover2.slice(0, -5)
                var resultHover4 = this.getFifthYears(resultHover3)
                var resultJoined = _.zipWith(result4, resultHover4, function (a, b) {
                    return { year: a.year, countryA: a.population, countryB: b.population }
                })
                this.setState({
                    data: result3,
                    data2: resultHover3,
                    dataJoined: resultJoined
                })
            }}
        });

    }
    getFifthYears = (arr) => {
        return arr.filter((x) => {
            return x['year'] % 3 == 0
        })
    }

    convertRussia = (country) => {
        return country == 'Russia' ? 'Russian Federation' : country
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
                return max(keys, (key) => d[key] - 10)
            })],
        });
        const zScale = scaleOrdinal({
            domain: keys,
            range: ['#c998ff', '#6c5efb']
        })

        return (
            <svg width={width} height={height}>
                <rect
                    x={0}
                    y={0}
                    width={width}
                    height={height}
                    fill='#282b30'
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
                    rx={0}

                />
                <AxisBottom
                    scale={x0Scale}
                    top={yMax + margin.top - 100}
                    stroke='#a44afe'
                    tickStroke='#a44afe'
                    tickLabelProps={(value, index) => ({
                        fill: 'white',
                        fontSize: 11,
                        textAnchor: 'middle',
                        transform: 'rotate(90 ' + x0Scale(value) + ',0)'
                    })}
                />
            </svg>
        );
    }
}
export default JoinBars