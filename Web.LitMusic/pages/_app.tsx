// next
import type { AppProps } from 'next/app'
import '../styles/globals.scss'

// third party
import { Provider } from 'react-redux'

// others
import store from '../redux/store';
import { TopNav } from '../components/top-nav';
import { MusicTabs } from '../components/music-tabs';
import { MainContent } from '../components/main-content';
import { Header } from '../components/header';
import { HeaderContent } from '../components/header-content';

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Provider store={store}>
      <Header />
      <HeaderContent> 
        <TopNav />
        <MusicTabs />
      </HeaderContent>
      <MainContent>
        <Component {...pageProps} />
      </MainContent>
    </Provider>
  )
}