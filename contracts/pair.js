import Web3 from 'web3'
import { toBN, BN, isBN } from 'web3-utils'
import { MAX_UINT256 } from './constants'
import { BigNumber } from 'bignumber.js'

const UNISWAP_PAIR = require('./abis/uniswap_pair.json');

export class Pair {
	constructor(address, symbol, decimals) {
		this.web3 = new Web3(window.ethereum);
		this.address = address;
		this.contract = new this.web3.eth.Contract(UNISWAP_PAIR, address)
		this.defaultGasPrice = 20000000000;
		this.decimals = decimals;
		this.symbol = symbol;
	}

	async getReserves() {
		let reserves = await this.contract.methods.getReserves().call();
	}

	async getPrice() {
		
	}

	async token0() {
		return await this.contract.methods.token0().call()
	}
	async token1() {
		return await this.contract.methods.token0().call()
	}
}

export default Pair;