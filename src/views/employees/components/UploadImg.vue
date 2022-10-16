<template>
    <div>
      <el-upload
        v-loading="loading"
        class="uploadImg"
        action="#"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        :on-change="onChange"
        :before-upload="beforeUpload"
        :http-request="onHttpRequest"
        :limit="1"
      >
        <i class="el-icon-plus" />
      </el-upload>
      <!-- 图片放大弹窗·1 -->
      <el-dialog
        title="图片预览"
        :visible.sync="dialogVisible"
        width="50%"
      >
        <span>
          <img style="width:100%" :src="fileImgUrl" alt="">
        </span>
  
      </el-dialog>
    </div>
  </template>
  
  <script>
  import COS from 'cos-js-sdk-v5'
  const cos = new COS({
    SecretId: 'AKIDlLtRio26vhU9a2NUL2f6KIyQmx3JXbU9',
    SecretKey: 'Z0LTQFuPnxueItKZo5NbjfMp56tfJjvt'
  })
  export default {
    name: 'UploadImg',
    props: {
      employeeAvator: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        fileList: [],
        dialogVisible: false,
        fileImgUrl: '',
        loading: false
      }
    },
    watch: {
      employeeAvator() {
        this.fileList.push({ name: 'default', url: this.employeeAvator })
      }
    },
    methods: {
      // 图片上传之前
      beforeUpload(file) {
        const whiteFileType = ['image/png', 'image/jpeg']
        const flag = whiteFileType.includes(file.type)
        if (!flag) {
          this.$message.error(`请上传${whiteFileType.join(',')}类型`)
          return false
        }
        //   验证图片大小5kb
        const imgSize = 5120 * 1024
        if (file.size > imgSize) {
          this.$message.error('图片大小不能超过20kb')
          return false
        }
      },
      handlePictureCardPreview(file) {
        this.fileImgUrl = file.url
        this.dialogVisible = true
      },
      // 删除图片
      handleRemove(file, fileList) {
        this.fileList = fileList
      },
      onChange(file, fileList) {
        console.log(file, fileList)
        this.fileList = fileList
      },
      onHttpRequest({ file }) {
        this.loading = true
        // 腾讯云存储桶
        cos.putObject({
          Bucket: 'lls-1314348468', /* 填入您自己的存储桶，必须字段 */
          Region: 'ap-shanghai', /* 存储桶所在地域，例如ap-beijing，必须字段 */
          Key: file.name, /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
          StorageClass: 'STANDARD',
          Body: file, // 上传文件对象
          onProgress: function(progressData) {
            console.log(JSON.stringify(progressData))
          }
        }, (err, data) => {
          this.loading = false
          if (err) return this.$message.error('上传失败')
          const imgUrl = { imgUrl: 'https://' + data.Location }
          this.$emit('onSuccess', imgUrl)
        })
      }
    }
  }
  
  </script>
  
  <style lang='scss' scoped>
  .uploadImg {
      width: 148px;
      height: 148px;
      overflow: hidden;
  }
  </style>
  