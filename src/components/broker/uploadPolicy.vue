<template>
  <view-box>
    <group>
      <x-input title="保单号" v-model="policyNumber" ref="policyNumber" placeholder="保单号" required></x-input>
    </group>
    <group style="margin-top: 1px !important;">
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
  import {ViewBox, Group, XInput, XButton, Box, cookie} from 'vux'
  import ImageUpload from '../kits/imageUpload.vue'
  import ImgWechatUpload from '../kits/imgWechatUpload.vue'
  import Preview from '../kits/preview.vue'

  export default {
    components: {
      ImgWechatUpload,
      ViewBox,
      Group,
      XInput,
      ImageUpload,
      XButton,
      Box,
      Preview
    },
    created (){
      this.updateTitle('上传保单');
    },
    data () {
      return {
        policyNumber:'',
        images: [],
        previewList: [
          {src: 'static/img/preview/policy/policy_create_img_01.png'},
          {src: 'static/img/preview/policy/policy_create_img_02.png'}
        ],
        uploadImgTitle: '请上传保单信息前两页'
      }
    },
    methods: {
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
        let parameter = vue.$route.query
        vue.valid({
          refs: vue.$refs,
          success: function () {
            vue.post({
              url: '/uploadPolicy',
              headers:{
                'token':cookie.get('token')
              },
              data: {
                policyNumber:vue.$data.policyNumber,
                orderId:parameter.orderId,
                policyPictureOne:vue.$data.images[0],
                policyPictureTwo:vue.$data.images[1]
              },
              success: function (data) {
                vue.$router.push('/index/broker/buy')
              }
            })
          }
        })
      }
    }
  }
</script>

<style>
  *{font-size:14px}
  .inputAfter{position: relative}
  .todayBefore{position:relative}
  .inputAfter:after{
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
  .todayBefore>div:before{
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
</style>
