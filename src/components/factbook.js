import React from 'react'
import axios from 'axios'
import Pies from './Pie.js'
import BarStack2 from './barstack2.js'
import Geography from './geography.js'
import People from './people.js'
import PopMix from './popmix'
import Population3 from './population3.js'
import Population4 from './population60.js'
import JoinBars from './joinbars.js'
import PopulationComparison from './populationComparison.js'



const countries = ['af', 'Afghanistan', 'al', 'Albania', 'ag', 'Algeria', 'an', 'Andorra', 'ao', 'Angola', 'ac', 'Antigua and Barbuda', 'ar', 'Argentina', 'am', 'Armenia', 'as', 'Australia', 'au', 'Austria', 'aj', 'Azerbaijan', 'bf', 'The Bahamas', 'ba', 'Bahrain', 'bg', 'Bangladesh', 'bb', 'Barbados', 'bo', 'Belarus', 'be', 'Belgium', 'bh', 'Belize', 'bn', 'Benin', 'bt', 'Bhutan', 'bl', 'Bolivia', 'bk', 'Bosnia and Herzegovina', 'bc', 'Botswana', 'br', 'Brazil', 'bx', 'Brunei', 'bu', 'Bulgaria', 'uv', 'Burkina Faso', 'bm', 'Burma', 'by', 'Burundi', 'cb', 'Cambodia', 'cm', 'Cameroon', 'ca', 'Canada', 'cv', 'Cape Verde', 'ct', 'Central African Republic', 'cd', 'Chad', 'ci', 'Chile', 'ch', 'China', 'co', 'Colombia', 'cn', 'Comoros', 'cg', 'Congo', 'DR', 'cf', 'Congo', 'cs', 'Costa Rica', 'iv', 'Cote d"Ivoire', 'hr', 'Croatia', 'cu', 'Cuba', 'cy', 'Cyprus', 'ez', 'Czech Republic', 'da', 'Denmark', 'dj', 'Djibouti', 'do', 'Dominica', 'dr', 'Dominican Republic', 'ec', 'Ecuador', 'eg', 'Egypt', 'es', 'El Salvador', 'ek', 'Equatorial Guinea', 'er', 'Eritrea', 'en', 'Estonia', 'et', 'Ethiopia', 'fj', 'Fiji', 'fi', 'Finland', 'fr', 'France', 'gb', 'Gabon', 'ga', 'The Gambia', 'gg', 'Georgia', 'gm', 'Germany', 'gh', 'Ghana', 'gr', 'Greece', 'gj', 'Grenada', 'gt', 'Guatemala', 'gv', 'Guinea', 'pu', 'Guinea-Bissau', 'gy', 'Guyana', 'ha', 'Haiti', 'ho', 'Honduras', 'hu', 'Hungary', 'ic', 'Iceland', 'in', 'India', 'id', 'Indonesia', 'ir', 'Iran', 'iz', 'Iraq', 'ei', 'Ireland', 'is', 'Israel', 'it', 'Italy', 'jm', 'Jamaica', 'ja', 'Japan', 'jo', 'Jordan', 'kz', 'Kazakhstan', 'ke', 'Kenya', 'kr', 'Kiribati', 'kn', 'North Korea', 'ks', 'South Korea', 'kv', 'Kosovo', 'ku', 'Kuwait', 'kg', 'Kyrgyzstan', 'la', 'Laos', 'lg', 'Latvia', 'le', 'Lebanon', 'lt', 'Lesotho', 'li', 'Liberia', 'ly', 'Libya', 'ls', 'Liechtenstein', 'lh', 'Lithuania', 'lu', 'Luxembourg', 'mk', 'Macedonia', 'ma', 'Madagascar', 'mi', 'Malawi', 'my', 'Malaysia', 'mv', 'Maldives', 'ml', 'Mali', 'mt', 'Malta', 'rm', 'Marshall', 'Islands', 'mr', 'Mauritania', 'mp', 'Mauritius', 'mx', 'Mexico', 'fm', 'Micronesia', 'md', 'Moldova', 'mn', 'Monaco', 'mg', 'Mongolia', 'mj', 'Montenegro', 'mo', 'Morocco', 'mz', 'Mozambique', 'wa', 'Namibia', 'nr', 'Nauru', 'np', 'Nepal', 'nl', 'Netherlands', 'nz', 'New Zealand', 'nu', 'Nicaragua', 'ng', 'Niger', 'ni', 'Nigeria', 'no', 'Norway', 'mu', 'Oman', 'pk', 'Pakistan', 'ps', 'Palau', 'pm', 'Panama', 'pp', 'Papua New Guinea', 'pa', 'Paraguay', 'pe', 'Peru', 'rp', 'Philippines', 'pl', 'Poland', 'po', 'Portugal', 'qa', 'Qatar', 'ro', 'Romania', 'rs', 'Russia', 'rw', 'Rwanda', 'sc', 'Saint Kitts and Nevis', 'st', 'Saint Lucia', 'vc', 'Saint Vincent and the Grenadines', 'ws', 'Samoa', 'sm', 'San Marino', 'tp', 'Sao Tome and Principe', 'sa', 'Saudi Arabia', 'sg', 'Senegal', 'ri', 'Serbia', 'se', 'Seychelles', 'sl', 'Sierra', 'Leone', 'sn', 'Singapore', 'lo', 'Slovakia', 'si', 'Slovenia', 'bp', 'Solomon Islands', 'so', 'Somalia', 'sf', 'South Africa', 'od', 'South Sudan', 'sp', 'Spain', 'ce', 'Sri Lanka', 'su', 'Sudan', 'ns', 'Suriname', 'wz', 'Swaziland', 'sw', 'Sweden', 'sz', 'Switzerland', 'sy', 'Syria', 'ti', 'Tajikistan', 'tz', 'Tanzania', 'th', 'Thailand', 'tt', 'Timor-Leste', 'to', 'Togo', 'tn', 'Tonga', 'td', 'Trinidad and Tobago', 'ts', 'Tunisia', 'tu', 'Turkey', 'tx', 'Turkmenistan', 'tv', 'Tuvalu', 'ug', 'Uganda', 'up', 'Ukraine', 'ae', 'United Arab Emirates', 'uk', 'United Kingdom', 'us', 'United States', 'uy', 'Uruguay', 'uz', 'Uzbekistan', 'nh', 'Vanuatu', 'vt', 'Vatican City', 've', 'Venezuela', 'vm', 'Vietnam', 'Y', 'ym', 'Yemen', 'za', 'Zambia', 'zi', 'Zimbabwe']

