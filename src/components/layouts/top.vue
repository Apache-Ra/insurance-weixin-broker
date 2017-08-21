<template>
  <div style="padding-bottom:0px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;"
              :left-options="{showBack: showBack, backText: '返回'}" :right-options="{showMore: false}"
              @on-click-more="showMenus = true">{{title}}
    </x-header>

    <div v-transfer-dom>
      <popup v-model="showMenus" position="right">
        <div style="width:200px;">
          <group>
            <cell v-for="(menu,value) in menuList" :title="menu.title" :value="menu.value"
                  @click.native="goToUrl(menu.url)" :class="menu.class" v-bind:key="menu.key"></cell>
          </group>
        </div>
      </popup>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {XHeader, TransferDom, Popup, Group, Cell, cookie} from 'vux'

  export default {
    directives: {
      TransferDom
    },
    components: {
      XHeader,
      Popup,
      Group,
      Cell
    },
    computed: {
      ...mapState({
        showBack: state => state.vux.showBack,
        title: state => state.vux.title
      })
    },
    data () {
      return {
        menuList: [
          {title: '首页', value: '', url: '/home'},
          {title: '保单无忧', value: '', url: ''},
          {title: '', value: '查看保单', url: '/index/policy/policyList', class: 'menu'},
          {title: '', value: '托管保单', url: '/index/policy/create', class: 'menu'},
          {title: '', value: '预约服务', url: '/index/policy/reservation', class: 'menu'},
          {title: '全民经纪', value: '', url: ''},
          {title: '', value: '购买保险', url: '/index/broker/buy', class: 'menu'},
          {title: '', value: '推广保险', url: '/index/broker/push', class: 'menu'},
          {title: '', value: '查看保险', url: '/index/broker/toView', class: 'menu'},
          {title: '我的信息', value: '', url: '', class: ''},
          {title: '', value: '个人信息', url: '/index/user/userInfo', class: 'menu'},
          {title: '', value: '推广信息', url: '/index/user/push', class: 'menu'},
          {title: '', value: '奖励信息', url: '/index/user/reward', class: 'menu'},
          {title: '', value: '最新信息', url: '/index/user/new', class: 'menu'}
        ],
        showMenus: false
      }
    },
    methods: {
      goToUrl(path) {
        if (path) {
            console.log(path)
        }
          let vue = this
          if(path === "/index/broker/push" || path === "/index/broker/toView" || path === "/index/user/push" || path === "/index/user/reward"){
            vue.get({
              url: '/broker',
              headers:{'token':cookie.get('token')},
              success:function (data) {
                if(data.isBroker){
                  vue.$data.showMenus = false
                  setTimeout(function() {
                    vue.$router.push(path)
                  }, 500)
                }else {
                  vue.$vux.toast.show({
                    isShowMask:true,
                    type:'cancel',
                    text: '请先注册全民经纪',
                    width:'12em',
                    position:'default',
                    onHide () {
                      vue.$router.push('/index/broker/register')
                    }
                  })
                  vue.$data.showMenus = false
                }
              }
            })
//          }else {
//            vue.$data.showMenus = false
//            setTimeout(function() {
//              vue.$router.push(path)
//            }, 500)
//          }
        }
      }
    }
  }
</script>
<style>
  *{font-size: 14px}
  .vux-header-title {
    font-size: 16px !important;
  }

  .menu {
    margin-right: 70px;
  }

  .menu div {
    color: #000 !important;
  }

  .menu:before {
    right: -70px !important;
  }
</style>
