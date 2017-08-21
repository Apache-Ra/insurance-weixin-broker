import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import FastClick from 'fastclick'
import {WechatPlugin, AjaxPlugin, LoadingPlugin, ToastPlugin, AlertPlugin} from 'vux'
import App from './app.vue'

/**
 * 加载插件
 */
Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(WechatPlugin)
Vue.use(AjaxPlugin)
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)

/**
 * 定义常量
 */
let domainName = 'http://webrokers.mbpop.cn/'
let serverName = 'http://webrokers.mbpop.cn:9600'
if (process.env.NODE_ENV === 'development') {
  domainName = 'http://bdsafer.mbpartner.cn/insurance'
  serverName = 'http://192.168.2.113:3000'
}

const apiPrefix = serverName + '/api/outer'
const loginTimeOutErrorCode = 'login_timeout_error'

/**
 * 设置vuex
 */
const store = new Vuex.Store({})
store.registerModule('vux', {
  state: {
    loading: false,
    showBack: true,
    title: '',
    number: ''
  },
  mutations: {
    updateLoading (state, loading) {
      state.loading = loading
    },
    updateShowBack (state, showBack) {
      state.showBack = showBack
    },
    updateTitle (state, title) {
      state.title = title
    },
    updateNumber (state, number){
      let num = ''
      if(number <= 0){
        state.number = num
      }else {
        num = number.toString()
        state.number = num
      }

    }
  }
})

/**
 * 设置路由
 */
