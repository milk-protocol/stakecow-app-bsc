import Web3 from 'web3'
import { toBN, BN, isBN } from 'web3-utils'
import { MAX_UINT256 } from './constants'
import { BigNumber } from 'bignumber.js'
import config from  '~/config'

const UNISWAP_PAIR = require('./abis/uniswap_pair.json');

export class Pair {
	constructor() {
		this.web3 = new Web3(new Web3.providers.HttpProvider(config.web3Provider));
		this.address = config.pair_MILK_BNB;
		this.contract = new this.web3.eth.Contract(UNISWAP_PAIR, this.address)
	}

	async getPrice() {
		let reserves = await this.contract.methods.getReserves().call();
		return reserves[1] / reserves[0]
	}

	async totalSupply() {
		return await this.contract.methods.totalSupply().call();
	}

	async estimateBNBAndMILK() {
		let reserves = await this.contract.methods.getReserves().call();
		let totalSupply = await this.totalSupply();
		let x = BigNumber(30).times(reserves[0]).div(totalSupply).toFixed(2);
		let y = BigNumber(30).times(reserves[1]).div(totalSupply).toFixed(2);
		return [x, y]
	}
}

export default Pair;