
import React from 'react';
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'


class SliderBar extends React.Component {
constructor() {
    super()
    this.state={
        population: 50000
    }
}

handleChange = value => {
    this.setState({
      population: value
    })
    console.log(this.state.population)
  }
    render() {
        return(
            <div>
            <div className='slider'>
            <Slider
                min={50000}
                max={10000000}
                step={25000}
                value={this.props.value}
                onChange={this.props.updatePop}
            />
            <div className='sliderdiv'>{this.state.age}</div>
            
        </div>
        </div>
        
        )
    }
        
}

export default SliderBar