<template>
  <div>
    <v-snackbar v-model="snackbar" color="primary" :timeout="3000" :bottom="true">
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
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>
          <!-- loading条 -->
          <v-progress-linear :active="loading" :indeterminate="loading" absolute bottom color="yellow darken-2">
          </v-progress-linear>

          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark tile class="mb-2" v-on="on" @click="editedIndex = -1">添加</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" >
                      <v-text-field v-model="editedItem.roleName" label="角色名称"></v-text-field>
                    </v-col>
                    <v-col cols="12" >
                      <v-text-field v-model="editedItem.roleDesc" label="角色描述"></v-text-field>
                    </v-col>
                    <v-col cols="12" >
                      <v-text-field v-model="editedItem.rolePermession" label="权限"></v-text-field>
                    </v-col>

                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog = false">取消</v-btn>
                <v-btn color="blue darken-1" text @click="saveRole">保存</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

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
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
    <div class="text-center pt-2">
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
                desserts: [{
                    id: 1,
                    title: '159',
                    author: 'Frozen Yogurt',
                    categoryName: '',
                    tables:'',
                    updateTime: '2019-12-12'
                }, ],
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
        methods: {
          async getArticles() {
            this.loading = true;
            try{
              let resp = await this.$http.get("/article?pageNum=" + this.pageNum + "&pageSize=" + 5);
              console.log("文章列表", resp.data);
              this.desserts = resp.data.data;
            }catch(e){
              console.log("文章列表失败", e.response);
              this.snackbar = true;
              this.snackbarText = "获取文章列表失败";
            }finally{
              this.loading = false;
            }
          },
          deleteItem(e) {
            this.deleteDialog = true;
            console.log("点击", e);
            this.article_id = e.id;
          },
          async editItem(e){
            this.loading = true;
            try{
              let response = await this.$http.get("/article/"+e.id);
              console.log("查询文章",response.data);
            }catch(e){
              console.log("查询文章失败",e.response.data);
              this.snackbar = true;
              this.snackbarText = e.response.data.message;
            }finally{
              this.loading = false;
            }
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
