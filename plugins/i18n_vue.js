import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

export default ({ app, store }) => {
  let language = window.localStorage.language ? JSON.parse(window.localStorage.language) : 'en';
  store.commit("updateLang", language)
  app.i18n = new VueI18n({
    locale: language,
    messages: {
      en: require('~/locales/en.json'),
      zh_CN: require('~/locales/zh-CN.json')
    }
  })
}
