<template>
  <div>
    <div class="alert alert-danger" role="alert">
      {{ $t('cow.warning') }}
    </div>

    <div class="row">
      <div class="col-12 text-center">
        <span class="avatar">{{cow.avatar}}</span>
        <div class="name">{{cow.name}}</div>
        <br>
        <div class="desc">{{ $t('cow.desc1')}} </div>
        <div class="desc">{{ $t('cow.desc2')}} </div>

        <br>
        <div>Reward rate: 100 MILK / day</div>
        <div>Reward duration: 20 days</div>
        <div>Start time: {{ startAt }}</div>
        <br>
        <div>{{$t('cow.total')}} <b>{{ stakingTotal.toFixed(6, 1) }}</b> {{ cow.stakeToken.symbol }} {{$t('cow.staking')}}</div>
      </div>
    </div>
    <br>
    <div class="row">
      <div class="col-6">
        <div class="card text-center">
          <div class="card-body">
            <h5 class="card-text">Earned</h5>
            <div class="card-text">{{ rewards.toFixed(8, 1) }} </div>
            <div class="card-text">MILK</div>
            <p></p>
            <b-button block @click="onClaim" variant="success">
             {{$t('cow.harvest')}}
            </b-button>
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="card text-center">
          <div class="card-body">
            <h5 class="card-text">Staking</h5>
            <div class="card-text">{{ stakingBalance }} BNB</div>
            <div class="card-text">Interest {{ bnbInterest }} BNB </div>
            <p></p>
            <b-button block @click="onApprove" v-if="!isApprovedForAll" variant="danger" :disabled="btnApproving">
              <b-spinner small label="Loading..." v-if="btnApproving"></b-spinner> 
              {{$t('cow.approve-symbol', { symbol: " NFT-COW" })}}
            </b-button>
            <b-button block v-else @click="$bvModal.show('stake-modal')" variant="primary">
              {{$t('cow.stake')}}
            </b-button>
          </div>
        </div>
      </div>
    </div>
    <br>
    <div class="row">
      <div class="col-12 text-center">
        <b-button @click="$bvModal.show('unstake-modal')" variant="primary">
          {{$t('cow.harvest-unstake')}}
        </b-button>
        <b-button @click="onExit" variant="danger">
          {{$t('cow.exit')}}
        </b-button>
      </div>
      <div class="col-12 text-center liquidity">
        Liquidity on Cream: <b>{{ crBNBLiquidity.toFixed(6, 1) }}</b> BNB
      </div>
    </div>


    <b-modal id="stake-modal" hide-footer size="md">
      <template v-slot:modal-title="{ close }">
        <b>{{$t('cow.stake')}}</b>
      </template>
      <b-form>
        <div>{{$t('cow.balance')}}<b class="balance" @click="fillStakeAmount(userStakeWalletBalance)">{{ userStakeWalletBalance }}</b> {{ cow.stakeToken.symbol}}</div>
        <b-form-group id="input-group-1" label="" label-for="input-1">
          <b-form-input
            id="input-1"
            type="number"
            v-model="stakeAmount"
            autocomplete="off"
            required
          ></b-form-input>
          <b-form-invalid-feedback :state="validationAmount(stakeAmount)">
            {{$t('cow.greater-than')}}
          </b-form-invalid-feedback>
        </b-form-group>

        <b-button block @click="onStake" variant="success" v-if="stakeAllowance.gte(toBigNumber(stakeAmount))" :disabled="!validationAmount(stakeAmount) || txStatus == 'pending' || toBigNumber(stakeWalletBalance).lte(0)" >{{$t('cow.stake')}}</b-button>
      </b-form>
      <br>
      <br>
    </b-modal>

    <b-modal id="unstake-modal" hide-footer size="md">
      <template v-slot:modal-title="{ close }">
        <b>{{$t('cow.unstake')}}</b>
      </template>
      <b-form>
        <div>{{$t('cow.staking-balance', {stakingBalance: stakingBalance, symbol: cow.stakeToken.symbol})}}</div>
        <b-form-group id="input-group-1" label="" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="unstakeAmount"
            placeholder="Amount to unstake"
            autocomplete="off"
            required
          ></b-form-input>
          <b-form-invalid-feedback :state="validationAmount(unstakeAmount)">
            {{$t('cow.amount-greater-than')}}
          </b-form-invalid-feedback>
        </b-form-group>
        <b-button block @click="onUnstake" variant="success" :disabled="!validationAmount(unstakeAmount) || txStatus == 'pending'">{{$t('cow.unstake')}}</b-button>
      </b-form>
      <br>
      <br>
    </b-modal>

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
  import { HybirdCow, Erc20, BNB, CowHero, Wallet, ZERO_ADDR, CREAM_BNB } from '~/contracts'
  import { toBN, BN, isBN } from 'web3-utils'
  import { BigNumber } from 'bignumber.js'
  import config from '~/config'

  export default {
    asyncData({params}) {
      return {
        cow: config.hybird,
        stakeAddress: '',
        txid: '',
        show: true,
        submitDisabled: false,
        titleStatus: '',
        txStatus: 'null',
        stakeWalletBalance: new BigNumber(0),
        stakingBalance: new BigNumber(0),
        rewards: new BigNumber(0),
        isBalanceLoaded: false,
        stakeAmount: '',
        unstakeAmount: '',
        allowed: true,
        startTime: '',
        finishTime: '',
        txHash: '',
        claimDisabled: false,
        exitDisabled: false,
        initReward: '',
        stakeAllowance: BigNumber(99999999999),
        btnApproving: false,
        stakingTotal: new BigNumber(0),
        isApprovedForAll: false,
        cowHero: null,
        bnbRewards: new BigNumber(0),
        creamRewards: new BigNumber(0),
        startAt: new Date(1602057600 * 1000),
        crBNBLiquidity: new BigNumber(0)
      }
    },
    computed: {
      // validationAmount(v) {
      //   return v && parseFloat(v) > 0
      // },

      userStakeWalletBalance() {
        return  this.stakeWalletBalance.toFixed(5, 1);
      },
      bnbInterest() {
        if(this.bnbRewards.gt(this.stakingBalance) && this.stakingBalance.gt(0)) {
          return this.bnbRewards.minus(this.stakingBalance).toFixed(8, 1)
        } else {
          return new BigNumber(0).toFixed(8, 1)
        }
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
        if(!this.cowLoaded()) return;
        this.btnApproving = true;
        this.cowHero.setApprovalForAll(this.$store.state.connectedAccount, this.cow.address, true, (err, txHash) => {
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
        }).catch(err => {
          this.$bvModal.hide('stake-modal')
          this.btnApproving = false;
        })
      },
      onStake() {
        if(!this.cowLoaded()) return;
        let amount = parseFloat(this.stakeAmount);
        if(amount <= 0) return;
        this.txStatus = 'pending';
        this.cowContract.stake(this.$store.state.connectedAccount, amount, (err, txHash)=>{
          if(txHash) {
            this.txHash = txHash;
            this.txStatus = 'pending';
            this.$bvToast.show('tx-toast')
          }
          this.$bvModal.hide('stake-modal')
        }).then((receipt, b) => {
          this.txStatus = 'mined';
          this.update()
          this.$bvToast.hide('tx-toast')
        }).catch(err => {
          this.txStatus = 'error';
        });
      },
      onUnstake() {
        if(!this.cowLoaded()) return;
        let amount = parseFloat(this.unstakeAmount);
        if(amount <= 0) return;
        this.txStatus = 'pending';
        this.cowContract.withdraw(this.$store.state.connectedAccount, amount, (err, txHash) => {
          if(txHash) {
            this.txHash = txHash;
            this.txStatus = 'pending';
            this.$bvToast.show('tx-toast')
          }
          this.$bvModal.hide('unstake-modal')
        }).then(receipt => {
          this.txStatus = 'mined';
          this.update()
          this.$bvToast.hide('tx-toast')
        }).catch(err => {
          this.$bvModal.hide('unstake-modal')
          this.txStatus = 'error';
        })
      },

      onExit() {
        if(!this.cowLoaded()) return;
        if(!confirm("Are you sure to exit?")) return;
        this.exitDisabled = true;
        this.cowContract.exit(this.$store.state.connectedAccount, (err, txHash) => {
          if(txHash) {
            this.txHash = txHash;
            this.txStatus = 'pending';
            this.$bvToast.show('tx-toast')
          }
          this.exitDisabled = false;
        }).then(receipt => {
          this.txStatus = 'mined';
          this.exitDisabled = false;
        }).catch(err => {
          this.update()
          this.txStatus = 'error';
          this.exitDisabled = false;
        })
      },
      onClaim() {
        if(!this.cowLoaded()) return;
        this.claimDisabled = true;
        this.cowContract.getReward(this.$store.state.connectedAccount, (err, txHash) => {
          if(txHash) {
            this.txHash = txHash;
            this.txStatus = 'pending';
            this.$bvToast.show('tx-toast')
            this.claimDisabled = false;
          }
        }).then(receipt => {
          this.txStatus = 'mined';
          this.claimDisabled = false;
          this.update()
          this.$bvToast.hide('tx-toast')
        }).catch(err => {
          this.txStatus = 'error';
          this.claimDisabled = false;
        })
      },

      fillStakeAmount(v) {
        this.stakeAmount = v.toString();
      },
      async update() {
        this.stakeWalletBalance = await this.stakeToken.balanceOf(this.$store.state.connectedAccount);
        this.stakingBalance = await this.cowContract.balanceOf(this.$store.state.connectedAccount);
        this.rewards = await this.cowContract.earned(this.$store.state.connectedAccount);

        this.isApprovedForAll = await this.cowHero.isApprovedForAll(this.$store.state.connectedAccount, this.cow.address);

        this.stakingTotal = await this.cowContract.totalSupply();
        this.crBNBLiquidity = await this.stakeToken.balanceOf(CREAM_BNB);
        if(this.wallet){
          this.bnbRewards = await this.wallet.calcBNB();
          this.creamRewards = await this.wallet.calcCompSupplyReward();
        }
      }
    },
    async mounted() {
      try{
        await this.$onConnect();
      } catch(err) {
      }
      let cow = new HybirdCow(this.cow.address, this.cow.stakeToken, this.cow.yieldToken);
      let stakeToken = new BNB();
      let yieldToken = new Erc20(this.cow.yieldToken.address);
      this.cowHero = new CowHero(config.cowHero);
      if(this.cow.initialized) {
        if(this.$store.state.connectedAccount) {
          this.stakeWalletBalance = await stakeToken.balanceOf(this.$store.state.connectedAccount);
          this.stakingBalance = await cow.balanceOf(this.$store.state.connectedAccount)
          this.rewards = await cow.earned(this.$store.state.connectedAccount);

          this.isApprovedForAll = await this.cowHero.isApprovedForAll(this.$store.state.connectedAccount, this.cow.address)

          

          let walletAddress = await cow.getWallet(this.$store.state.connectedAccount);
          if(walletAddress != ZERO_ADDR) {
            this.wallet = new Wallet(walletAddress);
            this.bnbRewards = await this.wallet.calcBNB();
            this.creamRewards = await this.wallet.calcCompSupplyReward();
          }
          setInterval(this.update, 10 * 1000)
        }

        this.cowContract = cow;
        this.stakeToken = stakeToken;
        this.yieldToken = yieldToken;
        this.stakingTotal = await cow.totalSupply();
        this.crBNBLiquidity = await this.stakeToken.balanceOf(CREAM_BNB);
      }
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
    color: #007bff;
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
  .liquidity {
    margin-top: 2rem;
  }
</style>