const routes = [
  // 初始页
  {
    path: '/login',
    component: function (resolve) {
      require(['./components/login.vue'], resolve)
    }
  },

  // 首页
  {
    path: '/home',
    component: function (resolve) {
      require(['./components/home.vue'], resolve)
    }
  },
  // 帮助页
  {
    path: '/help',
    component: function (resolve) {
      require(['./components/help.vue'], resolve)
    }
  },
  //分享出去的详情
  {
    path: '/pushDetailShare',
    component: function (resolve) {
      require(['./components/broker/pushDetailShare.vue'], resolve)
    }
  },
  // 加载页
  {
    path: '/index',
    component: function (resolve) {
      require(['./components/index.vue'], resolve)
    },
    children: [
      //保单无忧
      {
        path: 'policy/toView',
        component: function (resolve) {
          require(['./components/policy/toView.vue'], resolve)
        }
      },
      //查看保单
      {
        path: 'policy/policyList',
        component: function (resolve) {
          require(['./components/policy/policyList.vue'], resolve)
        }
      },
      //查看保单详情
      {
        path: 'policy/policyDetail',
        component: function (resolve) {
          require(['./components/policy/policyDetail.vue'], resolve)
        }
      },
      // 保单托管
      {
        path: 'policy/create',
        component: function (resolve) {
          require(['./components/policy/create.vue'], resolve)
        }
      },
      //预约服务详情
      {
        path: 'policy/policyInfo',
        component: function (resolve) {
          require(['./components/policy/policyInfo.vue'], resolve)
        }
      },
      //新增预约服务
      {
        path: 'policy/reservation',
        component: function (resolve) {
          require(['./components/policy/reservation.vue'], resolve)
        }
      },
      //注册全民经纪
      {
        path: 'broker/register',
        component: function (resolve) {
          require(['./components/broker/register.vue'], resolve)
        }
      },
      //购买保险
      {
        path: 'broker/buy',
        component: function (resolve) {
          require(['./components/broker/buy.vue'], resolve)
        }
      },
      //获取方案
      {
        path: 'broker/accessPlan',
        component: function (resolve) {
          require(['./components/broker/accessPlan.vue'], resolve)
        }
      },
      //方案详情
      {
        path: 'broker/programmeDetail',
        component: function (resolve) {
          require(['./components/broker/programmeDetail.vue'], resolve)
        }
      },
      //方案信息
      {
        path: 'broker/programmeInfo',
        component: function (resolve) {
          require(['./components/broker/programmeInfo.vue'], resolve)
        }
      },
      //保险下单
      {
        path: 'broker/insuranceOrder',
        component: function (resolve) {
          require(['./components/broker/insuranceOrder.vue'], resolve)
        }
      },
      //保险下单详情
      {
        path: 'broker/insuranceOrderDetail',
        component: function (resolve) {
          require(['./components/broker/insuranceOrderDetail.vue'], resolve)
        }
      },
      //直接下单
      {
        path: 'broker/order',
        component: function (resolve) {
          require(['./components/broker/order.vue'], resolve)
        }
      },
      //预约赴港
      {
        path: 'broker/subscribe',
        component: function (resolve) {
          require(['./components/broker/subscribe.vue'], resolve)

        }
      },
      //预约赴港详情
      {
        path: 'broker/subscribeDetail',
        component: function (resolve) {
          require(['./components/broker/subscribeDetail.vue'], resolve)
        }
      },
      //预约赴港信息
      {
        path: 'broker/subscribeInfo',
        component: function (resolve) {
          require(['./components/broker/subscribeInfo.vue'], resolve)
        }
      },
      //上传保单
      {
        path: 'broker/uploadPolicy',
        component: function (resolve) {
          require(['./components/broker/uploadPolicy.vue'], resolve)
        }
      },
      //保单信息（tab）
      {
        path: 'broker/policyInfo',
        component: function (resolve) {
          require(['./components/broker/policyInfo.vue'], resolve)
        }
      },
      //推广保险
      {
        path: 'broker/push',
        component: function (resolve) {
          require(['./components/broker/push.vue'], resolve)
        }
      },
      //推广信息详情
      {
        path: 'broker/pushDetail',
        component: function (resolve) {
          require(['./components/broker/pushDetail.vue'], resolve)
        }
      },
      //查看保险
      {
        path: 'broker/toView',
        component: function (resolve) {
          require(['./components/broker/toView.vue'], resolve)
        }
      },
      //查状态信息
      {
        path: 'broker/stateInfo',
        component: function (resolve) {
          require(['./components/broker/stateInfo.vue'], resolve)
        }
      },
      //购买指南
      {
        path: 'broker/buyingGuide',
        component: function (resolve) {
          require(['./components/broker/buyingGuide.vue'], resolve)
        }
      },
      //联系客服
      {
        path: 'broker/contactCustomer',
        component: function (resolve) {
          require(['./components/broker/contactCustomer.vue'], resolve)
        }
      },
      //客服列表
      {
        path: 'broker/contactList',
        component: function (resolve) {
          require(['./components/broker/contactList.vue'], resolve)
        }
      },
      //补充材料
      {
        path: 'broker/supplement',
        component: function (resolve) {
          require(['./components/broker/supplement.vue'], resolve)
        }
      },
      //个人中心
      {
        path: 'user/personal',
        component: function (resolve) {
          require(['./components/user/personal.vue'], resolve)
        }
      },
      //个人信息
      {
        path: 'user/userInfo',
        component: function (resolve) {
          require(['./components/user/userInfo.vue'], resolve)
        }
      },
      //推广信息
      {
        path: 'user/push',
        component: function (resolve) {
          require(['./components/user/push.vue'], resolve)
        }
      },

      //奖励信息
      {
        path: 'user/reward',
        component: function (resolve) {
          require(['./components/user/reward.vue'], resolve)
        }
      },
      //保单奖励
      {
        path: 'user/policyIncentives',
        component: function (resolve) {
          require(['./components/user/policyIncentives.vue'], resolve)
        }
      },
      //推广奖励
      {
        path: 'user/pushIncentives',
        component: function (resolve) {
          require(['./components/user/pushIncentives.vue'], resolve)
        }
      },
      //预约提现
      {
        path: 'user/cash',
        component: function (resolve) {
          require(['./components/user/cash.vue'], resolve)
        }
      },
      //最新信息
      {
        path: 'user/new',
        component: function (resolve) {
          require(['./components/user/new.vue'], resolve)
        }
      },
      //最新信息
      {
        path: 'user/newDetail',
        component: function (resolve) {
          require(['./components/user/newDetail.vue'], resolve)
        }
      },
      //银行卡管理
      {
        path: 'user/bankCard',
        component: function (resolve) {
          require(['./components/user/bankCard.vue'], resolve)
        }
      },
      //绑定银行卡
      {
        path: 'user/addBankCard',
        component: function (resolve) {
          require(['./components/user/addBankCard.vue'], resolve)
        }
      },
      //修改银行卡
      {
        path: 'user/updateBankCard',
        component: function (resolve) {
          require(['./components/user/updateBankCard.vue'], resolve)
        }
      },
      // 消息提示页面
      {
        path: 'msg/msg',
        component: function (resolve) {
          require(['./components/msg/msg.vue'], resolve)
        }
      },
      // 组件测试页
      {
        path: 'msg/test',
        component: function (resolve) {
          require(['./components/msg/test.vue'], resolve)
        }
      },
      // 测试页
      {
        path: 'test',
        component: function (resolve) {
          require(['./components/tests/page.vue'], resolve)
        }
      }
    ]
  },
  //绑定页contactList
  {
    path: '/bind',
    component: function (resolve) {
      require(['./components/bind.vue'], resolve)
    }
  }
]
const router = new VueRouter({
  routes
})
router.beforeEach(function (to, from, next) {
  store.commit('updateLoading', true)
  store.commit('updateShowBack', true)
  next()
})
router.afterEach(function (to) {
  store.commit('updateLoading', false)
})

