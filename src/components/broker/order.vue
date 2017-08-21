<template>
  <scroller lock-x scrollbar-y height="-46" ref="scroller">
  <view-box>
    <group title="投保人信息（请填写真实信息）">

      <x-input title="保险公司" v-model="insuranceCompany" type="text" ref="insuranceCompany" placeholder="保险公司" :class="{'isValidate':insuranceCompany == ''}"></x-input>
      <x-input title="产品名称" v-model="productName" ref="productName" placeholder="产品名称" :class="{'isValidate':productName == ''}"></x-input>
      <x-input title="保费" v-model="dollar" ref="dollar" type="number" placeholder="保费（单位：$）" :class="{'isValidate':dollar == ''}"></x-input>
      <x-input title="付费年限" v-model="paidYears" type="number" is-type="int" ref="paidYears" placeholder="付费年限" :class="{'isValidate':paidYears == ''}"></x-input>
      <selector title="是否吸烟" v-model="applicantSmoke" ref="applicantSmoke" :options="applicantSmokeList" :class="{'isValidate':applicantSmoke == ''}"></selector>
      <x-input title="投保人" v-model="applicant" ref="applicant" placeholder="投保人" @on-change="insurantChange" :class="{'isValidate':applicant == ''}"></x-input>
      <selector title="性别" v-model="applicantSex" ref="applicantSex" :options="applicantSexList" :class="{'isValidate':applicantSex == ''}"></selector>
      <selector title="国籍(地区)" v-model="applicantNatinoality" ref="applicantNatinoality" :options="applicantNatinoalityList" :class="{'isValidate':applicantNatinoality == ''}"></selector>
      <x-input title="年龄" v-model="applicantAge" type="number" ref="applicantAge" placeholder="年龄" :class="{'isValidate':applicantAge == ''}"></x-input>
      <x-input title="身份证号码" v-model="applicantId" :min="18" :max="18" ref="applicantId" is-type="cardId" placeholder="身份证号码"  :class="{'isValidate':applicantId == ''}"></x-input>
      <x-input title="港澳通行证号码" v-model="applicantPermit" :min="9" :max="9" ref="applicantPermit" is-type="GATpermit" placeholder="港澳通行证号码" :class="{'isValidate':applicantPermit == ''}"></x-input>
      <x-input title="护照号码" v-model="applicantPassport" :min="9" :max="9" ref="applicantPassport" is-type='passport' placeholder="护照号码" :class="{'isValidate':applicantPassport == ''}"></x-input>
      <x-input title="公司名称" v-model="applicantCompany" ref="applicantCompany" placeholder="公司名称" :class="{'isValidate':applicantCompany == ''}"></x-input>
      <x-input title="公司地址" v-model="applicantCompanyAddress" ref="applicantCompanyAddress" placeholder="公司地址" :class="{'isValidate':applicantCompanyAddress == ''}"></x-input>
      <x-input title="职务" v-model="applicantJob" ref="applicantJob" placeholder="职务" :class="{'isValidate':applicantJob == ''}"></x-input>
      <x-input title="职位" v-model="applicantPosition" ref="applicantPosition" placeholder="职位" :class="{'isValidate':applicantPosition == ''}"></x-input>
      <x-input title="年薪" v-model="applicantSalaryYear" type="number" ref="applicantSalaryYear" placeholder="年薪（单位：万美元）" :class="{'isValidate':applicantSalaryYear == ''}"></x-input>
      <x-input title="身份证地址" v-model="applicantIdAddress" ref="applicantIdAddress"placeholder="身份证地址"  :class="{'isValidate':applicantIdAddress == ''}"></x-input>
      <x-input title="收件地址" v-model="applicantAddress" ref="applicantAddress" placeholder="收件地址" :class="{'isValidate':applicantAddress == ''}"></x-input>
    </group>

    <group title="受保人信息（自己给自己投保则不需要重复填写信息）">
      <x-input title="受保人" v-model="insurant" ref="insurant" placeholder="受保人" @on-change="insurantChange" :class="{'isValidate':insurant == ''}"></x-input>
      <div class="none inputBefore" v-if="Calendar_applicant">
        <selector title="受保人性别" v-model="insurantSex" ref="insurantSex" :options="insurantSexList" :class="{'isValidate':insurantSex == ''}"></selector>
        <selector title="受保人关系" v-model="relation" ref="relation" :options="relationList" :class="{'isValidate':relation == ''}"></selector>
        <selector title="国籍(地区)" v-model="insurantNatinoality" ref="insurantNatinoality" :options="insurantNatinoalityList" :class="{'isValidate':insurantNatinoality == ''}"></selector>
        <x-input title="年龄" v-model="insurantAge" type="number" ref="insurantAge" placeholder="年龄" @on-change="insurantAgeChange" :class="{'isValidate':insurantAge == ''}"></x-input>
        <div class="none inputBefore" v-if="insurantAge18">
          <x-input title="身份证号码" v-model="insurantId" :min="18" :max="18" is-type="cardId" ref="insurantId" placeholder="身份证号码" :class="{'isValidate':insurantId == ''}"></x-input>
          <x-input title="港澳通行证号码" v-model="insurantPermit" :min="9" :max="9"is-type="GATpermit" ref="insurantPermit" placeholder="港澳通行证号码" :class="{'isValidate':insurantPermit == ''}"></x-input>
          <x-input title="护照号码" v-model="insurantPassport" :min="9" :max="9" is-type="passport" ref="insurantPassport" placeholder="护照号码" :class="{'isValidate':insurantPassport == ''}"></x-input>
          <x-input title="公司名称" v-model="insurantCompany" ref="insurantCompany" placeholder="公司名称" :class="{'isValidate':insurantCompany == ''}"></x-input>
          <x-input title="公司地址" v-model="insurantCompanyAddress" ref="insurantCompanyAddress"placeholder="公司地址" :class="{'isValidate':insurantCompanyAddress == ''}"></x-input>
          <x-input title="职务" v-model="insurantJob" ref="insurantJob" placeholder="职位" :class="{'isValidate':insurantJob == ''}"></x-input>
          <x-input title="职位" v-model="insurantPosition" ref="insurantPosition" placeholder="职位" :class="{'isValidate':insurantPosition == ''}"></x-input>
          <x-input title="年薪" v-model="insurantSalaryYear" type="number" ref="insurantSalaryYear" placeholder="年薪（单位：万美元）" :class="{'isValidate':insurantSalaryYear == ''}"></x-input>
          <x-input title="身份证地址" v-model="insurantIdAddress" ref="insurantIdAddress" placeholder="身份证地址" :class="{'isValidate':insurantIdAddress == ''}"></x-input>
          <x-input title="收件地址" v-model="insurantAddress" ref="insurantAddress"placeholder="收件地址" :class="{'isValidate':insurantAddress == ''}"></x-input>
          <selector title="是否吸烟" v-model="insurantSmoke" ref="insurantSmoke" :options="insurantSmokeList" :class="{'isValidate':insurantSmoke == ''}"></selector>
        </div>
      </div>
    </group>
    <group title="受益人信息">
      <x-input title="受益人" v-model="beneficiary" ref="beneficiary" placeholder="请填写收益人" style="padding: 7.5px 15px;" :class="{'isValidate':beneficiary == ''}">
        <x-button slot="right" type="primary" mini @click.native="addBeneficiary">添加受益人</x-button>
      </x-input>
      <x-input title="收益比例" v-model="scale" type="number" ref="scale" placeholder="请填写收益比例（单位：%）" :class="{'isValidate':scale == ''}"></x-input>
    </group>

    <group title="添加受益人（注：最多添加20个受益人）" v-for="item in beneficiaryList" :key="item" v-if="Beneficiary">
      <x-input title="受益人" v-model="item.beneficiary"  placeholder="请填写收益人" style="padding: 7.5px 15px;">
        <x-button slot="right" type="primary" mini @click.native="addBeneficiary">添加受益人</x-button>
      </x-input>
      <x-input title="收益比例" v-model="item.scale" type="number" placeholder="请填写收益比例（单位：%）" style="padding: 7.5px 15px;">
        <x-button slot="right" type="primary" mini @click.native="deleteBeneficiary">删除受益人</x-button>
      </x-input>
    </group>

    <group title="预约赴港日期">
      <!--<inline-calendar v-model="hkDate"></inline-calendar>-->
      <datetime v-model="hkDate" :title="('预约赴港日期')" ref="hkDate" confirm-text="确定" cancel-text="取消" required></datetime>
    </group>

    <box gap="20px 20px">
      <x-button type="primary" action-type="button" @click.native="submit">提交</x-button>
    </box>
  </view-box>
  </scroller>
