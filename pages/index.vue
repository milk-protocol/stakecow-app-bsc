<template>
  <div>
    <div>
      <p>
        <div class="alert alert-danger" role="alert">
            The Contract is no audited but open source, Please use at your own risk.
          </div>
      </p>
      <div class="intro">
        <h3>
          🥛 MILK Protocol
        </h3>
        <p>
          MILK Protocol is an experimental DeFi degens on Binance Smart Chain.
          Use at your own risk.
        </p>
        <p></p>
      </div>
    </div>
    <br>
    <div class="row">
      <div class="col-6 cow" v-for="(cow, i) in cows">
        <div class="card cow">
          <span class="avatar">{{cow.avatar}}</span>
          <div class="card-body">
            <h5 class="card-title title">{{ cow.name }}</h5>
            <div class="desc">Likes {{ cow.stakeToken.symbol }}</div>
            <p class="card-text"></p>
            <a :href="'/cow/' + cow.id" v-if="cow.initialized" class="btn btn-block btn-success">
              Select
            </a>
            <a href="#" v-else class="btn btn-secondary btn-block">Coming soon</a>
          </div>
        </div>
      </div>
    </div>
    <br>
  </div>
</template>

<script>
  import config from '~/config'

  export default {
    data () {
      return {
        cows: config.cows
      }
    },
    methods: {
      
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
</style>
