<template>

  <div>

    <v-row class="pa-4" style="background: white">

      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">

          <v-btn v-on="on" @click="editedIndex = -1" class="ma-2 white--text" small tile color="blue" :loading="loading"
                 :disabled="loading">
            <v-icon left small>mdi-plus</v-icon>
            新增
          </v-btn>

        </template>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field v-model="editedItem.roleName" label="角色名称"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field v-model="editedItem.roleDesc" label="角色描述"></v-text-field>
                </v-col>
                <v-col cols="12">
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



      <v-btn @click="" class="ma-2 white--text" small tile color="warning" :loading="loading"
             :disabled="loading">
        <v-icon left small>mdi-refresh</v-icon>
        修改
      </v-btn>

      <v-btn @click="onDeleteClick()" class="ma-2 white--text" small tile color="error" :loading="loading"
             :disabled="loading || (selectList.length < 1)">
        <v-icon left small>mdi-delete</v-icon>
        删除
      </v-btn>

      <v-btn @click="exportExcelSelect" class="ma-2 white--text" small tile color="success" :loading="loading"
             :disabled="loading">
        <v-icon left small>mdi-file-export-outline</v-icon>
        导出
      </v-btn>
    </v-row>

    <v-row>
      <v-col cols="8">
        <div>
          <v-data-table :headers="headers" :items="desserts" :page.sync="pageNum" :items-per-page="itemsPerPage"
                        hide-default-footer class="elevation-1" @page-count="pageCount = $event">
            <template v-slot:top>
              <v-toolbar flat color="white">
                <v-toolbar-title>角色管理</v-toolbar-title>

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

              </v-toolbar>
            </template>
            <template v-slot:item.action="{ item }">
              <v-btn class="ma-2 white--text" text color="primary" @click="editItem(item)">
                编辑
                <v-icon right dark small>
                  mdi-pencil
                </v-icon>
              </v-btn>
              <v-btn class="ma-2 white--text" text color="primary" @click="deleteItem(item)">
                删除
                <v-icon right dark small>
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
        </div>
      </v-col>
      <v-col cols="4">
        <v-card tile>
          <v-card-text>菜单分配</v-card-text>
          <v-card-actions>
            <v-treeview
              style="width: 100%"
              selectable
              selected-color="primary"
              hoverable
              :items="menuTree"
            ></v-treeview>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>



    <v-row justify="center">
      <v-dialog v-model="deleteDialog" max-width="290">
        <v-card>
          <v-card-title class="headline">确认要删除这一条记录吗?</v-card-title>
          <v-card-text>删除之后数据就不存在了</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="deleteDialog = false">取消</v-btn>
            <v-btn color="green darken-1" text @click="deleteProduct">确认</v-btn>
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
                headers: [{
                    text: 'ID',
                    align: 'left',
                    sortable: false,
                    value: 'id',
                },
                    {
                        text: '角色名称',
                        value: 'roleName'
                    },
                    {
                        text: '角色描述',
                        value: 'roleDesc'
                    },
                    {
                        text: '角色权限',
                        value: 'rolePermession'
                    },
                    {
                        text: '操作',
                        value: 'action',
                        sortable: false,
                    },
                ],
                desserts: [{
                    id: 1,
                    roleName: '159',
                    roleDesc: 'Frozen Yogurt',
                    rolePermession: '',
                },],
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
                productId: '',  //当前线路的id
                on: false,
                search: '',
                loading:false,
                selectList: [],

                menuTree: [
                    {
                        id: 1,
                        name: '文章管理',
                        children: [
                            { id: 2, name: '文章分类' },
                            { id: 3, name: '标签管理' },
                            { id: 4, name: '评论管理' },
                        ],
                    },
                    {
                        id: 5,
                        name: '人员管理',
                        children: [
                            {
                                id: 6,
                                name: 'vuetify :',
                                children: [
                                    {
                                        id: 7,
                                        name: 'src :',
                                        children: [
                                            { id: 8, name: 'index : ts' },
                                            { id: 9, name: 'bootstrap : ts' },
                                        ],
                                    },
                                ],
                            },
                            {
                                id: 10,
                                name: 'material2 :',
                                children: [
                                    {
                                        id: 11,
                                        name: 'src :',
                                        children: [
                                            { id: 12, name: 'v-btn : ts' },
                                            { id: 13, name: 'v-card : ts' },
                                            { id: 14, name: 'v-window : ts' },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        id: 15,
                        name: '运维管理',
                        children: [
                            { id: 16, name: 'October : pdf' },
                            { id: 17, name: 'November : pdf' },
                            { id: 18, name: 'Tutorial : html' },
                        ],
                    },
                    {
                        id: 19,
                        name: '系统管理',
                        children: [
                            {
                                id: 20,
                                name: 'Tutorials :',
                                children: [
                                    { id: 21, name: 'Basic layouts : mp4' },
                                    { id: 22, name: 'Advanced techniques : mp4' },
                                    { id: 23, name: 'All about app : dir' },
                                ],
                            },
                            { id: 24, name: 'Intro : mov' },
                            { id: 25, name: 'Conference introduction : avi' },
                        ],
                    },
                ],
            }
        },
        computed: {
            formTitle() {
                return this.editedIndex === -1 ? '添加线路' : '编辑线路'
            },
        },
        watch: {
            pageNum(val) {
                console.log("监听到页数发生变化", val);
                this.pageNum = val;
                this.getRoles();
            },
        },
        methods: {
            itemClick(e) {
                console.log("点击", e);
            },
            editItem(e) {
                this.editedIndex = 1;
                this.editedItem = e;
                this.editedItem.departureTime = e.dateFormat; //这里要注意一下
                this.dialog = true;
                console.log("点击", e);
            },
            deleteItem(e) {
                this.deleteDialog = true;
                console.log("点击", e);
                this.productId = e.id;
            },
            onSelectDate(date) {
                this.dateMenu = false;
                this.editedItem.departureTime = date;
                console.log("选择时间", date);
            },
            async getRoles() {
                try {
                    this.loading = true;
                    let response = await this.$http.get("/role/all?pageNum=" + this.pageNum + "&pageSize=" + 5);
                    console.log("product : ", response.data);
                    this.desserts = response.data.data;
                    //let page = parseInt(response.data.total / this.itemsPerPage) + 1;
                    //console.log("page:", page)
                    this.pageCount = response.data.totalPage;
                } catch (e) {
                    console.log("获取角色列表失败", e.response.data);
                    this.$store.commit('showSnackbar', {
                        color: 'error',
                        text: e.response.data.message ? e.response.data.message : "获取角色列表失败"
                    });
                } finally {
                    this.loading = false;
                }

            },
            async saveRole() {
                this.dialog = false;
                this.loading = true;
                console.log("角色", this.editedItem);
                try {
                    let editData = Object.assign({}, this.editedItem);
                    if (this.editedIndex > 0) {
                        //更新
                        let response = await this.$http.put("/role", editData);
                        this.$store.commit('showSnackbar', {
                            color: 'success',
                            text: "更新角色成功"
                        });
                    } else {
                        //新增
                        let response = await this.$http.post("/role", editData);
                        this.$store.commit('showSnackbar', {
                            color: 'success',
                            text: "添加角色成功"
                        });
                    }
                    this.getRoles();
                } catch (e) {
                    console.log("添加/更新角色失败", e);
                    this.$store.commit('showSnackbar', {
                        color: 'error',
                        text: e.response.data.message ? e.response.data.message : "添加/更新角色失败"
                    });
                } finally {
                    this.loading = false;
                }
            },
            async deleteProduct() {
                this.deleteDialog = false;
                this.loading = true;
                try {
                    let response = await this.$http.delete("/role/" + this.productId);
                    console.log("删除线路", response.data);
                    this.getRoles();
                } catch (e) {
                    console.log("删除线路失败", e);
                    this.$store.commit('showSnackbar', {
                        color: 'error',
                        text: e.response.data.message ? e.response.data.message : "删除线路失败"
                    });
                } finally {
                    this.loading = false;
                }

            },
            getUnixTime(dateStr) {
                var newstr = dateStr.replace(/-/g, '/');
                var date = new Date(newstr);
                var time_str = date.getTime().toString();
                return time_str.substr(0, 10);
            }
        },
        mounted() {
            this.getRoles();
        },
    }
</script>

<style>
</style>