/**
 * 点击延迟
 */
FastClick.attach(document.body)

/**
 * 日志输出开关
 */
Vue.config.productionTip = true

/**
 * 定义全局公用常量
 */
Vue.prototype.domainName = domainName
Vue.prototype.serverName = serverName
Vue.prototype.apiPrefix = apiPrefix

/**
 * 定义全局公用方法
 */
Vue.prototype.http = function (opts) {
  let vue = this
  vue.$vux.loading.show({
    text: 'Loading'
  })

  vue.$http({
    method: opts.method,
    url: apiPrefix + opts.url,
    headers: opts.headers || {},
    params: opts.params || {},
    data: opts.data || {}
  }).then(function (response) {
    vue.$vux.loading.hide()

    opts.success(response.data.data)
  }).catch(function (error) {
    vue.$vux.loading.hide()

    if (!opts.error) {
      let response = error.response
      let errorMessage = '请求失败'

      if (response && response.data) {
        if (response.data.code === loginTimeOutErrorCode) {
          window.location.href = '/'
        }
        errorMessage = response.data.message
      }

      vue.$vux.alert.show({
        title: '提示',
        content: errorMessage
      })
    } else {
      opts.error(error.response.data.data)
    }
  })
}

Vue.prototype.get = function (opts) {
  opts.method = 'get'
  this.http(opts)
}

Vue.prototype.post = function (opts) {
  opts.method = 'post'
  this.http(opts)
}

Vue.prototype.put = function (opts) {
  opts.method = 'put'
  this.http(opts)
}

Vue.prototype.delete = function (opts) {
  opts.method = 'delete'
  this.http(opts)
}
Vue.prototype.validate = function (opts){
  let vue, valid, isValid
  vue = this
  valid = false
  //筛选验证部分
  if(opts.ignoreRefs){
    opts.ignoreRefs.forEach((i) => {
      delete opts.valid[i]
    })
  }
  //开始验证
  for(let i in opts.valid){
    let item = opts.valid[i]
    //select空验证
    // if(item.options && item.value == ""){
    //   vue.prop({text:"请选择"+item.title})
    //   valid = false
    //   isValid = i
    //   break
    // }
    //input空验证
    if(item.value == ""){
      vue.prop({text:item.title+"不能为空"})
      valid = false
      isValid = i
      break
    }
    //input类型验证
    if(item.isType){
      //手机验证
      if(item.isType == "tel"){
        const telReg = new RegExp('^(13[0-9]{9})|(15[0-9]{9})|(18[0-9]{9})$')
        if(!telReg.test(item.value)){
          vue.prop({text:"手机号码格式不正确"})
          vue.$data[i] = ""
          valid = false
          isValid = i
          break
        }
      }
      //数字验证
      if(item.isType == "int"){
        const intReg = new RegExp('^[0-9]*$')
        if(!intReg.test(item.value)){
          vue.prop({text:item.title+"必须是数字"})
          vue.$data[i] = ""
          valid = false
          isValid = i
          break
        }
      }
      //汉字验证
      if(item.isType == "string"){
        //const strReg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)")
        const strReg = new RegExp('^[\u4E00-\u9FA5]{2,4}$')
        if(!strReg.test(item.value)){
          vue.prop({text:item.title+"必须是（2-4位）中文字符"})
          vue.$data[i] = ""
          valid = false
          isValid = i
          break
        }
      }
      //身份证验证
      if(item.isType == "cardId"){
        let cardValid = vue.card(item.value)
        if(cardValid){
          valid = true
        } else {
          vue.$data[i] = ""
          valid = false
          break
        }
      }
      //港澳台通行证
      if(item.isType == "GATpermit"){
        let permit = item.value.substring(0, 1)
        if(item.value.length < 9){
          vue.prop({text:"通行证号码长度为9位"})
          vue.$data[i] = ""
          valid = false
          isValid = i
          break
        }

        if(permit !='W' && permit != 'C'){
          vue.prop({text:"通行证号码格式有误"})
          vue.$data[i] = ""
          valid = false
          isValid = i
          break
        }
        //valid = true
      }
      //护照号码
      if(item.isType == "passport"){
        let passport = item.value.substring(0, 1)
        if(item.value.length < 9){
          vue.prop({text:"护照号码长度为9位"})
          vue.$data[i] = ""
          valid = false
          isValid = i
          break
        }

        if(passport !='G' && passport != 'P' && passport != 'W'){
          vue.prop({text:"护照号码格式有误"})
          vue.$data[i] = ""
          valid = false
          isValid = i
          break
        }
      }
    }
    //验证通过返回true
    valid = true
  }

  if(valid){
    //验证成功执行方法
    opts.success()
  }else{
    //验证失败执行方法
    opts.error(isValid)
  }

}
//身份证验证
Vue.prototype.card = function(value) {
  let cardValid
  let vue = this
  let w = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  if (value.length == 18) {
    //身份证号码长度必须为18，只要校验位正确就算合法
    let crc = value.substring(17);
    let a = new Array();
    let sum = 0;
    for (let i = 0; i < 17; i++) {
      a.push(value.substring(i, i + 1));
      sum += parseInt(a[i], 10) * parseInt(w[i], 10)
    }
    sum %= 11;
    let res = "-1";
    switch (sum) {
      case 0: {
        res = "1";
        break;
      }
      case 1: {
        res = "0";
        break;
      }
      case 2: {
        res = "X";
        break;
      }
      case 3: {
        res = "9";
        break;
      }
      case 4: {
        res = "8";
        break;
      }
      case 5: {
        res = "7";
        break;
      }
      case 6: {
        res = "6";
        break;
      }
      case 7: {
        res = "5";
        break;
      }
      case 8: {
        res = "4";
        break;
      }
      case 9: {
        res = "3";
        break;
      }
      case 10: {
        res = "2";
        break;
      }
    }
    if (crc.toLowerCase() == res.toLowerCase()) {
      cardValid = true
      return cardValid
    }else {
      vue.prop({text:'您输入的身份证号码有误'})
      cardValid = false
      return cardValid
    }
    cardValid = true
    return cardValid
  }else {
    vue.prop({text:'身份证号码长度为18位'})
    cardValid = false
    return cardValid
  }
}


