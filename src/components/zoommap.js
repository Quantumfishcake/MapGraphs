import React, { Component } from "react"
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker,
} from "react-simple-maps"
import { csv } from 'd3-request';
import cities from './simplemaps-worldcities.csv'
import SliderBar from './slider.js'
import tooltip from "wsdm-tooltip"
import { scaleLinear } from "d3-scale"
import chroma from "chroma-js"
import News from './news.js'
import Weather from './weather.js'
import FactBook from './factbook.js'
import FactBook2 from './factbook2.js'
import FactBook3 from './factbook3.js'
import map from './world-50m-with-population.json'


const wrapperStyles = {
  width: "100%",
  maxHeight: 800,
  maxWidth: 1250,
  margin: "0",
}
const wrapperStyles2 = {
  width: "100%",
  maxHeight: 800,
  margin: "0",
}
const wrapperStyles3 = {
  width: "100%",
  maxWidth: 900,
  maxHeight: 700,
  margin: "0",
}

const colorScale = chroma
  .scale([
    '#FF6E40',
    'FFD740',
    '#00B8D4',
  ])
  .mode('lch')
  .colors(24)

const colorScale2 = chroma
  .scale([
    '#FF6E40',
    'FFD740',
    '#00B8D4',
  ])
  .mode('lch')
  .colors(6)

const popScale = scaleLinear()
  .domain([0, 100000000, 1400000000])
  .range(["#CFD8DC", "#607D8B", "#37474F"])

const subregions = [
  "Southern Asia",
  "Polynesia",
  "Micronesia",
  "Southern Africa",
  "Central Asia",
  "Melanesia",
  "Western Europe",
  "Central America",
  "Seven seas (open ocean)",
  "Northern Africa",
  "Caribbean",
  "South-Eastern Asia",
  "Eastern Africa",
  "Australia and New Zealand",
  "Eastern Europe",
  "Western Africa",
  "Southern Europe",
  "Eastern Asia",
  "South America",
  "Middle Africa",
  "Antarctica",
  "Northern Europe",
  "Northern America",
  "Western Asia",
]

const income_group = [
  "1. High income: OECD", "2. High income: nonOECD", '3. Upper middle income', "4. Lower middle income", "5. Low income"
]
const impCountries = ['Argentina', 'Australia', 'Austria', 'Belgium', 'Brazil', 'Bulgaria', 'Canada', 'China', 'Colombia', 'Cuba', 'Czech Republic', 'Egypt', 'France', 'Germany', 'Greece', 'Hong Kong', 'Hungary', 'India', 'Indonesia', 'Ireland', 'Israel', 'Italy', 'Japan', 'Latvia', 'Lithuania', 'Malaysia', 'Mexico', 'Morocco', 'Netherlands', 'New Zealand', 'Nigeria', 'Norway', 'Philippines', 'Poland', 'Portugal', 'Romania', 'Russia', 'Saudi Arabia', 'Serbia', 'Singapore', 'Slovakia', 'Slovenia', 'South Africa', 'South Korea', 'Sweden', 'Switzerland', 'Taiwan', 'Thailand', 'Turkey', 'UAE', 'Ukraine', 'United Kingdom', 'United States of America', 'Venezuela']


