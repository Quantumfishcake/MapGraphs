var React = require('react');
var Component = React.Component;
var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


class PopulationComparison extends Component {
  constructor (props) {
    super(props)
    this.state={
      country: '',
      country2: '',
      data: []
    }
  }

  componentWillReceiveProps = (newProps) => {
    console.log(newProps.country)
    if(newProps.country != this.state.country) {
    fetch(`http://api.population.io/1.0/population/${this.convertRussia(newProps.country)}/60/`)
    .then(res => {
      return res.json()
      
    })
    .then(json => {
      const result2 = json.map((x) => {
        return { x: x.year, y: x.total }
      })
      this.setState({
        data: result2,
        country: newProps.country
      });
    });
  } else if (newProps.secondcountry && newProps.country != '') {
    fetch(`http://api.population.io/1.0/population/${this.convertRussia(newProps.secondcountry)}/60/`)
    .then(res => {
      return res.json()
      
    })
    .then(json => {
      const result2 = json.map((x) => {
        return { x: x.year, y: x.total }
      })
      this.setState({
        data2: result2,
        country2: newProps.secondcountry
      });
    });
  }
}

convertRussia = (country) => {
  return country == 'Russia' ? 'Russian Federation' : country
}

render() {
  const options = {
    animationEnabled: true,
    colorSet: "colorSet1",
    height: 275,
    margin: 0,
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
      yValueFormatString: "#,##0",
      dataPoints: this.state.data
    },{
      type: "line",
      name: this.state.country2,
      showInLegend: true,
      yValueFormatString: "#,##0",
      dataPoints: this.state.data2
    }]
  }
  return (
  <div className='cheatChart'>
    <CanvasJSChart options = {options}
       onRef={ref => this.chart = ref}
    />
    {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
  </div>
  );
}
}
module.exports = PopulationComparison
