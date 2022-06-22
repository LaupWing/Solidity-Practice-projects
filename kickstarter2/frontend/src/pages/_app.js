import { ethers, providers } from 'ethers'
import { useEffect, useState } from 'react'
import '../../styles/globals.css'
import CampaignFactoryAbi from '../../contractsData/campaignFactory.json'
import CampaignFactoryAddress from '../../contractsData/campaignFactory-address.json'
import {Provider} from 'react-redux'
import { store } from '../app/store'

function MyApp({ Component, pageProps }) {
   return (
      <Provider store={store}>
         <Component {...pageProps} />
      </Provider>
   )
}

export default MyApp
