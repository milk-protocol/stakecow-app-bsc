import Web3 from 'web3'
import { toBN, BN, isBN } from 'web3-utils'
import { MAX_UINT256 } from './constants'
import { BigNumber } from 'bignumber.js'
import config from  '~/config'

const ORACLE_ABI = require('./abis/oracle.json');

export class Oracle {
	constructor() {
		this.web3 = new Web3(new Web3.providers.HttpProvider(config.web3Provider));
		this.address = config.oracle;
		this.contract = new this.web3.eth.Contract(ORACLE_ABI, this.address)
	}

	async getPriceOfDOTBNB() {
		let dot = config.tokens.find((t) => t.symbol == "DOT");
		let bnb = config.tokens.find((t) => t.symbol == "WBNB");
		let reserves = await this.contract.methods.getReserves(dot.address, bnb.address).call();
		return reserves[1] / reserves[0]
	}
	async getPriceOfBNBUSDT() {
		let usdt = config.tokens.find((t) => t.symbol == "USDT");
		let bnb = config.tokens.find((t) => t.symbol == "WBNB");
		let reserves = await this.contract.methods.getReserves(bnb.address, usdt.address).call();
		return reserves[1] / reserves[0]
	}
}

export default Oracle;