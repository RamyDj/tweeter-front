import '../styles/globals.css';
import Head from 'next/head';

import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';

import user from '../reducers/user'
import likeTweets from '../reducers/likeTweets'
import hashtags from '../reducers/hashtags'

import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';


const reducers = combineReducers({ user, likeTweets, hashtags});
const persistConfig = { key:'morningnews', storage};
const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
 });
 
const persistor = persistStore(store);


function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
      <Head>
        <title>Tweeter</title>
      </Head>
      <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}

export default App;