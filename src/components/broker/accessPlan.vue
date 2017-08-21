<template>
  <view-box>
    <group title="请填写真实信息">
      <x-input title="受保人" v-model="insurant" ref="insurant" :min="2" :max="10" placeholder="请填写真实姓名" :class="{'isValidate':insurant == ''}"></x-input>
      <selector title="性别" v-model="sex" :options="sexList" placeholder="请选择性别"  :class="{'isValidate':sex == ''}"></selector>
      <div class="todayBefore">
        <calendar v-model="birthday" title="出生年月" disable-future ref="birthday"></calendar>
      </div>
      <selector title="是否吸烟" v-model="smoke" :options="smokeList" ref="smoke" placeholder="请选择是否吸烟" :class="{'isValidate':smoke == ''}"></selector>
      <selector title="产品类别" v-model="product" :options="productList" ref="product" placeholder="请选择产品类型" :class="{'isValidate':product == ''}"></selector>
      <selector title="预算范围" v-model="budget" :options="budgetList" ref="budget" placeholder="请选择预算范围" :class="{'isValidate':budget == ''}"></selector>
    </group>
    <box gap="20px 20px">
      <x-button type="primary" action-type="button" @click.native="submit">提交</x-button>
    </box>

  </view-box>
</template>

<script>
  import {ViewBox, Group, XInput, Box, XButton, Selector, Calendar, Cell, XSwitch, cookie} from 'vux'
  export default {
    components: {
      ViewBox,
      Group,
      XInput,
      Box,
      XButton,
      Selector,
      Calendar,
      Cell,
      XSwitch
    },
    created () {
      let vue = this
      vue.updateTitle('获取方案');
    },
    data () {
      let constantsInfo = JSON.parse(cookie.get('constants'))
      console.log(constantsInfo)
      return {
        isValidate:true,
        insurant: '',
        sex: '',    //
        birthday: '',
        smoke: "",  //
        product:"", //
        budget: "", //
        birthday: 'TODAY',
        sexList: constantsInfo.sexType,
        //smokeList: constantsInfo.smokeType,
        smokeList: [{key: 'true', value: '是'}, {key: 'false', value: '否'}],
        productList: constantsInfo.productType,
        budgetList: constantsInfo.budgetType
      }
    },
    methods: {
      userInsurant (insurant) {
        this.validate({val:insurant,tag:'insurant',type:'String'})
      },
      onChange (val) {
        let constantsInfo = JSON.parse(cookie.get('constants'))
        let budgetList = constantsInfo.budgetType

        let vue = this
        switch (val) {
          case '大病医疗':
            vue.$data.budgetList = budgetList.splice(0, 5)
            break
          case '教育金投资':
            let list = []
            list.push(budgetList.splice(3, 1)[0])
            budgetList.splice(6, 3).forEach((budget) => {
                list.push(budget)
            })
            vue.$data.budgetList = list
            break
          case '养老金投资':
            let ylist = []
            ylist.push(budgetList.splice(3, 1)[0])
            budgetList.splice(6, 3).forEach((budget) => {
              ylist.push(budget)
            })
            vue.$data.budgetList = ylist
            break
          case '高端医疗':
            let glist = []
            glist.push(budgetList.splice(1, 1)[0])
            glist.push(budgetList.splice(2, 1)[0])
            budgetList.splice(3, 2).forEach((budget) => {
              glist.push(budget)
            })
            vue.$data.budgetList = glist
            break
          default:
            break
        }
      },
      submit () {
        let vue = this
        let parameter = vue.$route.query
        vue.validate({
          valid: vue.$refs,
          success: function () {
            vue.post({
              url: '/programme',
              headers: {
                'token': cookie.get('token')
              },
              data: {
                insurant: vue.$data.insurant,
                sex: vue.$data.sex,
                birthday: vue.$data.birthday,
                smoke: vue.$data.smoke,
                product: vue.$data.product,
                budget: vue.$data.budget,
                orderId: parameter.orderId
              },
              success: function (data) {
                vue.$vux.toast.show({
                  text: '提交成功'
                })
                setTimeout(function(){
                  vue.$router.push('/index/broker/programmeInfo')
                }, 2000)
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
    font-size: 14px
  }

  .todayBefore {
    position: relative;
    height: 44px;
    line-height: 25px
  }

  .todayBefore > div:before {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #D9D9D9;
    color: #D9D9D9;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    left: 15px;
  }
  .isValidate{color: red;}
</style>
