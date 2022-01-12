import React, { useState, useEffect } from 'react'

import millify from 'millify'
import { Link } from 'react-router-dom'


import { Skeleton, Card, Row, Col, Input } from 'antd'

import { useGetCryptoCoinsQuery } from '../services/cryptoApi'

const Cryptocurrencies = ({ simplified }) => {
  
  const [loading, setLoading] = useState(true)

  const count = simplified ? 10 : 100

  // prop  "simplified = true" hole amra component er vetor "useGetCryptoCoinsQuery()" te "query = 10" pass korbo, ethe  redux Api theke data fetch korar shomoy "count=10" bebohar kore (eta query hishebe kaj korbe) just 10 ta "coin/item" fetch korbe.. eta na dile 100 ta "coin/ietm" fetch kortho....... ekhn amra homepage e  10 tar beshi coin dekhabo na. ejonno hompage e  "<Cryptocurrencies simplified={true} >" componenet er vetor  prop "simplified = true"  deya hoise tai homepage e thaka obosthay 10 ta "Coin/item" dekhabe.. kintu  "Cryptocurrency" page e erokom kono prop deya hoy nai e karone shob gulo "Coin/item" dekhabe

  const { data: cryptoList, isFetching } = useGetCryptoCoinsQuery(count)

  const [crypto, setCrypto] = useState(cryptoList?.data?.coins)

  const [searchItem , setSearchItem] = useState("")

  useEffect(() => {
    setCrypto(cryptoList?.data?.coins)
  }, [isFetching])

useEffect(()=>{
 const filteredData =cryptoList?.data?.coins.filter((coin)=> coin.name.toLowerCase().includes(searchItem.toLowerCase()))
 setCrypto(filteredData)
},[searchItem, cryptoList])

  // console.log('crypto', crypto)
  return (
    <>
    { !simplified &&
    <div className='search-crypto'>
      <Input placeholder='Search Cryptocurrency' onChange={(e)=> setSearchItem(e.target.value)}/>
    </div>
    }
      { crypto ? (
        <div>
          <Row
            // gutter={[32, 32]}
            className="crypto-card-container"
          >
            {crypto.map((currency) => (
              // the Greater the number the smaller the value
              <Col
                xs={24}
                sm={16}
                lg={5}
                className="crypto-card"
                key={currency.uuid}
              >
                <Link to={`/crypto/${currency.uuid}`}>
                  <Skeleton loading={!loading} avatar active>
                    <Card
                      title={`${currency.rank}. ${currency.name}`}
                      extra={
                        <img
                          className="crypto-image"
                          alt={currency.name}
                          src={currency.iconUrl}
                        />
                      }
                      hoverable
                    >
                      <p>Price: {millify(currency.price)} </p>
                      <p>Market Cap: {millify(currency.marketCap)}</p>
                      <p>Daily Change: {millify(currency.change)}</p>
                    </Card>
                  </Skeleton>
                </Link>
              </Col>
            ))}
          </Row>
        </div>
      ) : (<div className="crypto-card-container2">
        <Row  >
          <Col xs={24} sm={12} lg={6} className="crypto-card2">
            {/* <Skeleton loading={loading} avatar active> */}
              <Card loading={loading}></Card>
            {/* </Skeleton> */}
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={12} lg={6} className="crypto-card2">
              <Card loading={loading}></Card>
          </Col>
        </Row>

        </div>
      )}
    </>
  )
}

export default Cryptocurrencies
