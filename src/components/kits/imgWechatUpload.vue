<template>
  <div>
    <div class="mbay-ui-uploader__hd mbay-ui-upload-title">{{uploadTitle}}</div>

    <div class="mbay-ui-cells mbay-ui-cells_form mbay-ui-upload">
      <div class="mbay-ui-cell">
        <div class="mbay-ui-cell__bd">
          <div class="mbay-ui-uploader">

            <div class="mbay-ui-uploader__bd">

              <!--上传图片-->
              <ul class="mbay-ui-uploader__files" style="display: inline-block;">
                <li v-for="(item, key) in imgList" class="mbay-ui-imgupload-list-repeat" style="float:left;">
                  <img :src="item.img" class="mbay-ui-uploader__file" @click="preview(key)"/>
                  <p @click="deleteBackGroundUrl(item)" class="closePreViewBtn">删除</p>
                </li>
              </ul>

              <div class="mbay-ui-uploader__input-box">
                <div class="mbay-ui-uploader__input" @click="imgupload()"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-transfer-dom>
      <previewer :list="list" ref="previewer"></previewer>
    </div>
  </div>
</template>

<script>
  import {Previewer, TransferDom, cookie} from 'vux'
  export default {
    directives: {
      TransferDom
    },
    props: {
      uploadImgTitle: {
        type: String,
        default () {
          return '上传图片'
        }
      }
    },
    components: {
      Previewer
    },
    created () {
      let vue = this
      vue.post({
        url: '/weixin/jssdk',
        headers: {'token': cookie.get('token')},
        data: {url: location.href.split('#')[0]},
        success: function (data) {
          vue.$wechat.config({
            debug: false,
            appId: data.jssdk.appId,
            timestamp: data.jssdk.timestamp,
            nonceStr: data.jssdk.nonceStr,
            signature: data.jssdk.signature,
            jsApiList: ['chooseImage', 'uploadImage']
          });
        }
      })
    },
    data () {
      return {
        imgList: [],
        preView: false,
        list: [],
        uploadTitle: this.$props.uploadImgTitle
      }
    },
    methods: {
      imgupload () {
        let vue = this
        if (vue.$data.imgList.length >= 2) {
          vue.$vux.toast.show({
            isShowMask: true,
            type: 'cancel',
            text: '最多上传两张',
            width: '12em',
            position: 'default',
            onHide () {
            }
          })
        } else {
          //上传
          vue.$wechat.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: function (res) {
              let localIds = res.localIds

              //上传图片到服务器，serverId
              localIds.forEach((localId)=>{
                vue.$wechat.uploadImage({
                  localId: localId,
                  isShowProgressTips: 1,
                  success: function (res) {
                    vue.post({
                      url: '/upload',
                      headers: {'token': cookie.get('token')},
                      data: {mediaId: res.serverId},
                      success: function (data) {
                        let obj = {
                          img: vue.serverName + data.fileName,
                          fileName: data.fileName,
                          index: vue.$data.imgList.length
                        }

                        vue.$data.imgList.push(obj)

                        // previewer list
                        vue.$data.list.push({
                          src: obj.img,
                          w: 1200,
                          h: 1200
                        })

                        vue.$emit('setData', obj)
                      },
                      error: function () {
                        vue.$vux.toast.show({
                          isShowMask: true,
                          type: 'cancel',
                          text: '图片上传失败',
                          width: '12em',
                          position: 'default',
                          onHide () {
                          }
                        })
                      }
                    })
                  }
                })
              })
            }
          })
        }
      },
      //图片预览
      preview (key) {
        this.$refs.previewer.show(key)
      },
      //图片删除
      deleteBackGroundUrl (item) {
        let vue = this

        vue.delete({
          url: '/upload',
          headers: {'token': cookie.get('token')},
          data: {fileName: item.fileName},
          success: function (data) {
            let index = item.index
            vue.$data.imgList.splice(index, 1)

            vue.$data.list = []
            vue.$data.imgList.forEach((i) => {
              // previewer list
              vue.$data.list.push({
                src: i.img,
                w: 1200,
                h: 1200
              })
            })

            vue.$emit('removeData', item)

            vue.$vux.toast.show({
              isShowMask: true,
              text: '删除图片',
              width: '12em',
              position: 'default',
              onHide () {
              }
            })
          }
        })
      }
    }
  }
