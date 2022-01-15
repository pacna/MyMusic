import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { Provider, RootStateOrAny, useSelector } from 'react-redux'
import store from './../stores/store';
import { TopNav } from './../componentsv2/top-nav';
import { MusicTabs } from './../componentsv2/music-tabs';
import { MainContent } from '../componentsv2/main-content';
import { Header } from './../componentsv2/header';

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Provider store={store}>
      <Header />
      <TopNav />
      <MusicTabs />
      <MainContent>
        <Component {...pageProps} />
      </MainContent>
    </Provider>
  )
}
