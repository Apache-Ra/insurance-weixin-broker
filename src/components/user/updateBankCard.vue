<template>
  <view-box>
    <group>
      <x-input title='持卡人' v-model="cardholder" ref="cardholder" @on-blur="userCardholder(cardholder)" required></x-input>
      <x-input title='银行卡号' v-model="bankCardNumber" :min="16" :max="19" ref="bankCardNumber" @on-blur="userBankCard(bankCardNumber)" required></x-input>
      <x-input title='开户银行' v-model="bankCards" ref="bankCards" @on-blur="userBankCards(bankCards)" required></x-input>
    </group>


    <div style="padding:15px;">
      <x-button type="primary" action-type="button" @click.native="submit">下一步</x-button>
    </div>

  </view-box>
</template>
<script>
  import {ViewBox, Box, XInput, Group, XButton, Cell, cookie} from 'vux'
  export default {
    components: {
      ViewBox,
      Box,
      XInput,
      XButton,
      Group,
      Cell
    },
    created () {
      let vue = this
      vue.updateTitle("修改银行卡")

      vue.get({
        url: '/broker/find',
        headers: {'token': cookie.get('token')},
        success: function (data) {
          vue.$data.cardholder = data.bank.name
          vue.$data.bankCardNumber = data.bank.bankCard
          vue.$data.bankCards = data.bank.openAccountBank
        }
      })
    },
    data () {
      return {
        cardholder: '',
        bankCardNumber: '',
        bankCards: ''
      }
    },
    methods: {
      userCardholder(cardholder){
        this.validate({val:cardholder,tag:'cardholder',type:'String'})
      },
      userBankCard(bankCardNumber){
        this.bankCardCode({val:bankCardNumber,tag:'bankCardNumber',type:''})
      },
      userBankCards(bankCards){
        this.validate({val:bankCards,tag:'bankCards',type:'String'})
      },

      submit () {
        let vue = this
        vue.valid({
          refs: vue.$refs,
          success: function () {
            vue.put({
              url: '/bank',
              headers: {'token': cookie.get('token')},
              data: {
                name: vue.$data.cardholder,
                bankCard: vue.$data.bankCardNumber,
                openAccountBank: vue.$data.bankCards
              },
              success: function (data) {
                let cardType = vue.$route.query.type
                if (cardType == 'cash') {
                  vue.$router.push('/index/user/cash?balance=' + vue.$route.query.balance)
                } else if (cardType == 'userInfo') {
                  vue.$router.push('/index/user/userInfo')
                }
              }
            })
          }
        })
      }
    }
  }
</script>

<style>
  * {
    font-size: 14px;
  }

  button {
    font-size: 14px !important;
    padding: 5px 0
  }
</style>
