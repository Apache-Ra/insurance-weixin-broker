<template>
  <!--  <page @loadMore="loadMore" @refresh="refresh">-->
  <div>
    <div v-for="item in list">
      <form-preview :header-label="('保单号')" :header-value="item.policyNumber":body-items="item.dataList"></form-preview>
      <br>
    </div>
  </div>
  <!--  </page>-->
</template>

<script>
  import Page from '../kits/page.vue'
  import {FormPreview, cookie} from 'vux'

  export default {
    components: {
      Page,
      FormPreview
    },
    created () {
      let vue = this
      vue.updateTitle('查看保单')
      vue.getData()
    },
    data () {
      return {
        list: [{}],
        pageNumber: 1,
        pageSize: 2
      }
    },
    methods: {
      //上拉加载
      /*      loadMore () {
       this.$data.pageNumber += 1
       this.getData(this.$data.pageNumber)
       },*/
      //下拉刷新
      /*      refresh () {
       this.$data.list = [{}]
       this.$data.pageNumber = 1
       this.getData(1)
       },*/
      // 获取数据
      getData () {
        let vue = this
        vue.get({
          url: '/policy/list',
          headers: {'token': cookie.get('token')},
          success: function (data) {
            for (let i in data.policyList) {
              let item = data.policyList[i]


              let dataList = [{
                label: '投保人',value: item.applicant},
                {label: '受保人',value: item.insurant},
                {label: '联系方式',value: item.mobile},
                {label: '保险公司',value: item.insuranceCompany},
                {label: '产品名称',value: item.productName},
                {label: '托管状态',value: item.status}]
                if(item.status === '审核通过'){
                  dataList.push({label: '托管有效期',value: item.validity})
                }

              item.dataList = dataList
              vue.$data.list.push(item)
            }

            // 解决初始化数组必须有值的问题
            if (!vue.$data.list[0].policyNumber) {
              vue.$data.list.splice(0, 1)
            }
          }
        })
      },
    }
  }
</script>
