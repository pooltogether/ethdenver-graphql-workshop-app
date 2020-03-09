// components/TokenSupplies.jsx

import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { ethers } from 'ethers'

const supplyQuery = gql`
  query {
    poolCommittedSupply: call(contract: "DaiPool", fn: "committedSupply") @client
    poolOpenSupply: call(contract: "DaiPool", fn: "openSupply") @client
    daiSupply: call(contract: "Dai", fn: "totalSupply") @client
  }
`

export function TokenSupplies() {
  const { loading, error, data } = useQuery(supplyQuery, { pollInterval: 2000 })

  let result = 'Loading...'
  if (error) {
    result = `Error: ${error.message}`
  } else if (data) {
    result = <div>
      <p>Pool Committed Supply: {ethers.utils.formatEther(data.poolCommittedSupply)}</p>
      <p>Pool Open Supply: {ethers.utils.formatEther(data.poolOpenSupply)}</p>
      <p>Dai Supply: {ethers.utils.formatEther(data.daiSupply)}</p>
    </div>
  }

  return result
}