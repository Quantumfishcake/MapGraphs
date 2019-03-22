import React from 'react'
import './news.css'
import { impCountries } from '../countryData/country_data.js'
import { country_codes } from '../countryData/country_data.js'

class News extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            search: ''
        }
    };

    componentWillReceiveProps = (newProps) => {
        if (this.state.search === '' && newProps != ('' || undefined) && newProps.country != this.state.country) {
            fetch(`https://newsapi.org/v2/top-headlines?country=${this.changeCountryName(newProps.country)}&pageSize=8&apiKey=61077b6f395742a9aff9bb1e76ff769a`)
                .then(res => {
                    return res.json();
                })
                .then(json => {
                    this.setState({ data: json.articles, country: newProps.country })
                });
        } else if (this.state.search != ''){
            fetch(`https://newsapi.org/v2/top-headlines?country=${this.changeCountryName(newProps.country)}&category=${this.state.search}&pageSize=8&apiKey=61077b6f395742a9aff9bb1e76ff769a`)
                .then(res => {
                    return res.json();
                })
                .then(json => {
                    this.setState({ data: json.articles })
                });
        }
    }

    changeCountryName = (x) => {
        const arr1 = impCountries
        const arr2 = country_codes
        const pos = arr1.indexOf(x)
        return arr2[pos]
    }

    _handleChange = (event) => {
        event.preventDefault()
        this.setState({ search: event.target.value })
    }
    _handleSubmit = (event) => {
        event.preventDefault()
        this.props.country != '' 
            ? fetch(`https://newsapi.org/v2/top-headlines?country=${this.changeCountryName(this.props.country)}&category=${this.state.search}&pageSize=8&apiKey=61077b6f395742a9aff9bb1e76ff769a`)
                .then(res => {
                    return res.json();
                })
                .then(json => {
                    this.setState({ data: json.articles })
                }) 
            : fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${this.state.search}&pageSize=8&apiKey=61077b6f395742a9aff9bb1e76ff769a`)
                .then(res => {
                    return res.json();
                })
                .then(json => {
                    this.setState({ data: json.articles })
                })
    }

    render() {
        console.log(this.props.country)
        const { data } = this.state
        return (
            <div className='newsContainer'>
            <form onSubmit={this._handleSubmit} className='newsSearch'>
                    <label>
                        Search:
                        <input type='text' onChange={this._handleChange} value={this.state.search} />
                    </label>
                </form>
                {data.map((x) =>
                    <div className='newsShow'>
                        {x.urlToImage ? <img src={x.urlToImage} style={{ height: 40 }} className='newsImage' /> : <img />}
                        <div className='newsText'>
                        <a href={x.url} target="_blank" >{x.title} </a>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default News