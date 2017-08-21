<template>
  <div>
    <top style="margin-bottom:46px"></top>
    <!--TXT-->
    <div>
      <div class="share_ico" style="text-align: center;display: none"><img :src="shareImgUrl" style="max-width:100%;max-height: 100%"></div>
      <div class="share_tit" style="padding: 5px 10px;">{{shareTxtTit}}</div>
      <div class="share_con_img" v-if="pushDetailImgUrl"><img :src="pushDetailImgUrl" style="max-width:100%;max-height: 100%;width: 100%"></div>
      <div v-for="(con, key) in pushDetailContent">
        <p style="padding:5px 10px;line-height:30px;font-size: 13px;text-indent:25px;" v-if="con.text">{{con.text}}</p>
        <p style="margin-top:-30px"><img :src="con.img" style="width: 100%"></p>
      </div>
    </div>
    <!--TXT-->

    <group class="pushQrcode">
      <cell
        :title="('长按关注“全民经纪”')"
        is-link
        :border-intent="false"
        :arrow-direction="pushQrcode ? 'up' : 'down'"
        @click.native="pushQrcode = !pushQrcode"></cell>
      <template v-if="pushQrcode">
        <div class="pushQrcodeBefore">
          <img src="static/img/policy_code.jpg" style="width:50%;">
        </div>
      </template>
    </group>

  </div>
</template>



<script>
  import Top from '../layouts/top.vue'
  import {Group, Card, Cell, Qrcode, XButton, WechatPlugin, XDialog, TransferDomDirective as TransferDom, cookie} from 'vux'
  export default {
    mounted () { },
    components: {Top,Group, Card,Cell,Qrcode,XButton,WechatPlugin,XDialog},
    directives: {TransferDom},
    created () {
      let vue = this
      vue.updateTitle('推广详情')
      //取出DataJSON
      let brokerPush = require('../../../src/assets/data/brokerPushList.json')
      //地址栏取出pushNumber
      let pushNumber = vue.$route.query.pushNumber
      //详情分享图片信息
      let pushShare_info = brokerPush[pushNumber][0].pushDetail
      //详情内容段落信息
      let pushShare_txt = brokerPush[pushNumber][0].pushDetailTxt
      vue.$data.shareImgUrl = pushShare_info.pushDetail_share_img
      vue.$data.shareTxtTit =pushShare_info.pushDetail_title
      vue.$data.pushDetailImgUrl = pushShare_info.pushDetail_max_img
      //vue.$data.pushDetailContent
      for(let i in pushShare_txt){
        let item = pushShare_txt[i]
        vue.$data.pushDetailContent.push(item)
      }

      /**
       * 取出inviitation
       */
      cookie.set('invitation', vue.$route.query.invitation, { expires: 1})

    },
    data () {
      return {
        shareImgUrl:"",
        shareTxtTit:"",
        pushDetailImgUrl:"",
        pushDetailContent:[],
        transmitIco:false,
        pushQrcode: true,
        openId:'',
        wechatData:{}
      }
    },
    methods: {
    }
  }
</script>

<style>
  *{font-size: 14px;}
  .mbay-dialog .weui-dialog{background:none !important;}
  .card-padding {padding: 15px;}
  /*.pushQrcode{position: fixed;width: 100%;bottom:60px;}*/
  .pushQrcodeBefore{position: relative;text-align:center;padding-top:5px}
  .pushQrcodeBefore:before{
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
  }
  .button{font-size: 14px !important;padding: 3px !important;}
</style>
