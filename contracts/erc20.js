import Web3 from 'web3'
import { toBN, BN, isBN } from 'web3-utils'
import { MAX_UINT256 } from './constants'
import { BigNumber } from 'bignumber.js'
import config from  '~/config'
const ERC20_ABI = require('./abis/erc20.json');

export class Erc20 {
	constructor(address, symbol, decimals) {
		this.web3 = new Web3(window.ethereum);
		this.web3Reader = new Web3(new Web3.providers.HttpProvider(config.web3Provider));
		this.address = address;
		this.contract = new this.web3.eth.Contract(ERC20_ABI, address)
		this.contractReader = new this.web3Reader.eth.Contract(ERC20_ABI, address);
		this.defaultGasPrice = 20000000000;
		this.decimals = decimals;
		this.symbol = symbol;
	}
	
	async balanceOf(user) {
		let balance = await this.contractReader.methods.balanceOf(user).call();
		let precision = await this.getPrecision()
		return new BigNumber(balance).div(precision);
	}

	async getPrecision() {
		let decimals = this.decimals || await this.contractReader.methods.decimals().call();
		return BigNumber(10).pow(BigNumber(decimals));
	}

	async getSymbol() {
		return this.symbol || await this.contractReader.methods.symbol().call();
	}

	async allowance(owner, spender) {
		let allowedBalance = await this.contractReader.methods.allowance(owner, spender).call();
		let precision = await this.getPrecision()
		return BigNumber(allowedBalance).div(precision);
	}

	async approveMax(sender, spender, callback) {
	  var gasPrice = await web3.eth.getGasPrice();
	  var tx = this.contract.methods.approve(spender, MAX_UINT256);
	  var gasLimit = await tx.estimateGas({ value: 0, from: sender, to: this.address });
	  return tx.send({
	    from: sender,
	    gasPrice: gasPrice,
	    gas: Math.round(gasLimit * 1.1)
	  }, callback);
	}
}

export default Erc20;