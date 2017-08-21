<template>
  <div>
    <!--<div class="vux-demo" style="margin-top: 20px;">-->
      <!--<img class="logo" src="../assets/img/bdwy_logo.png">-->
      <!--<h1>注册页面</h1>-->
    <!--</div>-->
    <group title="">
      <x-input title="真实姓名" type="text" placeholder="请输入您的真实姓名" :min="2" :max="10" v-model="name" ref="name" is-type="string" :class="{'isValidate':name == ''}" :show-clear="true"></x-input>
      <x-input title="设置密码" v-model="pwd" ref="pwd" type="password" placeholder="请输入至少6-8位字符" :min="6" :max="8" :class="{'isValidate':pwd == ''}" :show-clear="true"></x-input>
      <x-input title="确认密码" v-model="cpwd" ref="cpwd" type="password" placeholder="请输入至少6-8位字符" :min="6" :max="8" :class="{'isValidate':cpwd == ''}" :equal-with="pwd" :show-clear="true"></x-input>
      <!--<x-input title="手机号码" v-model="mobile" ref="mobile" type="tel" placeholder="请输入手机号码" :max="11" :min="11" :show-clear="true" is-type="china-mobile" @on-blur="userMobile(mobile)" required>-->
        <!--<x-button slot="right" type="primary" mini :disabled="disabled" @click.native="send">{{msg}}</x-button>-->
      <!--</x-input>-->

      <x-input title="手机号码"  v-model="mobile" :max="11" type="tel" is-type="tel" ref="mobile" :class="{'isValidate':mobile == ''}" placeholder="请输入手机号"></x-input>
      <button class="mbay-ui-input-button" @click="sendCode()" :disabled="disabled">{{msg}}</button>
      <x-input title="验证码" v-model="captcha" ref="captcha" is-type="int" type="tel" placeholder="请输入4位数字" :min="4" :max="4" :class="{'isValidate':captcha == ''}" :show-clear="true"></x-input>
    </group>
    <!--用户协议-->
    <div class="checkBox_find">
      <label class="check_label">
        <input type="checkbox" name="readingTerms" class="checked_find" v-model="userAgreement_state"/> 我已经阅读并同意<a class="click_a" @click="examine_agreement">用户使用协议</a>
      </label>
    </div>

    <x-dialog v-model="user_agreement_txt" class="mbay-dialog—max" hide-on-blur>
      <div class="user_agreement_content" @click="user_agreement_txt=false">
        <div class="user_agreement_text">
          <x-icon type="ios-close-outline" @click="cloceMask" class="cloceMask" v-if="closeMaskS"></x-icon>
          <p style="text-align: center;font-weight: bold;height: 30px;font-size: 14px;">用户使用协议</p>
          <p v-for="item in agreementContent">{{item.content}}</p>
        </div>

        <div class="checkBox_find checkBox_find_">
          <label class="check_label" @click="agreed_agreement(agreed_agreement_states)" style="color:#000" ><input type="checkbox" name="readingTerms" class="checked_find" v-model="userAgreement_state"/>阅读并同意该协议</label>
        </div>
      </div>
    </x-dialog>
    <!--提交按钮-->
    <box gap="10px 10px" class="mbay-ui-button">
      <x-button type="primary" action-type="button" @click.native="submit" :disabled="!userAgreement_state">提交</x-button>
    </box>
  </div>
</template>

