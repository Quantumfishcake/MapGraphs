
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
  }
    render() {
        return(
            <div className='slider'>
            <Slider
                min={0}
                max={10000000}
                step={100000}
                value={this.props.value}
                onChange={this.props.updatePop}
            />
            <div className='sliderdiv'>{this.state.age}</div>
        </div>
        )
    }  
}

export default SliderBar