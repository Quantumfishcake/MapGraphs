import React from 'react';
import { Pie } from '@vx/shape';
import { Group } from '@vx/group';
import chroma from "chroma-js"
import { flow, split, map, mapValues } from 'lodash/fp'
import { replace } from 'lodash'

const mapWithKey = map.convert({cap: false})

const colorScale2 = chroma
  .scale([
    '#FF6E40',
    '#FFD740',
    '#00B8D4',
  ])
  .mode('lch')
  .colors(12)

  const colorScale3 = chroma
  .scale([
    '#FF6E40',
    '#FFD740',
    '#00B8D4',
  ])
  .mode('lch')
  .colors(6)

const convertstring = flow(
  split(', '),
  map(split(' ')),
  map(item => ({
    language: item[0],
    percent: item.length == 2 ? replace(item[1], '%', '') : replace(item[item.length - 1], '%', '')
  }))
)

const Label = ({ x, y, children })  => {
  return (
    <text
      fill="white"
      textAnchor="middle"
      x={x}
      y={y}
      dy=".66em"
      fontSize={12}
    >
      {children}
    </text>
  );
} 

const convertAgeGroups = mapWithKey((value, key) => ({
  group: key.split(' ')[0],
  percent: value.text.split(' ')[0].replace('%', ''),
}))

class Pies extends React.Component {
  constructor () {
    super ()
    this.state= {
      languages: [],
      languages2: [],
      ageGroups: [],
      ageGroups2: [],
      data: [{
        age: 20,
        mortality_percent: 10
      }]
    }
  }

  componentWillReceiveProps = (newProps) =>{
   if (newProps.languages != undefined) {
      const languages = convertstring(newProps.languages.Languages.text)
      const ageGroups = convertAgeGroups(newProps.languages['Age structure'])
      this.setState({ languages, ageGroups })
    }
    if (newProps.languages2 != undefined){
      const languages2 = convertstring(newProps.languages2.Languages.text)
      const ageGroups2 = convertAgeGroups(newProps.languages2['Age structure'])
      this.setState({ languages2, ageGroups2 })
    } 
  }

  render(){
    const {languages, languages2, ageGroups, ageGroups2 } = this.state
    const width = 250
    const height = 250
    const events = false
    const margin = {
      top: 10,
      left: 10,
      right: 10,
      bottom: 10,
    }
    if (width < 10) return null;
    const radius = Math.min(width, height) / 2;
    return (
      <div>
        <svg width={width} height={height}>
          <Group top={height / 2 - margin.top} left={width / 2}>
            <Pie
              data={languages}
              pieValue={d => d.percent}
              outerRadius={radius - 20 }
              innerRadius={radius - 60}
              fill={'#c998ff'}
              fillOpacity={d => 1 / d.index }
              cornerRadius={3}
              centroid={(centroid, arc) => {
                const [x, y] = centroid;
                const { startAngle, endAngle } = arc;
                if (endAngle - startAngle < .5) return null;
                return <Label x={x} y={y}>{arc.data.language}</Label>;
              }}
            />
              <Pie
              data={languages2}
              pieValue={d => d.percent}
              outerRadius={radius - 70}
              innerRadius={0}
              fill={'#6c5efb'}
              fillOpacity={d => 1 / d.index }
              padRadius ={10}
              cornerRadius={3}
              padAngle={0}
              centroid={(centroid, arc) => {
                const [x, y] = centroid;
                const { startAngle, endAngle } = arc;
                if (endAngle - startAngle < .5) return null;
                return <Label x={x} y={y}>{arc.data.language}</Label>;
              }}
            />
          </Group>
        </svg>
        <svg width={width} height={height}>
          <Group top={height / 2 - margin.top} left={width / 2}>
            <Pie
              data={ageGroups}
              pieValue={d => d.percent}
              outerRadius={radius - 20}
              innerRadius={radius - 60}
              fill={'#c998ff'}
              fillOpacity={d => 1 / d.index }
              cornerRadius={3}
              centroid={(centroid, arc) => {
                const [x, y] = centroid;
                const { startAngle, endAngle } = arc;
                if (endAngle - startAngle < .05) return null;
                return <Label x={x} y={y}>{arc.data.group}</Label>;
              }}
            />
          </Group>
          <Group top={height / 2 - margin.top} left={width / 2}>
            <Pie
              data={ageGroups2}
              pieValue={d => d.percent}
              outerRadius={radius - 70}
              fill={'#6c5efb' }
              fillOpacity={d => 1/ d.index }
              cornerRadius={3}
              centroid={(centroid, arc) => {
                const [x, y] = centroid;
                const { startAngle, endAngle } = arc;
                if (endAngle - startAngle < .05) return null;
                return <Label x={x} y={y}>{arc.data.group}</Label>;
              }}
            />
          </Group>
        </svg>
      </div>
    );
  }
}

export default Pies