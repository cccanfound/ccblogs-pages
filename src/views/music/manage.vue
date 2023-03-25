<template>
  <div class="app">

    <el-tabs v-model="activeName">
      <el-tab-pane label="歌曲管理" name="first">
        <!--搜索区域-->
        <el-row :gutter="20" style="margin:20px 5px">
          <el-col :span="15">
            <el-input v-model="searchInfo" placeholder="歌曲名/歌手名"></el-input>
          </el-col>
          <el-col :span="2">
            <el-button icon="el-icon-search" circle @click="handleMusicSearch"></el-button>
          </el-col>
          <el-col :span="4">
            <el-button @click="addMusicDialog">新增</el-button>
          </el-col>
        </el-row>
        <!--搜索结果表单-->
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            fixed
            prop="musicName"
            label="歌名"
            width="150">
          </el-table-column>
          <el-table-column
            prop="singerName"
            label="歌手"
            width="120">
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="创建时间"
            width="120">
          </el-table-column>
          <el-table-column
            prop="editTime"
            label="修改时间"
            width="120">
          </el-table-column>
          <el-table-column
            prop="editUserId"
            label="最后编辑者"
            width="300">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button @click="handleMusicClick(scope.row)" type="text" size="small">Edit</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="歌手管理" name="second">暂时懒得写了，想用就找管理员手动添加吧你</el-tab-pane>
    </el-tabs>
    <!--歌曲编辑弹窗-->
    <el-dialog title="歌曲编辑" :visible.sync="addMusicTableVisible" @close="showAddstatusInfo=false" v-loading="loading">
      <el-form ref="form" :model="editMusicInfo" label-width="80px">
        <el-form-item label="歌曲名">
          <el-input v-model="editMusicInfo.musicName" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="歌手">
          <el-autocomplete
            class="inline-input"
            v-model="editMusicInfo.singerName"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            :trigger-on-focus="false"
            @select="handleSingerSelect"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveMusicInfo">提交</el-button>
        </el-form-item>
        <el-divider>请先提交以上内容再完善下方信息</el-divider>
        <el-form-item label="封面">
          <el-upload
            class="coverUpload"
            action=""
            :http-request="coverUpload"
            :on-preview="handlePreview"
            :before-upload="beforeCoverUpload"
            :on-remove="handleCoverRemove"
            :file-list="coverImgList"
            list-type="picture">
            <el-button size="small" type="primary"
                       :disabled="!(this.editMusicInfo.id !=''&&this.editMusicInfo.id != undefined) ">点击上传
            </el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过1MB</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="歌曲上传">
          <el-upload
            class="musicUpload"
            action=""
            :http-request="musicUpload"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="uploadMusicList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="歌词上传">
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import {querySinger, coverUpload, imgDelete, mergeMusicInfo, queryMusicList, querySingleMusic, musicUpload} from "@/api/music";

  export default {
    name: "manage",
    data() {
      return {
        loading: '',
        activeName: 'first',//选项卡显示
        restaurants: [],//编辑歌曲界面中歌手搜索下拉框动态加载的内容
        musicEditSinger: '',//编辑歌曲界面中选择的歌手
        coverImgList: [],//上传歌曲封面图片列表
        uploadMusicList: [],//上传歌曲封面图片列表
        addMusicTableVisible: false,
        editMusicInfo: {
          id: '',
          musicName: '',
          singerId: '',
          singerName: '',
          describe: '',
          imgUrl: '',
          musicUrl: '',
          lyricUrl: '',
        },
        searchInfo: '',
        tableData: [],
      }
    },
    methods: {
      //根据歌曲名或歌手名搜索音乐列表
      handleMusicSearch() {
        queryMusicList(this.searchInfo).then(
          (res) => {
            if (res.data.code === 0) {
              this.tableData = res.data.data
            } else {
              this.$notify({
                title: res.data.msg
              })
            }
          })
      },
      //响应列表中的歌曲编辑按钮
      handleMusicClick(row) {
        this.coverImgList = []
        this.editMusicInfo = {}
        querySingleMusic(row.id).then(
          (res) => {
            if (res.data.code === 0) {
              this.editMusicInfo = res.data.data
              if (this.editMusicInfo.musicImg != undefined && this.editMusicInfo.musicImg.length > 0) {
                let img = {
                  status: 'success',
                  url: this.editMusicInfo.musicImg,
                  name: this.editMusicInfo.musicName,
                  id: this.editMusicInfo.id
                }
                this.coverImgList.push(img)
              }
              this.addMusicTableVisible = true
            } else {
              this.$notify({
                title: res.data.msg
              })
            }
          })
      },

      //上传歌曲名和歌手
      saveMusicInfo() {
        this.loading = true
        mergeMusicInfo(this.editMusicInfo).then(
          (res) => {
            if (res.data.code === 0) {
              this.$notify({title: '提交成功'})
              this.editMusicInfo.id = res.data.data.id
              this.loading = false
            } else {
              this.$notify({title: res.data.msg})
              this.loading = false
            }
          })
      },
      addMusicDialog() {
        this.editMusicInfo = {}
        this.addMusicTableVisible = true
      },
      //上传封面
      coverUpload(res) {
        //下面两个参数是上传图片的动画参数，第一个是上传状态，第二个是百分比
        res.status = 'uploading';
        res.percentage = 0;
        let index = this.coverImgList.push(res) - 1
        //下面的用来计算进度条
        let config = {
          onUploadProgress: (progress) => {
            // 格式化成百分数
            res.percentage = (progress.loaded / progress.total * 100).toFixed(0)
          }
        }
        let files = res.file;
        let formData = new FormData();
        formData.append("id", this.editMusicInfo.id);
        formData.append("file", files);
        coverUpload(formData, config).then(res => {
          if (res.data.code === 0) {
            // this.coverImgList[0]={name:this.editMusicInfo.musicName, url: res.data.data.location}
            this.coverImgList[index].status = 'success';
            this.coverImgList[index].url = res.data.data.location
            this.coverImgList[index].name = res.data.data.originalFileName
          } else {
            this.coverImgList[index].status = 'failed';
            this.$message.error(res.data.msg);
          }
        }).catch((err) => {
          this.coverImgList[index].status = 'failed';
          this.$message.error('文件上传错误!');
        });
      },

      //上传歌曲
      musicUpload(res) {
        //下面两个参数是上传图片的动画参数，第一个是上传状态，第二个是百分比
        res.status = 'uploading';
        res.percentage = 0;
        let config = {
          onUploadProgress: (progress) => {
            // 格式化成百分数
            res.percentage = (progress.loaded / progress.total * 100).toFixed(0)
          }
        }
        let files = res.file;
        let formData = new FormData();
        formData.append("id", this.editMusicInfo.id);
        formData.append("file", files);
        musicUpload(formData, config).then(res => {
          if (res.data.code === 0) {
            // this.coverImgList[0]={name:this.editMusicInfo.musicName, url: res.data.data.location}
            this.uploadMusicList[0].status = 'success';
            this.uploadMusicList[0].url = res.data.data.location
            this.uploadMusicList[0].name = res.data.data.originalFileName
          } else {
            this.uploadMusicList[index].status = 'failed';
            this.$message.error(res.data.msg);
          }
        }).catch((err) => {
          this.coverImgList[index].status = 'failed';
          this.$message.error('文件上传错误!');
        });
      },

      //编辑歌曲弹窗中动态更新歌手下拉框
      querySearch(queryString, cb) {
        querySinger(queryString).then(
          (res) => {
            if (res.data.code === 0) {
              this.restaurants = res.data.data
              // 调用 callback 返回建议列表的数据
              cb(this.restaurants);
            } else {
              this.$notify({
                title: res.data.msg
              })
            }
          })
      },
      handleSingerSelect(item) {
        this.editMusicInfo.singerId = item.id
      },

      //上传图片前的校验
      beforeCoverUpload(file) {
        if (this.coverImgList.length > 0) {
          this.$message.error('封面只能上传一个');
          return false
        }
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        if (!isJPG && !isPNG) {
          this.$message.error('上传头像图片只能是 JPG或PNG 格式!');
        }
        const isLt1M = file.size / 1024 / 1024 < 1;
        if (!isLt1M) {
          this.$message.error('上传图片大小不能超过 1MB!');
        }
        return (isJPG || isPNG) && isLt1M;
      },

      //上传歌曲处移除歌曲触发事件
      handleCoverRemove(file) {
        //为了防止beforeCoverUpload后自动调用该方法
        if (file && file.status == 'success') {
          if (file.url == '') return
          imgDelete(file.url, this.editMusicInfo.id).then(res => {
            if (res.data.code === 0) {
              this.coverImgList = []
            } else {
              this.$message.error(res.data.msg);
            }
          }).catch((err) => {
            this.$message.error('删除失败!');
          });
        }
      },

      //点击文件列表中已上传的文件时的钩子,目前封面只有一张，后续可以扩充
      handlePreview(file) {
        this.$message.error('谁让你重复上传的/(ㄒoㄒ)/');
      }
    },
    computed: {},
    mounted() {
      queryMusicList(this.searchInfo).then(
        (res) => {
          if (res.data.code === 0) {
            this.tableData = res.data.data
          } else {
            this.$notify({
              title: res.data.msg
            })
          }
        })
    }
  }
</script>

<style scoped lang="scss">
  .app {
    width: 80%;
    margin: 20px 40px;
    /*background-color: #19191B;*/
  }

  /*以下是上传element默认样式*/
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
<style lang="scss">
  .el-dialog {
    @media only screen and (min-width: 0px) and (max-width: 600px) {
      margin: 0 auto 5px;
      width: 90%;
    }
  }

  .el-divider__text {
    color: #8d8e91;
  }
</style>
