<template>
  <group v-bind:title="title">
    <grid :rows="2"  class="fileUpload">
      <grid-item>
        <vue-core-image-upload
          v-bind:style="uploadStyleFirst"
          v-bind:headers="headers"
          v-bind:url="url"
          class="upload-button"
          text=""
          inputOfFile="upload"
          extensions="png,jpeg,jpg"
          @imageuploading="imageuploading"
          @imageuploaded="imageuploadedFirst">
        </vue-core-image-upload>
      </grid-item>
      <grid-item>
        <vue-core-image-upload
          v-bind:style="uploadStyleSecond"
          v-bind:headers="headers"
          v-bind:url="url"
          class="upload-button"
          text=""
          inputOfFile="upload"
          extensions="png,jpeg,jpg"
          @imageuploading="imageuploading"
          @imageuploaded="imageuploadedSecond">
        </vue-core-image-upload>
      </grid-item>
    </grid>
  </group>
</template>
<script>
  import VueCoreImageUpload  from 'vue-core-image-upload'
  import {Group, Grid, GridItem, cookie} from 'vux'

  export default {
    components: {
      VueCoreImageUpload,
      Group,
      Grid,
      GridItem
    },
    props: {
      imageUploadTitle: {
        type: String,
        default () {
          return '文件上传'
        }
      }
    },
    data () {
      return {
        title: this.$props.imageUploadTitle,
        uploadStyleFirst: '',
        uploadStyleSecond: '',
        images: {
          first: '',
          second: ''
        },
        headers: {
          token: cookie.get('token')
        },
        url: this.apiPrefix + '/upload'
      }
    },
    methods: {
      imageuploadedFirst(res) {
        this.$vux.loading.hide()

        if (res.code === 'success') {
          this.$data.images.first = res.data.fileName
          this.$data.uploadStyleFirst = 'background-image: url(\'' + this.serverName + res.data.fileName + '\')'
        } else {
          this.$vux.toast.show({
            text: '上传失败'
          })
        }

        this.$emit('imageuploaded', this.$data.images)
      },
      imageuploadedSecond(res) {
        this.$vux.loading.hide()

        if (res.code === 'success') {
          this.$data.images.second = res.data.fileName
          this.$data.uploadStyleSecond = 'background-image: url(\'' + this.serverName + res.data.fileName + '\')'
        } else {
          this.$vux.toast.show({
            text: '上传失败'
          })
        }

        this.$emit('imageuploaded', this.$data.images)
      },
      imageuploading(res) {
        this.$vux.loading.show({
          text: '上传中...'
        })
      }
    }
  }
</script>

<style>
  .fileUpload .weui-grid{margin:0 !important;padding:0 !important;}
  /*.fileUpload .weui-grid:before{border-right:none !important;}*/
  .fileUpload:after{border-left:none !important;}
  .upload-button {
    height:140px;
    width:160px;
    border: 1px solid #e6e6e6;

    color: #cccccc;
    background-image: url('../../assets/img/upload.png');
    /*background-size:100px 100px;*/
    background-size: cover;
    /*border:1px solid #D9D9D9;*/
    margin: 15px auto;
  }
</style>
