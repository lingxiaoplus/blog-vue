<template>
  <div>
    <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="dateFormat"
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
            prop="product"
            label="线路">
          </el-table-column>
          <el-table-column
            prop="member"
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
  </div>
</template>

<script>
  export default {
        data() {
          return {
            tableData: [{
              dateFormat: '2016-05-02',
              orderNum: '1234',
              orderDesc: '上海市普陀区金沙江路 1518 弄',
              payType: '',
              product: '',
              member: '',

            }]
          }
        }
      }
</script>

<style>
</style>
