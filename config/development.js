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
				symbol: "BNB-MILK LP Token"
			},
			yieldToken: {
				address: "0x8E9f5173e16Ff93F81579d73A7f9723324d6B6aF",
				decimals: 18,
				symbol: "MILK"
			}
		},
		// {
		// 	id: 4,
		// 	name: "Holstein younger sister",
		// 	avatar: "🐄",
		// 	desc: "Increase 10% every week",
		// 	totalAmount: 2000,
		// 	initialized: true,
		// 	address: "0x26BfA150B2237d04F8212ad29393B2311368541f",
		// 	stakeToken: {
		// 		address: "0x0000000000000000000000000000000000000000",
		// 		decimals: 18,
		// 		symbol: "BNB"
		// 	},
		// 	yieldToken: {
		// 		address: "0xE53810540912766969aCb3148bD6b8980A28BeC0",
		// 		decimals: 18,
		// 		symbol: "TUSD"
		// 	}
		// 	// yieldToken: {
		// 	// 	address: "0x8E9f5173e16Ff93F81579d73A7f9723324d6B6aF",
		// 	// 	decimals: 18,
		// 	// 	symbol: "MILK"
		// 	// }
		// }
	],
	hybird: {
		id: 4,
		name: "Holstein younger sister",
		avatar: "🐄",
		desc: "",
		totalAmount: 2000,
		initialized: true,
		// address: "0x0d339e8fDb0f12A2421fF480f4855B15cb5Ec78C",
		// address: "0x19391E72C659CD72Dc3dFAA5F2D1f245615039C1",
		address: "0x62A5e32EBdf6F98B4C2AFcee7351b4B9eB044F29",
		stakeToken: {
			address: "0x0000000000000000000000000000000000000000",
			decimals: 18,
			symbol: "BNB"
		},
		yieldToken: {
			address: "0x8e9f5173e16ff93f81579d73a7f9723324d6b6af",
			decimals: 18,
			symbol: "MILK"
		}
	},
	tokens: [
		{
			symbol: "bnb",
			address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
			decimal: 18
		},
		{
			symbol: "USDT",
			address: "0x55d398326f99059ff775485246999027b3197955",
			decimals: 18,
		},
		{
			symbol: "WBNB",
			address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
			decimals: 18,
		},
		{
			symbol: "DOT",
			address: "0x7083609fce4d1d8dc0c979aab8c869ea2c873402",
			decimals: 18,
		}
	],
	oracle: "0xbf6527834dbb89cdc97a79fcd62e6c08b19f8ec0",
	pair_MILK_BNB: "0x6330c052e35f23ad219ad9afbaddf53a68f2b2b2",	
	web3Provider: "https://bsc-dataseed1.binance.org",
	// web3Provider: "https://data-seed-prebsc-1-s1.binance.org:8545",

	cowHero: "0x9086C38D86509d61c9aE4845aad7019dAA2dE48C",
	// cowHero: "0x4B28D4061D60740afB47406FD0695e3230Bd4d55",
	lockPool: "0x4039DA3341b70345f742C52e0f035c74F7f4F7b1",
	lockToken: {
		address: "0x6330c052e35f23ad219ad9afbaddf53a68f2b2b2",
		decimals: 18,
		symbol: "BNB-MILK LP"
	},
	milk: {
		address: "0x8e9f5173e16ff93f81579d73a7f9723324d6b6af",
		decimals: 18,
		symbol: "MILK"
	}
}