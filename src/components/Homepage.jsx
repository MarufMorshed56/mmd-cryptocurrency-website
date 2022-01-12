import React from 'react'

import millify from 'millify'

import { Typography, Row, Col, Statistic } from 'antd'
import { Link } from 'react-router-dom'

import Cryptocurrencies from "./Cryptocurrencies"
import  News  from './News'

import { useGetCryptoCoinsQuery } from '../services/cryptoApi'


const Homepage = () => {
  const { Title } = Typography // bar bar Typography.Title na likhe Typography theke "Title" part ta ber kore nisi...
  
  const {data , isFetching} = useGetCryptoCoinsQuery(100)

  //as fetching data takes time, the console.log(data, isFetching) shows data  as "undefine", this is where "isFetching"  comes in, it remains "true" until "data" comes in, & when data is fetched , it turn to "false" so we can use conditions to properly get the data with out error

  
  const globalStats = data?.data?.stats
  // console.log("global", globalStats)
  // console.log("fetch", data)

  return (
    <div className='home-div'>
      <Title level={1} className="heading">
        Global Crypto Stats
      </Title>
      
      <Row className='global-row'>
        {/* in Ant design the total span is 24 &  the below colum uses 12  or half of them */}
        { data && <>
        <Col span={12}><Statistic title="Total Cryptocurrencies" value={globalStats.total} /></Col>
        <Col span={12}><Statistic title="Total Exchanges" value={millify(globalStats.totalExchanges)} /></Col>
        <Col span={12}><Statistic title="Total  Market Cap" value={millify(globalStats.totalMarketCap)} /></Col>
        <Col span={12}><Statistic title="Total 24h Volume" value={millify(globalStats.total24hVolume)} /></Col>
        <Col span={12}><Statistic title="Total Markets" value={millify(globalStats.totalMarkets)} /></Col>
        </>
        //millify transforms big uncomprehensable Numbers to  readable ones......
}
      </Row> 
      
      <div className="home-heading-container">
        <Title level={1} className='home-title'>Top 10 Crypto-Currencies in the world</Title>
        <Title level={3} className='home-title home-title2'><Link to="/cryptocurrencies">Show more</Link></Title>
      </div>
      <Cryptocurrencies simplified={true}/>
      {/*  prop "simplified = true"  deya hoise tai homepage e thaka obosthay 10 ta "Coin/item" dekhabe..karon  prop  "simplified = true" hole amra "<Cryptocurrency>" component er vetor "useGetCryptoCoinsQuery()" te "query = 10" pass korbo, ethe  redux Api theke data fetch korar shomoy "query=10" bebohar kore just 10 ta "coin/item" fetch korbe.. eta na dile 100 ta "coin/ietm" fetch kortho... ekhn amra homepage e  10 tar beshi coin dekhabo na. ejonno hompage e  "<Cryptocurrencies simplified={true} >"  deya hoise  */}


        <div className="home-heading-container">
        <Title level={2} className='home-title'>Latest Crypto News</Title>
        <Title level={3} className='home-title home-title-up'><Link to="/news">Show more</Link></Title>
      </div>
      <News simplified />
    </div>
  )
}

export default Homepage
