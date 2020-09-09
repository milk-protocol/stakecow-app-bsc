import Web3 from 'web3'
import { toBN, BN, isBN } from 'web3-utils'
import { MAX_UINT256 } from './constants'
import { BigNumber } from 'bignumber.js'

const ERC20_ABI = require('./abis/erc20.json');

export class Erc20 {
	constructor(address, symbol, decimals) {
		this.web3 = new Web3(window.ethereum);
		this.address = address;
		this.contract = new this.web3.eth.Contract(ERC20_ABI, address)
		this.decimals = decimals;
		this.symbol = symbol;
	}

	// get address() {
	// 	return this.address
	// }
	
	async balanceOf(user) {
		let balance = await this.contract.methods.balanceOf(user).call();
		let precision = await this.getPrecision()
		return new BigNumber(balance).div(precision);
	}

	async getPrecision() {
		let decimals = this.decimals || await this.contract.methods.decimals().call();
		return BigNumber(10).pow(BigNumber(decimals));
	}

	async getSymbol() {
		return this.symbol || await this.contract.methods.symbol().call();
	}

	async allowance(owner, spender) {
		let allowedBalance = await this.contract.methods.allowance(owner, spender).call();
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