Vue.prototype.valid = function (opts) {
  let vue = this
  let valid = true

  if (opts.ref && !opts.ref.valid) {
    valid = false
  }

  if (opts.ignoreRefs) {
    let newRefs = []
    for (let i in opts.refs) {
      let ref = opts.refs[i]
      for (let j in opts.ignoreRefs) {
        let ignoreRef = opts.ignoreRefs[j]
        if (ref !== ignoreRef) {
          newRefs.push(ref)
        }
      }
    }
    opts.refs = newRefs
  }

  for (let i in opts.refs) {
    if (!opts.refs[i].valid) {
      valid = false
      break
    }
  }

  if (valid) {
    opts.success()
  } else if (opts.error) {
    opts.error()
  } else {
    vue.$vux.toast.show({
      type: 'cancel',
      text: '请检查输入'
    })
  }
}

//获取url参数(search)
Vue.prototype.getUrlParment = function (name) {
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)")
  let r = window.location.search.substr(1).match(reg)
  if (r != null)return unescape(r[2]);
  return null
}
//验证empty
Vue.prototype.validates = function (obj) {
  let vue, type, reg
    vue = this
    type = obj.type
    reg = new RegExp('([\u4e00-\u9fa5])+')


  if(!obj.val){
    vue.prop({text:"不能为空"})
    vue.$refs[obj.tag].valid = false
    return false
  }

  if(type === 'String'){
    if(!reg.test(obj.val)){
      vue.prop({text:"必须为汉字"})
      vue.$refs[obj.tag].valid = false
      vue.$data[obj.tag] = ""
      return false
    }
  } else {

  }

  vue.$refs[obj.tag].valid = true
}

