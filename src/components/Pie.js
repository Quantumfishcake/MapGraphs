import React from 'react';
import { Pie } from '@vx/shape';
import { Group } from '@vx/group';
import { GradientPinkBlue } from '@vx/gradient';
import { letterFrequency, browserUsage } from '@vx/mock-data';
console.log(browserUsage)

const data3 = [{
  "females": 358029, 
  "country": "Afghanistan", 
}, 
{
  "females": 11709206, 
  "country": "AFRICA", 
}, 
{
  "females": 26231, 
  "country": "Albania", 
}, 
{
  "females": 303124, 
  "country": "Algeria", 
}]

console.log(data3)
function Label({ x, y, children }) {
  return (
    <text
      fill="white"
      textAnchor="middle"
      x={x}
      y={y}
      dy=".33em"
      fontSize={9}
    >
      {children}
    </text>
  );
}

class Pies extends React.Component {
  constructor () {
    super ()
    this.state= {
      data: [{
         age: 20,
         mortality_percent: 10
        }]
    }
  }
  componentDidMount() {
    fetch('http://api.population.io:80/1.0/mortality-distribution/United%20Kingdom/male/20y/today/')
      .then(res => {
        return res.json();
      })
      .then(json => {
    
        var data4 = json['mortality_distribution']
        console.log(data4)
       var data2 = data4.map(k => ({ age: k.age, mortality_percent: k.mortality_percent }));
        this.setState({
          data: data2
        });
        console.log(this.state.data)
      });

    
    }






  render(){

    const data = this.state.data;
  



    const width = 700
     const height = 700
    const events = false
    const margin = {
      top: 30,
      left: 20,
      right: 20,
      bottom: 110,
    }
    if (width < 10) return null;
  const radius = Math.min(width, height) / 2;
  return (
    <svg width={width} height={height}>
      <GradientPinkBlue id="gradients" />
      <rect
        x={0}
        y={0}
        rx={14}
        width={width}
        height={height}
        fill="url('#gradients')"
        fillOpacity={0.2}
      />
      <Group top={height / 2 - margin.top} left={width / 2}>
        <Pie
          data={data}
          pieValue={d => d.mortality_percent}
          outerRadius={radius - 80}
          innerRadius={radius - 120}
          fill={d => d.index % 2 == 0 ? 'yellow' : 'orange' }
          fillOpacity={d => 1 / 1 }
          cornerRadius={3}

          centroid={(centroid, arc) => {
            const [x, y] = centroid;
            const { startAngle, endAngle } = arc;
            if (endAngle - startAngle < .05) return null;
            return <Label x={x} y={y}>{arc.data.age}</Label>;
          }}
         
        />
          <Pie
          data={data}
          pieValue={d => d.mortality_percent}
          outerRadius={radius - 130}
          innerRadius={0}
          fill={'black'}
          fillOpacity={d => 1 / d.index }
          padRadius ={10}
          cornerRadius={3}
          padAngle={0}
          centroid={(centroid, arc) => {
            const [x, y] = centroid;
            const { startAngle, endAngle } = arc;
            if (endAngle - startAngle < .05) return null;
            return <Label x={x} y={y}>{arc.data.age}</Label>;
          }}
         
        />
     
      </Group>
    </svg>
  );
  }
} 
  

export default Pies