import React from 'react'

export default
  ({
    geography = [],
    geography2 = [],
    country = '',
  }) => {
    const countryName = country
    const Area = geography.Area && geography.Area.land.text
    const Area2 = geography2.Area && geography2.Area.land.text
    const water = geography.Area && geography.Area.water.text
    const water2 = geography2.Area && geography2.Area.water.text
    const climate = geography.Area && geography.Climate.text
    const climate2 = geography2.Area && geography2.Climate.text
    const coastLine = geography.Coastline && geography.Coastline.text
    const coastLine2 = geography2.Coastline && geography2.Coastline.text
    const naturalHazards = geography['Natural hazards'] && geography['Natural hazards'].text
    const naturalHazards2 = geography2['Natural hazards'] && geography2['Natural hazards'].text
    const naturalResources = geography['Natural resources'] && geography['Natural resources'].text
    const naturalResources2 = geography2['Natural resources'] && geography2['Natural resources'].text

    return (
      <div style={{ position: 'relative' }} className='GeographyContainer'>
        <div><h1>{countryName}</h1></div>
        <div><b>Area:</b>{Area}</div>
        <div><b>Water:</b>{water}</div>
        <div><b>Climate:</b>{climate}</div>
        <div><b>Coastine:</b>{coastLine}</div>
        <div><b>Natural hazards:</b>{naturalHazards}</div>
        <div><b>NaturalResources:</b>{naturalResources}</div>
      </div>
    )
  }
