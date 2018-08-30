import React from 'react'
import { BarStack } from '@vx/shape'
import { Group } from '@vx/group'
import { Grid } from '@vx/grid'
import { AxisBottom } from '@vx/axis'
import { scaleBand, scaleLinear, scaleOrdinal, scaleLog } from '@vx/scale'
import { withTooltip, Tooltip } from '@vx/tooltip'
import { LegendOrdinal } from '@vx/legend'
import { extent, max } from 'd3-array'
import { replace } from 'lodash'


// accessors
const x = d => d.Budget
const y = d => d.value

const MoneyConversion = (arr) => {
  return arr[1] == 'trillion' ? arr[0].replace('$', '') * 1000 : arr[0].replace('$', '')
}

export default withTooltip(
  ({
    economy = [],
    economy2 = [],
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
 

    const countryName = country
    const countryName2 = country2
    const countryRevenue = economy.Budget && economy.Budget.revenues.text.split(' ')[0].replace('$', '')
    const countryExpenditure = economy.Budget && economy.Budget.expenditures.text.split(' ')[0].replace('$', '')
    const GDP = economy['GDP (official exchange rate)'] && MoneyConversion(economy['GDP (official exchange rate)'].text.split(' '))
    const Debt = economy['Debt - external'] && MoneyConversion(economy['Debt - external'].text.split(' '))
    const unemploymentRate = economy['Unemployment rate'] && economy['Unemployment rate'].text.split(' ')[0].replace('%', '')
    const PovertyRate = economy['Population below poverty line'] && economy['Population below poverty line'].text.split(' ')[0].replace('%', '')
    const GDPperCapita = economy['GDP - per capita (PPP)'] && economy['GDP - per capita (PPP)'].text.split(' ')[0].replace('$', '').replace(',', '')
    console.log(GDPperCapita)

    const countryRevenue2 = economy2.Budget && economy2.Budget.revenues.text.split(' ')[0].replace('$', '')
    const countryExpenditure2 = economy2.Budget && economy2.Budget.expenditures.text.split(' ')[0].replace('$', '')
    const GDP2 = economy2['GDP (official exchange rate)'] && MoneyConversion(economy2['GDP (official exchange rate)'].text.split(' '))
    const Debt2 = economy2['Debt - external'] && MoneyConversion(economy2['Debt - external'].text.split(' '))
    const unemploymentRate2 = economy2['Unemployment rate'] && economy2['Unemployment rate'].text.split(' ')[0].replace('%', '')
    const PovertyRate2 = economy2['Population below poverty line'] && economy2['Population below poverty line'].text.split(' ')[0].replace('%', '')
    const GDPperCapita2 = economy2['GDP - per capita (PPP)'] && economy2['GDP - per capita (PPP)'].text.split(' ')[0].replace('$', '').replace(',', '')

    const data33 = [
      { Budget: 'Revenue(Billions)', [countryName]: (countryRevenue) /10, [countryName2]: (countryRevenue2) /10 },
      { Budget: 'Expenditure', [countryName]: countryExpenditure /10, [countryName2]: countryExpenditure2 /10 },
      { Budget: 'Unemployment', [countryName]: unemploymentRate, [countryName2]: unemploymentRate2 },
      { Budget: 'Debt(10Billions)', [countryName]: Debt /10 , [countryName2]: Debt2 /10 },
      { Budget: 'Poverty Rate', [countryName]: PovertyRate, [countryName2]: PovertyRate2 },
      { Budget: 'GDP per Capita', [countryName]: GDPperCapita / 1000, [countryName2]: GDPperCapita2 / 1000 },
      { Budget: 'GDP(10Billions)', [countryName]: GDP /10, [countryName2]: GDP2/10 }
    ]
    const keys33 = Object.keys(data33[0]).filter(d => d !== 'Budget')

    const totals = data33.reduce((ret, cur) => {
      const t = keys33.reduce((dailyTotal, k) => {
        dailyTotal += +cur[k]
        return dailyTotal
      }, 0)
      ret.push(t)
      return ret
    }, [])

    const xMax = width
    const yMax = height - margin.top - 50
    // // scales
    const xScale = scaleBand({
      rangeRound: [0, xMax],
      domain: data33.map(x),
      padding: 0.2,
      tickFormat: () => val => val
    })
    const yScale = scaleLinear({
      domain: [0, max(totals)],
      range: [yMax, 10],
  
     
    })
  
    const zScale = scaleOrdinal({
      domain: keys33,
      range: ['#6c5efb', '#c998ff', '#a44afe']
    })

    let tooltipTimeout

    return (
      <div style={{ position: 'relative' }}>
        <svg width={width} height={height}>
          <rect x={0} y={0} width={width} height={height} fill={`white`} rx={14} />
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
            data={data33}
            keys={keys33}
            height={yMax}
            x={x}
            xScale={xScale}
            yScale={yScale}
            zScale={zScale}
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
