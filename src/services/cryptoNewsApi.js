import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { createSlice } from '@reduxjs/toolkit'

const cryptoNewsHeaders = {
  'x-bingapis-sdk': 'true',
  'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
  'x-rapidapi-key': '1e2cb5e830mshadbc8c6316564cfp1cd3bfjsn839e760c94e0',
}

const baseUrl = 'https://bing-news-search1.p.rapidapi.com/news'

const createNewsRequest = (url) => ({ url, headers: cryptoNewsHeaders })

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory, count, newsOffset }) =>
        createNewsRequest(
          `/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}&offset=${newsOffset}&sortBy=Date`,
        ),
    }),
  }),
})
export const { useGetCryptoNewsQuery } = cryptoNewsApi


// to Save & update the Pagination Page number
export const pageSlice = createSlice({
  name: 'pageNumber',
  initialState: {
    pageNo:1,
  },
  reducers: {
    currentPageNo: (state, action) => {
      state.pageNo = action.payload
    },
  },
})
export const {currentPageNo} = pageSlice.actions



