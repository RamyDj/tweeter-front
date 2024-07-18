import '../styles/globals.css';
import Head from 'next/head';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import user from '../reducers/user'
import likeTweets from '../reducers/likeTweets'

const store = configureStore({
  reducer: { user, likeTweets},
});

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Head>
        <title>Tweeter</title>
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}

export default App;