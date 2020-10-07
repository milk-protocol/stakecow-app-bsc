import Web3 from 'web3'
import { toBN, BN, isBN } from 'web3-utils'
import { MAX_UINT256 } from './constants'
import { BigNumber } from 'bignumber.js'
import axios from 'axios'
import config from  '~/config'

const WALLET_ABI = require('./abis/wallet.json');

export class Wallet {
	constructor(address) {
		this.address = address;
		this.web3 = new Web3(new Web3.providers.HttpProvider(config.web3Provider));
		this.contract = new this.web3.eth.Contract(WALLET_ABI, this.address)
	}
	
	async calcBNB() {
		let val = await this.contract.methods.calcBNB().call();
		return new BigNumber(val).shiftedBy(-18);
	}

	async calcCompSupplyReward() {
		let val = await this.contract.methods.calcCompSupplyReward().call();
		return new BigNumber(val).shiftedBy(-18);
	}
}

export default Wallet;