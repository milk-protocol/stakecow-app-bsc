<template>
  <div>
    <div class="row">
      <div class="col-12 text-center">
        <div class="name">My $MILK Balance</div>
        <h4 class="desc">{{ balance == 0 ? '--' : balance }}</h4>
      </div>
    </div>
    <br>
    <div class="row">
      <div class="col-12 text-center">
        <div class="name">My Collections</div>
        <h4 class="desc">{{ nftBalance == 0 ? '--' : nftBalance }}</h4>
      </div>
    </div>

    <div class="row">
      <div class="col-4" v-for="index in nftBalance">
        <div class="card">
          <img src="https://nft.stakecow.com/cow/0" class="card-img-top" alt="">
          <div class="card-body">
            <div class="card-text text-center">Cow NFT</div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import utils from '~/mixins/utils'
  import { Erc20Reader, LockPool, CowHero } from '~/contracts'
  import { toBN, BN, isBN } from 'web3-utils'
  import { BigNumber } from 'bignumber.js'
  import config from '~/config'

  export default {
    data() {
      return {
        balance: 0,
        nftBalance: 0
      }
    },
    computed: {
    },
    methods: {
      toBigNumber(v) {
        return v ? BigNumber(v) : BigNumber(0)
      },
      validationAmount(v) {
        return v && parseFloat(v) > 0;
      },

      etherscanAddress(addr) {
        return utils.etherscanAddr(addr)
      },
      etherscanTx(tx) {
        return utils.etherscanTx(tx)
      },

      fillStakeAmount(v) {
        this.stakeAmount = v.toString();
      },
      async update() {
      }
    },
    async mounted() {
      
      let erc20Reader = new Erc20Reader(config.milk.address, config.milk.symbol, config.milk.decimals);
      let cowHero = new CowHero(config.cowHero);
      let account = this.$store.state.connectedAccount;
      this.balance = await erc20Reader.balanceOf(account);
      this.nftBalance = (await cowHero.balanceOf(account)).toNumber();
    }
  }
</script>

<style scoped>
  .desc {
    font-size: 2rem;
    margin-top: 0.5rem;
  }
</style>
