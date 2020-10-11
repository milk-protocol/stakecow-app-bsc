import Web3 from 'web3'
import { toBN, BN, isBN } from 'web3-utils'
import { BigNumber } from 'bignumber.js'
import config from  '~/config'
BigNumber.set({ DECIMAL_PLACES: 18 })

const COW_ABI = require('./abis/cow.json');
export class CowReader {
	constructor(address, stakeToken, yieldToken) {
		this.web3 = new Web3(new Web3.providers.HttpProvider(config.web3Provider));
		this.address = address;
		this.contract = new this.web3.eth.Contract(COW_ABI, address);
		this.stakeToken = stakeToken;
		this.yieldToken = yieldToken;
		this.stakePrecision = BigNumber(10).pow(BigNumber(this.stakeToken.decimals))
		this.yieldPrecision = BigNumber(10).pow(BigNumber(this.yieldToken.decimals))
	}

	async rewardRate() {
		let rewardRate = await this.contract.methods.rewardRate().call();
		return BigNumber(rewardRate).div(this.yieldPrecision);
	}

	async totalSupply() {
		let total = await this.contract.methods.totalSupply().call();
		return BigNumber(total).div(this.stakePrecision);
	}
}

export default CowReader;