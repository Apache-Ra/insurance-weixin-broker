<template>
  <view-box>
    <group>
      <cell :title="('预约至')" :value="bankCard" @click.native="bindBack(bankCard)"></cell>
    </group>
    <group title="提现金额">
      <x-input title='提现金额' v-model="amount" ref="amount" required  type="number"></x-input>
    </group >
    <group>
      <cell :title="('可提现余额')" :value="remainingSum"></cell>
    </group>
    <div style="padding:15px;">
      <x-button type="primary" action-type="button"  @click.native="submit" :disabled="button_disabled">提现</x-button>
    </div>
  </view-box>


</template>

<script>
    import {ViewBox, Group, XInput, Cell, XButton, cookie} from 'vux'
    export default {
        mounted (){},
        components: {
          ViewBox,
          Group,
          XInput,
          Cell,
          XButton
        },
        created () {
          let vue = this
          vue.updateTitle('预约提现')
          vue.get({
            url:'/bank/find',
            headers: {'token': cookie.get('token')},
            success:function (data) {
              vue.$data.bankCard = (data.bank == null) ? '尚未绑定银行卡' : data.bank.openAccountBank+"(" + data.bank.bankCard.substr(data.bank.bankCard.length - 4) + ")"
              if(data.bank != null){
                  vue.$data.button_disabled = false
              }
            }
          })

          vue.$data.remainingSum = vue.$route.query.balance
        },
        data () {
            return {
              amount:'',
              bankCard:'',
              remainingSum:'',
              button_disabled:true,
              amountValidate:true
            }
        },
        methods: {
          submit () {
            let vue = this
            if(vue.$data.amount <= 0){
              vue.$data.button_disabled = false
            }else{
            vue.valid({
              refs: vue.$refs,
              success: function () {
                vue.post({
                  url: '/withdrawals/find',
                  headers: {'token': cookie.get('token') },
                  data: {money:vue.$data.amount},
                  success: function (data) {
                    vue.$router.push('/index/msg/msg')
                  }
                })
              }
            })
            }
          },

          bindBack (bankCard){
            let vue = this
            if(bankCard == '尚未绑定银行卡'){
              vue.$router.push('/index/user/addBankCard?type=cash&balance='+vue.$route.query.balance)
            } else {
              vue.$router.push('/index/user/updateBankCard?type=cash&balance='+vue.$route.query.balance)
            }
          }
        }
    }
</script>

<style>
*{font-size: 14px}
button{font-size: 14px !important; padding: 5px 0}
</style>
