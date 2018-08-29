import React from 'react'
import { BarGroup } from '@vx/shape'
import { Group } from '@vx/group'
import { AxisBottom } from '@vx/axis'
import { cityTemperature } from '@vx/mock-data'
import { scaleBand, scaleLinear, scaleOrdinal } from '@vx/scale'
import { timeParse, timeFormat } from 'd3-time-format'
import { extent, max } from 'd3-array'

export default ({

  width = 1000,
  height = 700,
  margin = {
    top: 40
  }
}) => {
  const data = cityTemperature.slice(0, 4)
  const keys = Object.keys(data[0]).filter(d => d !== 'date')

  const x0 = d => d.date
  // bounds
  const xMax = width
  const yMax = height - margin.top - 100

  // // scales
  const x0Scale = scaleBand({
    rangeRound: [0, xMax],
    domain: data.map(x0),
    padding: 0.2
  })
  const x1Scale = scaleBand({
    rangeRound: [0, x0Scale.bandwidth()],
    domain: keys,
    padding: 0.1
  })
  const yScale = scaleLinear({
    rangeRound: [yMax, 0],
    domain: [0, max(data, (d) => {
      return max(keys, (key) => d[key])
    })]
  })
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
          textAnchor: 'middle'
        })}
      />
    </svg>
  )
}
