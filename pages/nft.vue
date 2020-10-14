<template>
  <div>
    <div class="row">
      <div class="offset-md-4 col-md-4 col-sm-12">
        <div class="card">
          <img src="https://nft.stakecow.com/cow/0" class="card-img-top" alt="">
          <div class="card-body text-center">
            <div class="card-text text-center">COW NFT</div>
            <div><b>{{ cardTotal}} / 1000 </b> Minted </div>
          </div>
        </div>
      </div>
    </div>
    <br>
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div v-if="isLocked">
              <div>You can redeem at: {{unlockTime}}</div>
              <b-button block @click="onUnstake" variant="success" :disabled="!canRedeem">
                Redeem
              </b-button>
            </div>
            <div v-else>
              <div class="amount">
                <div class="card-text"> Lock <b>{{lockAmount}}</b> {{ token.symbol }} for <b>{{ days }}</b> days to mint 1 COW </div>
                <div class="calc"><b>{{lockAmount}}</b> {{ token.symbol }}  = <b>{{tokenPair[0]}}</b> MILK + <b>{{tokenPair[1]}}</b> BNB</div>
              </div>

              <div>Your Balance: <b>{{ balance }}</b> {{ token.symbol }}</div>

              <div v-if="balance.gt(lockAmount)">
                <b-button block @click="onApprove" variant="danger" v-if="!allowed">
                  Approve
                </b-button>
                <b-button block @click="onStake" variant="primary" v-else>
                  Lock {{lockAmount}} {{ token.symbol }}
                </b-button>
              </div>
              <div v-else>
                <a href="https://swap.stakecow.com/#/add/BNB/0x8E9f5173e16Ff93F81579d73A7f9723324d6B6aF" class="btn btn-block btn-primary" target="_blank">Get {{ token.symbol }}</a>
              </div>
            </div>
          </div>
        </div>
        <div>
          <router-link to="/guard">
            {{$t("nft.about")}}
          </router-link>
        </div>
      </div>
    </div>


    <b-toast id="tx-toast" solid no-auto-hide>
      <template v-slot:toast-title>
        <div class="tx-status">
          <b-spinner small label="Loading..." v-if="txStatus == 'pending'"></b-spinner>
          <b-icon icon="check-circle" v-if="txStatus == 'mined'"></b-icon>
          <b-icon icon="x-circle" variant="danger" v-if="txStatus == 'error'"></b-icon>
          {{ txStatus }} 
        </div>
      </template>

      <div class="tx-hash">
        <div><a :href="etherscanTx(txHash)" target="_blank">{{ txHash }}</a></div>
      </div>
    </b-toast>

  </div>
</template>

