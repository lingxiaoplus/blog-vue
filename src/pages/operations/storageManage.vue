<template>
  <div>
    <v-snackbar v-model="snackbar" color="error" :timeout="3000" :top="true">
      {{ snackbarText }}
      <v-btn dark text @click="snackbar = false">确认</v-btn>
    </v-snackbar>

    <template>
      <v-toolbar flat color="white">
        <v-toolbar-title>存储管理</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
      </v-toolbar>
    </template>

    <v-dialog v-model="replyDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">回复用户：{{replyRow?replyRow.member.username:""}}的评论</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="请输入回复内容" required v-model="commentContent"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="replyDialog = false">关闭</v-btn>
          <v-btn color="blue darken-1" text @click="replyComment()">回复</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-row class="pa-2" style="background: white">
      <v-col cols="2">
        <el-input size="small" maxlength="10" v-model="input" placeholder="输入文件名称搜索">

        </el-input>
      </v-col>
      <v-col cols="4">
        <el-time-select
          size="small"
          placeholder="起始时间"
          v-model="startTime"
          :picker-options="{
      start: '08:30',
      step: '00:15',
      end: '18:30'
    }">
        </el-time-select>
        <el-time-select
          size="small"
          placeholder="结束时间"
          v-model="endTime"
          :picker-options="{
      start: '08:30',
      step: '00:15',
      end: '18:30',
      minTime: startTime
    }">
        </el-time-select>
        <v-btn @click="" class="white--text" small tile color="primary" :loading="loading"
               :disabled="loading">
          <v-icon left small>mdi-magnify</v-icon>
          搜索
        </v-btn>
      </v-col>

    </v-row>
    <v-row class="pa-4" style="background: white">
      <v-btn @click="uploadDialog = true" class="ma-2 white--text" small tile color="blue" :loading="loading"
             :disabled="loading">
        <v-icon left small>mdi-cloud-upload-outline</v-icon>
        上传
      </v-btn>

      <v-btn @click="" class="ma-2 white--text" small tile color="warning" :loading="loading"
             :disabled="loading">
        <v-icon left small>mdi-refresh</v-icon>
        同步
      </v-btn>

      <v-btn @click="" class="ma-2 white--text" small tile color="error" :loading="loading"
             :disabled="loading">
        <v-icon left small>mdi-delete</v-icon>
        删除
      </v-btn>

      <v-btn @click="" class="ma-2 white--text" small tile color="primary" :loading="loading"
             :disabled="loading">
        <v-icon left small>mdi-cogs</v-icon>
        配置
      </v-btn>
      <v-btn @click="" class="ma-2 white--text" small tile color="success" :loading="loading"
             :disabled="loading">
        <v-icon left small>mdi-file-export-outline</v-icon>
        导出
      </v-btn>
    </v-row>
    <el-row></el-row>

    <el-table :data="fileList" style="width: 100%" @selection-change="handleSelectionChange" row-key="id">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="name" label="文件路径" width="180">
      </el-table-column>
      <el-table-column prop="mimeType" label="文件类型" width="180">
      </el-table-column>
      <el-table-column prop="bucket" label="空间名称">
      </el-table-column>
      <el-table-column prop="size" label="文件大小">
      </el-table-column>

      <el-table-column prop="path" label="文件预览">
        <template slot-scope="scope">
          <v-img width="80" height="40" :src="scope.row.path+suffix" aspect-ratio="2">
            <template v-slot:placeholder>
              <v-row
                class="fill-height ma-0"
                align="center"
                justify="center"
              >
                <v-progress-circular indeterminate color="primary lighten-5"></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </template>
      </el-table-column>

      <el-table-column prop="time" label="创建日期">
      </el-table-column>
    </el-table>
    <div style="width: 100%;display: flex;justify-content: center;margin: 10px;">
      <el-pagination :hide-on-single-page="hidePagination" @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="currentPage" :page-sizes="[5, 10, 20, 30]" :page-size="pageSize"
                     layout="prev, pager, next, jumper,sizes, total"
                     :total="total">
      </el-pagination>
    </div>



    <v-dialog v-model="uploadDialog"  max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">文件上传</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="请输入文件名" required v-model="fileName"></v-text-field>
              </v-col>

              <v-col cols="12">
                <el-upload
                  drag
                  action="http://api.lingxiaomz.top/upload/"
                  :on-preview="handlePictureCardPreview"
                  :on-success="handleSuccess"
                  :on-error="handleError"
                  multiple>
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
              </v-col>

            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="uploadDialog = false">取消</v-btn>
          <v-btn color="blue darken-1" text @click="uploadFile()">上传</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
    export default {
        name: "storageManage",
        data() {
            return {
                startTime: '',
                endTime: '',
                fileList: [],
                suffix: '?imageView2/2/w/240/h/120/format/jpg/q/75|imageslim',
                loading: false,
                uploadDialog: false,
                imageUrl: "",
                fileName: "",
            }
        },
        methods:{
            async getFileList(){
                try {
                    this.$store.commit('setLoading', true);
                    let resp = await this.$http.get("/upload/list");
                    console.log("", resp.data);
                    this.fileList = resp.data.data;
                } catch (e) {
                    console.log("异常",e);
                    this.snackbar = true;
                    this.snackbarText = e.response.data.message?e.response.data.message:"获取文件列表失败";
                }finally {
                    this.$store.commit('setLoading', false);
                }
            },

            async uploadFile(){
                if (!this.imageUrl){
                    this.snackbar = true;
                    this.snackbarText = "请上传图片，或等图片上传完成";
                    return
                }
                //let resp = await this.$http.post("/upload/")
            },

            handlePictureCardPreview(file) {
                console.log("返回文件上传结果", file.response);
                //this.dialogImageUrl = file.url;
                //this.dialogVisible = true;
            },
            handleSuccess(response, file, fileList) {
                //文件上传成功时的钩子
                console.log("文件上传成功时的钩子", response);
                this.imageUrl = response;
            },
            handleError(err, file, fileList) {
                console.log("文件上传失败时的钩子", err);
                this.showSnackBar("文件上传失败", false);
            },
        },
        created() {
            this.getFileList();
        }
    }
</script>

<style scoped>

</style>
