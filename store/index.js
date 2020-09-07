
export const state = () => ({
	locale: 'en',
});

export const mutations = {
	updateLang(state, locale) {
		state.locale = locale
	}
};
