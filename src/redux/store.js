import { configureStore } from '@reduxjs/toolkit'

import { cryptoApi } from '../services/cryptoApi'

import { cryptoNewsApi } from '../services/cryptoNewsApi'
import { pageSlice }  from '../services/cryptoNewsApi'
import { cryptoExchangesApi } from '../services/cryptoExchanges'

export default configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
    [pageSlice.name]:pageSlice.reducer,
    [cryptoExchangesApi.reducerPath]:cryptoExchangesApi.reducer,
  },
})
