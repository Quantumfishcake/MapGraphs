import React from 'react';
import { Pie } from '@vx/shape';
import { Group } from '@vx/group';
import chroma from "chroma-js"
import { flow, split, map, replace } from 'lodash/fp'

const colorScale2 = chroma
.scale([
  '#FF6E40',
  'FFD740',
  '#00B8D4',
])
.mode('lch')
.colors(12)

/**
 * This will process the text
 */
const quantsFunc = flow(
  split(', '),
  map(split(' ')),
  map(item => ({
    language: item[0],
    percent: replace('%', '', item[1])
  }))
)

/**
 * 
 */

class Pies extends React.Component {
  constructor () {
    super ()
    this.state= {
      languages: [],
      languages2: [],
      ageGroups: [],
      data: [{
        age: 20,
        mortality_percent: 10
      }]
    }
  }
  // componentDidMount() {
  //   fetch('http://api.population.io:80/1.0/mortality-distribution/United%20Kingdom/male/20y/today/')
  //     .then(res => {
  //       return res.json();
  //     })
  //     .then(json => {
    
  //       var data4 = json['mortality_distribution']
  //       console.log(data4)
  //      var data2 = data4.map(k => ({ age: k.age, mortality_percent: k.mortality_percent }));
  //       this.setState({
  //         data: data2
  //       });
  //       console.log(this.state.data)
  //     });
  //   }

  componentWillReceiveProps = (newProps) =>{
    console.log(newProps.languages)
    if (newProps.languages != undefined) {
      console.log(quantsFunc(newProps.languages.Languages.text))
      this.setState({
        languages: quantsFunc(newProps.languages.Languages.text),
        ageGroups: this.convertAgeGroups([newProps.languages['Age structure']['0-14 years'].text,newProps.languages['Age structure']['15-24 years'].text, newProps.languages['Age structure']['25-54 years'].text, newProps.languages['Age structure']['55-64 years'].text, newProps.languages['Age structure']['65 years and over'].text ])
      })
      console.log(this.state.ageGroups)
    }
    if (newProps.languages2 != undefined ){
      this.setState({languages2: this.convertstring(newProps.languages2.Languages)})
      console.log(this.state.languages2)
    } 
  }

  convertAgeGroups = (arr) => {
   const a = arr.map(x => x.split(' ')[0].replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ''))
    const b = [{group:'0-14', percent: a[0]},{group:'15-24', percent: a[1]},{group:'25-54', percent: a[2]},{group:'55-64', percent: a[3]},{group:'65 years and over', percent: a[4]}]
    return b
  }

 

  convertstring = (obj) => {
    const b = obj.text.split(',')
    const c = b.map((x) => {return x.split(' ')})
    const d = c.slice(0, -1)
    d.map((x) => {
      if (x.length > 2) {
         x.shift()
      }
    })
    const e = d.map(x => ({language: x[0], percent: x[1].replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')}))
    return e
  }


  render(){

    const {languages, languages2, ageGroups } = this.state;
  
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
    <div>
    <svg width={width} height={height}>
    
      <Group top={height / 2 - margin.top} left={width / 2}>
        <Pie
          data={languages}
          pieValue={d => d.percent}
          outerRadius={radius - 80}
          innerRadius={radius - 170}
          fill={d => colorScale2[d.index] }
          fillOpacity={d => 1 / 1 }
          cornerRadius={3}

          centroid={(centroid, arc) => {
            const [x, y] = centroid;
            const { startAngle, endAngle } = arc;
            if (endAngle - startAngle < .05) return null;
            return <Label x={x} y={y}>{arc.data.language}</Label>;
          }}
         
        />
          <Pie
          data={languages2}
          pieValue={d => d.percent}
          outerRadius={radius - 180}
          innerRadius={0}
          fill={'blue'}
          fillOpacity={d => 1 / d.index }
          padRadius ={10}
          cornerRadius={3}
          padAngle={0}
          centroid={(centroid, arc) => {
            const [x, y] = centroid;
            const { startAngle, endAngle } = arc;
            if (endAngle - startAngle < .05) return null;
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
        outerRadius={radius - 80}
        innerRadius={radius - 170}
        fill={d => colorScale2[d.index] }
        fillOpacity={d => 1 / 1 }
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