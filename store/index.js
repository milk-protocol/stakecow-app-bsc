
export const state = () => ({
	locale: 'en',
	connectedAccount: '',
	chainId: ''
});

export const mutations = {
	updateLang(state, locale) {
		state.locale = locale
		window.localStorage.language = JSON.stringify(locale);
	},
	updateConnectedAccount(state, account) {
		state.connectedAccount = account
	},
	updateChainId(state, chainId) {
		state.chainId = chainId
	},

};
