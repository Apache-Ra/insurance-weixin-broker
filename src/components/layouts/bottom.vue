<template>
  <div style="padding-top:80px">
    <tabbar slot="bottom">
      <tabbar-item link="/index/policy/toView">
        <img slot="icon" src="static/img/bottom/policy.png">
        <span slot="label">保单无忧</span>
      </tabbar-item>
      <tabbar-item link="/index/broker/buy">
        <img slot="icon" src="static/img/bottom/broker.png">
        <span slot="label">全民经纪</span>
      </tabbar-item>
      <tabbar-item :badge="number" link="/index/user/personal">
        <img slot="icon" src="static/img/bottom/youiself.png">
        <span slot="label">我的信息</span>
      </tabbar-item>
      <tabbar-item badge="" @click.native="onClick">
        <img slot="icon" src="static/img/bottom/contact.png">
        <span slot="label">联系客服</span>
      </tabbar-item>
    </tabbar>

    <actionsheet v-model="contactCustomer" :menus="contactCustomerCon"  @on-click-menu="click"></actionsheet>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {Tabbar, TabbarItem, Actionsheet, XSwitch, Toast, cookie, Badge} from 'vux'

  export default {
    components: {
      Tabbar,
      TabbarItem,
      Actionsheet,
      XSwitch,
      Toast,
      Badge
    },
    data () {
      return {
        telNumber:64186988,
        contactCustomer: false,
        contactCustomerCon: [{
          label: '电话客服 ',
          type: 'primary',
          value: 'telCustomer'
        },{
          label: '微信客服',
          type: 'primary',
          value: 'wechatCustomer',
        }]
      }
    },
    created (){
      let vue = this
      vue.get({
        url:'/news/findStatus',
        headers:{'token':cookie.get('token')},
        success:function (data) {
            let number =  data.number
            vue.$store.commit('updateNumber', number)
        }
      })
    },
    computed: {
      ...mapState({
        number: state => state.vux.number
      })
    },
    mounted () {
      setTimeout(() => {
        this.asyncCount = 5
      }, 1000)
    },
    methods: {
      onClick (){
        this.$data.contactCustomer = true
      },
      click (key){
        if(key === 'telCustomer'){
          window.location.href = "tel:"+this.$data.telNumber
        }else{
          this.$router.push('/index/broker/contactList')
        }
      }
    }
  }
</script>
<style>
  .weui-actionsheet__menu,.weui-actionsheet__action{font-size: 14px !important;}
  .weui-actionsheet__cell{font-size: 14px !important;}
  a{text-decoration: none; color:#000}
  .badge{position: absolute;
    top:12px;
    right:70px;}
</style>
