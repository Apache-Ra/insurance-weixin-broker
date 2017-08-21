<template>
<div>
  <div class="balance">
    <p class="balanceTxt">可提现金额</p>
    <p class="balanceInfo">{{cash}}</p>
    <!--<div class="zhong opt">-->
      <!--<p class="Txt">提现中金额</p>-->
      <!--<p class="Info">{{zhong}}</p>-->

    <!--</div>-->
    <!--<div class="wan ts">-->
      <!--<p class="Txt">已提现金额</p>-->
      <!--<p class="Info">{{wan}}</p>-->
    <!--</div>-->
  </div>
  <card :header="{title:''}">
    <div slot="content" class="card-demo-flex card-demo-content01">
      <div class="vux-1px-l vux-1px-r">
        <span>{{zhong}}</span>
        <br/>
        提现中金额
      </div>
      <div class="vux-1px-r">
        <span>{{wan}}</span>
        <br/>
        已提现金额
      </div>
    </div>
  </card>

  <group>
    <cell :title="('我的保单奖励')" :value="policyIncentives"  link="/index/user/policyIncentives" is-link></cell>
    <cell :title="('我的推广奖励')" :value="pushIncentives"  link="/index/user/pushIncentives" is-link></cell>
    <cell :title="('预约提现')"  @click.native="replaceCash(cash)" is-link></cell>
    <!--<cell :title="('银行卡管理')"  link="/index/user/bankCard" is-link></cell>-->
  </group>
</div>
</template>
<script>
    import { Cell, Group, Divider, Card, cookie} from 'vux'
    export default {
        mounted () {},
        components: {
          Cell,
          Group,
          Divider,
          Card
        },
        created () {
          let vue = this
          this.updateTitle('奖励信息')
          vue.get({
            url:'/account/findAllMoney',
            headers: {'token': cookie.get('token')},
            success:function (data) {
                vue.$data.policyIncentives = " $" + data.account.policyReward
                vue.$data.pushIncentives = " $" + data.account.extendReward

                vue.$data.cash = (data.account.policyReward + data.account.extendReward == 0) ? "钱包空空,嘤嘤嘤！" : " $" + (data.account.policyReward + data.account.extendReward)
                //vue.$data.cash = " $" + (data.account.policyReward + data.account.extendReward)
            }
          })

          vue.get({
            url:'/withdrawals/findMoney',
            headers: {'token': cookie.get('token')},
            success:function (data) {
                console.log(data.withdrawals)
              let withdrawals = data.withdrawals
              let zhong = 0
              let wan = 0
              for(let i in withdrawals){
                if(withdrawals[i].status == '审核中'){
                  zhong += ((withdrawals[i].policyMoney)*100/100 + (withdrawals[i].extendMoney)*100/100)
                }
                if(withdrawals[i].status == '审核通过'){
                  wan += ((withdrawals[i].policyMoney)*100/100 + (withdrawals[i].extendMoney)*100/100)
                }
              }
              vue.$data.zhong = (zhong == 0)? "0" : "$" + zhong
              vue.$data.wan = (wan == 0)? "0" : "$" + wan

            }
          })
        },
        data () {
            return {
              policyIncentives: '',
              pushIncentives:'',
              cash:'',
              zhong:'',
              wan:''
            }
        },
        methods: {
          replaceCash (cash) {
            let vue = this
            vue.$router.push('/index/user/cash?balance='+cash)
          }
        }
    }
</script>

<style scoped lang="less">
*{font-size: 14px;}
.balance{background:#686F78;height:200px;}
.balanceTxt{color: #FFF;text-align: center;line-height: 80px;  }
.balanceInfo{color: #FFF;text-align: center;line-height: 40px;font-size:30px;}
.Txt{color: #FFF;text-align: center;line-height: 30px; font-size:10px;}
.ts{margin-right: 20px;}
.opt{margin-left: 20px;}
.Info{color: #FFF;text-align: center;line-height: 15px;font-size:15px;}
.zhong{background:#686F78;float: left;height:50px;position:absolute;font-size: 8px;left:0; top: 195px;}
.wan{background:#686F78;float: right;height:50px;position:absolute;font-size: 8px; z-index:100;right:0; top:195px;}
@import '~vux/src/styles/1px.less';
.card-demo-flex {
  display: flex;
}
.card-demo-content01 {
  padding: 10px 0;
}
.card-padding {
  padding: 15px;
}
.card-demo-flex > div {
  flex: 1;
  text-align: center;
  font-size: 12px;
}
.card-demo-flex span {
  color: #f74c31;
}
</style>
