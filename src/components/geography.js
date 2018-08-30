import React from 'react'
import { replace } from 'lodash'

export default
({
  geography = [],
  geography2 = [],
  country = '',
  country2 = ''
}) => {
  const countryName = country
  const countryName2 = country2
  const Area = geography.Area && geography.Area.land.text
  const Area2 = geography2.Area && geography2.Area.land.text
  const water = geography.Area && geography2.Area.land.text
  const water2 = geography2.Area && geography2.Area.water.text
  const climate = geography.Area && geography2.Climate.text
  const climate2 = geography2.Area && geography2.Climate.text
  const coastLine = geography.Coastline && geography.Coastline.text
  const coastLine2 = geography2.Coastline && geography2.Coastline.text
  const naturalHazards = geography['Natural hazards'] && geography['Natural hazards'].text
  const naturalHazards2 = geography2['Natural hazards'] && geography2['Natural hazards'].text
  const naturalResources = geography2['Natural resources'] && geography2['Natural resources'].text
  const naturalResources2 = geography2['Natural resources'] && geography2['Natural resources'].text

  return (
    <div style={{ position: 'relative' }}>
      <div>Area:{Area}</div>
        <div>Area2:{Area2}</div>
        <div>water:{water}</div>
            <div>water2:{water2}</div>
        <div>climate:{climate}</div>
        <div>climate2:{climate2}</div>
        <div>coastine:{coastLine}</div>
        <div>coastline2:{coastLine2}</div>
        <div>natural hazards:{naturalHazards}</div>
        <div>natural hazards2:{naturalHazards2}</div>
        <div>naturalResources:{naturalResources}</div>
        <div>natural resources2:{naturalResources2}</div>

    </div>
  )
}
