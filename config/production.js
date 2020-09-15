'use strict'
module.exports = {
	chainId: 56,
	cows: [
		{
			id: 1,
			name: "Angier",
			avatar: "🐂",
			desc: "Halved every week",
			initialized: true,
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
			name: "Genxi",
			avatar: "🐃",
			desc: "Halved every week",
			initialized: true,
			totalAmount: 2000,
			address: "0xC3477ad3755DCD84C7a100807ED9c53fb3b8a0c8",
			stakeToken: {
				address: "0x7083609fce4d1d8dc0c979aab8c869ea2c873402",
				decimals: 18,
				symbol: "DOT"
			},
			yieldToken: {
				address: "0x8E9f5173e16Ff93F81579d73A7f9723324d6B6aF",
				decimals: 18,
				symbol: "MILK"
			}
		},
		{
			id: 3,
			name: "Holstein elder sister",
			avatar: "🐄",
			desc: "Increase 10% every week",
			totalAmount: 2000,
			initialized: true,
			address: "0x3C51a88134ef088C722f946202B3c4A197eC5BDE",
			stakeToken: {
				address: "0x6330c052e35f23ad219ad9afbaddf53a68f2b2b2",
				decimals: 18,
				symbol: "BNB/MILK LP Token"
			},
			yieldToken: {
				address: "0x8E9f5173e16Ff93F81579d73A7f9723324d6B6aF",
				decimals: 18,
				symbol: "MILK"
			}
		},
		{
			id: 4,
			name: "Holstein younger sister",
			avatar: "🐄",
			desc: "Increase 10% every week",
			totalAmount: 2000,
			address: "",
			stakeToken: {
				address: "",
				decimals: 18,
				symbol: "--"
			},
			yieldToken: {
				address: "0x8E9f5173e16Ff93F81579d73A7f9723324d6B6aF",
				decimals: 18,
				symbol: "MILK"
			}
		}
	],
	tokens: [
		{
			symbol: "bnb",
			address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
			decimal: 18
		}
	]
}