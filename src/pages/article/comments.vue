<template>
  <div>
    <template>
      <v-toolbar flat color="white">
        <v-toolbar-title>评论管理</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
      </v-toolbar>
    </template>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>

      <el-table-column
        prop="username"
        label="用户名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="nickname"
        label="昵称"
        width="180">
      </el-table-column>


      <el-table-column
        prop="articleTitle"
        label="文章标题">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <el-link type="primary">{{ scope.row.articleTitle }}</el-link>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        prop="content"
        label="评论内容">
      </el-table-column>
      <el-table-column
        prop="createAt"
        label="提交时间">
      </el-table-column>

      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">驳回</el-button>
          <el-button type="text" size="small">回复</el-button>
          <!--<el-button type="text" size="small">垃圾评论</el-button>
          <el-button type="text" size="small">删除</el-button>-->
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
    export default {
        name: "comments",
        data() {
            return {
                tableData: [],
                pageNum: 1,
                pageCount: 0,
                itemsPerPage: 10,
                keyword: '',
            }
        },
        methods:{
            async getComments(){
                try {
                    let resp = await this.$http.get("/comment?pageNum="+ this.pageNum + "&pageSize=5"+ "&keyword=" + this.keyword);
                    // console.log("评论",resp.data.data);
                    this.tableData = resp.data.data;
                }catch (e) {

                }
            }
        },
        created() {
            this.getComments();
        }
    }
</script>

<style scoped>

</style>
