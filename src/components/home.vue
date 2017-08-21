<template>
  <div id="home">
    <div class="homeBg"><img src="static/img/home/home.jpg" class="bgImg"/></div>
    <div class="policy menu border" @click="replace('/index/policy/toView')"></div>
    <div class="broker menu border" @click="replace('/index/broker/buy')"></div>
    <div class="user menu border" @click="replace('/index/user/personal')"></div>
    <div class="website footer border" @click="replace('website')"></div>
  </div>
</template>

<script>
  import {cookie} from 'vux'
    export default {
        components: {},
        created () {},
        data () {
            return {}
        },
        methods: {
          replace:function (url) {
            let vue = this
            if(url == 'website'){
                location.href = "http://www.bdsafer.com"
            }else {
              vue.$router.push(url)
            }
          }
        }
    }
</script>

<style>
  #home{margin:0;padding: 0}
  #home .homeBg{width:100%;height: 100%;position: absolute;overflow: hidden}
  #home .bgImg{max-width: 100%;max-height:100%; width: 100%;}
  #home .menu{
    position:absolute;
    width:60px;
    height:60px;
    margin:0 auto;
    left:0;
    right:0;
    -webkit-border-radius:50%;
    -moz-border-radius:50%;
    border-radius:50%;}
  #home .policy{bottom:50%}
  #home .broker{bottom:35%}
  #home .user{bottom:22%}
  #home .footer{position: absolute;bottom:6%;width: 80%;height:60px;margin: 0 auto;left: 0;right: 0;}
  #home .border{}
</style>
