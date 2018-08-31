import React from 'react'
import { BarStack } from '@vx/shape'
import { Group } from '@vx/group'
import { Grid } from '@vx/grid'
import { AxisBottom } from '@vx/axis'
import { cityTemperature } from '@vx/mock-data'
import { scaleBand, scaleLinear, scaleOrdinal } from '@vx/scale'
import { withTooltip, Tooltip } from '@vx/tooltip'
import { LegendOrdinal } from '@vx/legend'
import { extent, max } from 'd3-array'
import { replace } from 'lodash'

const data = cityTemperature.slice(0, 12)
console.log(data)
//

// accessors
const x = d => d.People
const y = d => d.value

export default withTooltip(
  ({
    people = [],
    people2 = [],
    country = '',
    country2 = '',
    width,
    height,
    events = false,
    margin = {
      top: 40
    },
    tooltipOpen,
    tooltipLeft,
    tooltipTop,
    tooltipData,
    hideTooltip,
    showTooltip
  }) => {
    if (width < 10) return null

    // {date: "20111001", New York: "63.4", San Francisco: "62.7", Austin: "72.2"}

    // bounds
    const xMax = width
    const yMax = height - margin.top - 50

    const countryName = country
    const countryName2 = country2
    const lifeExpectancy = people['Life expectancy at birth'] && people['Life expectancy at birth']['total population'].text.split(' ')[0]
    const populationGrowthRate = people['Population growth rate'] && people['Population growth rate'].text.split(' ')[0].replace('%', '')
    const fertilityRate = people['Total fertility rate'] && people['Total fertility rate'].text.split(' ')[0]
    const obesity = people['Obesity - adult prevalence rate'] && people['Obesity - adult prevalence rate'].text.split(' ')[0].replace('%', '')
    const medianAge = people['Median age'] && people['Median age'].total.text.split(' ')[0]

    const lifeExpectancy2 = people2['Life expectancy at birth'] && people2['Life expectancy at birth']['total population'].text.split(' ')[0]
    const populationGrowthRate2 = people2['Population growth rate'] && people2['Population growth rate'].text.split(' ')[0].replace('%', '')
    const fertilityRate2 = people2['Total fertility rate'] && people2['Total fertility rate'].text.split(' ')[0]
    const obesity2 = people2['Obesity - adult prevalence rate'] && people2['Obesity - adult prevalence rate'].text.split(' ')[0].replace('%', '')
    const medianAge2 = people2['Median age'] && people2['Median age'].total.text.split(' ')[0]

    const data33 = [
      { People: 'Life Expectancy', [countryName]: (lifeExpectancy), [countryName2]: (lifeExpectancy2) },
      { People: 'Population Growth', [countryName]: populationGrowthRate, [countryName2]: populationGrowthRate2 },
      { People: 'Fertility Rate', [countryName]: fertilityRate, [countryName2]: fertilityRate2 },
      { People: 'Obesity', [countryName]: obesity, [countryName2]: obesity2 },
      { People: 'Median Age', [countryName]: medianAge, [countryName2]: medianAge2 }

    ]
    const keys33 = Object.keys(data33[0]).filter(d => d !== 'People')

    const totals = data33.reduce((ret, cur) => {
      const t = keys33.reduce((dailyTotal, k) => {
        dailyTotal += +cur[k]
        return dailyTotal
      }, 0)
      ret.push(t)
      return ret
    }, [])

    // // scales
    const xScale = scaleBand({
      rangeRound: [0, xMax],
      domain: data33.map(x),
      padding: 0.2,
      tickFormat: () => val => val
    })
    const yScale = scaleLinear({
      rangeRound: [yMax, 0],
      nice: false,
      domain: [0, max(totals)]
    })

    const zScale = scaleOrdinal({
      domain: keys33,
      range: ['#c998ff','#6c5efb' ,'#a44afe']
    })

    let tooltipTimeout

    return (
      <div style={{ position: 'relative' }}>
        <svg width={width} height={height}>
          <rect x={0} y={0} width={width} height={height} fill={`white`} rx={14} />
          <BarStack
            top={margin.top}
            data={data33}
            keys={keys33}
            height={yMax}
            x={x}
            xScale={xScale}
            yScale={yScale}
            zScale={zScale}
            onClick={data => event => {
              if (!events) return
              alert(`clicked: ${JSON.stringify(data)}`)
            }}
            onMouseLeave={data => event => {
              tooltipTimeout = setTimeout(() => {
                hideTooltip()
              }, 300)
            }}
            onMouseMove={data => event => {
              if (tooltipTimeout) clearTimeout(tooltipTimeout)
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
            top={tooltipTop - 400}
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
            <div>{tooltipData.data[tooltipData.key]}</div>
            <div>
              <small>{tooltipData.xFormatted}</small>
            </div>
          </Tooltip>
        )}
      </div>
    )
  }
)
