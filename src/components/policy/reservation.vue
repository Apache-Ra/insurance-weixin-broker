<template>
  <view-box>
    <!--<div class="vux-title">-->
      <!--<h1>预约服务</h1>-->
    <!--</div>-->

    <group title="请详细说明您所需的预约服务：（100个字符以内,同时留下您的联系方式）">
      <x-textarea :max="100"  @on-focus="onEvent('focus')" v-model="content" ref="content" required placeholder="如：您好，我想预约*月*号**:**，在香港开工商银行亚洲账户，请帮忙处理，谢谢！电话：1**********"></x-textarea>
    </group>

    <box gap="20px 20px">
      <x-button type="primary" action-type="button" @click.native="submit">提交预约</x-button>
    </box>

    <!--<div style="height:100%;">-->
      <!--<top :showBack="showBack" style="margin-bottom:46px"></top>-->
      <!--<p></p>-->
    <!--</div>-->
  </view-box>
</template>

<script>
  import {mapState} from 'vuex'
  import {ViewBox, Group, XTextarea, XButton, Box, cookie} from 'vux'
  import Top from '../layouts/top.vue'
  import Bottom from '../layouts/bottom.vue'

  export default {
    components: {
      ViewBox,
      Group,
      XTextarea,
      XButton,
      Box,
      Top,
      Bottom
    },
    data () {
      return {
        content:''
      }
    },
    created () {
      this.updateTitle('预约服务');
    },
    methods: {
      onEvent(event){
      },

      submit () {
        let vue = this

        let textarea_con = vue.$data.content
        if(textarea_con.length <=0){
            vue.prop({text:"预约内容不能为空",width:'14em'})
        }else {
          vue.valid({
            refs: vue.$refs,
            success: function () {
              vue.post({
                url: '/bespoke',
                headers: {
                  'token': cookie.get('token')
                },
                data: {
                  content:vue.$data.content,
                },
                success: function (data) {
                  // 设置token
                  vue.$router.push('/index/policy/policyInfo')
                }
              })

            }
          })
        }
      }
    },
    computed: {
      ...mapState({
        showBack: state => state.vux.showBack
      })
    }
  }
</script>

<style>
  html, body {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
  }
  .vux-title{
    text-align: center;
  }
  *[placeholder]{
    font-size: 12px !important;color: #999999 !important;
  }
</style>
