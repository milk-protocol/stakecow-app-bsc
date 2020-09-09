<template>
    <div class="market">

        <div class="alert alert-danger">{{$t('market.tip')}}</div>

        <h1>{{$t('market.title-swap')}}</h1>
        <div class="form">
            <div class="input-body top">
                <div role="group" class="input">
                    <label for="input-live" class="left-label">{{$t("market.from", {symbol: "BNB"})}}<span>{{$t("market.balance", {balance: bnb_balance})}}</span></label>
                    <b-input
                        v-model="bnb_amount"
                        :state="bnbState"
                        :placeholder="$t('market.amount')"
                        trim
                    >  
                    </b-input>
                    <b-form-invalid-feedback id="input-live-feedback">{{$t('market.greather-than')}}</b-form-invalid-feedback>
                </div>
                <b-button variant="outline-secondary" class="submit-button" @click="swapWbnb">{{$t("market.swap", {symbol: "WBNB"})}}</b-button>
            </div>
            <div class="arrow-down"></div>
            <div class="input-body top">
                <div role="group" class="input">
                    <label for="input-live" class="left-label">{{$t("market.from", {symbol: "WBNB"})}}<span>{{$t("market.balance", {balance: wbnb_balance})}}</span></label>
                    <b-input
                        v-model="wbnb_amount"
                        :state="wbnbState"
                        :placeholder="$t('market.amount')"
                        trim
                    >  
                    </b-input>
                    <b-form-invalid-feedback id="input-live-feedback">{{$t('market.greather-than')}}</b-form-invalid-feedback>
                </div>
                <b-button variant="outline-secondary" class="submit-button" @click="swapBnb">{{$t("market.swap", {symbol: 'BNB'})}}</b-button>
            </div>
        </div>
        <h1 v-if="transactions.length > 0">{{$t('market.title-transaction')}}</h1>
        <div class="transaction" v-if="transactions.length > 0">
            <div class="address-item" v-for="(v, i) in transactions" :key="i">
                <a :href="etherscanTx(v)" target="_blank"> {{v}}</a>
            </div>
        </div>
    </div>
</template>
<script>
import { BigNumber } from 'bignumber.js'
import { Cow, Erc20, Wbnb } from '~/contracts'
import { toBN } from 'web3-utils'
import utils from '~/mixins/utils'

import config from '@/config/index.js'
export default {
    name: "market",
    data () {
        return {
            bnb_amount: '',
            wbnb_amount: '',
            bnb_balance: '-',
            wbnb_balance: '-',
            transactions: []
        };
    },
    computed: {
        erc20(){
            let bnb = config.tokens.find(v => v.symbol == 'bnb')
            return bnb ? (this.$store.state.connectedAccount ? new Erc20(bnb.address) : '') : ''
        },
        wbnb(){
            let bnb = config.tokens.find(v => v.symbol == 'bnb')
            return bnb ? (this.$store.state.connectedAccount ? new Wbnb(bnb.address) : '') : ''
        },
        bnbState(){
            return this.bnb_amount ? new BigNumber(this.bnb_amount).gt(0) : null;
        },
        wbnbState(){
            return this.wbnb_amount ? new BigNumber(this.wbnb_amount).gt(0) : null;
        }
    },
    watch: {
        erc20(value){
            if(value) {
                this.getBnbBalance()
            }
        },
        wbnb(value) {
            if(value) { 
                this.getWbnbBalance().then(data => {
                    this.wbnb_balance = data
                })
            }
        }
    },
    methods: {
        etherscanTx(tx) {
            return utils.etherscanTx(tx)
        },
        getBnbBalance(){
            if(this.erc20) {
                window.web3.eth.getBalance(this.$store.state.connectedAccount, "latest", (err, data) => {
                    this.bnb_balance = data ? new BigNumber(data).shiftedBy(-18) : 0
                })
            }
        },
        async getWbnbBalance(){
            if(this.wbnb) {
                let result = await this.wbnb.balanceOf(this.$store.state.connectedAccount);
                return result ? result.toNumber() : '-'
            }
            return '-'
        },
        async swapBnb(){
            if(this.$store.state.connectedAccount) {
                let bnb = config.tokens.find(v => v.symbol == 'bnb')
                this.wbnb.withdraw(this.$store.state.connectedAccount, bnb.address, this.wbnb_amount,(err, result) => {
                    if(err) {
                        this.$bvToast.toast(error, {
                            title: this.$t('market.error'),
                            solid: true
                        })
                    }else {
                        this.transactions.push(result)
                        let self = this;
                        let timer = setInterval(()=>{
                          window.web3.eth.getTransactionReceipt(result, (err, receipt)=>{
                            if(receipt) {
                              self.getBnbBalance();
                              self.getWbnbBalance().then(data => {
                                self.wbnb_balance = data
                              });
                              clearInterval(timer);
                            }
                          })
                        }, 2000)
                    }
                })
            }
        },
        async swapWbnb(){
            if (this.$store.state.connectedAccount) {
                let bnb_contract = config.tokens.find(v => v.symbol == 'bnb');
                let obj = {
                    from: this.$store.state.connectedAccount,
                    to: bnb_contract.address,
                    value: toBN(new BigNumber(this.bnb_amount).shiftedBy(18)),
                    gasPrice: toBN(20000000000),
                    gas: 70000
                }
                window.web3.eth.sendTransaction(obj, (err, result) => {
                    if(err) {
                        this.$bvToast.toast(error, {
                            title: this.$t('market.error'),
                            solid: true
                        })
                    }else {
                        this.transactions.push(result);
                        let self = this;
                        let timer = setInterval(()=>{
                          window.web3.eth.getTransactionReceipt(result, (err, receipt)=>{
                            if(receipt) {
                              self.getBnbBalance();
                              self.getWbnbBalance().then(data => {
                                self.wbnb_balance = data
                              });
                              clearInterval(timer);
                            }
                          })
                        }, 2000)
                    }
                })
            }
        }
    },
    created(){
        this.getBnbBalance()
        this.getWbnbBalance().then(data => {
            this.wbnb_balance = data
        })
    }
}
</script>
<style scoped>
    .market{
        display:flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .form{
        position: relative;
        max-width: 820px;
        width: 100%;
        background-color: #fff;
        background-clip: border-box;
        border: 1px solid rgba(0, 0, 0, 0.125);
        border-radius: 0.25rem;
        padding: 2rem;
    }
    .transaction, .form{
        margin-bottom: 40px;
    }
    h1{
        font-size: 22px;
        margin-bottom:20px;
    }
    .input-body{
        display:flex;
        align-items: flex-start;
    }
    .input-body .input{
        width: calc(100% - 200px);
    }
    .left-label{
        width: 100%;
        text-align: center;
        display:flex;
        justify-content:space-between;
    }
    .left-label span{
        color: rgb(86, 90, 105);
    }
    .arrow-down{
        height: 100px;
        display:flex;
        justify-content: center;
        font-size: 23px;
    }
    .submit-button{
        width: 200px;
        margin-left: 20px;
        border-color: #28a745;
        color: #28a745;
        margin-top: 32px;
    }
    .btn-outline-secondary:hover{
        color: white;
        background-color: #28a745;
        border-color: #28a745;
    }
    .address-item{
        margin-bottom:10px;
    }
    .address-item:hover{
        color: #28a745;
        text-decoration: underline;
        cursor: pointer;
    }
</style>