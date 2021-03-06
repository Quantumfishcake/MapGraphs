import React from 'react'
import axios from 'axios'
import { weatherAPI } from './utilities/factbookAPI.js'
import   weatherImage   from '../assets/images/weatherGood.jpg'

const getWeatherIcon = (str) => {
  return str === 'clear sky' ? <img src='https://darksky.net/images/weather-icons/clear-day.png' width='200' height='200' /> : str === 'few clouds' ? <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRArcsuX45TJLx7cDL5nDKAIDpAQ0rIiT5k1FkDS3B0UjoN8C2O' width='200' height='200' /> : str === 'overcast clouds' ? <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV2ibIJD8_n0VHqz74x9PS2lwAU0aS-x-GRxLmVKsdOYUnED1N' width='200' height='200' /> : str === 'broken clouds' ? <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV2ibIJD8_n0VHqz74x9PS2lwAU0aS-x-GRxLmVKsdOYUnED1N' width='200' height='200' /> : str === 'light rain' ? <img src='https://1xl9di2ck3gz4a3qr31mmhd0-wpengine.netdna-ssl.com/wp-content/uploads/2016/10/white-sun-behind-cloud-with-rain.png' width='200' height='200' /> : str === 'moderate rain' ? <img src='http://files.softicons.com/download/web-icons/vector-stylish-weather-icons-by-bartosz-kaszubowski/ico/cloud.rain.ico' width='200' height='200' /> : str === 'thunderstorm' ? <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAdatE5ZGsl7E_06fF3sMvrxfoHQcAQ1PSK3sOyV3Vn2Rsnx0O4w' width='200' height='200' /> : str === 'snow' ? <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf-2qQfeQIhnzyG-ZImmpHgdPbsJu4OuBEDAt6fLlH3TbIREHb' width='200' height='200' /> : str = 'mist' ? <img src='' /> : str === 'scattered clouds' ? <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Gnome-weather-few-clouds.svg/2000px-Gnome-weather-few-clouds.svg.png' width='200' height='200' /> : false
}



class Weather extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {},
      search: ''
    }
  };

  componentWillReceiveProps = (props) => {
    if (props.lat !== 0 && props.lat !== this.state.lat) {
      axios.get(weatherAPI(props.lat, props.lon)).then((results) => {
        this.setState({ data: results.data, lat: props.lat })
      })
    }
  }

  _handleChange = (event) => {
    this.setState({ search: event.target.value })
  }

  render() {
    const { data } = this.state
    return (
      <div className='weather'>
        <div>Weather</div>
        <div>City: {data && data.name}</div>
        <div style={{fontSize: 20}}>{data && data.main && data.main.temp}℃</div>
        {/* <div>Wind Speed:{data && data.wind && data.wind.speed}</div> */}
        {/* <div>{data && data.weather && getWeatherIcon(data.weather[0].description)} </div> */}
        <div style={{background:`url(${weatherImage}) 0px -25px no-repeat`, height: 150 }} ></div>
      </div>
    )
  }

}

export default Weather