<template>
  <div>
    <page @loadMore="loadMore" @refresh="refresh">
      <div>
        <p v-for="i in n">placeholder {{i}}</p>
      </div>
    </page>
  </div>
</template>

<script>
  import Page from '../kits/page.vue'
  import {cookie} from 'vux'
  export default {
    components: {
      Page
    },
    created () {
      let vue = this
      vue.closeShowBack()
      vue.updateTitle('测试页面'),
      //获取常量
      vue.get({
        url: '/test/constants',
        headers: {
          'token': cookie.get('token')
        },
        success: function (data) {
          cookie.set('constants',JSON.stringify(data),{
            expires: 1
          })
        }
      })

    },
    data () {
      return {
        n: 10,
      }
    },
    methods: {
      loadMore () {
        this.n += 10
      },
      refresh () {
        this.n = 10
      },
    }
  }
</script>
