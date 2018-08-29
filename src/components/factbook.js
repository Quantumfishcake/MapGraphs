import React from 'react'
import axios from 'axios'
import Pies from './Pie.js'

const countries = ['af', 'Afghanistan', 'al', 'Albania', 'ag', 'Algeria', 'an', 'Andorra', 'ao', 'Angola', 'ac', 'Antigua and Barbuda', 'ar', 'Argentina', 'am', 'Armenia', 'as', 'Australia', 'au', 'Austria', 'aj', 'Azerbaijan', 'bf', 'The Bahamas', 'ba', 'Bahrain', 'bg', 'Bangladesh', 'bb', 'Barbados', 'bo', 'Belarus', 'be', 'Belgium', 'bh', 'Belize', 'bn', 'Benin', 'bt', 'Bhutan', 'bl', 'Bolivia', 'bk', 'Bosnia and Herzegovina', 'bc', 'Botswana', 'br', 'Brazil', 'bx', 'Brunei', 'bu', 'Bulgaria', 'uv', 'Burkina Faso', 'bm', 'Burma', 'by', 'Burundi', 'cb', 'Cambodia', 'cm', 'Cameroon', 'ca', 'Canada', 'cv', 'Cape Verde', 'ct', 'Central African Republic', 'cd', 'Chad', 'ci', 'Chile', 'ch', 'China', 'co', 'Colombia', 'cn', 'Comoros', 'cg', 'Congo', 'DR', 'cf', 'Congo', 'cs', 'Costa Rica', 'iv', 'Cote d"Ivoire', 'hr', 'Croatia', 'cu', 'Cuba', 'cy', 'Cyprus', 'ez', 'Czech Republic', 'da', 'Denmark', 'dj', 'Djibouti', 'do', 'Dominica', 'dr', 'Dominican Republic', 'ec', 'Ecuador', 'eg', 'Egypt', 'es', 'El Salvador', 'ek', 'Equatorial Guinea', 'er', 'Eritrea', 'en', 'Estonia', 'et', 'Ethiopia', 'fj', 'Fiji', 'fi', 'Finland', 'fr', 'France', 'gb', 'Gabon', 'ga', 'The Gambia', 'gg', 'Georgia', 'gm', 'Germany', 'gh', 'Ghana', 'gr', 'Greece', 'gj', 'Grenada', 'gt', 'Guatemala', 'gv', 'Guinea', 'pu', 'Guinea-Bissau', 'gy', 'Guyana', 'ha', 'Haiti', 'ho', 'Honduras', 'hu', 'Hungary', 'ic', 'Iceland', 'in', 'India', 'id', 'Indonesia', 'ir', 'Iran', 'iz', 'Iraq', 'ei', 'Ireland', 'is', 'Israel', 'it', 'Italy', 'jm', 'Jamaica', 'ja', 'Japan', 'jo', 'Jordan', 'kz', 'Kazakhstan', 'ke', 'Kenya', 'kr', 'Kiribati', 'kn', 'North Korea', 'ks', 'South Korea', 'kv', 'Kosovo', 'ku', 'Kuwait', 'kg', 'Kyrgyzstan', 'la', 'Laos', 'lg', 'Latvia', 'le', 'Lebanon', 'lt', 'Lesotho', 'li', 'Liberia', 'ly', 'Libya', 'ls', 'Liechtenstein', 'lh', 'Lithuania', 'lu', 'Luxembourg', 'mk', 'Macedonia', 'ma', 'Madagascar', 'mi', 'Malawi', 'my', 'Malaysia', 'mv', 'Maldives', 'ml', 'Mali', 'mt', 'Malta', 'rm', 'Marshall', 'Islands', 'mr', 'Mauritania', 'mp', 'Mauritius', 'mx', 'Mexico', 'fm', 'Micronesia', 'md', 'Moldova', 'mn', 'Monaco', 'mg', 'Mongolia', 'mj', 'Montenegro', 'mo', 'Morocco', 'mz', 'Mozambique', 'wa', 'Namibia', 'nr', 'Nauru', 'np', 'Nepal', 'nl', 'Netherlands', 'nz', 'New Zealand', 'nu', 'Nicaragua', 'ng', 'Niger', 'ni', 'Nigeria', 'no', 'Norway', 'mu', 'Oman', 'pk', 'Pakistan', 'ps', 'Palau', 'pm', 'Panama', 'pp', 'Papua New Guinea', 'pa', 'Paraguay', 'pe', 'Peru', 'rp', 'Philippines', 'pl', 'Poland', 'po', 'Portugal', 'qa', 'Qatar', 'ro', 'Romania', 'rs', 'Russia', 'rw', 'Rwanda', 'sc', 'Saint Kitts and Nevis', 'st', 'Saint Lucia', 'vc', 'Saint Vincent and the Grenadines', 'ws', 'Samoa', 'sm', 'San Marino', 'tp', 'Sao Tome and Principe', 'sa', 'Saudi Arabia', 'sg', 'Senegal', 'ri', 'Serbia', 'se', 'Seychelles', 'sl', 'Sierra', 'Leone', 'sn', 'Singapore', 'lo', 'Slovakia', 'si', 'Slovenia', 'bp', 'Solomon Islands', 'so', 'Somalia', 'sf', 'South Africa', 'od', 'South Sudan', 'sp', 'Spain', 'ce', 'Sri Lanka', 'su', 'Sudan', 'ns', 'Suriname', 'wz', 'Swaziland', 'sw', 'Sweden', 'sz', 'Switzerland', 'sy', 'Syria', 'ti', 'Tajikistan', 'tz', 'Tanzania', 'th', 'Thailand', 'tt', 'Timor-Leste', 'to', 'Togo', 'tn', 'Tonga', 'td', 'Trinidad and Tobago', 'ts', 'Tunisia', 'tu', 'Turkey', 'tx', 'Turkmenistan', 'tv', 'Tuvalu', 'ug', 'Uganda', 'up', 'Ukraine', 'ae', 'United Arab Emirates', 'uk', 'United Kingdom', 'us', 'United States', 'uy', 'Uruguay', 'uz', 'Uzbekistan', 'nh', 'Vanuatu', 'vt', 'Vatican City', 've', 'Venezuela', 'vm', 'Vietnam', 'Y', 'ym', 'Yemen', 'za', 'Zambia', 'zi', 'Zimbabwe']

