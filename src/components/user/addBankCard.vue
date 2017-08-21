<template>
  <view-box>
  <group>
    <x-input title='持卡人'  v-model="cardholder" ref="cardholder" placeholder="请输入真实姓名" @on-blur="userCardholder(cardholder)" required></x-input>
    <x-input title='银行卡号' type="number" is-type="number" v-model="bankCardNumber" ref="bankCardNumber" :min="16" :max="19" placeholder="请输入银行卡号" @on-blur="userBankCard(bankCardNumber)" required></x-input>
    <x-input title='开户银行'  v-model="bankCards" ref="bankCards" @on-blur="userBankCards(bankCards)" required></x-input>
  </group>


  <div style="padding:15px;">
    <x-button type="primary" action-type="button" @click.native="submit">下一步</x-button>
  </div>

  </view-box>
</template>
<script>
    import {ViewBox, Box, XInput, Group, XButton, Cell ,cookie} from 'vux'
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
          this.updateTitle("绑定银行卡")
        },
        data () {
            return {
              cardholder:'',
              bankCardNumber:'',
              bankCards:''
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
                vue.post({
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
                      vue.$router.push('/index/user/cash?balance='+vue.$route.query.balance)
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
*{font-size: 14px;}
  button{font-size: 14px !important; padding: 5px 0}
</style>
