import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";

export default
  ({ data = {}, country = ''}) => {
    const countryName = country
    const geography = data.Geography && {
      Area: data.Geography.Area.land.text,
      water: data.Geography.Area.water.text,
      climate: data.Geography.Climate.text,
      coastLine: data.Geography.Coastline.text,
      naturalHazards: data.Geography['Natural hazards'].text,
      naturalResources: data.Geography['Natural resources'].text,
    }
    const military = data['Military and Security'] && {
      'Military branches': data['Military and Security']['Military branches'].text,
      'Military expenditures': data['Military and Security']['Military expenditures'].text,
      'Military service age and obligation': data['Military and Security']['Military service age and obligation'].text,
    }
    
    return (
      <div style={{ position: 'relative', margin: '25px' }} className='GeographyContainer'>
      <div><h1>{countryName}</h1></div>
      <Tabs>
        <TabList>
          <Tab>Geography</Tab>
          <Tab>Military</Tab>
          <Tab></Tab>
        </TabList>
        <TabPanel>
        <div><b>Area:</b>{geography && geography.Area}</div>
        <div><b>Water:</b>{geography && geography.water}</div>
        <div><b>Climate:</b>{geography && geography.climate}</div>
        <div><b>Coastine:</b>{geography && geography.coastLine}</div>
        <div><b>Natural hazards:</b>{geography && geography.naturalHazards}</div>
        <div><b>NaturalResources:</b>{geography && geography.naturalResources}</div>
        </TabPanel>
        <TabPanel>
        <div><b>Military branches:</b>{military && military['Military branches']}</div>
        <div><b>Military expenditures:</b>{military && military['Military expenditures']}</div>
        <div><b>Military service age and obligation:</b>{military && military['Military service age and obligation']}</div>
        </TabPanel>
        <TabPanel></TabPanel>
      </Tabs>
        
      </div>
    )
  }