const countries = [{ "name": "Afghanistan", "alpha-2": "AF", "country-code": "004" }, { "name": "Åland Islands", "alpha-2": "AX", "country-code": "248" }, { "name": "Albania", "alpha-2": "AL", "country-code": "008" }, { "name": "Algeria", "alpha-2": "DZ", "country-code": "012" }, { "name": "American Samoa", "alpha-2": "AS", "country-code": "016" }, { "name": "Andorra", "alpha-2": "AD", "country-code": "020" }, { "name": "Angola", "alpha-2": "AO", "country-code": "024" }, { "name": "Anguilla", "alpha-2": "AI", "country-code": "660" }, { "name": "Antarctica", "alpha-2": "AQ", "country-code": "010" }, { "name": "Antigua and Barbuda", "alpha-2": "AG", "country-code": "028" }, { "name": "Argentina", "alpha-2": "AR", "country-code": "032" }, { "name": "Armenia", "alpha-2": "AM", "country-code": "051" }, { "name": "Aruba", "alpha-2": "AW", "country-code": "533" }, { "name": "Australia", "alpha-2": "AU", "country-code": "036" }, { "name": "Austria", "alpha-2": "AT", "country-code": "040" }, { "name": "Azerbaijan", "alpha-2": "AZ", "country-code": "031" }, { "name": "Bahamas", "alpha-2": "BS", "country-code": "044" }, { "name": "Bahrain", "alpha-2": "BH", "country-code": "048" }, { "name": "Bangladesh", "alpha-2": "BD", "country-code": "050" }, { "name": "Barbados", "alpha-2": "BB", "country-code": "052" }, { "name": "Belarus", "alpha-2": "BY", "country-code": "112" }, { "name": "Belgium", "alpha-2": "BE", "country-code": "056" }, { "name": "Belize", "alpha-2": "BZ", "country-code": "084" }, { "name": "Benin", "alpha-2": "BJ", "country-code": "204" }, { "name": "Bermuda", "alpha-2": "BM", "country-code": "060" }, { "name": "Bhutan", "alpha-2": "BT", "country-code": "064" }, { "name": "Bolivia (Plurinational State of)", "alpha-2": "BO", "country-code": "068" }, { "name": "Bonaire, Sint Eustatius and Saba", "alpha-2": "BQ", "country-code": "535" }, { "name": "Bosnia and Herzegovina", "alpha-2": "BA", "country-code": "070" }, { "name": "Botswana", "alpha-2": "BW", "country-code": "072" }, { "name": "Bouvet Island", "alpha-2": "BV", "country-code": "074" }, { "name": "Brazil", "alpha-2": "BR", "country-code": "076" }, { "name": "British Indian Ocean Territory", "alpha-2": "IO", "country-code": "086" }, { "name": "Brunei Darussalam", "alpha-2": "BN", "country-code": "096" }, { "name": "Bulgaria", "alpha-2": "BG", "country-code": "100" }, { "name": "Burkina Faso", "alpha-2": "BF", "country-code": "854" }, { "name": "Burundi", "alpha-2": "BI", "country-code": "108" }, { "name": "Cabo Verde", "alpha-2": "CV", "country-code": "132" }, { "name": "Cambodia", "alpha-2": "KH", "country-code": "116" }, { "name": "Cameroon", "alpha-2": "CM", "country-code": "120" }, { "name": "Canada", "alpha-2": "CA", "country-code": "124" }, { "name": "Cayman Islands", "alpha-2": "KY", "country-code": "136" }, { "name": "Central African Republic", "alpha-2": "CF", "country-code": "140" }, { "name": "Chad", "alpha-2": "TD", "country-code": "148" }, { "name": "Chile", "alpha-2": "CL", "country-code": "152" }, { "name": "China", "alpha-2": "CN", "country-code": "156" }, { "name": "Christmas Island", "alpha-2": "CX", "country-code": "162" }, { "name": "Cocos (Keeling) Islands", "alpha-2": "CC", "country-code": "166" }, { "name": "Colombia", "alpha-2": "CO", "country-code": "170" }, { "name": "Comoros", "alpha-2": "KM", "country-code": "174" }, { "name": "Congo", "alpha-2": "CG", "country-code": "178" }, { "name": "Congo (Democratic Republic of the)", "alpha-2": "CD", "country-code": "180" }, { "name": "Cook Islands", "alpha-2": "CK", "country-code": "184" }, { "name": "Costa Rica", "alpha-2": "CR", "country-code": "188" }, { "name": "Côte d'Ivoire", "alpha-2": "CI", "country-code": "384" }, { "name": "Croatia", "alpha-2": "HR", "country-code": "191" }, { "name": "Cuba", "alpha-2": "CU", "country-code": "192" }, { "name": "Curaçao", "alpha-2": "CW", "country-code": "531" }, { "name": "Cyprus", "alpha-2": "CY", "country-code": "196" }, { "name": "Czechia", "alpha-2": "CZ", "country-code": "203" }, { "name": "Denmark", "alpha-2": "DK", "country-code": "208" }, { "name": "Djibouti", "alpha-2": "DJ", "country-code": "262" }, { "name": "Dominica", "alpha-2": "DM", "country-code": "212" }, { "name": "Dominican Republic", "alpha-2": "DO", "country-code": "214" }, { "name": "Ecuador", "alpha-2": "EC", "country-code": "218" }, { "name": "Egypt", "alpha-2": "EG", "country-code": "818" }, { "name": "El Salvador", "alpha-2": "SV", "country-code": "222" }, { "name": "Equatorial Guinea", "alpha-2": "GQ", "country-code": "226" }, { "name": "Eritrea", "alpha-2": "ER", "country-code": "232" }, { "name": "Estonia", "alpha-2": "EE", "country-code": "233" }, { "name": "Eswatini", "alpha-2": "SZ", "country-code": "748" }, { "name": "Ethiopia", "alpha-2": "ET", "country-code": "231" }, { "name": "Falkland Islands (Malvinas)", "alpha-2": "FK", "country-code": "238" }, { "name": "Faroe Islands", "alpha-2": "FO", "country-code": "234" }, { "name": "Fiji", "alpha-2": "FJ", "country-code": "242" }, { "name": "Finland", "alpha-2": "FI", "country-code": "246" }, { "name": "France", "alpha-2": "FR", "country-code": "250" }, { "name": "French Guiana", "alpha-2": "GF", "country-code": "254" }, { "name": "French Polynesia", "alpha-2": "PF", "country-code": "258" }, { "name": "French Southern Territories", "alpha-2": "TF", "country-code": "260" }, { "name": "Gabon", "alpha-2": "GA", "country-code": "266" }, { "name": "Gambia", "alpha-2": "GM", "country-code": "270" }, { "name": "Georgia", "alpha-2": "GE", "country-code": "268" }, { "name": "Germany", "alpha-2": "DE", "country-code": "276" }, { "name": "Ghana", "alpha-2": "GH", "country-code": "288" }, { "name": "Gibraltar", "alpha-2": "GI", "country-code": "292" }, { "name": "Greece", "alpha-2": "GR", "country-code": "300" }, { "name": "Greenland", "alpha-2": "GL", "country-code": "304" }, { "name": "Grenada", "alpha-2": "GD", "country-code": "308" }, { "name": "Guadeloupe", "alpha-2": "GP", "country-code": "312" }, { "name": "Guam", "alpha-2": "GU", "country-code": "316" }, { "name": "Guatemala", "alpha-2": "GT", "country-code": "320" }, { "name": "Guernsey", "alpha-2": "GG", "country-code": "831" }, { "name": "Guinea", "alpha-2": "GN", "country-code": "324" }, { "name": "Guinea-Bissau", "alpha-2": "GW", "country-code": "624" }, { "name": "Guyana", "alpha-2": "GY", "country-code": "328" }, { "name": "Haiti", "alpha-2": "HT", "country-code": "332" }, { "name": "Heard Island and McDonald Islands", "alpha-2": "HM", "country-code": "334" }, { "name": "Holy See", "alpha-2": "VA", "country-code": "336" }, { "name": "Honduras", "alpha-2": "HN", "country-code": "340" }, { "name": "Hong Kong", "alpha-2": "HK", "country-code": "344" }, { "name": "Hungary", "alpha-2": "HU", "country-code": "348" }, { "name": "Iceland", "alpha-2": "IS", "country-code": "352" }, { "name": "India", "alpha-2": "IN", "country-code": "356" }, { "name": "Indonesia", "alpha-2": "ID", "country-code": "360" }, { "name": "Iran (Islamic Republic of)", "alpha-2": "IR", "country-code": "364" }, { "name": "Iraq", "alpha-2": "IQ", "country-code": "368" }, { "name": "Ireland", "alpha-2": "IE", "country-code": "372" }, { "name": "Isle of Man", "alpha-2": "IM", "country-code": "833" }, { "name": "Israel", "alpha-2": "IL", "country-code": "376" }, { "name": "Italy", "alpha-2": "IT", "country-code": "380" }, { "name": "Jamaica", "alpha-2": "JM", "country-code": "388" }, { "name": "Japan", "alpha-2": "JP", "country-code": "392" }, { "name": "Jersey", "alpha-2": "JE", "country-code": "832" }, { "name": "Jordan", "alpha-2": "JO", "country-code": "400" }, { "name": "Kazakhstan", "alpha-2": "KZ", "country-code": "398" }, { "name": "Kenya", "alpha-2": "KE", "country-code": "404" }, { "name": "Kiribati", "alpha-2": "KI", "country-code": "296" }, { "name": "Korea (Democratic People's Republic of)", "alpha-2": "KP", "country-code": "408" }, { "name": "Korea (Republic of)", "alpha-2": "KR", "country-code": "410" }, { "name": "Kuwait", "alpha-2": "KW", "country-code": "414" }, { "name": "Kyrgyzstan", "alpha-2": "KG", "country-code": "417" }, { "name": "Lao People's Democratic Republic", "alpha-2": "LA", "country-code": "418" }, { "name": "Latvia", "alpha-2": "LV", "country-code": "428" }, { "name": "Lebanon", "alpha-2": "LB", "country-code": "422" }, { "name": "Lesotho", "alpha-2": "LS", "country-code": "426" }, { "name": "Liberia", "alpha-2": "LR", "country-code": "430" }, { "name": "Libya", "alpha-2": "LY", "country-code": "434" }, { "name": "Liechtenstein", "alpha-2": "LI", "country-code": "438" }, { "name": "Lithuania", "alpha-2": "LT", "country-code": "440" }, { "name": "Luxembourg", "alpha-2": "LU", "country-code": "442" }, { "name": "Macao", "alpha-2": "MO", "country-code": "446" }, { "name": "Macedonia (the former Yugoslav Republic of)", "alpha-2": "MK", "country-code": "807" }, { "name": "Madagascar", "alpha-2": "MG", "country-code": "450" }, { "name": "Malawi", "alpha-2": "MW", "country-code": "454" }, { "name": "Malaysia", "alpha-2": "MY", "country-code": "458" }, { "name": "Maldives", "alpha-2": "MV", "country-code": "462" }, { "name": "Mali", "alpha-2": "ML", "country-code": "466" }, { "name": "Malta", "alpha-2": "MT", "country-code": "470" }, { "name": "Marshall Islands", "alpha-2": "MH", "country-code": "584" }, { "name": "Martinique", "alpha-2": "MQ", "country-code": "474" }, { "name": "Mauritania", "alpha-2": "MR", "country-code": "478" }, { "name": "Mauritius", "alpha-2": "MU", "country-code": "480" }, { "name": "Mayotte", "alpha-2": "YT", "country-code": "175" }, { "name": "Mexico", "alpha-2": "MX", "country-code": "484" }, { "name": "Micronesia (Federated States of)", "alpha-2": "FM", "country-code": "583" }, { "name": "Moldova (Republic of)", "alpha-2": "MD", "country-code": "498" }, { "name": "Monaco", "alpha-2": "MC", "country-code": "492" }, { "name": "Mongolia", "alpha-2": "MN", "country-code": "496" }, { "name": "Montenegro", "alpha-2": "ME", "country-code": "499" }, { "name": "Montserrat", "alpha-2": "MS", "country-code": "500" }, { "name": "Morocco", "alpha-2": "MA", "country-code": "504" }, { "name": "Mozambique", "alpha-2": "MZ", "country-code": "508" }, { "name": "Myanmar", "alpha-2": "MM", "country-code": "104" }, { "name": "Namibia", "alpha-2": "NA", "country-code": "516" }, { "name": "Nauru", "alpha-2": "NR", "country-code": "520" }, { "name": "Nepal", "alpha-2": "NP", "country-code": "524" }, { "name": "Netherlands", "alpha-2": "NL", "country-code": "528" }, { "name": "New Caledonia", "alpha-2": "NC", "country-code": "540" }, { "name": "New Zealand", "alpha-2": "NZ", "country-code": "554" }, { "name": "Nicaragua", "alpha-2": "NI", "country-code": "558" }, { "name": "Niger", "alpha-2": "NE", "country-code": "562" }, { "name": "Nigeria", "alpha-2": "NG", "country-code": "566" }, { "name": "Niue", "alpha-2": "NU", "country-code": "570" }, { "name": "Norfolk Island", "alpha-2": "NF", "country-code": "574" }, { "name": "Northern Mariana Islands", "alpha-2": "MP", "country-code": "580" }, { "name": "Norway", "alpha-2": "NO", "country-code": "578" }, { "name": "Oman", "alpha-2": "OM", "country-code": "512" }, { "name": "Pakistan", "alpha-2": "PK", "country-code": "586" }, { "name": "Palau", "alpha-2": "PW", "country-code": "585" }, { "name": "Palestine, State of", "alpha-2": "PS", "country-code": "275" }, { "name": "Panama", "alpha-2": "PA", "country-code": "591" }, { "name": "Papua New Guinea", "alpha-2": "PG", "country-code": "598" }, { "name": "Paraguay", "alpha-2": "PY", "country-code": "600" }, { "name": "Peru", "alpha-2": "PE", "country-code": "604" }, { "name": "Philippines", "alpha-2": "PH", "country-code": "608" }, { "name": "Pitcairn", "alpha-2": "PN", "country-code": "612" }, { "name": "Poland", "alpha-2": "PL", "country-code": "616" }, { "name": "Portugal", "alpha-2": "PT", "country-code": "620" }, { "name": "Puerto Rico", "alpha-2": "PR", "country-code": "630" }, { "name": "Qatar", "alpha-2": "QA", "country-code": "634" }, { "name": "Réunion", "alpha-2": "RE", "country-code": "638" }, { "name": "Romania", "alpha-2": "RO", "country-code": "642" }, { "name": "Russian Federation", "alpha-2": "RU", "country-code": "643" }, { "name": "Rwanda", "alpha-2": "RW", "country-code": "646" }, { "name": "Saint Barthélemy", "alpha-2": "BL", "country-code": "652" }, { "name": "Saint Helena, Ascension and Tristan da Cunha", "alpha-2": "SH", "country-code": "654" }, { "name": "Saint Kitts and Nevis", "alpha-2": "KN", "country-code": "659" }, { "name": "Saint Lucia", "alpha-2": "LC", "country-code": "662" }, { "name": "Saint Martin (French part)", "alpha-2": "MF", "country-code": "663" }, { "name": "Saint Pierre and Miquelon", "alpha-2": "PM", "country-code": "666" }, { "name": "Saint Vincent and the Grenadines", "alpha-2": "VC", "country-code": "670" }, { "name": "Samoa", "alpha-2": "WS", "country-code": "882" }, { "name": "San Marino", "alpha-2": "SM", "country-code": "674" }, { "name": "Sao Tome and Principe", "alpha-2": "ST", "country-code": "678" }, { "name": "Saudi Arabia", "alpha-2": "SA", "country-code": "682" }, { "name": "Senegal", "alpha-2": "SN", "country-code": "686" }, { "name": "Serbia", "alpha-2": "RS", "country-code": "688" }, { "name": "Seychelles", "alpha-2": "SC", "country-code": "690" }, { "name": "Sierra Leone", "alpha-2": "SL", "country-code": "694" }, { "name": "Singapore", "alpha-2": "SG", "country-code": "702" }, { "name": "Sint Maarten (Dutch part)", "alpha-2": "SX", "country-code": "534" }, { "name": "Slovakia", "alpha-2": "SK", "country-code": "703" }, { "name": "Slovenia", "alpha-2": "SI", "country-code": "705" }, { "name": "Solomon Islands", "alpha-2": "SB", "country-code": "090" }, { "name": "Somalia", "alpha-2": "SO", "country-code": "706" }, { "name": "South Africa", "alpha-2": "ZA", "country-code": "710" }, { "name": "South Georgia and the South Sandwich Islands", "alpha-2": "GS", "country-code": "239" }, { "name": "South Sudan", "alpha-2": "SS", "country-code": "728" }, { "name": "Spain", "alpha-2": "ES", "country-code": "724" }, { "name": "Sri Lanka", "alpha-2": "LK", "country-code": "144" }, { "name": "Sudan", "alpha-2": "SD", "country-code": "729" }, { "name": "Suriname", "alpha-2": "SR", "country-code": "740" }, { "name": "Svalbard and Jan Mayen", "alpha-2": "SJ", "country-code": "744" }, { "name": "Sweden", "alpha-2": "SE", "country-code": "752" }, { "name": "Switzerland", "alpha-2": "CH", "country-code": "756" }, { "name": "Syrian Arab Republic", "alpha-2": "SY", "country-code": "760" }, { "name": "Taiwan, Province of China", "alpha-2": "TW", "country-code": "158" }, { "name": "Tajikistan", "alpha-2": "TJ", "country-code": "762" }, { "name": "Tanzania, United Republic of", "alpha-2": "TZ", "country-code": "834" }, { "name": "Thailand", "alpha-2": "TH", "country-code": "764" }, { "name": "Timor-Leste", "alpha-2": "TL", "country-code": "626" }, { "name": "Togo", "alpha-2": "TG", "country-code": "768" }, { "name": "Tokelau", "alpha-2": "TK", "country-code": "772" }, { "name": "Tonga", "alpha-2": "TO", "country-code": "776" }, { "name": "Trinidad and Tobago", "alpha-2": "TT", "country-code": "780" }, { "name": "Tunisia", "alpha-2": "TN", "country-code": "788" }, { "name": "Turkey", "alpha-2": "TR", "country-code": "792" }, { "name": "Turkmenistan", "alpha-2": "TM", "country-code": "795" }, { "name": "Turks and Caicos Islands", "alpha-2": "TC", "country-code": "796" }, { "name": "Tuvalu", "alpha-2": "TV", "country-code": "798" }, { "name": "Uganda", "alpha-2": "UG", "country-code": "800" }, { "name": "Ukraine", "alpha-2": "UA", "country-code": "804" }, { "name": "United Arab Emirates", "alpha-2": "AE", "country-code": "784" }, { "name": "United Kingdom of Great Britain and Northern Ireland", "alpha-2": "GB", "country-code": "826" }, { "name": "United States of America", "alpha-2": "US", "country-code": "840" }, { "name": "United States Minor Outlying Islands", "alpha-2": "UM", "country-code": "581" }, { "name": "Uruguay", "alpha-2": "UY", "country-code": "858" }, { "name": "Uzbekistan", "alpha-2": "UZ", "country-code": "860" }, { "name": "Vanuatu", "alpha-2": "VU", "country-code": "548" }, { "name": "Venezuela (Bolivarian Republic of)", "alpha-2": "VE", "country-code": "862" }, { "name": "Viet Nam", "alpha-2": "VN", "country-code": "704" }, { "name": "Virgin Islands (British)", "alpha-2": "VG", "country-code": "092" }, { "name": "Virgin Islands (U.S.)", "alpha-2": "VI", "country-code": "850" }, { "name": "Wallis and Futuna", "alpha-2": "WF", "country-code": "876" }, { "name": "Western Sahara", "alpha-2": "EH", "country-code": "732" }, { "name": "Yemen", "alpha-2": "YE", "country-code": "887" }, { "name": "Zambia", "alpha-2": "ZM", "country-code": "894" }, { "name": "Zimbabwe", "alpha-2": "ZW", "country-code": "716" }]