<script>
  import {Group, XInput, XButton, XDialog, Box, cookie} from 'vux'

  export default {
    components: {
      Group,
      XInput,
      XButton,
      XDialog,
      Box
    },
    data () {
      return {
        isValidate:true,
        msg: '发送验证码',
        time: 60,
        disabled: false,
        name: '',
        pwd: '',
        cpwd: '',
        mobile: '',
        captcha: '',
        userAgreement_state:false,
        closeMaskS:true,
        user_agreement_txt:false,
        agreed_agreement_states:false,
        agreementContent:[],
        invitation:''
      }
    },
    created () {
      let vue = this
      let data = require('../assets/data/register_agreement.json')

      for (let i in data.register_agreement) {
        let item = data.register_agreement[i]

        let cnm = {
          content: item.paragraph
        }
        vue.$data.agreementContent.push(cnm)
      }

//      let data = require('../assets/data/bind_agreement.json')
//
//      for(let i in data.bind_agreement){
//        let item = data.bind_agreement[i]
//        let obj = {
//            content:item.paragraph
//        }
//        vue.$data.agreementContent.push(obj)
//      }
      //判断是否阅读过协议
      vue.$data.userAgreement_state = cookie.get('policy_agreement') ? true : false
      vue.$data.agreed_agreement_states = cookie.get('policy_agreement') ? true : false
      vue.$data.invitation = cookie.get('invitation')
    },
    methods: {
      sendCode () {
        let vue = this
        vue.validate({
          valid: vue.$refs,
          ignoreRefs:['name', 'pwd', 'cpwd', 'captcha'],
          success: function () {
            vue.$data.disabled = true
            vue.$data.msg = "（" + vue.$data.time + '秒）'+"后重新发送"
            let interval = setInterval(function () {
              vue.$data.time = vue.$data.time - 1
              vue.$data.msg = "（" + vue.$data.time + '秒）'+"后重新发送"
              if (vue.$data.time === 0) {
                vue.$data.disabled = false
                vue.$data.msg = "重新发送"
                vue.$data.time = 60
                clearInterval(interval)
              }
            }, 1000)

            vue.get({
              url: '/captcha',
              params: {
                mobile: vue.$data.mobile
              },
              success: function () {
                vue.prop({text:"发送成功",type:'success'})
              }
            })
          }



        })
      },
      submit () {
        let vue = this
        /**
         * @inviitation 唯一标识,用于关系绑定
         */
        vue.validate({
          valid: vue.$refs,
          success: function () {
            let openId = vue.$route.query.openId
            vue.post({
              url: '/weixin/bind',
              data: {
                openId: openId,
                name: vue.$data.name,
                mobile: vue.$data.mobile,
                captcha: vue.$data.captcha,
                pwd: vue.$data.pwd,
                invitation:vue.$data.invitation
              },
              success: function (data) {
                // 设置token
                cookie.set('token', data.token, { expires: 1})
                //设置常量
                cookie.set('constants', JSON.stringify(data.constants), { expires: 1})
                vue.$router.push('/home')
              }
            })
          }
        })
      },
      //用户协议
      //查看协议直接打钩
      userAgreement(userAgreement_state){
        let vue = this
        console.log(userAgreement_state)
      },
      //按钮关闭协议
      cloceMask(){
        let vue = this
        vue.$data.user_agreement_txt = false
      },
      //阅读并同意该协议
      agreed_agreement (agreed_agreement_states) {
        let vue = this
        vue.$data.agreed_agreement_states = cookie.get('policy_agreement') ? true : false

        if(!agreed_agreement_states){
          cookie.set('policy_agreement', true, { expires: 1})
          vue.$data.agreed_agreement_states = true
          vue.$data.user_agreement_txt = false
          vue.$data.userAgreement_state = true
        }else {
          vue.$data.user_agreement_txt = false
        }
      },

      //查看协议
      examine_agreement () {
        let vue = this
        vue.$data.closeMaskS = true
        vue.$data.user_agreement_txt = true
      }
    }
  }
</script>

<style>
  *{font-size: 14px}
  .vux-demo {text-align: center;}
  .logo {width: 100px;height: 100px}
  .checkBox_find{padding:5px 20px;height: 30px;line-height: 30px;color:#ccc;}
  .check_label{font-size: 13px;}
  .checked_find{width: 20px;height:20px;position: relative;float: left;  top:4px;margin-right: 5px;}
  .checkBox_find_{padding:10px 0}
  .click_a{margin: 0 2px;color: blue;font-size: 13px;}
  .mbay-dialog—max .weui-dialog{height:85%;overflow-y: auto;padding: 20px;text-align: left}
  .cloceMask{float: right;}
  .user_agreement_text p{font-size: 13px;line-height: 25px;}
  .mbay-ui-input-button{border:none;background: #1AAD19;color: #FFF;height:40px;padding:0 10px;margin-top: -40px;position: absolute;right:15px;}
  .isValidate{color: red;}
  .mbay-ui-button button{font-size: 15px;border-radius: 0;height: 40px;}
</style>
