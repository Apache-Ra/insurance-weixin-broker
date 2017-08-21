<template>
  <div>
    <div v-for="info in infoList">
      <form-preview :header-label="info.title" :header-value="info.value" :body-items="info.infoFindList" class="plan"
                    :footer-buttons="info.buttons"></form-preview>
    </div>

    <div v-transfer-dom class="mbay-dialog">
      <x-dialog v-model="showDialogStyle"
                :dialog-style="{'max-width': '100%', width: '100%', height: '50%', 'background-color': 'transparent'}">
        <p style="color:#fff;text-align:center;">
          <span style="font-size:13px;">长按链接复制到浏览器下载</span><br><br>
          <span style="font-size:15px;">{{downloadUrl}}</span>
          <br>
          <br>
          <x-icon type="ios-close-outline" style="fill:#fff;" @click="closeMask"></x-icon>
        </p>

      </x-dialog>
    </div>

  </div>
</template>

<script>
  import {FormPreview, cookie, XDialog, TransferDomDirective as TransferDom} from 'vux'
  export default {
    components: {FormPreview, XDialog, TransferDom},
    directives: {
      TransferDom
    },
    created () {
      let vue = this
      vue.updateTitle('最新消息详情')
      let constants = JSON.parse(cookie.get('constants'))

      vue.get({
        url: '/news/find',
        headers: {'token': cookie.get('token')},
        params: {
          id: vue.$route.query.id
        },
        success: function (data) {
          let enclosure = data.news.enclosure || {}

          let infoFindList = [
            {label: '内容', value: data.news.content},
            {label: '时间', value: data.news.createdAt}
          ]

          if (enclosure.name) {
            infoFindList.push({label: '附件名称', value: enclosure.name})
          }

          let infoList = [{
            title: '标题',
            value: data.news.total,
            infoFindList: infoFindList,
          }]

          if(enclosure.name){
            infoList[0].buttons = [{
              style: 'primary', text: '查看附件', onButtonClick: (name) => {
                location.href = vue.serverName + enclosure.downLoadAddress
              }
            }, {
              style: 'primary', text: '下载附件', onButtonClick: (name) => {
                vue.$data.showDialogStyle = true
              }
            }]
          }

          vue.$data.infoList = infoList
          vue.$data.downloadUrl = vue.apiPrefix + '/download?fileName=' + enclosure.name
          //vue.$data.downUrl = vue.serverName+data.news.enclosure.downLoadAddress
          //vue.$data.downUrl = vue.apiPrefix+'/download?fileName='+data.news.enclosure.name
          //console.log(vue.apiPrefix+'/download?fileName='+data.news.enclosure.name)
        }
      })
    },
    data () {
      return {
        infoList: [{}],
        downUrl: '',
        showDialogStyle: false,
        downloadUrl: ''
      }
    },
    methods: {
      closeMask () {
        this.$data.showDialogStyle = false
      }
    }
  }
</script>
<style>
  .mbay-dialog .weui-dialog {
    background: none !important;
  }
</style>
