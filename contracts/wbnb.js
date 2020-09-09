import Web3 from 'web3'
import { toBN, BN, isBN } from 'web3-utils'
import { MAX_UINT256 } from './constants'
import { BigNumber } from 'bignumber.js'

const WBNB_ABI = require('./abis/wbnb.json');

export class Wbnb {
	constructor(address, symbol, decimals) {
		this.web3 = new Web3(window.ethereum);
		this.address = address;
		this.contract = new this.web3.eth.Contract(WBNB_ABI, address)
		this.decimals = decimals;
		this.symbol = symbol;
	}
	
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

    async withdraw(sender, to, amount, callback) {
	  var gasPrice = await web3.eth.getGasPrice();
	  var tx = this.contract.methods.withdraw(toBN(new BigNumber(amount).shiftedBy(18)));
	  var gasLimit = await tx.estimateGas({ value: 0, from: sender, to: this.address });
	  return tx.send({
	    from: sender,
	    gasPrice: gasPrice,
	    gas: Math.round(gasLimit * 1.1)
	  }, callback);
	}
}

export default Wbnb;