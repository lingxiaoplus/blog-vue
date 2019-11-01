<template>
  <div>

    <v-toolbar flat color="white">
      <v-toolbar-title>订单列表</v-toolbar-title>
      <v-divider class="mx-4" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <!-- loading条 -->
      <v-progress-linear :active="loading" :indeterminate="loading" absolute bottom color="yellow darken-2">
      </v-progress-linear>
    </v-toolbar>
    <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="orderTime"
            label="日期"
            width="180">
          </el-table-column>
          <el-table-column
            prop="orderNum"
            label="订单编号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="orderDesc"
            label="订单描述">
          </el-table-column>
          <el-table-column
            prop="payType"
            label="支付方式">
          </el-table-column>
          <el-table-column
            prop="product.productName"
            label="线路">
          </el-table-column>
          <el-table-column
            prop="member.name"
            label="会员">
          </el-table-column>
          <el-table-column
                fixed="right"
                label="操作"
                width="100">
                <template slot-scope="scope">
                  <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                  <el-button type="text" size="small">编辑</el-button>
                </template>
          </el-table-column>
        </el-table>
        <div style="width: 100%;display: flex;justify-content: center;margin: 10px;">
          <el-pagination
            background
            layout="prev, pager, next"
            :current-page="pageNum"
            @current-change="pageChanged"
            :total="pageCount">
          </el-pagination>

        </div>

  </div>
</template>

<script>
  export default {
        data() {
          return {
            tableData: [{
              orderTime: '2016-05-02',
              orderNum: '1234',
              orderDesc: '上海市普陀区金沙江路 1518 弄',
              payType: '',
              product: '',
              member: '',
            }],
            loading: false,
            pageSize: 5,
            pageCount: 10,
            pageNum: 1,
          }
        },
        watch:{
         
        },
        methods: {
          async getOrderList() {
            try{
              this.loading = true;
              let response = await this.$http.get("/order/all",{
                params:{
                  pageNum: this.pageNum,
                  pageSize: this.pageSize
                }
              });
              console.log("成功获取订单",response.data);
              this.tableData = response.data.data;
              this.pageCount = response.data.totalPage * 10;
            }catch(e){
              console.log("失败",e);
            }finally{
              this.loading = false;
            }
          },
          pageChanged(e){
            this.pageNum = e;
            this.getOrderList();
          },
        },
        created() {
          this.getOrderList();
        }
      }
</script>

<style>
</style>
