import Web3 from 'web3'
import { toBN, BN, isBN } from 'web3-utils'
import { MAX_UINT256 } from './constants'
import { BigNumber } from 'bignumber.js'
import axios from 'axios'
import config from  '~/config'

const CRBNB_ABI = require('./abis/crBNB.json');

export class CrBNB {
	constructor(address) {
		this.address = address;
		this.decimals = 8;
		this.web3 = new Web3(new Web3.providers.HttpProvider(config.web3Provider));
		this.contract = new this.web3.eth.Contract(CRBNB_ABI, this.address)
		this.blocksPerYear = 10512000;
	}
	
	async APY() {
		let rate = await this.supplyRatePerBlock();
		return (1 + parseInt(rate) / 1e18) ** 10512000 - 1
	}

	async supplyRatePerBlock() {
		return await this.contract.methods.supplyRatePerBlock().call();
	}
}

export default CrBNB;