<template>
    <div class="market">
        <div class="form">
            <div class="title">Swap</div>
            <div class="input-body top">
                <div role="group" class="input">
                    <label for="input-live">From BNB to WBNB</label>
                    <b-form-input
                        id="input-live"
                        v-model="bnb_amount"
                        :state="bnbState"
                        :placeholder="'Amount'"
                        trim
                    >
                    </b-form-input>
                    <b-form-invalid-feedback id="input-live-feedback">
                    Must be greater than 0
                    </b-form-invalid-feedback>
                </div>
                <div class="label">
                    <span>Balance: 232323</span>
                    <span>WBNB</span>
                </div>
            </div>
            <div class="arrow-down">
                <b-icon-arrow-down></b-icon-arrow-down>
            </div>
            <div class="input-body bottom">
                <div role="group" class="input">
                    <label for="input-live">From WBNB to BNB</label>
                    <b-form-input
                        id="input-live"
                        v-model="wbnb_amount"
                        :state="wbnbState"
                        :placeholder="'Amount'"
                        trim
                    >
                    </b-form-input>
                    <b-form-invalid-feedback id="input-live-feedback">
                    Must be greater than 0
                    </b-form-invalid-feedback>
                </div>
                <div class="label">
                    <span>BNB</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { BigNumber } from 'bignumber.js'
export default {
    name: "market",
    data () {
        return {
            bnb_amount: '',
            wbnb_amount: '',
        };
    },
    computed: {
        bnbState(){
            return this.bnb_amount ? new BigNumber(this.bnb_amount).gt(0) : null;
        },
        wbnbState(){
            return this.wbnb_amount ? new BigNumber(this.bnb_amount).gt(0) : null;
        }
    },
}
</script>
<style scoped>
    .market{
        padding-top: 10%;
        display:flex;
        justify-content: center;
    }
    .form{
        position: relative;
        max-width: 420px;
        width: 100%;
        background-color: #fff;
        background-clip: border-box;
        border: 1px solid rgba(0, 0, 0, 0.125);
        border-radius: 0.25rem;
        padding: 1rem;
    }
    .title{
        font-size: 20px;
        font-weight: 500;
        text-align: center;
        padding: 10px 0;
    }
    .input-body{
        display:flex;
        align-items: center;
    }
    .input-body .input{
        width: 65%;
    }
    .input-body .label{
        width: 35%;
        height: 70px;
        display: flex;
        flex-direction: column;
        justify-content:space-between;
    }
    .input-body .label span:first-child{
        font-size: 14px;
        text-align: center;
        color: rgb(86, 90, 105);
    }
    .input-body .label span:last-child{
        font-weight: 500;
        font-size: 20px;
        line-height: 38px;
        text-align: center;
    }
    .arrow-down{
        padding-top: 20px;
        /* padding-bottom: 20px; */
        display:flex;
        justify-content: center;
        font-size: 23px;
    }
    .bottom.input-body .label{
        justify-content: flex-end;
    }
</style>