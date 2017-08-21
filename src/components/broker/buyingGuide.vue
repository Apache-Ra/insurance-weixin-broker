<template>
<group>
  <timeline>
    <timeline-item v-for="(guide, index) in buyingGuide" :key="index">
      <h4>{{guide.guideTitle}}</h4>
      <p>{{guide.guideCon}}</p>
    </timeline-item><br/>
  </timeline><br/>
</group>
</template>

<script>
    import {Group, Timeline, TimelineItem } from 'vux'
    export default {
        components: {
          Group,
          Timeline,
          TimelineItem
        },
        created () {
          this.updateTitle('购买指南');
        },
        data () {
            return {
              buyingGuide: [{
                guideTitle:'获取方案',
                guideCon:'将您的相关需求提交',
                guideIco:''
              },{
                guideTitle:'客服沟通确认',
                guideCon:'根据需求沟通相关细节并提交专家团队',
                guideIco:''
              },{
                guideTitle:'产品建议书确认',
                guideCon:'专家团队为您制作产品建议书，客服再次和您确认赴港签约产品，请注意产品年限以及保费，避免信息错误，导致签约延误',
                guideIco:''
              },{
                guideTitle:'保险下单',
                guideCon:'详细填写与客服确认的保险单内容',
                guideIco:''
              },{
                guideTitle:'递交赴港预约单',
                guideCon:'确定您的赴港时间，客服会做相应的安排，确保良好的体验',
                guideIco:''
              },{
                guideTitle:'香港接待确认',
                guideCon:'确定您当天的签约时间、地点及其他安排',
                guideIco:''
              },{
                guideTitle:'完成赴港签约',
                guideCon:'香港团队亲情陪同，在保险公司完成相应投保程序',
                guideIco:''
              },{
                guideTitle:'保单审核通过',
                guideCon:'保险公司内部审核，客服及时反馈相关信息',
                guideIco:''
              },{
                guideTitle:'保单寄出',
                guideCon:'保险公司审核通过，保单寄出，客服及时通知',
                guideIco:''
              },{
                guideTitle:'保单拍照上传',
                guideCon:'您收到保单原件后，将保单拍照上传',
                guideIco:''
              },{
                guideTitle:'客服确认',
                guideCon:'客服会确认图片清晰度以及信息体现是否完整，一个工作日内及时回复',
                guideIco:''
              },{
                guideTitle:'犹豫期完成',
                guideCon:'自客服确认完成后21天',
                guideIco:''
              },{
                guideTitle:'获得全民经纪人奖金',
                guideCon:'同时自动获赠保单无忧相关托管服务',
                guideIco:''
              }]
            }
        },
        methods: {}
    }
</script>

<style>
*{font-size: 14px}
</style>
