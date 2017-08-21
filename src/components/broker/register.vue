<template>
  <div>
    <group></group>
    <group title="请填写真实信息">
      <x-input title="申请人" placeholder="请填写真实姓名" type="text" is-type="string" :min="2" :max="10" v-model="applicant" ref="applicant"  :class="{'isValidate':applicant == ''}" ></x-input>
      <selector title="性别" v-model="applicantType" placeholder="请选择性别" ref="applicantType" :options="applicantTypeList"  :class="{'isValidate':applicantType == ''}" ></selector>
      <selector title="证件类型" v-model="documentType" placeholder="请选择证件类型" ref="documentType" :options="documentTypeList"  :class="{'isValidate':documentType == ''}" ></selector>
      <x-input title="证件号码" type="text" v-model="certificateNumber" is-type="cardId" ref="certificateNumber" :min="15" :max="18" placeholder="请输入证件号码"   :class="{'isValidate':certificateNumber == ''}" ></x-input>
      <x-input title="通讯地址" type="text" v-model="address" is-type="string" :min="2" placeholder="通讯地址" ref="address"  :class="{'isValidate':address == ''}" ></x-input>
    </group>

    <!--<group title="身份证上传请上传正反面，营业执照上传请扫描正面，护照上传请扫描个人照片页与个人签名页">-->
    <!--<imageUpload @imageuploaded="imageuploaded"></imageUpload>-->
    <!--</group>-->
    <ImgWechatUpload @setData="setData" @removeData="removeData"></ImgWechatUpload>

    <div class="checkBox_find">
      <!--@click="userAgreement(userAgreement_state)"-->
      <label class="check_label"><input type="checkbox" name="readingTerms" class="checked_find"
                                        v-model="userAgreement_state"/> 我已经阅读并同意<a class="click_a" @click="examine_agreement">用户使用协议</a></label>
    </div>


    <x-dialog v-model="user_agreement_txt" class="mbay-dialog" hide-on-blur>
      <div class="user_agreement_content" @click="user_agreement_txt=false">
        <div class="user_agreement_text">
          <x-icon type="ios-close-outline" @click="cloceMask" class="cloceMask" v-if="closeMaskS"></x-icon>
          <p style="text-align: center;font-weight: bold;height: 30px;font-size: 14px;">用户协议</p>
          <p v-for="item in agreementContent">{{item.content}}</p>
        </div>

        <div class="checkBox_find checkBox_find_">
          <label class="check_label" @click="agreed_agreement(agreed_agreement_states)" style="color:#000"><input
            type="checkbox" name="readingTerms" class="checked_find" v-model="userAgreement_state"/>阅读并同意该协议</label>
        </div>
      </div>
    </x-dialog>

    <group style="padding:5px 20px;">
      <x-button type="primary" action-type="button" @click.native="submit" :disabled="!userAgreement_state">注册
      </x-button>
    </group>
  </div>
</template>

<script>
  import {Group, XInput, Selector, XButton, XDialog, Toast, cookie} from 'vux'
  import ImgWechatUpload from '../kits/imgWechatUpload.vue'
  import ImageUpload from '../kits/imageUpload.vue'
  export default {
    components: {
      ImgWechatUpload,
      Group,
      XInput,
      Selector,
      XButton,
      ImageUpload,
      XDialog,
      Toast
    },
    created () {
      let vue = this
      vue.updateTitle('注册全民经纪')
      let constants = JSON.parse(cookie.get('constants'))
      let reading_agreement = cookie.get('reading_agreement')
      //初始化cookie存在阅读记录则关闭于都协议
      vue.$data.userAgreement_state = (cookie.get("broker_agreement")) ? true : false
      vue.$data.applicantTypeList = constants.applicantTypes
      vue.$data.documentTypeList = constants.documentTypes

      let data = require('../../../src/assets/data/register_agreement.json')

      for (let i in data.register_agreement) {
        let item = data.register_agreement[i]

        let cnm = {
          content: item.paragraph
        }
        vue.$data.agreementContent.push(cnm)
      }

    },
    data () {
      return {
        isValidate:true,
        applicant: '',
        applicantType: '',
        documentType: '',
        certificateNumber: '',
        address: '',
        user_agreement_txt: false,
        applicantTypeList: [],
        documentTypeList: [],
        agreed_agreement_states: false,
        userAgreement_state: false,
        closeMaskS: false,
        images: [],
        agreementContent: []
      }
    },
    methods: {

      setData(image) {
        let index = image.index
        this.$data.images[index] = image.fileName
      },
      removeData(image) {
        this.$data.images.splice(image.index, 1)
      },

      submit () {
        let vue = this

        if (!vue.$data.userAgreement_state) {
          vue.$vux.toast.show({
            width: '8.6em',
            type: 'warn',
            text: '请查看用户协议'
          })
        } else {
          if (vue.$data.images.length !== 2) {
            vue.$vux.toast.show({
              isShowMask: true,
              type: 'cancel',
              text: '请上传身份证正面与反面',
              width: '13em',
              position: 'default',
              onHide () {
              }
            })
          } else {
            vue.validate({
              valid: vue.$refs,
              success: function () {
                vue.post({
                  url: '/broker',
                  headers: {'token': cookie.get('token')},
                  data: {
                    applicant: vue.$data.applicant,
                    applicantType: vue.$data.applicantType,
                    documentType: vue.$data.documentType,
                    documentNumber: vue.$data.certificateNumber,
                    address: vue.$data.address,
                    documentFrontImage: vue.$data.images[0],
                    documentBackImage: vue.$data.images[1]
                  },
                  success: function (data) {
                    /**
                     * inviitation 用于关系绑定
                     */
                    cookie.set('invitation', data.invitation, { expires: 1})
                    vue.$router.push('/index/broker/buy')
                  }
                })
              },
              error(isValid){
                //console.log(isValid)
              }
            })
          }
        }
      },
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
        if (!agreed_agreement_states) {
          cookie.set('broker_agreement', true, {expires: 1})
          vue.$data.user_agreement_txt = false
          vue.$data.userAgreement_state = true
        } else {
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
  * {
    font-size: 14px
  }

  .checkBox_find {
    padding: 5px 20px;
    height: 30px;
    line-height: 30px;
    color: #ccc;
  }

  .check_label {
    font-size: 13px;
  }

  .checked_find {
    width: 20px;
    height: 20px;
    position: relative;
    float: left;
    top: 4px;
    margin-right: 5px;
  }

  .checkBox_find_ {
    padding: 10px 0
  }

  .click_a {
    margin: 0 2px;
    color: blue;
    font-size: 13px;
  }

  .mbay-dialog .weui-dialog {
    height: 85%;
    overflow-y: auto;
    padding: 20px;
    text-align: left
  }

  .cloceMask {
    float: right;
  }

  .user_agreement_text p {
    font-size: 13px;
    line-height: 25px;
  }
  .isValidate{color: red;}
</style>
