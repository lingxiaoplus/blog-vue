<template>
  <v-container>
    <v-layout column>
      <v-layout style="margin-left: 10px;">
        <v-row align="center">
          <v-col cols="6">
            <v-select v-model="select" :items="selectList" item-text="name" item-value="id"
              label="Select" persistent-hint return-object single-line solo></v-select>
          </v-col>
        </v-row>
      </v-layout>
      <v-flex>
        <v-card xs10 md10 height="600">
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
      </v-flex>
      <v-layout row style="margin-top: 10px" xs6 md6>
        <v-flex >
          <v-card max-width="344" >
            <!--          <v-img-->
            <!--            src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"-->
            <!--            height="200px"-->
            <!--          ></v-img>-->
            <v-card-title style="padding-bottom: 10px">
              发布
            </v-card-title>
            <v-card-subtitle>
              状态：草稿
            </v-card-subtitle>
            <v-card-subtitle>
              公开度：公开
            </v-card-subtitle>
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
              <v-btn class="ma-2" tile>
                预览
              </v-btn>
            </v-card-actions>
          </v-card>
          <v-card max-width="344">

          </v-card>
        </v-flex>

        <v-flex xs6 md6>
          <v-col cols="12">
            <div class="el-upload__text">封面图片</em></div>
            <el-upload
              action="http://api.lingxiaomz.top/upload/"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-success="handleSuccess"
              :on-error="handleError"
              :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible" size="tiny">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </v-col>
        </v-flex>
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
                selectList: [],
                dialogImageUrl: '',
                dialogVisible: false,
                title: '技术',
                headPortrait: '',
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
                console.log("文件上传失败时的钩子",err);
                this.showSnackBar("文件上传失败",false);
            },

            async saveArticleToDrafts(){
                console.log("选择的分类id",this.select.id);
                try {
                    this.loadingDraft = true;
                    let resp = await this.$http.post("/article",{
                        "categoryId": this.select.id,
                        "content": this.editContent.mdValue,
                        "headImage": this.headPortrait,
                        "status": 0,  //草稿箱 0  发布 1
                        "title": this.title,
                    })
                    console.log("文章保存成功",resp);
                }catch (e) {
                    console.log("文章保存失败",e);
                }finally {
                    this.loadingDraft = false;
                }

            },
        },
        created() {
            this.getCategorys();
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