//身份证验证
Vue.prototype.cardID = function(obj) {
  let vue = this
  let ret = false
  let valid, isValid
  let w = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  if (obj.val.length == 18) {
    //身份证号码长度必须为18，只要校验位正确就算合法
    let crc = obj.val.substring(17);
    let a = new Array();
    let sum = 0;
    for (let i = 0; i < 17; i++) {
      a.push(obj.val.substring(i, i + 1));
      sum += parseInt(a[i], 10) * parseInt(w[i], 10)
    }
    sum %= 11;
    let res = "-1";
    switch (sum) {
      case 0: {
        res = "1";
        break;
      }
      case 1: {
        res = "0";
        break;
      }
      case 2: {
        res = "X";
        break;
      }
      case 3: {
        res = "9";
        break;
      }
      case 4: {
        res = "8";
        break;
      }
      case 5: {
        res = "7";
        break;
      }
      case 6: {
        res = "6";
        break;
      }
      case 7: {
        res = "5";
        break;
      }
      case 8: {
        res = "4";
        break;
      }
      case 9: {
        res = "3";
        break;
      }
      case 10: {
        res = "2";
        break;
      }
    }
    if (crc.toLowerCase() == res.toLowerCase()) {
      valid = true;
    }else {
      vue.$data[obj.tag] = ""
      valid = false
      vue.prop({text:'您输入的身份证号码有误'})

    }
    return valid;
  }else {
    vue.prop({text:'身份证号码长度为18位'})
    vue.$data[obj.tag] = ""
    isValid = obj.tag
    valid = false
  }
}

//港澳通行证验证
Vue.prototype.GApass = function (obj) {
  let vue = this
  let item = obj.val.substring(0, 1)
  if(obj.val.length < 9){
    vue.$refs[obj.tag].valid = false
    vue.$data[obj.tag] = ""
    vue.prop({text:'通行证号码长度为9位',width:'14em'})
    return false
  }
  if(item !='W' && item != 'C'){
    vue.$refs[obj.tag].valid = false
    vue.$data[obj.tag] = ""
    vue.prop({text:'通行证号码格式有误',width:'14em'})
    return false
  }
  return true
  vue.$refs[obj.tag].valid = true
}
//护照验证
Vue.prototype.passport = function (obj) {
  let vue = this
  let item = obj.val.substring(0, 1)
  console.log(item)
  if(obj.val.length < 9){
    vue.$refs[obj.tag].valid = false
    vue.$data[obj.tag] = ""
    vue.prop({text:'护照号码长度为9位',width:'14em'})
    return false
  }
  if(item !='G' && item != 'P' && item != 'W'){
    vue.$refs[obj.tag].valid = false
    vue.$data[obj.tag] = ""
    vue.prop({text:'护照号码格式有误',width:'14em'})
    return false
  }
  return true
  vue.$refs[obj.tag].valid = true
}
//弹出带图标的提示提示信息
Vue.prototype.prop = function (obj) {
  let vue,type,width,text,time, textLength
  vue = this
  type = "cancel"
  width = "8em"
  text = "发生未知错误"
  time =  '2000'
  textLength = obj.text.length

  if(textLength > 6){
    width = textLength+2+"em"
  }

  if(obj.type){
    type = obj.type
  }
  if(obj.width){
    width = obj.width
  }
  if(obj.text){
    text = obj.text
  }

  vue.$vux.toast.show({
    isShowMask:true,
    type: type,
    width:width,
    text: text,
    time:time
  })

}
//银行卡验证
Vue.prototype.bankCardCode = function (obj) {
  let vue = this
  let num = /^\d*$/
  let strbin ="10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68"

  if(obj.val.length < 16 || obj.val.value > 19){
    vue.$data[obj.tag] = ""
    vue.$refs[obj.tag].valid = false
    vue.prop({text:"银行卡号长度必须在16到19之间",width:'19em'})
    //return false
  }
  if(!num.exec((obj.val))){
    vue.$data[obj.tag] = ""
    vue.$refs[obj.tag].valid = false
    vue.prop({text:"银行卡号必须全为数字",width:'14em'})
    //return false
  }

  if(strbin.indexOf(obj.val.substring(0,2)) == -1){
    vue.$data[obj.tag] = ""
    vue.$refs[obj.tag].valid = false
    vue.prop({text:"银行卡号开头6位不符合规范",width:'14em'})
    //return false
  }

  return true
}
//
Vue.prototype.closeShowBack = function () {
  this.$store.commit('updateShowBack', false)
}

Vue.prototype.openShowBack = function () {
  this.$store.commit('updateShowBack', true)
}

Vue.prototype.updateTitle = function (value) {
  this.$store.commit('updateTitle', value)
}

Vue.prototype.now = function () {
  let date = new Date()

  let year = date.getFullYear()
  let month = date.getMonth()
  let day = date.getDate()

  if (month <= 9) {
    month += 1
    month = '0' + month
  }

  if (day <= 9) {
    day = '0' + day
  }

  let now = year + '-' + month + '-' + day

  return now
}

/**
 * 创建实例
 */
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app-box')
