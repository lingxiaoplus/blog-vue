<template>

  <div>
    <v-snackbar v-model="snackbar" color="primary" :timeout="3000" :bottom="true">
      {{ snackbarText }}
      <v-btn dark text @click="snackbar = false">确认</v-btn>
    </v-snackbar>
    <v-data-table :headers="headers" :items="desserts" :page.sync="pageNum" :items-per-page="itemsPerPage"
      hide-default-footer class="elevation-1" @page-count="pageCount = $event">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>角色管理</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
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
        <v-btn class="ma-2" tile outlined color="teal" large icon @click="editItem(item)">
              <v-icon >
                mdi-pencil
              </v-icon>编辑
        </v-btn>
        <v-icon small @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
    <div class="text-center pt-2">
      <v-pagination v-model="pageNum" :length="pageCount"></v-pagination>
      <v-text-field :value="itemsPerPage" label="Items per page" type="number" min="-1" max="15" @input="itemsPerPage = parseInt($event, 10)">
      </v-text-field>
    </div>

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
	      productId: '',  //当前线路的id
	      on: false,
	    }
	  },
	  computed: {
	    formTitle() {
	      return this.editedIndex === -1 ? '添加线路' : '编辑线路'
	    },
	  },
	  watch: {
	    pageNum(val){
	      this.pageNum = val;
	      this.getRoles();
	      console.log("监听到页数发生变化",val);
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
	      try{
	        this.loading = true;
	        let response = await this.$http.get("/role/all?pageNum=" + this.pageNum + "&pageSize=" + 5);
	        console.log("product : ", response.data);
	        this.desserts = response.data.data;
	        //let page = parseInt(response.data.total / this.itemsPerPage) + 1;
	        //console.log("page:", page)
	        this.pageCount =  response.data.totalPage;
	      }catch(e){
	       console.log("获取线路失败",e.response.data);
	       this.snackbar = true;
	       this.snackbarText = "获取线路失败";
	      }finally{
	        this.loading = false;
	      }

	    },
	    async saveRole() {
	      this.dialog = false;
	      this.loading = true;
	      console.log("角色", this.editedItem);
	      try{
	        let editData = Object.assign({}, this.editedItem);
	        if(this.editedIndex > 0){
	          //更新
	          let response = await this.$http.put("/product",editData);
	          this.snackbar = true;
	          this.snackbarText = "更新角色成功";
	          console.log("更新角色",response.data);
	        }else{
	          //新增
	          let response = await this.$http.post("/role",editData);
	          this.snackbar = true;
	          this.snackbarText = "添加角色成功";
	          console.log("添加角色",response.data);
	        }
	        this.getRoles();
	      }catch(e){
	        console.log("添加/更新角色失败",e);
	        this.snackbar = true;
	        this.snackbarText = "添加/更新角色失败";
	      }finally{
	        this.loading = false;
	      }
	    },
	    async deleteProduct(){
	      this.deleteDialog = false;
	      this.loading = true;
	      try{
	        let response = await this.$http.delete("/product/"+this.productId);
	        console.log("删除线路",response.data);
	        this.getRoles();
	      }catch(e){
	        console.log("删除线路失败",e);
	        this.snackbar = true;
	        this.snackbarText = "删除线路失败";
	      }finally{
	        this.loading = false;
	      }

	    },
	    getUnixTime(dateStr){
	        var newstr = dateStr.replace(/-/g,'/');
	        var date =  new Date(newstr);
	        var time_str = date.getTime().toString();
	        return time_str.substr(0, 10);
	    }
	  },
	  created() {
	    this.getRoles();
	  },
	}
</script>

<style>
</style>
