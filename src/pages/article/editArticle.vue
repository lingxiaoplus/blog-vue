<template>
  <v-container>

    <v-snackbar v-model="snackbar" color="error" :timeout="3000" :top="true">
      {{ snackbarText }}
    </v-snackbar>
    <v-layout column>
      <v-layout style="margin-left: 10px;">
        <v-row align="center">
          <v-col>
            <v-text-field color="primary" label="请输入文章标题" clearable v-model="title"></v-text-field>
          </v-col>

        </v-row>
      </v-layout>
      <v-layout row>
        <v-col  cols="10">
          <v-card style="height: 700px;">
            <!--编辑器组件，嵌入到任意父组件中-->
            <markdown
              :mdValuesP="editContent"
              :fullPageStatusP="false"
              :editStatusP="false"
              :previewStatusP="false"
              :navStatusP="true"
              :icoStatusP="true"
              @childevent="childEventHandler">
            </markdown>
          </v-card>
        </v-col>

        <v-col cols="2" class="pa-md-2">
          <v-flex>
            <v-card class="pa-md-2" elevation="12">
              <!--          <v-img-->
              <!--            src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"-->
              <!--            height="200px"-->
              <!--          ></v-img>-->
              <v-card-title style="padding-bottom: 10px">
                文章状态
              </v-card-title>
              <v-card-subtitle>
                状态：草稿
              </v-card-subtitle>
              <v-card-subtitle>
                公开度：公开
              </v-card-subtitle>
              <v-card-actions>
                <v-col >
                  <v-select v-model="select" :items="selectList" item-text="name" item-value="id"
                    label="请选择分类" persistent-hint return-object single-line ></v-select>
                </v-col>
              </v-card-actions>

              <v-card-actions>
                <v-col cols="12">
                  <v-select v-model="label" :items="labelList" item-text="name" item-value="id"
                    label="请选择标签" attach chips multiple></v-select>
                </v-col>
              </v-card-actions>

              <v-card-actions>
                <v-btn
                  class="ma-2"
                  :loading="loadingDraft"
                  :disabled="loadingDraft"
                  color="primary"
                  tile
                  @click="saveArticleToDrafts"
                >
                  保存草稿
                </v-btn>
                <v-btn class="ma-2" tile @click="preview">
                  预览
                </v-btn>
              </v-card-actions>
            </v-card>

            <v-flex class="pt-4" >
              <v-card  class="pa-md-2" elevation="12">
                <v-card-title style="padding-bottom: 10px">
                  封面图片
                </v-card-title>
                <v-flex align-center justify-center>
                  <el-upload
                    action="http://api.lingxiaomz.top/upload/"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-success="handleSuccess"
                    :on-error="handleError"
                    :on-remove="handleRemove"
                    :file-list="image_list"
                    :limit="1"
                    >
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisible" size="tiny">
                    <img width="100%" :src="dialogImageUrl" alt="">
                  </el-dialog>
                </v-flex>
              </v-card>
            </v-flex>

          </v-flex>

        </v-col>


      </v-layout>

    </v-layout>
  </v-container>


  <!--变量后面的大写P表示是从父组件中传入的参数-->
  <!--:mdValuesP="msg" 表示需要初始化传入编辑器的内容-->
  <!--:fullPageStatusP="false" 加载时是否全屏（true全屏/false跟随父容器）-->
  <!--:editStatusP="false" 加载时是否显示编辑容器（true显示/false不显示）-->
  <!--:previewStatusP="false" 加载时是否显示预览容器（true全屏/false不显示）-->
  <!--:navStatusP="false" 加载时是否显示顶部快速标签栏（true显示/false不显示）-->
  <!--:icoStatusP="false" 加载时是否显示版权标志（true显示/false不显示）,如果取消掉，请勿忘挖井人，谢谢！-->
  <!--@childevent="childEventHandler" 监听组件的$.emit()方法传回父组件的值，便于父容器保存获取-->
</template>

