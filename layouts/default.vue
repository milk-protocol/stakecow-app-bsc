<template>
  <div>

    <div class="header">
      <div class="container">
      <div class="row">
        <div class="col-md-2 col-sm-5 nav-link text-center">
          <router-link to="/">
            <img src="~/static/cow.svg" class="logo"/>
          </router-link>
        </div>
        <div class="col-md-6 text-center nav-container">
          <b-nav class="justify-content-center">
            <b-nav-item>
              <router-link to="/">
                {{$t("navbar.home")}}
              </router-link>
            </b-nav-item> 
            <b-nav-item>
              <router-link to="/market">
                {{$t("navbar.market")}}
              </router-link>
            </b-nav-item>
            
            <li class="nav-item">
              <a href="https://swap.stakecow.com/#/swap?inputCurrency=BNB&outputCurrency=0x8e9f5173e16ff93f81579d73a7f9723324d6b6af" class="nav-link">
                {{$t("navbar.exchange")}}
              </a>
            </li>

            <b-nav-item>
              <router-link to="/nft">
                {{$t("navbar.nft")}}
              </router-link>
            </b-nav-item> 
         
            <b-nav-item>
              <router-link to="/about">
                {{$t("navbar.about")}}
              </router-link>
            </b-nav-item> 
          </b-nav>
        </div>
        <div class="col-md-4 col-sm-5 text-right nav-link right">
          <div class="wallet" v-if="walletInstalled">
            <span v-if="checkChainId">
              <router-link to="/me">
              <span class="addr" v-if="$store.state.connectedAccount">
                <b-icon-wallet></b-icon-wallet>
                {{ shortAddr($store.state.connectedAccount) }}
              </span>
              </router-link>
            </span>
            <a href="https://docs.binance.org/smart-chain/wallet/metamask.html" target="_blank" v-else>{{$t("navbar.change-to-bsc")}}</a>
          </div>
          <div v-else><a href="https://metamask.io/" target="_blank">{{$t("navbar.install-wallet")}}</a></div>
          <b-dropdown class="dropdown" :text="currentLang == 'en' ? language.en : language.zh_CN">
              <b-dropdown-item @click="checkLanguage('en')" :active="currentLang == 'en'">{{language.en}}</b-dropdown-item>
              <b-dropdown-item @click="checkLanguage('zh_CN')" :active="currentLang == 'zh_CN'">{{language.zh_CN}}</b-dropdown-item>
          </b-dropdown>
        </div>
      </div>
      </div>
    </div>

    <div class="container main">
      <b-row>
        <b-col cols="2" class="d-none d-sm-block"></b-col>
        <b-col md="8" sm="12" >
          <nuxt />
        </b-col>
        <b-col cols="2" class="d-none d-sm-block"></b-col>
      </b-row>
    </div>

    <div class="footer">
      <div class="footer-body">
        <a href="https://twitter.com/StakeCow" class="link" target="_blank">{{$t("footerbar.twitter")}}</a>
        <a href="https://t.me/StakeCow" class="link" target="_blank">{{$t("footerbar.telegram")}}</a>
        <a href="https://t.me/stakecow_en" class="link" target="_blank">{{$t("footerbar.telegram_en")}}</a>
        <a href="https://github.com/milk-protocol" class="link" target="_blank">{{$t("footerbar.github")}}</a>
        <a href="https://discord.gg/8wFnWdc" class="link" target="_blank">Discord</a>
      </div>
    </div>
  </div>
</template>

<script>
  import utils from '~/mixins/utils'
  import config from '~/config'
  export default {
    data () {
      return {
        walletInstalled: true,
        language: {
          en: "English",
          zh_CN: "简体中文"
        }
      }
    },
    computed: {
      currentLang(){
        return  this.$store.state.locale
      },
      checkChainId() {
        if(/MathWallet/i.test(window.navigator.userAgent)){
          return true
        }
        if(this.$store.state.isMathWallet) return true;
        return config.chainId == this.$store.state.chainId
      }
    },
    methods: {
      checkLanguage(lang){
        this.$i18n.locale = lang
        this.$store.commit('updateLang', lang)
      },
      shortAddr(addr) {
        return utils.shortAddr(addr)
      },
      async onUnlock() {
        await this.$onConnect()
      }
    },
    async mounted() {
      await this.$onConnect();
    }
  }
</script>


<style>
  .header {
    background-color: #28a745;
    padding: 0.5rem;
    margin-bottom: 2rem;
    color: #fff;
  }
  .header a {
    color: #fff;
    font-size: 1.1rem;
  }
  .nav-container{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .wallet {
    /* float: right; */
  }

  .logo {
    padding: 0;
    height: 32px;
  }
  .main {
    min-height: calc(100vh - 144px);
  }

  .footer {

  }
  .footer-body{
    -webkit-box-align: center;
    align-items: center;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    height: 72px;
    width: 100%;
  }
  .support img{
    height: 16px;
  }
  .link {
    margin: 0 0.5rem;
    text-align: center;
  }
  .right{
    display:flex;
    justify-content:flex-end;
    align-items: center;
  }
  .wallet {
    font-weight: bold;
    cursor: pointer;
  }

  .dropdown .btn.dropdown-toggle{
    /* line-height:1; */
    margin-left: 20px;
    padding: 0;
    background-color: transparent;
    color: #fff;
    font-size: 1.1rem;
    border: none;
    outline: none;
  }
  .dropdown .btn, .dropdown .btn.dropdown-toggle:active, .dropdown .btn.dropdown-toggle:hover{
    border-color: transparent;
    background-color: transparent;
    box-shadow: none;
  }
  .dropdown-item.active{
    color: #28a745;
    background-color: transparent;
  }
  .dropdown-item:active{
    color: black;
    background-color: transparent;
  }
  .dropdown-menu a{
    color: #16181b;
  }

</style>
