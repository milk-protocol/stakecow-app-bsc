<template>
  <div>

    <div class="header">
      <div class="container">
      <div class="row">
        <div class="col-md-4 col-sm-5 nav-link text-center">
          <router-link to="/">
            <img src="~/static/cow.svg" class="logo"/>
          </router-link>
        </div>
        <div class="col-md-4 text-center">
          <b-nav class="justify-content-center">
            <b-nav-item>
              <router-link to="/">
                Home
              </router-link>
            </b-nav-item> 
            <b-nav-item>
              <router-link to="/airdrop">
                Airdrop
              </router-link>
            </b-nav-item> 
            <b-nav-item>
              <router-link to="/about">
                About
              </router-link>
            </b-nav-item> 
          </b-nav>
        </div>
        <div class="col-md-4 col-sm-5 text-right nav-link">
          <div class="wallet" v-if="walletInstalled">
            <span v-if="checkChainId()">
              <span class="addr" v-if="connectedAccount">
              <b-icon-wallet></b-icon-wallet>
              {{ shortAddr(connectedAccount) }}</span>
            </span>
            <a href="https://docs.binance.org/smart-chain/wallet/metamask.html" target="_blank" v-else>Change to BSC</a>
          </div>
          <div v-else><a href="https://metamask.io/" target="_blank">Install Wallet</a></div>
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
        <a href="https://twitter.com/StakeCow" class="link" target="_blank">Twitter</a>
        <a href="https://t.me/StakeCow" class="link" target="_blank">Telegram</a>
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
        connectedAccount: '',
        chainId: 0,
        walletInstalled: true,
      }
    },
    methods: {
      checkChainId() {
        return config.chainId == this.chainId
      },
      shortAddr(addr) {
        return utils.shortAddr(addr)
      },
      async onConnect() {
        this.walletInstalled = !!window.ethereum;
        if(window.ethereum) {
          window.ethereum.on('accountsChanged', function (accounts) {
            this.connectedAccount = accounts[0];
            this.chainId = web3.toBigNumber(window.ethereum.chainId).toNumber();
          });
          if(!window.web3.eth.defaultAccount) {
            await window.ethereum.enable();
          }
          this.connectedAccount = window.connectedAccount = window.web3.eth.defaultAccount;
          this.chainId = web3.toBigNumber(window.ethereum.chainId).toNumber();
        }
      },
      async onUnlock() {
        await this.onConnect()
      }
    },
    async mounted() {
      await this.onConnect();
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
  .wallet {
    float: right;
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
    margin: 0 1rem;
  }
  .wallet {
    font-weight: bold;
    cursor: pointer;
  }

</style>