<script>
    // 引入markdown组件
    import markdown from '../../components/markdown'
    export default {
        name: "editArticle",
        data(){
            return{
                editContent: '',
                loader: null,
                loadingDraft:false,
                select: { name: '请选择分类', id: '' },
                label: '',
                labelList: [],
                selectList: [],
                dialogImageUrl: '',
                dialogVisible: false,
                title: '',
                headPortrait: '',
                image_list: [],
                snackbarText: '',
                snackbar:false,
                articleId: '',
                articleStatus: 0,
            }
        },
        components: {
            markdown // 声明mardown组件
        },
        watch:{
            /*loader () {
                if(this.loader == null){
                    return;
                }
                const l = this.loader;
                this[l] = !this[l];
                console.log("开始进度条",this.loadingDraft);
                setTimeout(() => {
                    this[l] = false;
                    console.log("停止进度条",this.loadingDraft);
                }, 3000);
                this.loader = null;

            },*/
        },
        methods:{
            childEventHandler:function(res){
                // res会传回一个data,包含属性mdValue和htmlValue，具体含义请自行翻译
                this.editContent=res;

                //console.log("获取到输入的值",res.mdValue);
            },
            async getCategorys(){
                try {
                    let resp = await this.$http.get("/category");
                    console.log("获取分类成功",resp.data.data)
                    this.selectList = resp.data.data;

                    this.selectList.forEach((item)=>{
                      if(item.id == this.select.id){
                        this.select = item;
                      }
                    });

                }catch (e) {
                    console.log("获取分类失败",e.response.data)
                }
            },

            handleRemove(file, fileList) {
                //删除文件
                console.log(file, fileList);
            },
            /**
             * 图片预览
             * @param {Object} file
             */
            handlePictureCardPreview(file) {
                console.log("返回文件上传结果",file.response);
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleSuccess(response, file, fileList){
                //文件上传成功时的钩子
                console.log("文件上传成功时的钩子",response);
                this.headPortrait = response;
            },
            handleError(err, file, fileList){
                console.log("文件上传失败时的钩子", err);
                this.showSnackBar("文件上传失败", false);
            },

            async saveArticleToDrafts(){
                console.log("选择的分类id", this.select.id);
                try {
                    this.loadingDraft = true;
                    let resp = await this.$http.post("/article",{
                        "categoryId": this.select.id,
                        "content": this.editContent.mdValue,
                        "headImage": this.headPortrait,
                        "status": this.articleStatus,  //草稿箱 0  发布 1
                        "title": this.title,
                        "id": this.articleId,
                    })
                    this.$message({
                      message: '文章保存成功',
                      type: 'success'
                    })
                    /* Message.success({
                      showClose: true,
                      message: '文章保存成功'
                    }) */
                    console.log("文章保存成功",resp);
                }catch (e) {
                    console.log("文章保存失败",e);
                    this.snackbar = true;
                    this.snackbarText = e.response.data.message;
                }finally {
                    this.loadingDraft = false;
                }

            },

            async getarticleDetails(id){
              this.loading = true;
              try{
                let response = await this.$http.get("/article/"+id);
                console.log("查询文章", response.data);

                this.title = response.data.data.title;
                this.editContent = response.data.data.content;
                this.select.id = response.data.data.categoryId;
                this.articleId = response.data.data.id;
                this.selectList.forEach((item)=>{
                  if(item.id == this.select.id){
                    this.select = item;
                  }
                });
                if(response.data.data.headImage){
                  this.image_list.push({
                    name: response.data.data.id,
                    url: response.data.data.headImage
                  })
                  this.dialogImageUrl = response.data.data.headImage;
                }
              }catch(e){
                console.log("查询文章失败", e.response.data);
                this.snackbar = true;
                this.snackbarText = e.response.data.message;
              }finally{
                this.loading = false;
              }
            },
            preview(){
              this.$emit("setLoading");
              console.log("预览")
            },
        },
        created() {
          let articleId = this.$route.query.articleId;
          this.getCategorys();
          if(articleId) {
            //let articleJson = JSON.parse(article)
            console.log(">>>>>>>>>>>>",articleId)
            this.getarticleDetails(articleId);
            //this.editContent = articleJson.content;
          }
        }
    }
</script>

<style scoped>
  /*根据项目修改引入文件的路径（所需文件放在了static目录下）*/
  /*引入reset文件*/
  @import "../../../static/css/reset.scss";
  /*引入github的markdown样式文件*/
  @import "../../../static/css/github-markdown.css";
  /*引入atom的代码高亮样式文件*/
  @import "../../../static/css/atom-one-dark.min.css";


  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }

</style>
