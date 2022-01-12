import React, {useState} from 'react'

import HTMLReactParser from 'html-react-parser'
import { useParams } from 'react-router-dom'
import millify from 'millify'
import { Card, Col, Row , Typography, Select} from "antd"

import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { useGetCryptoCoinsDetailQuery } from '../services/cryptoApi'
import { useGetCryptoCoinsPriceHistoryQuery } from '../services/cryptoApi'
import LineChart from './LineChart';

const { Title , Text } = Typography
const {Option} = Select


const CryptoDetails = () => {

  const [loading, setLoading] = useState(true)
  const {coinId} = useParams() 
  console.log("coin_uuid",coinId)
  const [timePeriod, setTimePeriod] = useState('7d')
  const {data:cryptoDetailsss , isFetching} = useGetCryptoCoinsDetailQuery(coinId)

  const {data:coinPriceHistory} = useGetCryptoCoinsPriceHistoryQuery({coinId, timePeriod})

  const cryptoDetail = cryptoDetailsss?.data?.coin 
  // const value24 = cryptoDetail.btcPrice
  console.log("line",timePeriod)

 const time = ['3h', '24h', '7d', '30d', '3m', '6m', '1y', '3y', '5y'];

  const stats = [
    { title: 'Price to USD', value: `$ ${cryptoDetail?.price && millify(cryptoDetail?.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: cryptoDetail?.rank, icon: <NumberOutlined /> },
    // { title: '24h Volume', value: `$ ${cryptoDetail?.volume && millify(cryptoDetail?.volume)}`, icon: <ThunderboltOutlined /> },
    { title: 'Number Of Exchanges', value: ` ${cryptoDetail?.numberOfExchanges && millify(cryptoDetail?.numberOfExchanges)}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${cryptoDetail?.marketCap && millify(cryptoDetail?.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${cryptoDetail?.allTimeHigh?.price && millify(cryptoDetail?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetail?.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: cryptoDetail?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Aprroved Supply', value: cryptoDetail?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${cryptoDetail?.supply?.total && millify(cryptoDetail?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${cryptoDetail?.supply?.circulating && millify(cryptoDetail?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
  ];



  return (
    <>
    {cryptoDetail ? (<div>
    <Col className="coin-detail-container">
      <Col className='coin-heading-container'>
        <Title level={2} className='coin-name'>
          {cryptoDetail?.name} ({cryptoDetail?.symbol}) Price 
        </Title>
        <p>
          {cryptoDetail?.name} live price in US dollars,
          view value statistics, market cap and supply.
        </p>
      </Col>
      <Select defaultValue="7d" className="select-timeperiod" placeholder="Select Timeperiod" onChange={(value) => setTimePeriod(value)}>
        {time.map((date) => <Option key={date}>{date}</Option>)}
       </Select>
      {coinPriceHistory && <LineChart coinHistory={coinPriceHistory} currentPrice={millify(cryptoDetail?.price)} coinName={cryptoDetail?.name} />
}
      <Col className="stats-container">
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">{cryptoDetail.name} Value Statistics</Title>
            <p>An overview showing the statistics of {cryptoDetail.name}, such as the base and quote currency, the rank, and trading volume.</p>
          </Col>
          {stats.map(({ icon, title, value }) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
        <Col className="other-stats-info">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">Other Stats Info</Title>
            <p>An overview showing the statistics of {cryptoDetail.name}, such as the base and quote currency, the rank, and trading volume.</p>
          </Col>
          {genericStats.map(({ icon, title, value }) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>
      <Col className="coin-desc-link">
        <Row className="coin-desc">
          <Title level={3} className="coin-details-heading">What is {cryptoDetail.name}?</Title>
          {HTMLReactParser(cryptoDetail.description)}
        </Row>
        <Col className="coin-links">
          <Title level={3} className="coin-details-heading">{cryptoDetail.name} Links</Title>
          {cryptoDetail.links?.map((link) => (
            <Row className="coin-link" key={link.name}>
              <Title level={5} className="link-name">{link.type}</Title>
              <a href={link.url} target="_blank" rel="noreferrer">{link.name}</a>
            </Row>
          ))}
        </Col>
      </Col>

    </Col>
    </div>) : <div className="crypto-card-container2">
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
  }
  </>
  )
}

export default CryptoDetails
