<template>
  <div>
    <div>
      <p>
        <div class="alert alert-danger" role="alert">
          {{$t("home.note")}}
        </div>
      </p>
      <div class="intro">
        <h3>
          {{$t("home.protocol-name")}}
        </h3>
        <p>
          {{$t("home.protocol-desc")}}
        </p>
        <p></p>
      </div>
    </div>
    <br>
    <div class="price alert alert-success">
      1 $MILK = {{ priceMILKUSDT ? priceMILKUSDT.toFixed(4) : '--' }} $USDT = {{ priceMILKBNB ? priceMILKBNB.toFixed(4) : '--' }} $BNB
    </div>

    <br>
    <div class="row">
      <div class="col-6 cow" v-for="(cow, i) in cows" :key="i">
        <div class="card cow">
          <span class="avatar">{{cow.avatar}}</span>
          <div class="card-body">
            <h5 class="card-title title">{{ cow.name }}</h5>
            <div class="desc">{{$t("home.card-desc", { symbol: cow.stakeToken.symbol })}}</div>
            <p class="card-text apy"> APY: {{apy[cow.id]}}% </p>
            <a :href="'/cow/' + cow.id" v-if="cow.initialized" class="btn btn-block btn-success">
              {{$t("home.select")}}
            </a>
            <a href="#" v-else class="btn btn-secondary btn-block">{{$t("home.coming-soon")}}</a>
          </div>
        </div>
      </div>
      <div class="col-6 cow">
        <div class="card cow">
          <span class="avatar">{{hybirdCow.avatar}}</span>
          <div class="card-body">
            <h5 class="card-title title">{{ hybirdCow.name }}</h5>
            <div class="desc">{{$t("home.card-desc", { symbol: hybirdCow.stakeToken.symbol })}}</div>
            <p class="card-text apy"> APY: {{hybirdCowAPY}}% </p>
            <a :href="'/cow/hybird'" v-if="hybirdCow.initialized" class="btn btn-block btn-success">
              {{$t("home.select")}}
            </a>
          </div>
        </div>
      </div>
    </div>
    <br>
  </div>
</template>

<script>
  import config from '~/config'
  import { Pair, Oracle, Erc20Reader, CowReader, CREAM_BNB, CrBNB } from '~/contracts'
  import { BigNumber } from 'bignumber.js'

  export default {
    data () {
      return {
        cows: config.cows,
        priceMILKUSDT: null,
        priceMILKBNB: null,
        hybirdCow: config.hybird,
        hybirdCowAPY: '--',
        apy: {
          1: '--',
          2: '--',
          3: '--',
          4: '--'
        }
      }
    },
    methods: {
      
    },
    async mounted() {
      // try{
      //   await this.$onConnect();
      // } catch {

      // }
      let oracle = new Oracle()
      let pair = new Pair()
      let promises = [ oracle.getPriceOfBNBUSDT(), pair.getPrice(), oracle.getPriceOfDOTBNB() ];
      let prices = await Promise.all(promises);
      
      this.priceBNBUSDT =  prices[0];
      this.priceMILKUSDT = BigNumber(prices[0]).times(BigNumber(prices[1]))
      this.priceMILKBNB =  BigNumber(prices[1]);
      this.priceDOTBNB = prices[2];

      let hybirdCowReader = new CowReader(this.hybirdCow.address, this.hybirdCow.stakeToken, this.hybirdCow.yieldToken)

      let crBNB = new CrBNB(CREAM_BNB);
      let apy = await crBNB.APY();
      let total = await hybirdCowReader.totalSupply();
      let rate = await hybirdCowReader.rewardRate();
      this.hybirdCowAPY = rate.times(365 * 24 * 60 * 60).times(this.priceMILKBNB).div(total).plus(apy).times(100).toFixed(2);

      this.cows.map(async(cow) => {
        if(cow.initialized) {
          let erc20Reader = new Erc20Reader(cow.stakeToken.address, cow.stakeToken.symbol, cow.stakeToken.decimals)
          let cowReader = new CowReader(cow.address, cow.stakeToken, cow.yieldToken)
          let rewardRate = await cowReader.rewardRate();
          let balance = await erc20Reader.balanceOf(cow.address);
          let rewards = rewardRate.times(365 * 24 * 60 * 60).div(balance)

          if(cow.id == 1) {
            this.apy[1] = rewards.times(this.priceMILKBNB).times(100).toFixed(2)
          } else if(cow.id == 2) {
            this.apy[2] = rewards.times(this.priceMILKBNB).div(this.priceDOTBNB).times(100).toFixed(2)
          } else if(cow.id == 3) {
            this.apy[3] = new BigNumber(0)
          }
        }
        return cow
      });
    }
  }
</script>

<style scoped>

  .intro {
    background-color: #eee;
    padding: 1rem 1rem;
  }
  .cover {
    text-align: center;
  }
  .title {
    margin-bottom: 0.1rem !important;
  }
  .desc {
    font-size: 0.9rem;
    color: #999;
  }
  .cover img {
    display: inline-block;
    width: 150px;
    text-align: center;
  }
  .cow {
    margin-bottom: 1rem;
  }
  .cow img {
    width: 100%;
    padding: 1rem;
    text-align: center;
    display: inline-block;
  }
  .avatar {
    text-align: center;
    font-size: 5rem;
  }
  .milk {
    width: 3rem;
  }
  .apy {
    font-size: 0.9rem;
    color: #007bff;
  }
</style>
