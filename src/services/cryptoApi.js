import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'



const cryptoApiHeaders = {
  'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
  'x-rapidapi-key': '1e2cb5e830mshadbc8c6316564cfp1cd3bfjsn839e760c94e0',
}

const baseUrl = 'https://coinranking1.p.rapidapi.com'

// it is a simple utitlity function takes in a Url & returns an Object containig the Url & headers
const createRequest = (url)=> ({url,headers:cryptoApiHeaders})


export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoCoins: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`),
      //     lets say we want to get all info about Coins from the CoinRank Api, so we make query like this .. amra "/coins" likhsi karon evabe api er documentation e deya ase,documentation e "Get coins" section er code check korle dekhte parba deya ase  "url:'https://coinranking1.p.rapidapi.com/coins' ekhaner "/coin" er ager part tuku amra base url e dhukaisi.. r "/coins" part tuku evabe query te disi, karon ei "query" part ta bivinno info er jonno change hobe,  evabe req korle "Exchanges" pawa jabe,so createRequest er moddhe Url dicchi ei Url ta nibe o sathe headers jog kore ekta object ferot dibe.... baki shob syntax
      // SEE Coin Rank API documentation for more details

      // & "query:(count) => ....." ekhane count er vetor value royeche jeta pass kora hoyeche <Cryptocurrency> component theke, count er value  joto hobe  oi poriman "coin/item" API theke fetch kora hobe.......
    }),
    getCryptoCoinsDetail: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}`)
    }),

    getCryptoCoinsPriceHistory: builder.query({
      query: ({coinId , timePeriod}) => createRequest(`/coin/${coinId}/history?timePeriod=${timePeriod}`)
    })

  }),
})

export  const  {
  useGetCryptoCoinsQuery, useGetCryptoCoinsDetailQuery , useGetCryptoCoinsPriceHistoryQuery
} = cryptoApi ; // here Redux-toolkit is creatinhg a hook that we can call instantly to get all the data for this query

// query naam ta same hothe hobe o purbe "get" & last e "query" lagathe hobe

// we are gonna import this  API data  in the Redux "store.js"