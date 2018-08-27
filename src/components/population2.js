import React from 'react';
import '../App.css';
import { Group } from '@vx/group';
import { scaleTime, scaleLinear } from '@vx/scale';
import { AreaClosed, Bar, Line } from '@vx/shape';
import { AxisLeft, AxisBottom } from '@vx/axis';
import { LinearGradient } from '@vx/gradient';
import { extent, max, bisector } from 'd3-array';
import Slider from 'react-rangeslider'
import { localPoint } from '@vx/event';
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
        this.handleTooltip = this.handleTooltip.bind(this);
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
                this.setState({ data: result3 })
            }
        });

    }


    handleTooltip({ event, data, xStock, xScale, yScale }) {
        const { showTooltip } = this.props;
        const { x } = localPoint(event);
        const x0 = xScale.invert(x);
        const bisectDate = bisector(d => d.year).left;
        const index = bisectDate(data, x0, 1);
        const d0 = data[index - 1];
        const d1 = data[index];
        let d = d0;
        if (d1 && d1.date) {
            d = x0 - xStock(d0.date) > xStock(d1.date) - x0 ? d1 : d0;
        }
        showTooltip({
            tooltipData: d,
            tooltipLeft: x,
            tooltipTop: yScale(d.population),
        });
    }


    render() {
        const data = this.state.data
        const bisectDate = bisector(d => d.year).left;
        const width = 400;
        const height = 300;
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
                        <Bar
                            x={0}
                            y={0}
                            width={width}
                            height={height}
                            fill="transparent"
                            rx={14}
                            data={data}
                            onTouchStart={data => event =>
                                this.handleTooltip({
                                    event,
                                    data,
                                    x,
                                    xScale,
                                    yScale,
                                })}
                            onTouchMove={data => event =>
                                this.handleTooltip({
                                    event,
                                    data,
                                    x,
                                    xScale,
                                    yScale,
                                })}
                            onMouseMove={data => event =>
                                this.handleTooltip({
                                    event,
                                    data,
                                    x,
                                    xScale,
                                    yScale,
                                })}
                        />
                    </Group>
                </svg>
            </div>
        )
    }

}

export default Population