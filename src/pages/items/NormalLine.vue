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
          <v-toolbar-title>普通线路</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <!-- loading条 -->
          <v-progress-linear :active="loading" :indeterminate="loading" absolute bottom color="yellow darken-2">
          </v-progress-linear>

          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark tile  class="mb-2" v-on="on" @click="editedIndex = -1">添加</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.productNum" label="线路编号"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.productName" label="线路名称"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.cityName" label="城市"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-menu ref="dateMenu" v-model="dateMenu" :close-on-content-click="false" :return-value.sync="editedItem.departureTime"
                        transition="scale-transition" offset-y min-width="290px">
                        <template v-slot:activator="{ on }">
                          <v-text-field v-model="editedItem.departureTime" label="出发时间" prepend-icon="mdi-calendar-range"
                            readonly v-on="on"></v-text-field>
                        </template>
                        <v-date-picker v-model="editedItem.departureTime" no-title scrollable>
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="dateMenu = false">取消</v-btn>
                          <v-btn text color="primary" @click="onSelectDate(editedItem.departureTime)">确认</v-btn>
                        </v-date-picker>
                      </v-menu>
                      <!-- <v-text-field v-model="editedItem.departureTime" label="出发时间"></v-text-field> -->
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.productPrice" label="价格(元)"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.productDesc" label="线路描述"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog = false">取消</v-btn>
                <v-btn color="blue darken-1" text @click="saveProduct">保存</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)" >
          mdi-pencil
        </v-icon>
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
            text: '线路编号',
            align: 'left',
            sortable: false,
            value: 'productNum',
          },
          {
            text: '线路名字',
            value: 'productName'
          },
          {
            text: '城市',
            value: 'cityName'
          },
          {
            text: '时间',
            value: 'dateFormat'
          },
          {
            text: '价格 (元)',
            value: 'productPrice'
          },
          {
            text: '线路描述',
            value: 'productDesc'
          },
          {
            text: 'Actions',
            value: 'action',
            sortable: false,
          },
        ],
        desserts: [{
          id: '1',
          productNum: '159',
          productName: 'Frozen Yogurt',
          cityName: '成都',
          dateFormat: '2018-12-12',
          productPrice: 1124,
          productDesc: '没什么好说的',
          productStatus: 1,
        }, ],
        editedItem: {
          productNum: '',
          productName: 0,
          cityName: 0,
          departureTime: '2018-12-12',
          productPrice: 1000,
          productDesc: '',
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
        //dateModal: false,
      }
    },
    computed: {
      formTitle() {
        return this.editedIndex === -1 ? '添加线路' : '编辑线路'
      },
    },
    watch: {
      /* dialog(val) {
        val || this.close()
      }, */
      pageNum(val){
        this.pageNum = val;
        this.getProducts();
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
      async getProducts() {
        try{
          this.loading = true;
          let response = await this.$http.get("/product?pageNum=" + this.pageNum + "&pageSize=" + 5);
          console.log("product : ", response.data);
          this.desserts = response.data.data;
          //let page = parseInt(response.data.total / this.itemsPerPage) + 1;
          //console.log("page:", page)
          this.pageCount =  response.data.totalPage;
        }catch(e){
         console.log("获取线路失败",e);
         this.snackbar = true;
         this.snackbarText = "获取线路失败";
        }finally{
          this.loading = false;
        }

      },
      async saveProduct() {
        this.dialog = false;
        this.loading = true;
        console.log("产品", this.editedItem);
        try{
          let departureTime = this.getUnixTime(this.editedItem.departureTime) * 1000;
          let editData = Object.assign({}, this.editedItem);
          editData.departureTime = departureTime;
          if(this.editedIndex > 0){
            //更新
            let response = await this.$http.put("/product",editData);
            this.snackbar = true;
            this.snackbarText = "更新线路成功";
            console.log("更新线路",response.data);
          }else{
            //新增
            let response = await this.$http.post("/product",editData);
            this.snackbar = true;
            this.snackbarText = "添加线路成功";
            console.log("添加线路",response.data);
          }
          this.getProducts();
        }catch(e){
          console.log("添加/更新线路失败",e);
          this.snackbar = true;
          this.snackbarText = "添加/更新线路失败";
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
          this.getProducts();
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
      this.getProducts();
    },
  }
</script>

<style>
</style>
