// lib/createApolloClient.js

import { Tightbeam } from '@pooltogether/tightbeam'
import { withClientState } from 'apollo-link-state'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { abiMapping } from './abiMapping'
import { createHttpLink } from 'apollo-link-http'

export function createApolloClient() {
  const tb = new Tightbeam({
    abiMapping
  })

  // Create a place to store data client-side
  const cache = new InMemoryCache()

  // Ensure that the default state is set
  cache.writeData(tb.defaultCacheData())

  // Now attach the Tightbeam resolvers
  const stateLink = withClientState({
    cache,
    resolvers: tb.resolvers()
  })

  const link = ApolloLink.from([
    tb.multicallLink(),
    stateLink,
    createHttpLink({
      uri: 'https://api.thegraph.com/subgraphs/name/asselstine/pooltogether-churn',

      // this is a hack because we're using Next.js
      fetch: (typeof window !== 'undefined') ? window.fetch : () => {}
    })
  ])

  return new ApolloClient({
    cache,
    link
  })
}