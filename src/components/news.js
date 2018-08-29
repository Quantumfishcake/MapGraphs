import React from 'react'

class News extends React.Component {
    constructor(props) {
        super (props)
        this.state = {
            data: [],
            search: ''
        }
       };

       componentWillReceiveProps = (newProps) =>{
           if (this.state.search === '' && newProps != ('' || undefined)){
        fetch(`https://newsapi.org/v2/top-headlines?country=${this.changeCountryName(newProps.country)}&pageSize=5&apiKey=61077b6f395742a9aff9bb1e76ff769a`)
        .then(res => {
          return res.json();
        })
        .then(json => {
            console.log(json)
          this.setState({data: json.articles})
          console.log(this.state)
          }); 
        } else {
            fetch(`https://newsapi.org/v2/top-headlines?country=${this.changeCountryName(newProps.country)}&category=${this.state.search}&pageSize=5&apiKey=61077b6f395742a9aff9bb1e76ff769a`)
        .then(res => {
          return res.json();
        })
        .then(json => {
            console.log(json)
          this.setState({data: json.articles})
          console.log(this.state)
          }); 
        }
       }
    
    changeCountryName = (x) =>{
       const arr1 = ['Argentina', 'Australia', 'Austria', 'Belgium', 'Brazil', 'Bulgaria', 'Canada', 'China', 'Colombia', 'Cuba', 'Czech Republic', 'Egypt', 'France', 'Germany', 'Greece', 'Hong Kong', 'Hungary', 'India', 'Indonesia', 'Ireland', 'Israel', 'Italy', 'Japan', 'Latvia', 'Lithuania', 'Malaysia', 'Mexico', 'Morocco', 'Netherlands', 'New Zealand', 'Nigeria', 'Norway', 'Philippines', 'Poland', 'Portugal', 'Romania', 'Russia', 'Saudi Arabia', 'Serbia', 'Singapore', 'Slovakia', 'Slovenia', 'South Africa', 'South Korea', 'Sweden', 'Switzerland', 'Taiwan', 'Thailand', 'Turkey', 'UAE', 'Ukraine', 'United Kingdom', 'United States', 'Venezuela']
       const  arr2 = ['ar', 'au','at','be','br','bg','ca','cn','co','cu','cz','eg','fr','de','gr','hk','hu','in','id','ie','il','it','jp','lv','ly','my','mx','ma','nl','nz','ng','no','ph','pl','pt','ro','ru','sa','rs','sg','sk','si','za','kr','se','ch','tw','th','tr','ae','ua','gb','us','ve']
        const pos = arr1.indexOf(x)
        return arr2[pos]
    }   

    _handleChange = (event) => {
        this.setState({ search: event.target.value })
        console.log(this.state)
      }


render() {
    const { data } = this.state
    console.log(this.state)
    return(
        <div className='newsContainer'>
        <div>news</div>
    {data.map( (x) =><div><ul><a href={x.url} target="_blank">{x.title}</a>{x.urlToImage ? <img src={x.urlToImage} style={{height: 50}}/> : false}</ul></div>)}
        <form onSubmit={this._handleSubmit}>
          <label>
            Category:
            <input type='text' onChange={this._handleChange} value={this.state.search} />
          </label>
          </form>
       </div>   
    )
}

}

export default News