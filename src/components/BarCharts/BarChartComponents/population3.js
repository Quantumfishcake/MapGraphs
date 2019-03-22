import React from 'react'
import { AreaClosed, Line, Bar } from '@vx/shape'
import { curveMonotoneX } from '@vx/curve'
import { GridRows, GridColumns } from '@vx/grid'
import { scaleTime, scaleLinear } from '@vx/scale'
import { withTooltip, Tooltip } from '@vx/tooltip'
import { localPoint } from '@vx/event'
import { extent, max, bisector, min } from 'd3-array'
import { csv } from 'd3-request';
import population from '../../Data/population1.csv'
import { AxisLeft, AxisBottom } from '@vx/axis';

// accessors
const xStock = d => d.year
const yStock = d => d.population
const bisectDate = bisector(d => d.year).left

class Population3 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
    this.handleTooltip = this.handleTooltip.bind(this)
  }

  componentWillReceiveProps = (newProps) => {
    if(newProps.country != this.state.country) {
    fetch(`https://cors-anywhere.herokuapp.com/http://api.population.io/1.0/population/${this.convertRussia(newProps.country)}/60/`)
    .then(res => {
      return res.json()
    })
    .then(json => {
      const result2 = json.map((x) => {
        return { year: x.year, population: x.total }
      })
      this.setState({
        data: result2,
        country: newProps.country
      });
    });
  } 
}
  convertRussia = (country) => {
    if(country == 'Russia'){
      return 'Russian Federation'
    }
    else if(country == 'United States of America'){
      return 'United States'
    }
    else {
      return country
    }
  }

  handleTooltip({ event, data, xStock, xScale, yScale }) {
    const { showTooltip } = this.props
    const { x } = localPoint(event)
    const x0 = xScale.invert(x)
    const index = bisectDate(data, x0, 1)
    const d0 = data[index - 1]
    const d1 = data[index]
    let d = d0
    if (d1 && d1.year) {
      d = x0 - xStock(d0.year) > xStock(d1.year) - x0 ? d1 : d0
    }
    showTooltip({
      tooltipData: d,
      tooltipLeft: x,
      tooltipTop: yScale(d.population)
    })
  }
  render() {
    const data = this.state.data
    const {
      width = 350,
      height = 220,
      margin = {
        top: 10,
        left: 10,
        right: 10,
        bottom: 10
      },
      showTooltip,
      hideTooltip,
      tooltipData,
      tooltipTop,
      tooltipLeft,
      events
    } = this.props
    if (width < 10) return null

    // bounds
    const xMax = width - margin.left - margin.right
    const yMax = height - margin.top - margin.bottom

    // scales
    const xScale = scaleLinear({
      range: [0, xMax],
      domain: extent(data, xStock)
    })
    const yScale = scaleLinear({
      range: [yMax, 0],
      domain: [min(data, yStock) / 2, max(data, yStock) + yMax],
    });
    const yScale2 = scaleLinear({
      range: [height, 0],
      domain: [min(data, yStock) / 2, max(data, yStock) + yMax],
    });

    return (
      <div>
        <svg ref={s => (this.svg = s)} width={width} height={height}>
          <rect
            x={0}
            y={0}
            width={1000}
            height={height}
            fill='#282b30'
            rx={14}
          />
          <defs>
            <linearGradient
              id='gradient'
              x1='0%'
              y1='0%'
              x2='0%'
              y2='100%'
            >
              <stop
                offset='0%'
                stopColor='#6c5efb'
                stopOpacity={1}
              />
              <stop
                offset='100%'
                stopColor='#c998ff'
                stopOpacity={0.2}
              />
            </linearGradient>
          </defs>
          <GridRows
            lineStyle={{ pointerEvents: 'none' }}
            scale={yScale}
            width={xMax}
            strokeDasharray='2,2'
            stroke='rgba(255,255,255,0.3)'
          />
          <GridColumns
            lineStyle={{ pointerEvents: 'none' }}
            scale={xScale}
            height={yMax}
            strokeDasharray='2,2'
            stroke='rgba(255,255,255,0.3)'
          />
          <AreaClosed
            data={data}
            xScale={xScale}
            yScale={yScale}
            x={xStock}
            y={yStock}
            strokeWidth={1}
            stroke={'url(#gradient)'}
            fill={'url(#gradient)'}
            curve={curveMonotoneX}
          />

          <AxisBottom
            scale={xScale}
            top={yMax}
            label={'Year'}
            stroke={'white'}
            tickTextFill={'white'}
            tickLabelProps={(value, index) => ({
              fill: 'white',
              fontSize: 11,
              textAnchor: 'middle',
            })}
          />
          <Bar
            x={0}
            y={0}
            width={width}
            height={width}
            fill='transparent'
            rx={14}
            data={data}
            onTouchStart={data => event =>
              this.handleTooltip({
                event,
                data,
                xStock,
                xScale,
                yScale
              })}
            onTouchMove={data => event =>
              this.handleTooltip({
                event,
                data,
                xStock,
                xScale,
                yScale
              })}
            onMouseMove={data => event =>
              this.handleTooltip({
                event,
                data,
                xStock,
                xScale,
                yScale
              })}
            onMouseLeave={data => event => hideTooltip()}
          />
          {tooltipData && (
            <g>
              <Line
                from={{ x: tooltipLeft, y: 0 }}
                to={{ x: tooltipLeft, y: yMax }}
                stroke='rgba(92, 119, 235, 1.000)'
                strokeWidth={2}
                style={{ pointerEvents: 'none' }}
                strokeDasharray='2,2'
              />
              <circle
                cx={tooltipLeft}
                cy={tooltipTop + 1}
                r={4}
                fill='black'
                fillOpacity={0.1}
                stroke='black'
                strokeOpacity={0.1}
                strokeWidth={2}
                style={{ pointerEvents: 'none' }}
              />
              <circle
                cx={tooltipLeft}
                cy={tooltipTop}
                r={4}
                fill='rgba(92, 119, 235, 1.000)'
                stroke='white'
                strokeWidth={2}
                style={{ pointerEvents: 'none' }}
              />
            </g>
          )}
        </svg>
        {tooltipData && (
          <div>
            <Tooltip
              top={tooltipTop - 12}
              left={tooltipLeft + 12}
              style={{
                backgroundColor: 'rgba(92, 119, 235, 1.000)',
                color: 'white'
              }}
            >
              {`${yStock(tooltipData)}`}
            </Tooltip>
            <Tooltip
              top={yMax - 14}
              left={tooltipLeft}
              style={{
                transform: 'translateX(-50%)'
              }}
            >
              {xStock(tooltipData)}
            </Tooltip>
          </div>
        )}
      </div>
    )
  }
}

export default withTooltip(Population3)
