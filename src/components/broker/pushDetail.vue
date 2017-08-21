<template>
  <div>
  <!--TXT-->
  <div>
    <div class="share_ico" style="text-align: center;display: none"><img :src="shareImgUrl" style="max-width:100%;max-height: 100%"></div>
    <div class="share_tit" style="padding: 5px 10px;">{{shareTxtTit}}</div>
    <div class="share_con_img" v-if="pushDetailImgUrl"><img :src="pushDetailImgUrl" style="max-width:100%;max-height: 100%;width: 100%"></div>
    <div v-for="(con, key) in pushDetailContent">
      <p style="padding:5px 10px;line-height:30px;font-size: 13px;text-indent:25px;" v-if="con.text">{{con.text}}</p>
      <p style="" v-if="con.img"><img :src="con.img" style="width: 100%"></p>
    </div>
  </div>
  <!--TXT-->

    <group class="pushQrcode">
      <cell
        :title="('保单无忧，一生无忧（长按关注“保单无忧”）')"
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

    <group style="padding:5px 20px">
      <x-button plain type="primary" class="button" @click.native="forwarding">一键转发</x-button>
    </group>

    <div v-transfer-dom  class="mbay-dialog">
      <x-dialog v-model="transmitIco" hide-on-blur  :dialog-style="{'max-width': '100%', width: '100%', height: '50%', 'background-color': 'transparent',}">
      <div style="float: right"><img src="../../assets/img/share.gif"></div>
      <div style="color: #FFF;float: left;display: block;font-size: 18px;position: relative;top:70px;">点击右上角马上分享哦！</div>
      </x-dialog>
    </div>
  </div>
</template>



<script>
  import {Group, Card, Cell, Qrcode, XButton, WechatPlugin, XDialog, TransferDomDirective as TransferDom, cookie} from 'vux'
  export default {
    mounted () { },
    components: {Group, Card,Cell,Qrcode,XButton,WechatPlugin,XDialog},
    directives: {TransferDom},
    created () {
      let vue = this
      vue.updateTitle('推广详情');
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
      cookie.set('inviitation', vue.$route.query.inviitation, { expires: 1})
    },
    data () {
      return {
        shareImgUrl:"",
        shareTxtTit:"",
        pushDetailImgUrl:"",
        pushDetailContent:[],
        transmitIco:false,
        pushQrcode: true,
        wechatData:{}
      }
    },
    methods: {
      forwarding () {
        let vue = this
        vue.$data.transmitIco = true
      }
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