<script>
  import utils from '~/mixins/utils'
  import { Erc20, LockPool, CowHero, Pair } from '~/contracts'
  import { toBN, BN, isBN } from 'web3-utils'
  import { BigNumber } from 'bignumber.js'
  import config from '~/config'

  export default {
    asyncData({params}) {
      return {
        stakeAddress: '',
        txid: '',
        show: true,
        submitDisabled: false,
        titleStatus: '',
        txStatus: 'null',
        stakeWalletBalance: '0',
        stakingBalance: '0',
        rewards: '0',
        isBalanceLoaded: false,
        stakeAmount: '',
        unstakeAmount: '',
        startTime: '',
        finishTime: '',
        txHash: '',
        claimDisabled: false,
        exitDisabled: false,
        initReward: '',
        stakeAllowance: BigNumber(0),
        btnApproving: false,
        stakingTotal: '--',

        allowed: false,
        lockAmount: '--',
        cardTotal: '--',
        balance: new BigNumber(0),
        isLocked: false,
        canRedeem:  false,
        unlockTime: '--',
        days: 7,
        tokenPair: ['--', '--']
      }
    },
    computed: {
      token() {
        return config.lockToken
      }
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

      cowLoaded() {
        return !!this.cowContract
      },

      onApprove() {
        if(!this.lockToken) return;
        this.btnApproving = true;
        this.lockToken.approveMax(this.$store.state.connectedAccount, this.lockPool.address, (err, txHash) => {
          if(txHash) {
            this.txHash = txHash;
            this.txStatus = 'pending';
            this.$bvToast.show('tx-toast');
            this.btnApproving = false;
          }
        }).then(receipt => {
          this.txStatus = 'mined';
          this.update()
          this.$bvToast.hide('tx-toast')
          this.btnApproving = false;
          this.allowed = true;
        }).catch(err => {
          this.$bvModal.hide('stake-modal')
          this.btnApproving = false;
        })
      },
      onStake() {
        if(!this.lockPool) return;
        this.txStatus = 'pending';
        this.lockPool.lock(this.$store.state.connectedAccount, (err, txHash)=>{
          if(txHash) {
            this.txHash = txHash;
            this.txStatus = 'pending';
            this.$bvToast.show('tx-toast')
          }
        }).then((receipt, b) => {
          this.txStatus = 'mined';
          this.update()
          this.$bvToast.hide('tx-toast')
          this.isLocked = true;
        }).catch(err => {
          this.txStatus = 'error';
        });
      },
      onUnstake() {
        if(!this.lockPool) return;
        this.txStatus = 'pending';
        this.lockPool.redeem(this.$store.state.connectedAccount, (err, txHash) => {
          if(txHash) {
            this.txHash = txHash;
            this.txStatus = 'pending';
            this.$bvToast.show('tx-toast')
          }
        }).then(receipt => {
          this.txStatus = 'mined';
          this.update()
          this.$bvToast.hide('tx-toast')
        }).catch(err => {
          this.$bvModal.hide('unstake-modal')
          this.txStatus = 'error';
        })
      },

      fillStakeAmount(v) {
        this.stakeAmount = v.toString();
      },
      async update() {
        this.cardTotal = await this.cowHero.totalSupply();
        this.days = await this.lockPool.lockPeriod();
        this.lockAmount = await this.lockPool.lockAmount();
      }
    },
    async mounted() {
      try{
        await this.$onConnect();
      } catch(err) {
      }
      let account = this.$store.state.connectedAccount;
      this.lockPool = new LockPool(config.lockPool, config.lockToken);
      this.lockToken = new Erc20(config.lockToken.address, config.lockToken.symbol, config.lockToken.decimals);
      this.cowHero = new CowHero(config.cowHero);
      let cardTotal = await this.cowHero.totalSupply();
      let lockAmount = this.lockAmount = await this.lockPool.lockAmount();
      this.days = await this.lockPool.lockPeriod();


      let lp = new Pair();
      this.tokenPair = await lp.estimateBNBAndMILK();

      if(account) {
        let balance = await this.lockToken.balanceOf(account);
        let allowance = await this.lockToken.allowance(account, this.lockPool.address);
       
        if(allowance.gte(lockAmount)) {
          this.allowed = true;
        }
        let canRedeem = await this.lockPool.canRedeem(account);
        this.lockAmount = lockAmount;
        this.cardTotal = cardTotal;
        this.balance = balance;
        this.isLocked = await this.lockPool.isLocked(account);
        let unlockTime = await this.lockPool.unlockTime(account);
        this.canRedeem = canRedeem;
        this.unlockTime = new Date(unlockTime * 1000)
      }

      setInterval(this.update, 3 * 1000)
      
    }
  }
</script>

<style scoped>
  .cow {
    width: 8rem;
  }
  .avatar {
    font-size: 5rem;
  }
  .name {
    font-size: 1.2rem;
  }
  .desc {
    color: #666;
  }
  .info {
    background-color: #eee;
    padding: 1rem;
  }
  .write-form {
    max-width: 30rem;
  }
  .connect { 
    background-color: #e9ecef;
    padding: 1rem;
    margin-bottom: 1rem;
  }
  .address {
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .balance {
    cursor: pointer;
  }
  .toast-body {
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .tx-hash {
    margin-bottom: 0.5rem;
    margin-top: 0rem;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .tx-status {
    text-transform: capitalize;
  }
  .amount {
    margin-bottom: 2rem;
  }
  .amount .calc{
    font-size: 0.95rem;
    color: #555;
  }
</style>
