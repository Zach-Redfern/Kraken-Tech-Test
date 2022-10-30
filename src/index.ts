import axios from 'axios'

const apiKey = "EltgJ5G8m44IzwE6UN2Y4B4NjPW77Zk6FJK3lL23"

type Outages = Array<{
    id: string,
    begin: string,
    end: string
}>

type SiteOutages = Array<{
  id: string,
  begin: string,
  end: string,
  name: string
}>

type SiteInfo = {
  id: string,
  name: string,
  devices: Array<
  {
    id: string,
    name: string
  }>
}

// remove outages that didn't begin in 2022
const filterOutagesBefore2022 = (outages: Outages) => {
  return outages.filter(element => new Date(element.begin).getTime() >= new Date('01/01/2022').getTime())
}

// remove outages that didn't happen in norwich-pear-tree and add the name of the device if it did
const filterSiteOutages = (outages: Outages, siteInfo: SiteInfo): SiteOutages => {
  let siteOutages = []
  for(const outage of outages){
    for(const device of siteInfo.devices){
      if(device.id === outage.id){
        siteOutages.push({...outage, name: device.name})
      }
    }
  }
  return siteOutages
}

const main = async () => {
  const {data: outages} = await axios.get('https://api.krakenflex.systems/interview-tests-mock-api/v1/outages', {
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey
    }
  })

  const {data: siteInfo} = await axios.get('https://api.krakenflex.systems/interview-tests-mock-api/v1/site-info/norwich-pear-tree', {
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey
    }
  })

  const outagesAfter2022 = filterOutagesBefore2022(outages)

  const siteOutages = filterSiteOutages(outagesAfter2022, siteInfo)

  const res = await axios.post(
    'https://api.krakenflex.systems/interview-tests-mock-api/v1/site-outages/norwich-pear-tree', 
    siteOutages,
    {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey
      }
    }
  )
}

main()


export {filterOutagesBefore2022, filterSiteOutages}