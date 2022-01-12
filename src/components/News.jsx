import React, { useState, useEffect } from 'react'
import { Select, Typography, Row, Col, Avatar, Card ,Pagination} from 'antd'

import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi'
import { useGetCryptoCoinsQuery } from '../services/cryptoApi'

import { useSelector,useDispatch } from 'react-redux'
import {currentPageNo} from "../services/cryptoNewsApi"
import moment from 'moment'
const { Option } = Select

const demoImage = 'https://www.sproutwired.com/wp-content/uploads/2021/12/generic-bitcoin-getty.jpg'

const News = ({ simplified }) => {
  const { Text, Title } = Typography
  const dispatch = useDispatch()
  const count = simplified ? 6 : 9
  
  // console.log('cryptoNews', cryptoNews)
  const [loading, setLoading] = useState(true)
  
  const [newsOffset , setNewsOffset] = useState(0)
  const changePage=(current, pageSize)=>{
    setNewsOffset((current*pageSize)-2) 
     dispatch(currentPageNo(current))
  }
  // console.log("current/",newsOffset);
 
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency');

  const { data } = useGetCryptoCoinsQuery(100);
   
  // const [sortedData , setSortedData] = useState([])
  let array = []
  data?.data?.coins?.map((currency) =>(
     array =[...array, currency.name]))

 
    //  console.log("newsCategory",newsCategory)

  
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory: `${newsCategory} cryptocurrency`,
    count,
    newsOffset,
  })

  let pageNo = useSelector((state)=>state.pageNumber.pageNo)
  
  // console.log("redux",`${newsCategory} crypto currency`)
  return (
    <Col className='total-News'>
    {!simplified && (
        <Col className='searchNews' span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Cryptocurrency"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option value="Cryptocurency">Cryptocurrency</Option>
            {array?.map((currency) => <Option value={currency}>{currency}</Option>)}
          </Select>
        </Col>
      )}
      {cryptoNews ? (
        <div className='news-inside-div'>
          <Row 
          gutter={[24, 24]}
          >
            {cryptoNews.value.map((news, i) => (
              <Col xs={24} s={12} lg={8} key={i}>
                <Card hoverable className="news-card"
                >
                  <a href={news.url} target="_blank" rel="noreferrer" >
                    <div className="news-image-container">
                      <img style={{height:"150px", objectFit:"cover"}} src={news?.image?.thumbnail?.contentUrl || demoImage} alt="news"/>
                      <Title className="news-Title" level={4}>
                        {news.name}
                      </Title>
                      <p>{(news.description).length >100 ? `${news.description.substring(0,100)}...` : news.description}</p>
                    </div>
                    <div className='provider-container'><div><Avatar  src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage}/>
                    <Text className='provider-name'>{news.provider[0]?.name}</Text>
                    </div>
                    <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text></div>
                  </a>
                </Card>
              </Col>
            ))}
          </Row>
          <br />
          {!simplified ? (<Pagination defaultCurrent={pageNo} total={50} onChange={changePage} />) : <div></div>}
        </div>
      ) : (
        <div className="crypto-card-container2">
          <Row>
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
    </Col>
  )
}
export default News
