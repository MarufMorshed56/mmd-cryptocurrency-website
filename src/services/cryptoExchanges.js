import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


const cryptoExchangeHeaders = {
  'x-rapidapi-host': 'coingecko.p.rapidapi.com',
   'x-rapidapi-key': '1e2cb5e830mshadbc8c6316564cfp1cd3bfjsn839e760c94e0'
}

const baseUrl = 'https://coingecko.p.rapidapi.com'

const createExchangeRequest = (url) => ({ url, headers: cryptoExchangeHeaders })

export const cryptoExchangesApi = createApi({
  reducerPath: 'cryptoExchangesApi',
  baseQuery: fetchBaseQuery({ baseUrl }),

  endpoints: (builder) => ({
    getCryptoExchange: builder.query({
      query: () =>
        createExchangeRequest(
          `/exchanges`,
        ),
    }),
  getCryptoExchangeId: builder.query({
      query: ({exchangeName}) =>
        createExchangeRequest(
          `/exchanges/${exchangeName}`,
        ),
        }),
})
})
export const { useGetCryptoExchangeQuery, useGetCryptoExchangeIdQuery } = cryptoExchangesApi




