<template>
  <view-box>
    <group>
      <x-input title="航班号" type="text" placeholder="请输入航班号" ref="flightNumber" :min="6" v-model="flightNumber" @on-blur="userFlightNumber(flightNumber)" required></x-input>
      <x-input title="随行人员"  placeholder="请输入随行人员数量(不超过2人)" is-type=number v-model="peoples" ref="peoples" :min="1" :max="1" @on-change="peopleNumber(peoples)" required></x-input>
      <div class="todayBefore todayAfter">
        <!--<calendar v-model="flightDate" title="预约赴港日期"></calendar>-->
        <datetime v-model="flightDate" :title="('预约赴港日期')" confirm-text="确定" cancel-text="取消" required></datetime>
      </div>
      <div class="todayAfter">
        <selector title="是否开户" v-model="whetherOpenAccount" :options="whetherOpenAccountList" @on-change="onChange" placeholder="请选择是否需要香港开户"></selector>
      </div>
      <div  v-if="bankShow">
        <selector title="开户银行" v-model="openAccountType" placeholder="请选择开户银行" :options="openAccountTypeList"></selector>
        <x-input title="银行名称" v-model="openAccountBank" placeholder="请选择银行名称" :min="4" required class="inputAfter"></x-input>
      </div>
      <!--<imageUpload @imageuploaded="imageuploaded"></imageUpload>-->
      <ImgWechatUpload @setData="setData" :uploadImgTitle="imgUploadTitle" @removeData="removeData"></ImgWechatUpload>

      <preview :previewList="previewList" class="policy_create"></preview>
    </group>

    <box gap="20px 20px">
      <x-button type="primary" action-type="button" @click.native="submit">提交预约</x-button>
    </box>
  </view-box>
</template>

<script>
  import {ViewBox, Group, XInput, Calendar, Selector, XButton, Box, Datetime, cookie} from 'vux'
  import ImageUpload from '../kits/imageUpload.vue'
  import ImgWechatUpload from '../kits/imgWechatUpload.vue'
  import Preview from '../kits/preview.vue'


  export default {
    components: {
      ImgWechatUpload,
      ViewBox,
      Group,
      XInput,
      Calendar,
      Selector,
      ImageUpload,
      Preview,
      XButton,
      Box,
      Datetime
    },
    created (){
      this.updateTitle('预约赴港');
    },
    data () {
      let constantsInfo = JSON.parse(cookie.get('constants'))

      return {
        dataTime:'',
        flightNumber: '',
        peoples: '',
        flightDate: this.now(),
        whetherOpenAccount: 'true',
        openAccountType: '外资开户',
        openAccountBank: '',
        bankShow:true,
        whetherOpenAccountList:[{key: true, value: '是'}, {key: false, value: '否'}],
        openAccountTypeList:constantsInfo.openAccountType,
        images: [],
//        images: {
//          flightImg: '',
//          flightImgTwo: ''
//        },
        previewList: [
          {src: 'static/img/broker/fly/fly_01.png'}
        ],
        imgUploadTitle:"请上传机票截图"
      }
    },
    methods: {
      userFlightNumber(flightNumber){
        this.validate({val:flightNumber,tag:'flightNumber',type:''})
      },
      userOpenAccountBank(openAccountBank){
        this.validate({val:openAccountBank,tag:'openAccountBank',type:'String'})
      },
      onChange(val){
          this.$data.bankShow = val
      },
      setData(image) {
        let index = image.index
        this.$data.images[index] = image.fileName
      },
      removeData(image) {
        this.$data.images.splice(image.index, 1)
      },
      imageuploaded (images) {
        this.$data.image = images
      },
      peopleNumber (val){
        let vue= this
        if(val > 3){
          vue.prop({text:"随行人员最多为2人",width:"12em"})
        }
      },
      submit () {
        let vue = this
        let parameter = vue.$route.query
        vue.valid({
          refs: vue.$refs,
          success: function () {
            vue.post({
              url: '/appointment',
              headers:{
                'token':cookie.get('token')
              },
              data: {
                orderId:parameter.orderId,
                flightNumber :vue.$data.flightNumber,
                peoples :vue.$data.peoples,
                flightDate :vue.$data.flightDate,
                whetherOpenAccount :vue.$data.whetherOpenAccount,
                openAccountType :vue.$data.openAccountType,
                openAccountBank :vue.$data.openAccountBank,
                flightImg:vue.$data.images[0],
                flightImgTwo:vue.$data.images[1]
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
  .whetherAfter{position:relative}
  .todayAfter{position:relative}
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
  .todayBefore:before{
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
  .todayAfter:after{
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
    left: 15px;
  }
  .policy_create .previewImg {
    height: 170px;
  }

  .policy_create .pswp__img {
    height: initial !important;
    margin-top: -120px !important;
  }
</style>
