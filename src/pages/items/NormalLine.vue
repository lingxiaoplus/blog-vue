<template>
  <div>

    <v-data-table :headers="headers" :items="desserts" :page.sync="page" :items-per-page="itemsPerPage"
      hide-default-footer class="elevation-1" @page-count="pageCount = $event">


      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>普通线路</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>

          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on">添加</v-btn>
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
                      <v-text-field v-model="editedItem.departureTime" label="出发时间"></v-text-field>
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
                <v-btn color="blue darken-1" text @click="dialog = false">保存</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">
          mdi-edit
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
      <v-pagination v-model="page" :length="pageCount"></v-pagination>
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
            <v-btn color="green darken-1" text @click="deleteDialog = false">确认</v-btn>
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
        page: 1,
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
            value: 'departureTime'
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
            departureTime: '2018-12-12',
            productPrice: 1124,
            productDesc: '没什么好说的',
            productStatus: 1,
          },
        ],
        editedItem: {
          productNum: '',
          productName: 0,
          cityName: 0,
          departureTime: '',
          productPrice: 0,
          productDesc: 0,
        },
        dialog: false,
        editedIndex: -1,
        deleteDialog: false,
      }
    },
    computed: {
      formTitle() {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },
    watch: {
      dialog(val) {
        val || this.close()
      },
    },
    methods: {
      itemClick(e) {
        console.log("点击", e);
      },
      editItem(e) {
        console.log("点击", e);
      },
      deleteItem(e) {
        this.deleteDialog = true;
        console.log("点击", e);
      },

      async getProducts(){
        console.log("$http  ",this.$http)
        let response = await this.$http.get("/product");
        console.log("product : ",response);
      },
    },
    created() {
      this.getProducts();
    },
  }
</script>

<style>
</style>
