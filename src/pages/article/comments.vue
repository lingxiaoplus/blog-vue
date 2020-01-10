<template>
  <div>
    <v-snackbar v-model="snackbar" color="primary" :timeout="3000" :bottom="true">
      {{ snackbarText }}
      <v-btn dark text @click="snackbar = false">确认</v-btn>
    </v-snackbar>
    <template>
      <v-toolbar flat color="white">
        <v-toolbar-title>评论管理</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
      </v-toolbar>
    </template>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="selection" width="55">
      </el-table-column>

      <el-table-column prop="username" label="用户名" width="180">
      </el-table-column>
      <el-table-column prop="nickname" label="昵称" width="180">
      </el-table-column>


      <el-table-column prop="articleTitle" label="文章标题">
        <template slot-scope="scope">
          <el-link type="primary" @click="linkToArticle(scope.row)">{{ scope.row.articleTitle }}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="content" label="评论内容">
      </el-table-column>

      <el-table-column prop="status" label="状态">

      </el-table-column>

      <el-table-column prop="createAt" label="提交时间">
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="commentClick(scope.row,true)" type="text" size="small">驳回</el-button>
          <el-button @click="commentClick(scope.row,false)" type="text" size="small">回复</el-button>
          <!--<el-button type="text" size="small">垃圾评论</el-button>
          <el-button type="text" size="small">删除</el-button>-->
        </template>
      </el-table-column>
    </el-table>
    <div style="width: 100%;display: flex;justify-content: center;margin: 10px;">
      <el-pagination :hide-on-single-page="hidePagination" @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="currentPage" :page-sizes="[5, 10, 20, 30]" :page-size="pageSize"
                     layout="prev, pager, next, jumper,sizes, total"
                     :total="total">
      </el-pagination>
    </div>


  </div>
</template>

<script>
    export default {
        name: "comments",
        data() {
            return {
                tableData: [],
                pageNum: 1,
                pageSize: 5,
                pageCount: 0,
                itemsPerPage: 10,
                keyword: '',
                hidePagination: false,
                currentPage: 1,
                totalPage: 0,
                total: 0,
                snackbar: false,
                snackbarText: '',
            }
        },
        methods: {
            async getComments() {
                try {
                    this.$store.commit('setLoading', true);
                    let resp = await this.$http.get(`/comment?pageNum=${this.pageNum}&pageSize=${this.pageSize}&keyword=${this.keyword}`);
                    console.log("评论", resp.data);
                    this.tableData = resp.data.data;
                    this.tableData.forEach((item)=>{
                       item.status = this.getCommentStatus(item.status);
                    });
                    this.total = resp.data.total;
                    this.totalPage = resp.data.totalPage;
                    this.hidePagination = this.totalPage <= 1; //当页数小于等于1页的时候，就隐藏分页
                } catch (e) {
                    console.log("获取评论异常", e);
                    this.snackbar = true;
                    this.snackbarText = e.response.data.message ? e.response.data.message : "网络异常，请稍后再试";
                } finally {
                    this.$store.commit('setLoading', false);
                }
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.pageSize = val;
                this.getComments();
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.pageNum = val;
                this.getComments();
            },
            linkToArticle(item) {
                console.log(`当前对象: ${item.articleId}`);
                const {
                    href
                } = this.$router.resolve({
                    name: "articleContent",
                    query: {
                        id: item.articleId
                    }
                });
                window.open(href, '_blank');
            },
            commentClick(row, reject){
                if (reject){

                }
            },
            getCommentStatus(status){
                let message = '';
                switch (status) {
                    case -1:
                        message = '待审核';
                        break;
                    case 0:
                        message = '已驳回';
                        break;
                    case 1:
                        message = '已通过';
                        break;
                    case 2:
                        message = '已删除';
                        break;
                    case 3:
                        message = '垃圾评论';
                        break;
                    default:
                        break;
                }
                return message;
            },
        },
        created() {
            this.getComments();
        }
    }
</script>

<style scoped>

</style>
