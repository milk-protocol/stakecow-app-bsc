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
			initialized: false,
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
		},
		{
			id: 3,
			name: "Holstein",
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
	]
}