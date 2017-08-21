<template>
  <div>
    <group v-for="(info, key) in infoList" :key="key">
      <div @click="replacess(info.id, info.status)">
        <cell :title="info.total" :inline-desc="info.createdAt" is-link>
          <div class="badge-value" slot="value">
            <badge style="display: inline; line-height: 15px;" v-if="info.status === false"></badge>
          </div>
        </cell>
        </div>
    </group>
  </div>
</template>

<script>
  import {Group, Cell, cookie, Badge} from 'vux'
  export default {
    components: {
      Group,
      Cell,
      Badge
    },
    created () {
      let vue = this
      vue.updateTitle('最新信息');
      vue.get({
        url: '/news',
        headers:{'token':cookie.get('token')},
        success:function (data) {
          for(let i in data.newsList){
            let item = data.newsList[i]

            vue.$data.infoList.total = item.total
            vue.$data.infoList.id = item.id

            vue.$data.infoList.push(item)
          }
          if (!vue.$data.infoList[0].id) {
            vue.$data.infoList.splice(0, 1)
          }
        }
      })

    },
    data () {
      return {
        infoList:[{}]
      }
    },
    methods: {
      replacess(id, status){
        let vue = this
        vue.$router.push('/index/user/newDetail?id=' + id)
        if(status === false){
          let number = vue.$store.state.vux.number - 1
          vue.$store.commit('updateNumber', number)
        }
      }
    }
  }
</script>

<style>
  *{font-size: 14px}
  .badge-value {
    display: inline-block!important;
  }
  .vertical-middle{
    text-align: center;
  }
</style>
