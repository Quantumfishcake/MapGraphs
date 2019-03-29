import React from 'react'
import { BarStack } from '@vx/shape'
import { AxisBottom, AxisTop } from '@vx/axis'
import { scaleBand, scaleLinear, scaleOrdinal, scaleLog, scalePower } from '@vx/scale'
import { withTooltip, Tooltip } from '@vx/tooltip'
import { LegendOrdinal } from '@vx/legend'
import { extent, max } from 'd3-array'
import { localPoint } from '@vx/event';

// accessors

export default withTooltip(
  ({
    allData,
    width,
    height,
    scale,
    name,
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

    const x = d => d[name]
    const y = d => d.value
    
    const xMax = width
    const yMax = height - margin.top - 50
    // // scales
    const xScale = scaleBand({
      rangeRound: [0, xMax],
      domain: allData.data.map(x),
      padding: 0.2,
      tickFormat: () => val => val
    })
    const yScale = scalePower({
      // rangeRound: [yMax, 0],
      // nice: false,
      // domain: [0, max(allData.totals)]
      exponent: 0.5,
      domain:[0, max(allData.totals)],
      range:[yMax, 10]
    })
  
    const zScale = scaleOrdinal({
      domain: allData.keys,
      range: ['#6c5efb', '#c998ff', '#a44afe']
    })

    let tooltipTimeout

    return (
      <div style={{ position: 'relative' }}>
        <svg width={width} height={height}>
          <rect x={0} y={0} width={width} height={height} fill={`#282b30`} rx={14} />
          <BarStack
            top={margin.top}
            data={allData.data}
            keys={allData.keys}
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
              const coords = localPoint(event.target.ownerSVGElement, event);
              const top =  coords.y
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
              fill: 'white',
              fontSize: 11,
              textAnchor: 'start',
              transform: 'rotate(45 ' + xScale(value) + ',0)'
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
            fontSize: '14px',
            color: 'white'
          }}
        >
          <LegendOrdinal scale={zScale} direction='row' labelMargin='0 15px 0 0' />
        </div>
        {tooltipOpen && (
          <Tooltip
            top={tooltipTop}
            left={tooltipLeft}
            style={{
              zIndex: 10,
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
