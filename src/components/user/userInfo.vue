<template>
  <div style="">
    <blur :blur-amount=40 :url="url">
      <p class="center"><img :src="url"></p>
      <p class="center">{{userNicaname}}</p>
    </blur>
    <group>
      <cell :title="('用户名')" :value="username"></cell>
      <cell :title="('申请人')" :value="userNicaname" v-if="show"></cell>
      <cell :title="('申请类型')" :value="userSex" v-if="show"></cell>
      <cell :title="('手机号码')" :value="tel"></cell>
      <cell :title="('证件类型')" :value="userType" v-if="show"></cell>
      <cell :title="('证件号码')" :value="cardID" v-if="show"></cell>
      <cell :title="('收件地址')" :value="userAddress" v-if="show"></cell>
      <cell :title="('银行卡号')" :value="bankNumber" @click.native="bindBack(bankNumber)" v-if="show" is-link></cell>
    </group>

    <!--<group title="切换背景">-->
      <!--<flexbox :gutter="0">-->
        <!--<flexbox-item v-for="(img, index) in images" :key="index"><img :src="img" style="width:100%" @click="url = img"/></flexbox-item>-->
      <!--</flexbox><br/><br/><br/>-->
    <!--</group>-->
  </div>
</template>

<script>
    import {Group, Cell, Flexbox, FlexboxItem, Blur, cookie} from 'vux'
    export default {
        components: {
          Group,
          Cell,
          Blur,
          Flexbox,
          FlexboxItem
        },
        created () {
          let vue = this
          vue.updateTitle('个人信息');
          vue.get({
            url: '/userInfo',
            headers: {'token': cookie.get('token')},
            success:function (data) {
              if(data.broker == null){
                vue.$data.show = false
                vue.$data.username = (data.user == null) ? '' : data.user.name
                vue.$data.tel = (data.user == null) ? '' : data.user.mobile
              }else {
                let bankNumbers = (data.bank == null) ? '尚未绑定银行卡' : data.bank.bankCard
                vue.$data.username = data.user.name
                vue.$data.userNicaname = data.broker.applicant
                vue.$data.userSex = data.broker.applicantType
                vue.$data.tel = data.user.mobile
                vue.$data.cardID = data.broker.documentNumber
                vue.$data.userType = data.broker.documentType
                vue.$data.userAddress = data.broker.address
                vue.$data.bankNumber = bankNumbers
              }
            }
          })
        },
        mounted (){},
        data () {
            return {
              show:true,
              username: '',
              userNicaname:'',
              userSex:'',
              userType:'',
              userAddress:'',
              bankNumber: '',
              tel:'',
              cardID:'',
              images: [
                'https://o3e85j0cv.qnssl.com/tulips-1083572__340.jpg',
                'https://o3e85j0cv.qnssl.com/waterway-107810__340.jpg',
                'https://o3e85j0cv.qnssl.com/hot-chocolate-1068703__340.jpg'
              ],
              url: 'https://o3e85j0cv.qnssl.com/tulips-1083572__340.jpg'
            }
        },
        methods: {
          bindBack (bankNumbers){
            let vue = this

            if(bankNumbers == '尚未绑定银行卡'){
              vue.$router.push('/index/user/addBankCard?type=userInfo')
            } else {
              vue.$router.push('/index/user/updateBankCard?type=userInfo')
            }
          }
        }
    }
</script>

<style>
  *{font-size: 14px}
  .center {
    text-align: center;
    padding-top: 20px;
    color: #fff;
    font-size: 18px;
  }
  .center img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 4px solid #ececec;
  }
</style>
