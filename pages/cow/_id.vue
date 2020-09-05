<template>
  <div>
    <div class="row">
      <div class="col-12 text-center">
        <span class="avatar">{{cow.avatar}}</span>
        <div class="name">{{cow.name}}</div>
        <div class="desc">{{cow.desc}}</div>
      </div>
    </div>
    <br>
    <div class="row">
      <div class="col-6">
        <div class="card text-center">
          <div class="card-body">
            <h5 class="card-title">{{ rewards }}</h5>
            <p class="card-text">MILK earned</p>
            <b-button block @click="onClaim" variant="success">
             Harvest
            </b-button>
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="card text-center">
          <div class="card-body">
            <h5 class="card-title">{{ stakingBalance }} </h5>
            <p class="card-text">{{ cow.stakeToken.symbol }} staked</p>
            <b-button block @click="onApprove" v-if="stakeAllowance.lte(toBigNumber(stakeAmount))" variant="danger">
             Approve {{ cow.stakeToken.symbol }}
            </b-button>
            <b-button block v-else @click="$bvModal.show('stake-modal')" variant="primary">
              Stake
            </b-button>
          </div>
        </div>
      </div>
    </div>
    <br>
    <div class="row">
      <div class="col-12 text-center">
        <b-button @click="onExit" variant="primary">
          Harvest & Unstake
        </b-button>
      </div>
    </div>


    <b-modal id="stake-modal" hide-footer size="md">
      <template v-slot:modal-title="{ close }">
        <b>Stake</b>
      </template>
      <b-form>
        <div>Balance: <b class="balance" @click="fillStakeAmount(stakeWalletBalance)">{{ stakeWalletBalance }}</b> {{ cow.stakeToken.symbol}}</div>
        <b-form-group id="input-group-1" label="" label-for="input-1">
          <b-form-input
            id="input-1"
            type="number"
            v-model="stakeAmount"
            autocomplete="off"
            required
          ></b-form-input>
          <b-form-invalid-feedback :state="validationAmount(stakeAmount)">
            Must be greater than 0
          </b-form-invalid-feedback>
        </b-form-group>

        <b-button block @click="onStake" variant="success" v-if="stakeAllowance.gte(toBigNumber(stakeAmount))" :disabled="!validationAmount(stakeAmount) || txStatus == 'pending' || toBigNumber(stakeWalletBalance).lte(0)" >Stake</b-button>
      </b-form>
      <br>
      <br>
    </b-modal>

    <b-modal id="unstake-modal" hide-footer size="md">
      <template v-slot:modal-title="{ close }">
        <b>Unstake</b>
      </template>
      <b-form>
        <div>Your staking balance: {{stakingBalance}} {{ cow.stakeToken.symbol }}</div>
        <b-form-group id="input-group-1" label="" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="unstakeAmount"
            placeholder="Amount to unstake"
            autocomplete="off"
            required
          ></b-form-input>
          <b-form-invalid-feedback :state="validationAmount(unstakeAmount)">
            Amount must be great than 0
          </b-form-invalid-feedback>
        </b-form-group>
        <b-button block @click="onUnstake" variant="success" :disabled="!validationAmount(unstakeAmount) || txStatus == 'pending'">Unstake</b-button>
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
  import { Cow, Erc20 } from '~/contracts'
  import { toBN, BN, isBN } from 'web3-utils'
  import { BigNumber } from 'bignumber.js'
  import config from '~/config'

  export default {
    asyncData({params}) {
      let cow = config.cows.find((cow)=>{ 
        return cow.id == params.id 
      });
      return {
        cow: cow,
        stakeAddress: '',
        connectedAccount: '',
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
        allowed: true,
        startTime: '',
        finishTime: '',
        txHash: '',
        claimDisabled: false,
        exitDisabled: false,
        initReward: '',
        stakeAllowance: BigNumber(0)
      }
    },
    computed: {
      // validationAmount(v) {
      //   return v && parseFloat(v) > 0
      // },
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
        this.stakeToken.approveMax(this.connectedAccount, this.cow.address, (err, txHash) => {
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
          console.log(err)
          this.$bvModal.hide('stake-modal')
        })
      },
      onStake() {
        if(!this.cowLoaded()) return;
        let amount = parseFloat(this.stakeAmount);
        if(amount <= 0) return;
        this.txStatus = 'pending';
        this.cowContract.stake(this.connectedAccount, amount, (err, txHash)=>{
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
        this.cowContract.withdraw(this.connectedAccount, amount, (err, txHash) => {
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
        this.cowContract.exit(this.connectedAccount, (err, txHash) => {
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
        this.cowContract.getReward(this.connectedAccount, (err, txHash) => {
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

      async onConnect() {
        
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
      async update() {
        this.stakeWalletBalance = await this.stakeToken.balanceOf(this.connectedAccount);
        this.stakingBalance = await this.cowContract.balanceOf(this.connectedAccount);
        this.rewards = await this.cowContract.earned(this.connectedAccount);
        this.stakeAllowance = await this.stakeToken.allowance(this.connectedAccount, this.cow.address);
      }
    },
    async mounted() {
      await this.onConnect();
      let cow = new Cow(this.cow.address, this.cow.stakeToken, this.cow.yieldToken);
      let stakeToken = new Erc20(this.cow.stakeToken.address);
      let yieldToken = new Erc20(this.cow.yieldToken.address);

      if(this.cow.initialized) {
        this.stakeWalletBalance = await stakeToken.balanceOf(this.connectedAccount);
        this.stakingBalance =  await cow.balanceOf(this.connectedAccount)
        this.rewards = await cow.earned(this.connectedAccount);
        let stakeAllowance =  await stakeToken.allowance(this.connectedAccount, this.cow.address);
        this.cowContract = cow;
        this.stakeToken = stakeToken;
        this.yieldToken = yieldToken;
        this.stakeAllowance = stakeAllowance;
        setInterval(this.update, 10 * 1000)
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
</style>
