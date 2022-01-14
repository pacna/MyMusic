import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { Provider } from 'react-redux'
import store from './../stores/store';
import { TopNav } from './../componentsv2/top-nav';
import { MusicTabs } from './../componentsv2/music-tabs';

export default function App ({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Provider store={store}>
      <TopNav />
      <MusicTabs />
      <Component {...pageProps} />
    </Provider>
  ) 
}
