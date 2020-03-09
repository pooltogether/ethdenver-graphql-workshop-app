// components/Prizes.jsx

import { useQuery } from '@apollo/react-hooks'
import { ethers } from 'ethers'
import gql from 'graphql-tag'

const prizesQuery = gql`
  query {
    poolPrizes(orderBy: drawId, orderDirection: asc) {
      id
      drawId
      depositCount
      depositAmount
      withdrawalCount
      withdrawalAmount
    }
  }
`

export function Prizes() {
  const { loading, error, data } = useQuery(prizesQuery)

  let result = 'Loading...'
  if (error) {
    result = `Error: ${error.message}`
  } else if (data) {
    result = (
      <table>
        <thead>
          <tr>
            <td>
              Prize Id
            </td>
            <td>
              Deposit Count
            </td>
            <td>
              Withdrawal Count
            </td>
            <td>
              Total Deposits
            </td>
            <td>
              Total Withdrawals
            </td>
          </tr>
        </thead>
        <tbody>
          {data.poolPrizes.map(poolPrize => (
            <tr key={poolPrize.id.toString()}>
              <td>
                {poolPrize.drawId.toString()}
              </td>
              <td>
                {poolPrize.depositCount.toString()}
              </td>
              <td>
                {poolPrize.withdrawalCount.toString()}
              </td>
              <td>
                {ethers.utils.formatEther(poolPrize.depositAmount, {commify: true, pad: true})}
              </td>
              <td>
                {ethers.utils.formatEther(poolPrize.withdrawalAmount, {commify: true, pad: true})}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  return result
}