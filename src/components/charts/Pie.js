import React from 'react';
import { Pie } from '@vx/shape';
import { Group } from '@vx/group';

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

class Pies extends React.Component {
  constructor () {
    super ()
  }

  render(){
    const {country1, country2} = this.props
    const width = 250
    const height = 250
    const events = false
    const margin = {
      top: 10,
      left: 10,
      right: 10,
      bottom: 0,
    }
    if (width < 10) return null;
    const radius = Math.min(width, height) / 2;
    const innerRad = country2 ? radius - 60 : ''
    return (
      <div>
        <svg width={width} height={height}>
          <Group top={height / 2 - margin.top} left={width / 2}>
            <Pie
              data={country1}
              pieValue={d => d.percent}
              outerRadius={radius - 20 }
              innerRadius={innerRad }
              fill={'#c998ff'}
              fillOpacity={d => 1 / d.index }
              cornerRadius={3}
              centroid={(centroid, arc) => {
                const [x, y] = centroid;
                const { startAngle, endAngle } = arc;
                if (endAngle - startAngle < .5) return null;
                return <Label x={x} y={y}>{arc.data.language || arc.data.group }</Label>;
              }}
            />
            {country2 ? <Pie
              data={country2}
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
                return <Label x={x} y={y}>{arc.data.language || arc.data.group}</Label>;
              }}
            /> : <div></div>}
              
          </Group>
        </svg>
      </div>
    );
  }
}

export default Pies