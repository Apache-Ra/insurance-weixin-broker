<template>
  <div>
    <tab :line-width=2 :active-color='active_style' v-model="index">
      <tab-item class="vux-center" v-for="(item, index) in list2" :key="index" @on-item-click="onItemClick">{{item}}</tab-item>
    </tab>
    <div>

      <div class="tab-swiper vux-center" v-show="user_login" style="display: none;">
        <group class="weui-cells_form">
          <x-input title="账号" v-model="userName" :max="11" type="tel" is-type="tel" ref="userName" :class="{'isValidate':userName == ''}" placeholder="请输入用户户名（手机号）"></x-input>
          <x-input title="密码" v-model="userPwd" ref="userPwd"  :class="{'isValidate':userPwd == ''}" placeholder="请输入密码"></x-input>
        </group>
        <box gap="20px" class="mbay-ui-button">
          <x-button type="primary" action-type="button" @click.native="password__submit">登录</x-button>
        </box>
      </div>

      <div class="tab-swiper vux-center" v-show="tel_login" style="display: none;">
        <group class="weui-cells_form">
          <x-input title="手机号"  v-model="telNumber" :max="11" type="tel" is-type="tel" ref="telNumber"  :class="{'isValidate':telNumber == ''}" placeholder="请输入手机号"></x-input>
          <x-input title="验证码" v-model="verificationCode" is-type="int" ref="verificationCode"  :class="{'isValidate':verificationCode == ''}" placeholder="请输入验证码"></x-input>
        </group>
        <button class="mbay-ui-input-button" @click="sendCode(telNumber)" :disabled="disabled">{{msg}}</button>
        <box gap="20px" class="mbay-ui-button">
          <x-button type="primary"  action-type="button" @click.native="telNumber_submit">登录</x-button>
        </box>
      </div>
      <p style="text-align: left;padding-left: 20px">没有账号,<a href="Javascript:void(0)" @click="userBind">马上注册</a></p>
    </div>
  </div>
</template>

<script>
  import {Tab, TabItem, Group ,XInput, Box ,XButton, cookie} from 'vux'
  const list = () => [ '密码登录', '验证码登录']
  export default {
    components: {
      Tab,
      TabItem,
      Group,
      XInput,
      Box,
      XButton
    },
    created () {
      let vue = this
      vue.updateTitle('预约赴港')
//      cookie.set('login', {userName:'admin', password:"000000"}, {
//        domain: location.hostname,
//        path: '/',
//        expires: 30
//      })
      //检测cookie是否存在登录信息
      let isLogin = cookie.get('login')
      if(isLogin){
        vue.$router.push('./home')
      }
    },
    data () {
      return {
        isValidate:true,
        msg:"获取验证码",
        active_style:'#1AAD19',
        index:0,
        list2: list(),
        tel_login:false,
        user_login:true,
        telNumber:'',
        verificationCode:'',
        userName:'',
        userPwd:'',
        disabled:false,
        time:59
      }
    },
    methods: {
      //TAB切换
      onItemClick(index){
        let vue = this
        if(index == 0){
          vue.$data.tel_login = false
          vue.$data.user_login = true
        } else {
          vue.$data.tel_login = true
          vue.$data.user_login = false
        }
      },
      //发送手机验证码C
      sendCode(telNumber) {
        let vue = this
        if(telNumber){
          vue.$data.disabled = true
          vue.$data.msg = "（"+vue.$data.time + '秒）后重新获取'
          //定时器
          let interval = setInterval(function () {
            vue.$data.time = vue.$data.time - 1
            vue.$data.msg = "（"+vue.$data.time + '秒）后重新获取'
            if (vue.$data.time === 0) {
              vue.$data.disabled = false
              vue.$data.msg = '获取验证码'
              vue.$data.time = 60
              clearInterval(interval)
            }
          }, 1000)
          //发送验证码
          vue.get({
            url: '/captcha',
            params: {
              mobile: telNumber
            },
            success: function () {
              vue.$vux.toast.show({
                text: '发送成功'
              })
            }
          })
        }
      },
      //密码登录
      password__submit () {
        let vue = this
        vue.validate({
          valid:vue.$refs,
          ignoreRefs: ['telNumber', 'verificationCode'],
          success:function () {
            vue.post({
              url: '/login/mobile',
              data: {
                mobile: vue.$data.userName,
                pwd:vue.$data.userPwd
              },
              success: function (data) {
                vue.loginSuccess(data)
              }
            })
          },error:function (isValid) {
              console.log(isValid)
          }
        })
      },
      //验证码登录
      telNumber_submit () {
        let vue = this
        vue.validate({
          valid:vue.$refs,
          ignoreRefs: ['userName', 'userPwd'],
          success:function () {
            vue.post({
              url: '/login/captcha',
              data: {
                mobile: vue.$data.telNumber,
                captcha:vue.$data.verificationCode
              },
              success: function (data) {
                vue.loginSuccess(data)
              }
            })
          }
        })
      },
      //登录成功的操作
      loginSuccess (data) {
        /**
         * loginInfo:登录成功存储登录信息
         * invitation:存储用户唯一标识(用于关系绑定)
         * constants:存储常量信息
         * token:存储token
         */
        let vue = this
        cookie.set('login',true, { expires: 1})
        cookie.set('invitation', (data.user.broker === null) ? '' : data.user.broker.invitation, { expires: 1})
        cookie.set('constants', JSON.stringify(data.constants), { expires: 1})
        cookie.set('token', data.token, { expires: 1})
        vue.$router.push('./home')
      },
      //用户注册
      userBind () {
        let vue = this
        vue.$router.push("/bind")
      }
    }
  }
</script>

<style>
  *{font-size: 14px;}
  .isValidate{color: red;}
  .insurance em{font-size: 12px !important;}
  .mbay-ui-input-button{border:none;background: #1AAD19;color: #FFF;height:40px;padding:0 10px;margin-top: -40px;position: absolute;right: 20px;}
  .mbay-ui-button button{font-size: 15px;border-radius: 0;height: 40px;}
</style>