const countries2 = ['south-asia/af', 'Afghanistan', 'europe/al', 'Albania', 'africa/ag', 'Algeria', 'europe/an', 'Andorra', 'africa/ao', 'Angola', 'central-america-n-caribbean/ac', 'Antigua and Barbuda', 'south-america/ar', 'Argentina', 'europe/am', 'Armenia', 'australia-oceania/as', 'Australia', 'europe/au', 'Austria', 'middle-east/aj', 'Azerbaijan', 'central-america-n-caribbean/bf', 'The Bahamas', 'middle-east/ba', 'Bahrain', 'south-asia/bg', 'Bangladesh', 'central-america-n-caribbean/bb', 'Barbados', 'europe/bo', 'Belarus', 'europe/be', 'Belgium', 'central-america-n-caribbean/bh', 'Belize', 'africa/bn', 'Benin', 'south-asia/bt', 'Bhutan', 'south-america/bl', 'Bolivia', 'europe/bk', 'Bosnia and Herzegovina', 'africa/bc', 'Botswana', 'south-america/br', 'Brazil', 'east-n-southeast-asia/bx', 'Brunei', 'europe/bu', 'Bulgaria', 'africa/uv', 'Burkina Faso', 'east-n-southeast-asia/bm', 'Burma', 'africa/by', 'Burundi', 'east-n-southeast-asia/cb', 'Cambodia', 'africa/cm', 'Cameroon', 'north-america/ca', 'Canada', 'africa/cv', 'Cape Verde', 'africa/ct', 'Central African Republic', 'africa/cd', 'Chad', 'south-america/ci', 'Chile', 'east-n-southeast-asia/ch', 'China', 'south-america/co', 'Colombia', 'africa/cn', 'Comoros', 'africa/cg', 'Congo', 'DR', 'africa/cf', 'Congo', 'central-america-n-caribbean/cs', 'Costa Rica', 'africa/iv', 'Cote d"Ivoire', 'europe/hr', 'Croatia', 'central-america-n-caribbean/cu', 'Cuba', 'europe/cy', 'Cyprus', 'europe/ez', 'Czech Republic', 'europe/da', 'Denmark', 'africa/dj', 'Djibouti', 'central-america-n-caribbean/do', 'Dominica', 'central-america-n-caribbean/dr', 'Dominican Republic', 'south-america/ec', 'Ecuador', 'africa/eg', 'Egypt', 'central-america-n-caribbean/es', 'El Salvador', 'africa/ek', 'Equatorial Guinea', 'africa/er', 'Eritrea', 'europe/en', 'Estonia', 'africa/et', 'Ethiopia', 'australia-oceania/fj', 'Fiji', 'europe/fi', 'Finland', 'europe/fr', 'France', 'africa/gb', 'Gabon', 'africa/ga', 'The Gambia', 'europe/gg', 'Georgia', 'europe/gm', 'Germany', 'africa/gh', 'Ghana', 'europe/gr', 'Greece', 'central-america-n-caribbean/gj', 'Grenada', 'central-america-n-caribbean/gt', 'Guatemala', 'africa/gv', 'Guinea', 'africa/pu', 'Guinea-Bissau', 'africa/gy', 'Guyana', 'central-america-n-caribbean/ha', 'Haiti', 'central-america-n-caribbean/ho', 'Honduras', 'europe/hu', 'Hungary', 'europe/ic', 'Iceland', 'south-asia/in', 'India', 'east-n-southeast-asia/id', 'Indonesia', 'middle-east/ir', 'Iran', 'middle-east/iz', 'Iraq', 'europe/ei', 'Ireland', 'middle-east/is', 'Israel', 'europe/it', 'Italy', 'central-america-n-caribbean/jm', 'Jamaica', 'east-n-southeast-asia/ja', 'Japan', 'middle-east/jo', 'Jordan', 'central-asia/kz', 'Kazakhstan', 'africa/ke', 'Kenya', 'australia-oceania/kr', 'Kiribati', 'east-n-southeast-asia/kn', 'North Korea', 'east-n-southeast-asia/ks', 'South Korea', 'europe/kv', 'Kosovo', 'middle-east/ku', 'Kuwait', 'central-asia/kg', 'Kyrgyzstan', 'east-n-southeast-asia/la', 'Laos', 'europe/lg', 'Latvia', 'middle-east/le', 'Lebanon', 'africa/lt', 'Lesotho', 'africa/li', 'Liberia', 'africa/ly', 'Libya', 'europe/ls', 'Liechtenstein', 'europe/lh', 'Lithuania', 'europe/lu', 'Luxembourg', 'europe/mk', 'Macedonia', 'africa/ma', 'Madagascar', 'africa/mi', 'Malawi', 'east-n-southeast-asia/my', 'Malaysia', 'south-asia/mv', 'Maldives', 'africa/ml', 'Mali', 'europe/mt', 'Malta', 'rm', 'Marshall', 'Islands', 'mr', 'Mauritania', 'mp', 'Mauritius', 'north-america/mx', 'Mexico', 'fm', 'Micronesia', 'europe/md', 'Moldova', 'europe/mn', 'Monaco', 'east-n-southeast-asia/mg', 'Mongolia', 'europe/mj', 'Montenegro', 'africa/mo', 'Morocco', 'africa/mz', 'Mozambique', 'africa/wa', 'Namibia', 'australia-oceania/nr', 'Nauru', 'south-asia/np', 'Nepal', 'europe/nl', 'Netherlands', 'australia-oceania/nz', 'New Zealand', 'central-america-n-caribbean/nu', 'Nicaragua', 'africa/ng', 'Niger', 'africa/ni', 'Nigeria', 'europe/no', 'Norway', 'middle-east/mu', 'Oman', 'south-asia/pk', 'Pakistan', 'australia-oceania/ps', 'Palau', 'central-america-n-caribbean/pm', 'Panama', 'australia-oceania/pp', 'Papua New Guinea', 'pa', 'south-america/Paraguay', 'south-america/pe', 'Peru', 'east-n-southeast-asia/rp', 'Philippines', 'europe/pl', 'Poland', 'europe/po', 'Portugal', 'middle-east/qa', 'Qatar', 'europe/ro', 'Romania', 'europe/rs', 'Russia', 'rafrica/w', 'Rwanda', 'sc', 'Saint Kitts and Nevis', 'st', 'Saint Lucia', 'vc', 'Saint Vincent and the Grenadines', 'australia-oceania/ws', 'Samoa', 'sm', 'San Marino', 'tp', 'Sao Tome and Principe', 'middle-east/sa', 'Saudi Arabia', 'africa/sg', 'Senegal', 'europe/ri', 'Serbia', 'se', 'Seychelles', 'africa/sl', 'Sierra', 'Leone', 'east-n-southeast-asia/sn', 'Singapore', 'europe/lo', 'Slovakia', 'europe/si', 'Slovenia', 'australia-ocaenia/bp', 'Solomon Islands', 'africa/so', 'Somalia', 'africa/sf', 'South Africa', 'africa/od', 'South Sudan', 'europe/sp', 'Spain', 'east-n-southeast-asia/ce', 'Sri Lanka', 'africa/su', 'Sudan', 'south-america/ns', 'Suriname', 'africa/wz', 'Swaziland', 'europe/sw', 'Sweden', 'europe/sz', 'Switzerland', 'middle-east/sy', 'Syria', 'central-asia/ti', 'Tajikistan', 'africa/tz', 'Tanzania', 'east-n-southeast-asia/th', 'Thailand', 'tt', 'Timor-Leste', 'africa/to', 'Togo', 'australia-oceania/tn', 'Tonga', 'central-america-n-caribbean/td', 'Trinidad and Tobago', 'africa/ts', 'Tunisia', 'middle-east/tu', 'Turkey', 'central-asia/tx', 'Turkmenistan', 'tv', 'Tuvalu', 'africa/ug', 'Uganda', 'europe/up', 'Ukraine', 'middle-east/ae', 'United Arab Emirates', 'europe/uk', 'United Kingdom', 'north-america/us', 'United States', 'south-america/uy', 'Uruguay', 'central-asia/uz', 'Uzbekistan', 'australia-oceania/nh', 'Vanuatu', 'europe/vt', 'Vatican City', 'south-america/ve', 'Venezuela', 'east-n-southeast-asia/vm', 'Vietnam', 'middle-east/ym', 'Yemen', 'africa/za', 'Zambia', 'africa/zi', 'Zimbabwe']

