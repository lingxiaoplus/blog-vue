<template>
  <div>
    <v-snackbar v-model="snackbar" color="error" :timeout="3000" :top="true">
      {{ snackbarText }}
      <v-btn dark text @click="snackbar = false">确认</v-btn>
    </v-snackbar>

    <v-data-table :headers="headers" :items="desserts" :page.sync="pageNum" :items-per-page="itemsPerPage"
                  hide-default-footer class="elevation-1" @page-count="pageCount = $event" >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>文章管理</v-toolbar-title>

          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="keyword"
            append-icon="mdi-magnify"
            label="搜索文章(根据标题)"
            single-line
            hide-details
            @input="onSearchChanged"
          ></v-text-field>
          <v-spacer></v-spacer>
          <!--<v-btn class="ma-2 white&#45;&#45;text" color="primary" @click="$emit('setLoading',true)"> 确认</v-btn>-->
          <!-- loading条 -->
          <v-progress-linear :active="loading" :indeterminate="loading" absolute bottom color="yellow darken-2">
          </v-progress-linear>

        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <v-btn class="ma-2 white--text" text color="primary"  @click="editItem(item)">
          编辑<v-icon right dark small>
          mdi-pencil
        </v-icon>
        </v-btn>
        <v-btn class="ma-2 white--text" text color="primary"  @click="deleteItem(item)">
          删除<v-icon right dark small>
          mdi-delete
        </v-icon>
        </v-btn>

      </template>
      <template v-slot:no-data>
        <v-btn color="primary">刷新试试</v-btn>
      </template>
    </v-data-table>
    <div class="text-center pt-2" v-if="pageCount>1">
      <v-pagination v-model="pageNum" :length="pageCount"></v-pagination>
    </div>

    <v-row justify="center">
      <v-dialog v-model="deleteDialog" max-width="290">
        <v-card>
          <v-card-title class="headline">确认要删除这一条记录吗?</v-card-title>
          <v-card-text>删除之后数据就不存在了</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="deleteDialog = false">取消</v-btn>
            <v-btn color="green darken-1" text @click="deleteArticle">确认</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                pageNum: 1,
                pageCount: 0,
                itemsPerPage: 10,
                keyword: '',
                headers: [
                    {
                      text: '标题',
                      value: 'title',
                    },
                    {
                        text: '作者',
                        value: 'author'
                    },
                    {
                        text: '分类',
                        value: 'categoryName'
                    },
                    {
                        text: '标签',
                        value: 'tables'
                    },
                    {
                        text: '更新时间',
                        value: 'updateTime'
                    },
                    {
                        text: '操作',
                        value: 'action',
                        sortable: false,
                    },
                ],
                desserts: [],
                editedItem: {
                    roleName: '',
                    roleDesc: '',
                    rolePermession: '',
                },
                dialog: false,
                editedIndex: -1,
                deleteDialog: false,
                selectDate: new Date().toISOString().substr(0, 10),
                dateMenu: false,
                loading: false,
                snackbar: false,
                snackbarText: '',
                article_id: '',
                on: false,

            }
        },
        watch: {
          pageNum(val){
            this.pageNum = val;
            this.getArticles();
          },
        },
        methods: {
          onSearchChanged(e){
            console.log("搜索",e);
            this.keyword = e;
            this.getArticles();
          },
          async getArticles() {
            this.loading = true;
            try{
                this.$store.commit('setLoading', true);
              let resp = await this.$http.get("/article?pageNum="+ this.pageNum + "&pageSize=5"+ "&keyword=" + this.keyword);
              console.log("文章列表", resp.data);
              this.desserts = resp.data.data;
			        this.pageCount =  resp.data.totalPage;
            }catch(e){
              console.log("文章列表失败", e.response);
              this.snackbar = true;
              this.snackbarText = e.response.data.message?e.response.data.message:"获取文章列表失败";
            }finally{
              this.loading = false;
                this.$store.commit('setLoading', false);
            }
          },
          deleteItem(e) {
            this.deleteDialog = true;
            console.log("点击", e);
            this.article_id = e.id;
          },
          editItem(e){
            //let article = JSON.stringify(response.data.data)
            this.$router.push({ path: '/article/edit_article?articleId='+e.id });

          },
          async deleteArticle(){
            this.deleteDialog = false;
            this.loading = true;
            try{
              let response = await this.$http.delete("/article/"+this.article_id);
              console.log("删除文章",response.data);
              this.getArticles();
            }catch(e){
              console.log("删除文章失败",e.response.data);
              this.snackbar = true;
              this.snackbarText = e.response.data.message;
            }finally{
              this.loading = false;
            }
          },
        },
        created() {
          this.getArticles();

        }
    }
</script>

<style scoped>

</style>
