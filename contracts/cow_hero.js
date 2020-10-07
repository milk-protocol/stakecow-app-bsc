import Web3 from 'web3'
import { toBN, BN, isBN } from 'web3-utils'
import { BigNumber } from 'bignumber.js'
BigNumber.set({ DECIMAL_PLACES: 18 })

const COW_HERO_ABI = require('./abis/cow_hero.json');

import config from  '~/config'

export class CowHero {
	constructor(address) {
		this.web3 = new Web3(window.ethereum);
		this.web3Reader = new Web3(new Web3.providers.HttpProvider(config.web3Provider));
		this.address = address;
		this.contract = new this.web3.eth.Contract(COW_HERO_ABI, address);
		this.contractReader = new this.web3Reader.eth.Contract(COW_HERO_ABI, address);
		this.defaultGasPrice = 20000000000;
	}

	async totalSupply() {
		let supply = await this.contractReader.methods.totalSupply().call();
		return BigNumber(supply);
	}

	async balanceOf(sender) {
		let balance =  await this.contractReader.methods.balanceOf(sender).call();
		return BigNumber(balance);
	}

	async tokenOfOwnerByIndex(owner, index) {
		let id = await this.contractReader.methods.tokenOfOwnerByIndex(owner, index).call();
		return id
	}

	async setApprovalForAll(sender, operator, approved, callback) {
		var gasPrice = this.defaultGasPrice;
	  var tx = this.contract.methods.setApprovalForAll(operator, approved);
	  var gasLimit = await tx.estimateGas({ value: 0, from: sender, to: this.address });
	  return tx.send({
	    from: sender,
	    gasPrice: gasPrice,
	    gas: Math.round(gasLimit * 1.1)
	  }, callback);
	}

	async isApprovedForAll(owner, operator) {
	  return this.contractReader.methods.isApprovedForAll(owner, operator).call();
	}
}

export default CowHero;