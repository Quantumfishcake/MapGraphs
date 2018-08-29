import React from 'react'
import { BarStack } from '@vx/shape'
import { Group } from '@vx/group'
import { Grid } from '@vx/grid'
import { AxisBottom } from '@vx/axis'
import { cityTemperature } from '@vx/mock-data'
import { scaleBand, scaleLinear, scaleOrdinal } from '@vx/scale'
import { timeParse, timeFormat } from 'd3-time-format'
import { withTooltip, Tooltip } from '@vx/tooltip'
import { LegendOrdinal } from '@vx/legend'
import { extent, max } from 'd3-array'

const data = cityTemperature.slice(0, 12)
console.log(this.props)

const keys = Object.keys(data[0]).filter(d => d !== 'date')
console.log(data)
console.log(keys)
const parseDate = timeParse('%Y%m%d')
const format = timeFormat('%b %d')
const formatDate = date => format(parseDate(date))

const width = 500
const height = 500
const margin = {
  top: 40
}

// {date: "20111001", New York: "63.4", San Francisco: "62.7", Austin: "72.2"}

// accessors
const x = d => d.date
const y = d => d.value

const totals = data.reduce((ret, cur) => {
  const t = keys.reduce((dailyTotal, k) => {
    dailyTotal += +cur[k]
    return dailyTotal
  }, 0)
  ret.push(t)
  return ret
}, [])

class BarStacks extends React.Component {
  render () {
    const {
      tooltipOpen,
      tooltipLeft,
      tooltipTop,
      tooltipData,
      hideTooltip,
      showTooltip
    } 
    // bounds
    const xMax = width
    const yMax = height - margin.top - 100

    // // scales
    const xScale = scaleBand({
      rangeRound: [0, xMax],
      domain: data.map(x),
      padding: 0.2,
      tickFormat: () => val => formatDate(val)
    })
    const yScale = scaleLinear({
      rangeRound: [yMax, 0],
      nice: true,
      domain: [0, max(totals)]
    })
    const zScale = scaleOrdinal({
      domain: keys,
      range: ['#6c5efb', '#c998ff', '#a44afe']
    })

    let tooltipTimeout

    return (
      <div style={{ position: 'relative' }}>
        <svg width={width} height={height}>
          <rect x={0} y={0} width={500} height={500} fill={`#eaedff`} rx={14} />
            <Grid
            top={margin.top}
            left={margin.left}
            xScale={xScale}
            yScale={yScale}
            width={xMax}
            height={yMax}
            stroke={'black'}
            strokeOpacity={0.1}
            xOffset={xScale.bandwidth() / 2}
          />
            <BarStack
            top={margin.top}
            data={data}
            keys={keys}
            height={yMax}
            x={x}
            xScale={xScale}
            yScale={yScale}
            zScale={zScale}
            onClick={data => event => {
              if (!event) return
              alert(`clicked: ${JSON.stringify(data)}`)
            }}
            onMouseLeave={data => event => {
              this.tooltipTimeout = setTimeout(() => {
                hideTooltip()
              }, 300)
            }}
            onMouseMove={data => event => {
              if (this.tooltipTimeout) clearTimeout(this.tooltipTimeout)
              const top = event.clientY - margin.top - data.height
              const left = xScale(data.x) + data.width + data.paddingInner * data.step / 2
              showTooltip({
                tooltipData: data,
                tooltipTop: top,
                tooltipLeft: left
              })
            }}
          />
            <AxisBottom
            scale={xScale}
            top={yMax + margin.top}
            stroke='#a44afe'
            tickStroke='#a44afe'
            tickLabelProps={(value, index) => ({
              fill: '#a44afe',
              fontSize: 11,
              textAnchor: 'middle'
            })}
          />
        </svg>
          <div
          style={{
            position: 'absolute',
            top: margin.top / 2 - 10,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            fontSize: '14px'
          }}
        >
          <LegendOrdinal scale={zScale} direction='row' labelMargin='0 15px 0 0' />
        </div>
        {tooltipOpen && (
          <Tooltip
            top={tooltipTop}
            left={tooltipLeft}
            style={{
              minWidth: 60,
              backgroundColor: 'rgba(0,0,0,0.9)',
              color: 'white'
            }}
          >
            <div style={{ color: zScale(tooltipData.key) }}>
              <strong>{tooltipData.key}</strong>
            </div>
              <div>{tooltipData.data[tooltipData.key]}℉</div>
              <div>
              <small>{tooltipData.xFormatted}</small>
            </div>
          </Tooltip>
        )}
      </div>
    )
  }
}
export default BarStacks