</template>

<script>
  import {Scroller, ViewBox, Group, XInput, Selector, XButton, Box, InlineCalendar, Cell, Datetime, cookie} from 'vux'
  export default {
    components: {
      Scroller,
      ViewBox,
      Group,
      XInput,
      Selector,
      XButton,
      Box,
      InlineCalendar,
      Cell,
      Datetime
    },
    created (){
      let vue = this
      vue.updateTitle('保险下单');
    },
    data () {
      let constantsInfo = JSON.parse(cookie.get('constants'))
      return {
        isValidate:true,
        dataTime:'',
        applicantSmokeList:[{key: 'true', value: '是'}, {key: 'false', value: '否'}],
        applicantSexList:constantsInfo.sexType,
        applicantNatinoalityList:constantsInfo.nationalityType,
        insurantSexList:constantsInfo.sexType,
        relationList:constantsInfo.relationType,
        insurantNatinoalityList:constantsInfo.nationalityType,
        insurantSmokeList:[{key: 'true', value: '是'}, {key: 'false', value: '否'}],
        Calendar_applicant:true,
        insurantAge18:true,
        //添加受益人Group
        Beneficiary:false,
        //添加受益人的HTML
        appendBeneficiary:'',
        /**
         * 初始化表单
         */
        insuranceCompany: '',
        productName: '',
        dollar: '' ,
        paidYears: '',
        applicantSmoke: '',
        applicant: '',
        applicantSex: '',
        applicantNatinoality: '',
        applicantAge: '',
        applicantId: '',
        applicantPermit: '',
        applicantPassport: '',
        applicantCompany: '',
        applicantCompanyAddress: '',
        applicantJob: '',
        applicantPosition: '',
        applicantSalaryYear: '',
        applicantIdAddress: '',
        applicantAddress: '',
        insurant: '',
        insurantSex: '',
        relation: '',
        insurantNatinoality: '',
        insurantAge: '',
        insurantId: '',
        insurantPermit: '',
        insurantPassport: '',
        insurantCompany: '',
        insurantCompanyAddress: '',
        insurantJob: '',
        insurantPosition: '',
        insurantSalaryYear: '',
        insurantIdAddress: '',
        insurantAddress: '',
        insurantSmoke: '',
        beneficiary: '',
        scale: '',
        hkDate: this.now(),
        beneficiaryList: []
      }
    },
    methods: {

      insurantChange (){
        let vue, applicant, insurant
        vue = this
        applicant = vue.$data.applicant
        insurant = vue.$data.insurant
        //当受保人与投保人是同一个人的时候隐藏的文本框
        vue.$data.Calendar_applicant = (insurant != applicant)?true:false
        vue.$data.relationList = (applicant != insurant) ? JSON.parse(cookie.get('constants')).relationType.slice(0,4):JSON.parse(cookie.get('constants')).relationType

      },
      insurantAgeChange () {
        let vue, insurantAge
        vue = this
        insurantAge = vue.$data.insurantAge
        //当受保人年龄不大于18岁的时候隐藏的文本框
        if(insurantAge <= 18){
          vue.$data.insurantAge18 = false
        }else {
          vue.$data.insurantAge18 = true
        }
      },
      addBeneficiary () {
        let vue = this
        vue.$data.Beneficiary = true
        //原本存在一个和添加后的一个（+2）
        if(vue.$data.beneficiaryList.length+2 > 4){
            console.log("人员超标")
        }else{
          vue.$data.beneficiaryList.push({
            beneficiary: '',
            scale: ''
          })


          this.$nextTick(() => {
            this.$refs.scroller.reset()
        })
        }
      },
      deleteBeneficiary () {
        let vue = this
        vue.$data.beneficiaryList.splice(vue.$data.beneficiaryList.length-1, vue.$data.beneficiaryList.length)

        this.$nextTick(() => {
          this.$refs.scroller.reset()
      })
      },
      submit () {
        let vue = this
        let favoree = []

        favoree.push({
            beneficiary:vue.$data.beneficiary,
            scale:vue.$data.scale
        })

        vue.$data.beneficiaryList.forEach((be) => {
          favoree.push(be)
        })

        let parameter = vue.$route.query
        let ignoreRefsArray = []
        //投保人等于受保人
        let InsuredLimit = vue.$data.Calendar_applicant
        /**
         * @InsuredLimit
         * 当投保人和受保人是同一个人的时候
         *    隐藏余下的输入（insurantAge）
         * TODO：vue.$refs.insurantId以下全部underfind
         *
         */
        //投保人等于受保人
        if(!InsuredLimit && (vue.$data.applicant !='' || vue.$data.insurant != '')){
          ignoreRefsArray = [
            'insurantSex',
            'relation',
            'insurantNatinoality',
            'insurantAge',
            'insurantId',
            'insurantPermit',
            'insurantPassport',
            'insurantCompany',
            'insurantCompanyAddress',
            'insurantJob',
            'insurantPosition',
            'insurantSalaryYear',
            'insurantIdAddress',
            'insurantAddress',
            'insurantSmoke'
          ]
        }
        //受保人年龄小于十八
        if(InsuredLimit && !vue.$data.insurantAge18){
          ignoreRefsArray = [
            'insurantId',
            'insurantPermit',
            'insurantPassport',
            'insurantCompany',
            'insurantCompanyAddress',
            'insurantJob',
            'insurantPosition',
            'insurantSalaryYear',
            'insurantIdAddress',
            'insurantAddress',
            'insurantSmoke'
          ]
        }
        vue.validate({
          valid: vue.$refs,
          ignoreRefs:ignoreRefsArray,
          success: function () {
            vue.post({
              url: '/insuranceOrder',
              headers:{token:cookie.get('token')},
              data: {
                insuranceCompany: vue.$data.insuranceCompany,
                productName: vue.$data.productName,
                dollar: vue.$data.dollar,
                paidYears: vue.$data.paidYears,
                applicantSmoke:  vue.$data.applicantSmoke,
                applicant:  vue.$data.applicant,
                applicantSex:  vue.$data.applicantSex,
                applicantNatinoality: vue.$data.applicantNatinoality,
                applicantAge: vue.$data.applicantAge,
                applicantId: vue.$data.applicantId,
                applicantPermit: vue.$data.applicantPermit,
                applicantPassport: vue.$data.applicantPassport,
                applicantCompany: vue.$data.applicantCompany,
                applicantCompanyAddress: vue.$data.applicantCompanyAddress,
                applicantJob: vue.$data.applicantJob,
                applicantPosition: vue.$data.applicantPosition,
                applicantSalaryYear: vue.$data.applicantSalaryYear,
                applicantIdAddress: vue.$data.applicantIdAddress,
                applicantAddress: vue.$data.applicantAddress,
                insurant: vue.$data.insurant,
                insurantSex: vue.$data.insurantSex,
                relation: vue.$data.relation,
                insurantNatinoality: vue.$data.insurantNatinoality,
                insurantAge: vue.$data.insurantAge,
                insurantId: vue.$data.insurantId,
                insurantPermit: vue.$data.insurantPermit,
                insurantPassport: vue.$data.insurantPassport,
                insurantCompany: vue.$data.insurantCompany,
                insurantCompanyAddress: vue.$data.insurantCompanyAddress,
                insurantJob: vue.$data.insurantJob,
                insurantPosition: vue.$data.insurantPosition,
                insurantSalaryYear: vue.$data.insurantSalaryYear,
                insurantIdAddress: vue.$data.insurantIdAddress,
                insurantAddress: vue.$data.insurantAddress,
                insurantSmoke: vue.$data.insurantSmoke,
                favoree:favoree,
                hkDate: vue.$data.hkDate,
                orderId:parameter.orderId || '',
                programmeId:parameter.programmeId || ''
              },
              success: function (data) {
                  //.log(data)
                vue.$router.push('/index/broker/buy')
              }
            })
          },
          error(resp){
            console.log(resp)
          }
        })
      }
    }
  }
</script>

<style>
  *{font-size: 14px}
  .todayBefore{position: relative;height:44px;line-height: 25px}
  .inputBefore{position: relative;}
  .todayBefore>div:before,.inputBefore:before{
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
  .isValidate{color: red;}
</style>
