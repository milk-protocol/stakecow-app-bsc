'use strict'
module.exports = {
	chainId: 56,
	cows: [
		{
			id: 1,
			name: "Angier",
			avatar: "🐂",
			desc: "Halved every week",
			initialized: false,
			address: "0xA789383b848BcD7c60975094AE3ba5444ED70103",
			stakeToken: {
				address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
				decimals: 18,
				symbol: "WBNB"
			},
			yieldToken: {
				address: "0x8E9f5173e16Ff93F81579d73A7f9723324d6B6aF",
				decimals: 18,
				symbol: "MILK"
			}
		},
		{
			id: 2,
			name: "Angier",
			avatar: "🐂",
			desc: "Halved every week",
			totalAmount: 2000,
			initialized: true,
			address: "0x38F38A748D25fd3330f981F271c2BB5dEf56A42F",
			stakeToken: {
				address: "0xed24fc36d5ee211ea25a80239fb8c4cfd80f12ee",
				decimals: 18,
				symbol: "BUSD"
			},
			yieldToken: {
				address: "0x598297D13bb9c35C7ed3492690935069522853B5",
				decimals: 18,
				symbol: "MILK"
			}
		},
		{
			id: 3,
			name: "Genxi",
			avatar: "🐃",
			desc: "Halved every week",
			initialized: false,
			totalAmount: 20000,
			address: "0x3Fe7CBE85CA58407Da77f7962432F68851232d3a",
			stakeToken: {
				address: "0x6b175474e89094c44da98b954eedeac495271d0f",
				decimals: 18,
				symbol: "BUSD"
			},
			yieldToken: {
				address: "0xf0d4bafbf4621313b67f511bd6e4bbe69441feed",
				decimals: 18,
				symbol: "MILK"
			}
		}
		// {
		// 	id: 3,
		// 	name: "Holstein",
		// 	avatar: "🐄",
		// 	desc: "Increase 10% every week",
		// 	totalAmount: 20000,
		// 	address: "0x848e94dfe0f8359fbce8bd82831cb9042621d376",
		// 	stakeToken: {
		// 		address: "0x6b175474e89094c44da98b954eedeac495271d0f",
		// 		decimals: 18,
		// 		symbol: "DAI"
		// 	},
		// 	yieldToken: {
		// 		address: "0xf0d4bafbf4621313b67f511bd6e4bbe69441feed",
		// 		decimals: 18,
		// 		symbol: "MILK"
		// 	}
		// }
	]
}