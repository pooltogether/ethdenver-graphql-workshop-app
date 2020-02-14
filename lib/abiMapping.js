// lib/abiMapping.js

import { AbiMapping } from '@pooltogether/tightbeam'

import Dai from './abis/Dai'
import DaiPool from './abis/DaiPool'

export const abiMapping = new AbiMapping()

abiMapping.addContract('Dai', 1, '0x6B175474E89094C44Da98b954EedeAC495271d0F', Dai)
abiMapping.addContract('DaiPool', 1, '0x29fe7D60DdF151E5b52e5FAB4f1325da6b2bD958', DaiPool)