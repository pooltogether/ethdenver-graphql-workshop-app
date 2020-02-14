// pages/index.js

import React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import { createApolloClient } from '../lib/createApolloClient'
import { TokenSupplies } from '../components/TokenSupplies'

let apolloClient = createApolloClient()

const Home = () => (
  <div>
    <ApolloProvider client={apolloClient}>
      Ready for web3!
      <TokenSupplies />
    </ApolloProvider>
  </div>
)

export default Home