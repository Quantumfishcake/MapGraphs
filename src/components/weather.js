import React from 'react'
import axios from 'axios'

class Weather extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {},
            search: ''
        }
    };

    componentWillReceiveProps = (newProps) => {
        if (newProps.lat != 0) {
            axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${newProps.lat}&lon=${newProps.lon}&appid=b4f65559e8bc4d640899b9f609577a59&units=metric`).then((results) => {
                console.log(results)
                this.setState({ data: results.data })
                console.log(this.state.data)
            }
    
        )
    }
}



    _handleChange = (event) => {
        this.setState({ search: event.target.value })
        console.log(this.state)
    }


    render() {
        const { data } = this.state
        console.log(this.state)
        return (
            <div className='weather'>
                <div>Weather</div>
                <div>City: {data && data.name}Temp:{data && data.main && data.main.temp}Wind Speed:{data && data.wind && data.wind.speed}Outlook:{data && data.weather && data.weather[0].main} </div>
                {/* <form onSubmit={this._handleSubmit}>
          <label>
            Category:
            <input type='text' onChange={this._handleChange} value={this.state.search} />
          </label>
          </form> */}
            </div>
        )
    }

}

export default Weather