import React, { useState } from 'react'
import { Table } from 'antd'
import { useGetCryptoExchangeQuery } from '../services/cryptoExchanges'
import { useGetCryptoExchangeIdQuery } from '../services/cryptoExchanges'
import { millify } from 'millify'
import { render } from '@testing-library/react'

const Exchanges = () => {
  const { data: cryptoExchange } = useGetCryptoExchangeQuery()
  // const {data:cryptoExchangeDetails} = useGetCryptoExchangeIdQuery()

  // const [exchangeName ,setExchangeName] = useState("binance")
  // console.log("exname",exchangeName)
  //     const {data:cryptoExchangeDetails} = useGetCryptoExchangeIdQuery(exchangeName)
  // console.log("sdadad",cryptoExchangeDetails)

  // const cryptoExchange = cryptoExchange?.

  const columns = [
    {
      title: 'Exchanges',
      dataIndex: 'exchanges',
      key: 'exchanges',
      render: (exchanges) => (
        <div style={{ display: 'flex' }}>
          <img 
            src={exchanges.image}
            style={{ width: '30px', height: '30px', marginRight: '30px' }}
          />
          <h3>{exchanges.name}</h3>
        </div>
      ),
    },
    // inside "Exchanges" we are displaying "2" variables "image" & "name" that is coming from data=>"exchanges"
    {
      title: '24h Trade Volume',
      dataIndex: 'a24hTradeVolume',
      key: 'a24hTradeVolume',
    },
    { title: 'Trust Rank', dataIndex: 'trustRank', key: 'trustRank' },
    { title: 'Trust Score', dataIndex: 'trustScore', key: 'trustScore' },
    {
      title: 'Link',
      dataIndex: 'link',
      key: 'link',
      render: (link, record) => (
        <a className='render-a' href={link} target="_blank">
          {' '}
          Go to {record.Name} Website
        </a>
      ),
    },
    //record is a  "built-in" funtion/ variable  which cointains all the values defined inside "data"
  ]

  // render:image =>( <img src={image} style={{width:"30px",height:"30px"}} /> )
  // const length = cryptoExchange?.length()

  const data = cryptoExchange?.map((exchange, index) => ({
    key: `${exchange?.id}`,
    Name: `${exchange?.name}`,
    exchanges: { image: `${exchange?.image}`, name: `${exchange?.name}` },
    image: `${exchange?.image}`,
    a24hTradeVolume: millify(`${exchange?.trade_volume_24h_btc}`),
    trustScore: `${exchange?.trust_score}`,
    trustRank: `${exchange?.trust_score_rank}`,
    link: `${exchange?.url}`,
    description: {
      name: `${exchange?.name}`,
      established: `${exchange?.year_established}`,
      country: `${exchange?.country}`,
      tradingIncentive: `${exchange?.has_trading_incentive}`,
      normalized: millify(`${exchange?.trade_volume_24h_btc_normalized}`
      ),
    },
  }))

  //we are mapping through all the data comming from "cryptoExchanges" & creating an Object containing Multiple Objects with given values such as "key, Name, exchanges, ...." etc
  // inside "data" object we can place many variables but only the select ones will be displayed in table i.e. the varibales that matches the name inside "dataIndex & key"

  //  console.log("img",data[0]?.image)

  // columns comes from the "columns" object that we defined earlier
  // "dataSource" comes from the "data" object from above










// .........................................for mobile.................
const column2 = [
    {
      title: 'Exchanges',
      dataIndex: 'exchanges',
      key: 'exchanges',
      render: (exchanges) => (
        <div style={{ display: 'flex' }}>
          <img 
            src={exchanges.image}
            style={{ width: '30px', height: '30px', marginRight: '30px' }}
          />
          <h3>{exchanges.name}</h3>
        </div>
      ),
    },
    // inside "Exchanges" we are displaying "2" variables "image" & "name" that is coming from data=>"exchanges"
    { title: 'Trust Rank', dataIndex: 'trustRank', key: 'trustRank' },
    
  ]





  return (
    <div>
      <Table className='table'
        columns={columns}
        expandable={{
          // onExpand: record =>{setExchangeName(record.name)},
          expandedRowRender: (record) => (
            <p  className="table-p" style={{ margin: 0 }}>
              <p className='table-pp' style={{ display:"flex", flexWrap:"wrap", alignItems:"center", justifyContent:"space-evenly"}}>
                {' '}
                <span ><b>Name</b> : {record.description.name} </span>
                <span ><b>Country</b> : {record.description.country} </span> 
                <span ><b>Established</b> : {record.description.established} </span>
                <span ><b>Trading Incentive</b> : {record.description.tradingIncentive}  </span> {' '}
                <span ><b>24hr Bitcoin Trade Volume normalized</b> :{' '}{record.description.normalized}{' '}</span>
                </p>
                
            </p>
          ),
          rowExpandable: (record) => record.name !== 'Not Expandable',
        }}
        dataSource={data}
      />
      <Table className='dont-showOnBig table-mobile'
        columns={column2}
        expandable={{
          // onExpand: record =>{setExchangeName(record.name)},
          expandedRowRender: (record) => (
            <p  className="table-p-mobile" style={{ margin: 0 }}>
              <p className='table-pp' style={{ display:"flex", flexWrap:"wrap", alignItems:"center", justifyContent:"space-evenly"}}>
                {' '}
                <span ><b>Name</b> : {record.description.name} </span>
                <span ><b>Country</b> : {record.description.country} </span> 
                <span ><b>Established</b> : {record.description.established} </span>
                <span className='dont-showOnBig'><b>24hr Trade Volume</b> :{record.a24hTradeVolume}</span>
                <span className='dont-showOnBig'><b>Trust Score</b> :{record.trustScore}</span>
                <span ><b>Trading Incentive</b> : {record.description.tradingIncentive}  </span> {' '}
                <span ><b>24hr Bitcoin Trade Volume normalized</b> :{' '}{record.description.normalized}{' '}</span>
                <span className='dont-showOnBig'><a href={record.link} target="_blank">
          {' '}
          Go to {record.Name} Website
        </a></span>
        
                </p>
                
            </p>
          ),
          rowExpandable: (record) => record.name !== 'Not Expandable',
        }}
        dataSource={data}
      />
      ,
    </div>
  )
}

export default Exchanges
