<template>
  <view-box>
    <group>
      <!--<imageUpload @imageuploaded="imageuploaded"></imageUpload>-->
      <ImgWechatUpload @setData="setData" @removeData="removeData"></ImgWechatUpload>
    </group>
    <group title="补充材料">
      <x-textarea :max="100"  @on-focus="onEvent('focus')" v-model="content" required placeholder="补充内容"></x-textarea>
    </group>

    <box gap="20px 20px">
      <x-button type="primary" action-type="button" @click.native="submit">提交</x-button>
    </box>
  </view-box>
</template>

<script>
    import {ViewBox, Group, XTextarea, XButton, Box, cookie} from 'vux'
    import ImageUpload from '../kits/imageUpload.vue'
    import ImgWechatUpload from '../kits/imgWechatUpload.vue'
    export default {
        components: {
          ViewBox,
          Group,
          XTextarea,
          XButton,
          Box,
          ImageUpload,
          ImgWechatUpload
        },
        created () {
          this.updateTitle('补充材料');
        },
        data () {
            return {
              content:"",
              images: {
                first: '',
                second: ''
              },
              images: [],
            }
        },
        methods: {
          imageuploaded (images) {
            this.$data.image = images
          },
          setData(image) {
            let index = image.index
            this.$data.images[index] = image.fileName
          },
          removeData(image) {
            this.$data.images.splice(image.index, 1)
          },
          submit () {
            let vue = this
            vue.post({
              url: '/supplement',
              headers:{'token':cookie.get('token')},
              data: {
                orderId:vue.$route.query.orderid,
                content:vue.$data.content,
                pictureOne:vue.$data.images[0],
                pictureTwo:vue.$data.images[1]
              },
              success: function (data) {
                  vue.$router.push('/index/broker/toView')
              }
            })

          }
        }
    }
</script>

<style>

</style>
