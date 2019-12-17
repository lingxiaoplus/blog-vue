<template>
  <div>
    <v-snackbar v-model="snackbar" color="primary" :timeout="3000" :bottom="true">
      {{ snackbarText }}
      <v-btn dark text @click="snackbar = false">确认</v-btn>
    </v-snackbar>


    <v-card color="basil">
      <v-tabs v-model="tablemodel">
        <v-tab v-for="item in tables" :key="item.name">
          {{ item.name }}
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tablemodel">
        <v-tab-item v-for="item in tables" :key="item.name">

          <v-data-table :headers="headers" :items="desserts" :page.sync="pageNum" :items-per-page="itemsPerPage"
            hide-default-footer class="elevation-1" @page-count="pageCount = $event">
            <template v-slot:top>
              <v-toolbar flat color="white">
                <v-toolbar-title>{{ item.name }}</v-toolbar-title>

                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
                <v-spacer></v-spacer>
                <!-- loading条 -->
                <v-progress-linear :active="loading" :indeterminate="loading" absolute bottom color="yellow darken-2">
                </v-progress-linear>

              </v-toolbar>
            </template>
            <template v-slot:item.action="{ item }">
              <v-btn class="ma-2 white--text" text color="primary" @click="editItem(item)">
                编辑<v-icon right dark small>
                  mdi-pencil
                </v-icon>
              </v-btn>
              <v-btn class="ma-2 white--text" text color="primary" @click="deleteItem(item)">
                删除<v-icon right dark small>
                  mdi-delete
                </v-icon>
              </v-btn>

            </template>
            <template v-slot:no-data>
              <v-btn color="primary" @click="initialize">Reset</v-btn>
            </template>
          </v-data-table>

        </v-tab-item>
      </v-tabs-items>
    </v-card>


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
            text: '#',
            value: 'id',
          },
          {
            text: '日志内容',
            value: 'operationContent',
          },
          {
            text: '操作人ID',
            value: 'username'
          },
          {
            text: '操作人名字',
            value: 'nickname'
          },
          {
            text: 'IP',
            value: 'userIp'
          },
          {
            text: '耗时(毫秒)',
            value: 'runTakes'
          },
          {
            text: '日志类型',
            value: 'operationType'
          },
          {
            text: '操作时间',
            value: 'createAt',
          },
        ],
        desserts: [{
          id: 1,
          title: '159',
          author: 'Frozen Yogurt',
          categoryName: '',
          tables: '',
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
        search: "",

        tables: [{name:'登录日志'},{name:'操作日志'}],
        tablemodel: 0,
      }
    },
    watch: {
      pageNum(val){
        this.pageNum = val;
        this.getLogList();
      },
    },
    methods: {
      async getLogList() {
        this.loading = true;
        try {
          this.$store.commit('setLoading', true);
          let resp = await this.$http.get("/log?pageNum=" + this.pageNum + "&pageSize=" + 5);
          console.log("log列表", resp.data);
          this.desserts = resp.data.data;
          this.pageCount =  resp.data.totalPage;
        } catch (e) {
          console.log("log列表失败", e.response);
          this.snackbar = true;
          this.snackbarText = "获取log列表失败";
        } finally {
          this.loading = false;
          this.$store.commit('setLoading', false);
        }
      },
      deleteItem(e) {
        this.deleteDialog = true;
        console.log("点击", e);
        this.article_id = e.id;
      },
      editItem(e) {
        //let article = JSON.stringify(response.data.data)
        this.$router.push({
          path: '/article/edit_article?articleId=' + e.id
        });

      },
      async deleteArticle() {
        this.deleteDialog = false;
        this.loading = true;
        try {
          let response = await this.$http.delete("/article/" + this.article_id);
          console.log("删除文章", response.data);
          this.getLogList();
        } catch (e) {
          console.log("删除文章失败", e.response.data);
          this.snackbar = true;
          this.snackbarText = e.response.data.message;
        } finally {
          this.loading = false;
        }
      },
    },
    created() {
      this.getLogList();
    }
  }
</script>

<style>
</style>
