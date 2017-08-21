<template>
  <view-box>
    <group>
      <x-input title="保单号" v-model="policyNumber" ref="policyNumber" required></x-input>
      <x-input title="投保人" v-model="applicant" ref="applicant" @on-blur="userPpplicant(applicant)" required></x-input>
      <x-input title="受保人" v-model="insurant" ref="insurant" @on-blur="userInsurant(insurant)" required></x-input>
      <x-input title="手机号" type="tel" is-type="china-mobile" v-model="mobile" :min="11" :max="11" ref="mobile" required></x-input>
      <x-input title="保险公司" v-model="insuranceCompany" ref="insuranceCompany"  @on-blur="userInsuranceCompany(insuranceCompany)" required></x-input>
      <x-input title="产品名称" v-model="productName" ref="productName"  @on-blur="userProductName(productName)" required class="inputAfter"></x-input>
      <!--<imageUpload @imageuploaded="imageuploaded"></imageUpload>-->

      <ImgWechatUpload @setData="setData" @removeData="removeData" :uploadImgTitle="uploadImgTitle"></ImgWechatUpload>

      <preview :previewList="previewList" class="policy_create"></preview>
    </group>

    <box gap="20px 20px">
      <x-button type="primary" action-type="button" @click.native="submit">提交</x-button>
    </box>
  </view-box>
</template>

<script>
  import {mapState} from 'vuex'
  import {ViewBox, Group, XInput, XButton, Box, cookie} from 'vux'
  import ImageUpload from '../kits/imageUpload.vue'

  import ImgWechatUpload from '../kits/imgWechatUpload.vue'
  import Preview from '../kits/preview.vue'

  export default {
    components: {
      ViewBox,
      Group,
      XInput,
      ImageUpload,
      ImgWechatUpload,
      Preview,
      XButton,
      Box
    },
    created (){
      this.updateTitle('保单托管');
    },
    data () {
      return {
        policyNumber: '',
        applicant: '',
        insurant: '',
        mobile: '',
        insuranceCompany: '',
        productName: '',
        images: [],
        previewList: [
          {src: 'static/img/preview/policy/policy_create_img_01.png'},
          {src: 'static/img/preview/policy/policy_create_img_02.png'}
        ],
        uploadImgTitle: '请上传保单信息前两页'
      }
    },
    methods: {
//      userPolicyNumber(policyNumber){
//        this.validate({val:policyNumber,tag:'policyNumber',type:''})
//      },
      userPpplicant(applicant){
        this.validate({val:applicant,tag:'applicant',type:'String'})
      },
      userInsurant(insurant){
        this.validate({val:insurant,tag:'insurant',type:'String'})
      },
      userInsuranceCompany(insuranceCompany){
        this.validate({val:insuranceCompany,tag:'insuranceCompany',type:'String'})
      },
      userProductName(productName){
        this.validate({val:productName,tag:'productName',type:'String'})
      },

      imageuploaded (images) {
        this.$data.image = images
      },
      setData(image) {
        let index = image.index
        this.$data.images[index] = image.fileName
      },
      removeData(image) {
        this.$data.images.splice(image.index, 1)
      },
      submit () {
        let vue = this

        if (vue.$data.images.length !== 2) {
          vue.$vux.toast.show({
            isShowMask: true,
            type: 'cancel',
            text: '请上传保单信息页面',
            width: '12em',
            position: 'default',
            onHide () {
            }
          })
        } else {
          vue.valid({
            refs: vue.$refs,
            success: function () {
              vue.post({
                url: '/policy',
                headers: {
                  'token': cookie.get('token')
                },
                data: {
                  policyNumber: vue.$data.policyNumber,
                  applicant: vue.$data.applicant,
                  insurant: vue.$data.insurant,
                  mobile: vue.$data.mobile,
                  insuranceCompany: vue.$data.insuranceCompany,
                  productName: vue.$data.productName,
                  policyGeneralImg: vue.$data.images[0],
                  policyDetailImg: vue.$data.images[1]
                },
                success: function (data) {
                  vue.$router.push('/index/policy/policyList')
                }
              })
            }
          })
        }

      }
    }
  }
</script>

<style>
  .inputAfter:after {
    content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #D9D9D9;
    color: #D9D9D9;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }

  .vux-demo {
    text-align: center;
  }

  .logo {
    width: 100px;
    height: 100px
  }

  .policy_create .previewImg {
    height: 170px;
  }

  .policy_create .pswp__img {
    height: initial !important;
    margin-top: -120px !important;
  }
</style>