</script>

<style>

  .mbay-ui-upload {
    position: relative;
  }
  .mbay-ui-cell{background: #FFF}
  .mbay-ui-cells:before {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #e5e5e5;
    color: #e5e5e5;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    z-index: 2;
  }

  .mbay-ui-cells:after {
    content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 1px;
    border-bottom: 1px solid #e5e5e5;
    color: #e5e5e5;
    -webkit-transform-origin: 0 100%;
    transform-origin: 0 100%;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    z-index: 2;
  }

  .mbay-ui-cell {
    padding: 10px 15px;
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
  }

  .mbay-ui-cells:before {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #e5e5e5;
    color: #e5e5e5;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    z-index: 2;
  }

  .mbay-ui-cells:after {
    content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 1px;
    border-bottom: 1px solid #e5e5e5;
    color: #e5e5e5;
    -webkit-transform-origin: 0 100%;
    transform-origin: 0 100%;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    z-index: 2;
  }

  .mbay-ui-cell__bd {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
  }

  .mbay-ui-uploader__hd {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    padding-bottom: 10px;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
  }

  .mbay-ui-uploader__bd {
    margin-bottom: -9px;
    margin-right: -9px;
    overflow: hidden;
  }

  .mbay-ui-uploader__title {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
  }

  .mbay-ui-uploader__info {
    color: #B2B2B2;
  }

  .mbay-ui-uploader__files {
    list-style: none;
  }

  .mbay-ui-uploader__file {
    float: left;
    margin-right: 9px;
    margin-bottom: 9px;
    width: 100px;
    height: 100px;
    background: no-repeat center center;
    background-size: cover;
  }

  .mbay-ui-uploader__input-box {
    float: left;
    position: relative;
    margin-right: 9px;
    margin-bottom: 9px;
    width: 98px;
    height: 107px;
    border: 1px solid #D9D9D9;
  }

  .mbay-ui-uploader__input-box:before {
    width: 2px;
    height: 39.5px;
  }

  .mbay-ui-uploader__input-box:before, .mbay-ui-uploader__input-box:after {
    content: " ";
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    background-color: #D9D9D9;
  }

  .mbay-ui-uploader__input-box:after {
    width: 39.5px;
    height: 2px;
  }

  .mbay-ui-uploader__input-box:before, .mbay-ui-uploader__input-box:after {
    content: " ";
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    ransform: translate(-50%, -50%);
    background-color: #D9D9D9;
  }

  .mbay-ui-uploader__input {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  .mbay-ui-upload-title {
    text-indent: 15px;
    height: 25px;
    line-height: 35px;
    display: block;
    color: #999999
  }

  .mbay-ui-imgupload-list-repeat {
    position: relative;
    display: inline-block;
  }

  .weui-gallery {

    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #000000;
    z-index: 1500;
    overflow: hidden;
    width: 100%;
    height: 100%;
    outline: none;
    touch-action: none;
  }

  .weui-gallery__img {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 60px;
    left: 0;
    background: center center no-repeat;
    background-size: contain;
  }

  .weui-gallery__opr {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #0D0D0D;
    color: #FFFFFF;
    line-height: 60px;
    text-align: center;
  }

  .weui-gallery__del {
    display: block;
  }

  .closePreViewBtn {
    position: absolute;
    bottom: 0;
    width: 100px;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    background: #666;
    color: #FFF;
    text-align: center;
    display: inline-block;
    left: 0;
  }
</style>
