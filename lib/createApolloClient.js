// lib/createApolloClient.js

import { Tightbeam } from '@pooltogether/tightbeam'
import { withClientState } from 'apollo-link-state'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { abiMapping } from './abiMapping'

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
    stateLink
  ])

  return new ApolloClient({
    cache,
    link
  })
}