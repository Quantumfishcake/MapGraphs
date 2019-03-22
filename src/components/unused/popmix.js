import { csv } from 'd3-request';
import population from './Data/population1.csv'
var React = require('react');
var Component = React.Component;
var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class PopMix extends Component {
  constructor (props) {
    super(props)
    this.state={
      country: '',
      country2: '',
      data: [],
      data2: []
    }
  }

  componentWillReceiveProps = (newProps) => {
    csv(population, (data) => {
        var result = data.filter((x) => {
            return x['Country Name'] == newProps.country
        })
        var resultHover = data.filter((x) => {
            return x['Country Name'] == newProps.secondcountry
        })

        if (result != '' && (resultHover != undefined || null) || '') {
          console.log(result)
          
            var result2 = Object.keys(result[0]).map(function (e) {
                return { x: e, y: result[0][e] }
            })
            var result3 = result2.slice(0, -5)
            var resultHover2 = Object.keys(resultHover[0]).map(function (e) {
                return { x: e, y: resultHover[0][e] }
            })
            var resultHover3 = resultHover2.slice(0, -5)
            console.log(result3)
            console.log(resultHover3)
            this.setState({
                data: result3,
                data2: resultHover3,

            })
        }
    });

}

render() {
  const options = {
    animationEnabled: true,
    colorSet: "colorSet3",
    title: {
      text: "Population"
    },
    axisX: {

    },
    axisY: {
      prefix: "",
      labelFormatter: this.addSymbols
    },
    toolTip: {
      shared: true
    },
    legend: {
      cursor: "pointer",
      itemclick: this.toggleDataSeries,
      verticalAlign: "top"
    },
    data: [{
      type: "column",
      name: this.state.country,
      showInLegend: true,
      xValueFormatString: "YYYY",
      yValueFormatString: "$#,##0",
      // dataPoints: this.state.data
    },{
      type: "line",
      name: this.state.country2,
      showInLegend: true,
      yValueFormatString: "$#,##0",
      // dataPoints: this.state.data2
    }]
  }
  return (
  <div>
    <CanvasJSChart options = {options}
       onRef={ref => this.chart = ref}
    />
    {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
  </div>
  );
}
}
export default PopMix