class FactBook extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      country: '',
      country2: '',
      data: {},
      search: '',
      economy2: {},
      economy: {},
      geography2: {},
      geography: {},

    }
  };

  componentWillReceiveProps = (newProps) => {

    if (this.state.country != newProps.country) {
      axios.get(`https://raw.githubusercontent.com/factbook/factbook.json/master/${this.convertCountry(newProps.country)}.json`).then((results) => {
        console.log(results)
        this.setState({
          country: newProps.country,
          economy: results.data.Economy,
          geography: results.data.Geography,
          government: results.data.Government,
          intro: results.data.Introduction,
          military: results.data['Military and Security'],
          people: results.data['People and Society'],
          transportaion: results.data.Transportation

        })
        console.log(this.state.economy['GDP (official exchange rate)'].text)
      }

      )
    } else if (this.state.country2 != newProps.secoundcountry) {
      axios.get(`https://raw.githubusercontent.com/factbook/factbook.json/master/${this.convertCountry(newProps.secondcountry)}.json`).then((results) => {
        console.log(results)
        this.setState({
          country2: newProps.secondcountry,
          economy2: results.data.Economy,
          geography2: results.data.Geography,
          government2: results.data.Government,
          intro2: results.data.Introduction,
          military2: results.data['Military and Security'],
          people2: results.data['People and Society'],
          transportaion2: results.data.Transportation

        })
      }

      )
    }
  }

  convertCountry = (country) => {
    const index = countries2.indexOf(country)
    const result = countries2[index - 1]
    return result
  }


  _handleChange = (event) => {
    this.setState({ search: event.target.value })
    console.log(this.state)
  }


  render() {
    const { data, economy, people, people2, economy2, country, country2, geography, geography2 } = this.state
    console.log(this.state)
    return (
      <div className='weather'>
        <div>BookFact</div>
        <div>{economy && economy['GDP (official exchange rate)'] && economy['GDP (official exchange rate)'].text}</div>
        <Pies languages={people && people} languages2={people2 && people2} />

        <BarStack2 economy={economy && economy} economy2={economy2 && economy2} country={country && country} country2 ={country2 && country2} width={500} height={500} />
        <Geography geography={geography && geography} geography2={geography2 && geography2} country={country && country} country2 ={country2 && country2}/>
        
        <People people={people && people} people2={people2 && people2} country={country && country} country2 ={country2 && country2} width={500} height={500}/>
        <Population3 country={country && country}/>

      <JoinBars country={country && country} secondcountry={country2 && country2}/>
        <PopulationComparison country={country && country} secondcountry={country2 && country2}/>
        <PopMix country={country && country} secondcountry={country2 && country2}/>
      </div>
    )
  }

}

export default FactBook