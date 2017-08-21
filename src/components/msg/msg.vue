<template>
  <div>
    <msg :title="('操作成功')" :description="('')" :buttons="buttons"></msg>
  </div>
</template>



<script>
  import { Msg, Divider, XButton } from 'vux'

  export default {
    components: {
      Msg,
      Divider,
      XButton
    },
    methods: {
      replace () {
        let vue = this
        vue.$router.push('/index/user/personal')
      }
    },
    created () {
      this.updateTitle('操作成功')
    },
    data () {
      return {
        description: 'msg description',
        icon: '',
        buttons: [{
          type: 'primary',
          text: '返回',
          onClick: this.replace.bind(this)
        }]
      }
    }
  }
</script>