const countries2 = ['south-asia/af', 'Afghanistan', 'europe/al', 'Albania', 'africa/ag', 'Algeria', 'europe/an', 'Andorra', 'africa/ao', 'Angola', 'central-america-n-caribbean/ac', 'Antigua and Barbuda', 'south-america/ar', 'Argentina', 'europe/am', 'Armenia', 'australia-oceania/as', 'Australia', 'europe/au', 'Austria', 'middle-east/aj', 'Azerbaijan', 'central-america-n-caribbean/bf', 'The Bahamas', 'middle-east/ba', 'Bahrain', 'south-asia/bg', 'Bangladesh', 'central-america-n-caribbean/bb', 'Barbados', 'europe/bo', 'Belarus', 'europe/be', 'Belgium', 'central-america-n-caribbean/bh', 'Belize', 'africa/bn', 'Benin', 'south-asia/bt', 'Bhutan', 'south-america/bl', 'Bolivia', 'europe/bk', 'Bosnia and Herzegovina', 'bc', 'Botswana', 'br', 'Brazil', 'bx', 'Brunei', 'bu', 'Bulgaria', 'uv', 'Burkina Faso', 'bm', 'Burma', 'by', 'Burundi', 'cb', 'Cambodia', 'cm', 'Cameroon', 'ca', 'Canada', 'cv', 'Cape Verde', 'ct', 'Central African Republic', 'cd', 'Chad', 'ci', 'Chile', 'ch', 'China', 'co', 'Colombia', 'cn', 'Comoros', 'cg', 'Congo', 'DR', 'cf', 'Congo', 'cs', 'Costa Rica', 'iv', 'Cote d"Ivoire', 'hr', 'Croatia', 'cu', 'Cuba', 'cy', 'Cyprus', 'ez', 'Czech Republic', 'da', 'Denmark', 'dj', 'Djibouti', 'do', 'Dominica', 'dr', 'Dominican Republic', 'ec', 'Ecuador', 'eg', 'Egypt', 'es', 'El Salvador', 'ek', 'Equatorial Guinea', 'er', 'Eritrea', 'en', 'Estonia', 'et', 'Ethiopia', 'fj', 'Fiji', 'fi', 'Finland', 'fr', 'France', 'gb', 'Gabon', 'ga', 'The Gambia', 'gg', 'Georgia', 'gm', 'Germany', 'gh', 'Ghana', 'gr', 'Greece', 'gj', 'Grenada', 'gt', 'Guatemala', 'gv', 'Guinea', 'pu', 'Guinea-Bissau', 'gy', 'Guyana', 'ha', 'Haiti', 'ho', 'Honduras', 'hu', 'Hungary', 'ic', 'Iceland', 'south-asia/in', 'India', 'id', 'Indonesia', 'ir', 'Iran', 'iz', 'Iraq', 'ei', 'Ireland', 'is', 'Israel', 'it', 'Italy', 'jm', 'Jamaica', 'ja', 'Japan', 'jo', 'Jordan', 'kz', 'Kazakhstan', 'ke', 'Kenya', 'kr', 'Kiribati', 'kn', 'North Korea', 'ks', 'South Korea', 'kv', 'Kosovo', 'ku', 'Kuwait', 'kg', 'Kyrgyzstan', 'la', 'Laos', 'lg', 'Latvia', 'le', 'Lebanon', 'lt', 'Lesotho', 'li', 'Liberia', 'ly', 'Libya', 'ls', 'Liechtenstein', 'lh', 'Lithuania', 'lu', 'Luxembourg', 'mk', 'Macedonia', 'ma', 'Madagascar', 'mi', 'Malawi', 'my', 'Malaysia', 'mv', 'Maldives', 'ml', 'Mali', 'mt', 'Malta', 'rm', 'Marshall', 'Islands', 'mr', 'Mauritania', 'mp', 'Mauritius', 'mx', 'Mexico', 'fm', 'Micronesia', 'md', 'Moldova', 'mn', 'Monaco', 'mg', 'Mongolia', 'mj', 'Montenegro', 'mo', 'Morocco', 'mz', 'Mozambique', 'wa', 'Namibia', 'nr', 'Nauru', 'np', 'Nepal', 'nl', 'Netherlands', 'nz', 'New Zealand', 'nu', 'Nicaragua', 'ng', 'Niger', 'ni', 'Nigeria', 'no', 'Norway', 'mu', 'Oman', 'pk', 'Pakistan', 'ps', 'Palau', 'pm', 'Panama', 'pp', 'Papua New Guinea', 'pa', 'Paraguay', 'pe', 'Peru', 'rp', 'Philippines', 'pl', 'Poland', 'po', 'Portugal', 'qa', 'Qatar', 'ro', 'Romania', 'rs', 'Russia', 'rw', 'Rwanda', 'sc', 'Saint Kitts and Nevis', 'st', 'Saint Lucia', 'vc', 'Saint Vincent and the Grenadines', 'ws', 'Samoa', 'sm', 'San Marino', 'tp', 'Sao Tome and Principe', 'sa', 'Saudi Arabia', 'sg', 'Senegal', 'ri', 'Serbia', 'se', 'Seychelles', 'sl', 'Sierra', 'Leone', 'sn', 'Singapore', 'lo', 'Slovakia', 'si', 'Slovenia', 'bp', 'Solomon Islands', 'so', 'Somalia', 'sf', 'South Africa', 'od', 'South Sudan', 'sp', 'Spain', 'ce', 'Sri Lanka', 'su', 'Sudan', 'ns', 'Suriname', 'wz', 'Swaziland', 'sw', 'Sweden', 'sz', 'Switzerland', 'sy', 'Syria', 'ti', 'Tajikistan', 'tz', 'Tanzania', 'th', 'Thailand', 'tt', 'Timor-Leste', 'to', 'Togo', 'tn', 'Tonga', 'td', 'Trinidad and Tobago', 'ts', 'Tunisia', 'tu', 'Turkey', 'tx', 'Turkmenistan', 'tv', 'Tuvalu', 'ug', 'Uganda', 'up', 'Ukraine', 'ae', 'United Arab Emirates', 'uk', 'United Kingdom', 'us', 'United States', 'uy', 'Uruguay', 'uz', 'Uzbekistan', 'nh', 'Vanuatu', 'vt', 'Vatican City', 've', 'Venezuela', 'vm', 'Vietnam', 'Y', 'ym', 'Yemen', 'za', 'Zambia', 'zi', 'Zimbabwe']

class FactBook extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      country: '',
      country2: '',
      data: {},
      search: '',
      economy: {}
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
          country2: newProps.country,
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
    const { data, economy, people, people2 } = this.state
    console.log(this.state)
    return (
      <div className='weather'>
        <div>BookFact</div>
        <div>{economy && economy['GDP (official exchange rate)'] && economy['GDP (official exchange rate)'].text}</div>
        <Pies languages={people && people} languages2={people2 && people2} />
      </div>
    )
  }

}

export default FactBook