class ZoomPan extends Component {
  constructor(props) {
    super(props)
    this.state = {
      populationData: 1,
      center: [0, 20],
      zoom: 1,
      cities2: [],
      selectedCountry: '',
      hoverCountry: '',
      selectedCountryId: '',
      lon: '',
      lat: '',
      isZoom: false,
      weather: 'hidden',
      graphs: 'hidden'
    }
  }

  switchToPopulation = () => {
    this.setState({ populationData: 2 })
  }

  switchToRegions = () => {
    this.setState({ populationData: 3 })
  }

  switchToStandard = () => {
    this.setState({ populationData: 1 })
  }
  switchToIncome = () => {
    this.setState({ populationData: 4 })
  }

  componentDidMount() {
    this.tip = tooltip()
    this.tip.create()
  }
  handleMouseMove = (geography, evt) => {
    this.tip.show(`
      <div class="tooltip-inner">
         ${this.state.populationData == 1 ? geography.properties.admin : this.state.populationData == 2 ? geography.properties.admin + ' ' + geography.properties.pop_est.toLocaleString() : this.state.populationData == 3 ? geography.properties.admin + ' ' + geography.properties.subregion : geography.properties.admin + ' ' + geography.properties.income_grp}
      </div>
    `)
    this.tip.position({ pageX: evt.pageX, pageY: evt.pageY })
    this.setState({
      hoverCountry: geography.properties.admin
    })
  }
  handleMouseLeave = () => {
    this.tip.hide()
  }
  handleMouseMove2 = (evt) => {
    const cityId = evt.target.getAttribute("data-city")
    const city = this.state.cities2[cityId].name
    this.tip.show(`
      <div class="tooltip-inner">
      ${city}
      </div>
    `)
    this.tip.position({ pageX: evt.pageX, pageY: evt.pageY })
  }
  handleMouseLeave2 = () => {
    this.tip.hide()
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.population !== this.state.population) {
      csv(cities, (data) => {
        var result = data.filter((x) => {
          return x['pop'] > this.state.population
        })
        var result2 = result.map((d) => {
          return { name: Object.values(d)[0], coordinates: [Object.values(d)[3], + Object.values(d)[2]], population: Object.values(d)[4] }
        })
        this.setState({ cities2: result2 })

      })
    }
  }
  convertIdtoCountry = (id) => {
    return countries.filter(x => x['country-code'] == id)
  }

  handleChange = (value) => {
    this.setState({ population: value })
  }

  handleCountrySelection = (i) => {
    this.state.isZoom ? this.setState({
      lon: !i.geometry.coordinates[0][0].some(isNaN) ? i.geometry.coordinates[0][0][0] : i.geometry.coordinates[0][0][0][0],
      lat: !i.geometry.coordinates[0][0].some(isNaN) ? i.geometry.coordinates[0][0][1] : i.geometry.coordinates[0][0][0][1],
      selectedCountry: i.properties.admin,
      center: !i.geometry.coordinates[0][0].some(isNaN) ? i.geometry.coordinates[0][0] : i.geometry.coordinates[0][0][0],
      zoom: 3,
    }) :
      this.setState({
        lon: !i.geometry.coordinates[0][0].some(isNaN) ? i.geometry.coordinates[0][0][0] : i.geometry.coordinates[0][0][0][0],
        lat: !i.geometry.coordinates[0][0].some(isNaN) ? i.geometry.coordinates[0][0][1] : i.geometry.coordinates[0][0][0][1],
        selectedCountry: i.properties.admin,
        weather: 'show'

      })
  }

  handleCitySelection = (evt) => {
    const cityId = evt.target.getAttribute("data-city")
    const city = this.state.cities2[cityId]
    this.setState({
      lon: city.coordinates[0],
      lat: city.coordinates[1],
      center: city.coordinates,
      zoom: 3,
    })
  }

  switchToData = () => {
    this.setState({ graphs: 'show', weather: 'hidden' })
  }
  switchToWeather = () => {
    this.setState({ graphs: 'hidden', weather: 'show' })
  }


  handleReset = () => {
    this.setState({
      center: [0, 20],
      zoom: 1,
      selectedCountry: '',
      graphs: 'hidden'
    })
  }
  render() {
    const { populationData } = this.state
    return (
      <div>
        <div className={this.state.selectedCountry == '' ? 'MainContainer' : 'MainContainer2'} >

          <div className='MapContainer' style={{ display: this.state.selectedCountry == '' ? 'block' : 'inline-block' }}>
            <div style={this.state.selectedCountry == '' ? wrapperStyles : this.state.graphs == 'show' ? wrapperStyles3 : wrapperStyles2}>
              <div className='mapButtons'>
                <button onClick={this.switchToPopulation}>
                  Population data
                </button>
                <button onClick={this.switchToRegions}>
                  World subregions
                </button>
                <button onClick={this.switchToStandard}>
                  Standard
                </button>
                <button onClick={this.switchToIncome}>
                  Income
                </button>
           
                  <button onClick={this.handleReset}>
                    Reset
                </button>
              

              </div>
              <ComposableMap
                projectionConfig={{
                  scale: 205,
                }}
                width={900}
                height={450}
                style={{
                  width: "100%",
                  height: "auto",
                }}
              >
                <ZoomableGroup center={this.state.center} zoom={this.state.zoom}>
                  <Geographies geography={map} disableOptimization>
                    {(geographies, projection) => geographies.map((geography, i) => geography.id !== "ATA" && (
                      <Geography
                        key={i}
                        geography={geography}
                        projection={projection}
                        onMouseMove={this.handleMouseMove}
                        onMouseLeave={this.handleMouseLeave}
                        onClick={this.handleCountrySelection}


                        style={{
                          default: {
                            fill: populationData == 1 ? this.state.selectedCountry == geography.properties.admin ? 'red' : 'lightgrey' : populationData == 2 ? popScale(geography.properties.pop_est) : populationData == 4 ? colorScale2[income_group.indexOf(geography.properties.income_grp)] : colorScale[subregions.indexOf(geography.properties.subregion)],
                            fillOpacity: populationData == 1 ? (impCountries.includes(geography.properties.admin) ? 1 : 0.8) : 1 ,

                            stroke: "#607D8B",
                            strokeWidth: 0.75,
                            outline: "none",
                          },
                          hover: {
                            fill: "darkgrey",
                            stroke: "#607D8B",
                            strokeWidth: 0.75,
                            outline: "none",
                          },
                          pressed: {
                            fill: "darkgrey",
                            stroke: "#607D8B",
                            strokeWidth: 0.75,
                            outline: "none",
                          },
                        }}
                      />
                    ))}
                  </Geographies>
                  <Markers>
                    {
                      this.state.cities2.map((city, i) => (
                        <Marker key={i} marker={city}>
                          <circle
                            index={i}
                            cx={0}
                            cy={0}
                            r={this.state.zoom == 1 ? city.population / 1000000 : 10 / 10000000 * (city.population * 2) + 5}
                            onClick={this.handleCitySelection}
                            onMouseMove={this.handleMouseMove2}
                            onMouseLeave={this.handleMouseLeave2}
                            data-city={i}
                            style={{
                              default: { fill: "#666" },
                              hover: { fill: "#999" },
                              pressed: { fill: "#000" },
                            }}
                            stroke="green"
                            fill='rgba(201,152,255, 0.5)'
                          />
                        </Marker>
                      ))
                    }
                  </Markers>
                </ZoomableGroup>

              </ComposableMap>
              <div>{this.state.population}</div>
              <SliderBar updatePop={this.handleChange} value={this.state.population} />
              <div className='GeographyContainer' style={{
              display: this.state.selectedCountry == '' ? 'none' : this.state.weather == 'hidden' ? 'none' : 'block'
            }}>
            <FactBook3 country={this.state.selectedCountry} secondcountry={this.state.hoverCountry} graphs={this.state.graphs}/>
            </div>
            </div>

          </div>
          <div className='InfoContainer' style={{ display: this.state.weather == 'hidden' ? 'none' : 'block' }}>
            <button onClick={this.switchToData}>
              Data
            </button>
            <div style={{
              display: this.state.selectedCountry == '' ? 'none' : 'block'
            }}>
              <Weather lon={this.state.lon} lat={this.state.lat} />
            </div>
            <div style={{
              display: this.state.selectedCountry == '' ? 'none' : 'block'
            }}>
              <News country={this.state.selectedCountry} />
            </div>
          
          </div>
        
          <div className='GraphContainer' style={{ display: this.state.graphs == 'hidden' ? 'none' : 'block' }}>
            <button onClick={this.switchToWeather}>
              News
          </button>
            <FactBook country={this.state.selectedCountry} secondcountry={this.state.hoverCountry} graphs={this.state.graphs}/>

          </div>
        </div>
        <div className='GraphContainer2' style={{ display: this.state.graphs == 'hidden' ? 'none' : 'block' }}>
          <FactBook2 country={this.state.selectedCountry} secondcountry={this.state.hoverCountry} graphs={this.state.graphs}/>
        </div>

      </div>



    )
  }
}

export default ZoomPan