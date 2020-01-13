<template>
  <div>
    <v-snackbar v-model="snackbar" color="error" :timeout="3000" :top="true">
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

    <v-row class="pa-4" style="background: white" >
      <v-btn @click="onDelete" class="ma-2 white--text" small tile color="error" :loading="loading" :disabled="loading">
        <v-icon left>mdi-delete</v-icon> 删除
      </v-btn>

      <v-btn @click="onPassOrReject(0)" class="ma-2 white--text" small tile color="warning" :loading="loading" :disabled="loading">
        <v-icon left>mdi-cancel</v-icon> 驳回
      </v-btn>

      <v-btn @click="onPassOrReject(1)" class="ma-2 white--text" small tile color="primary" :loading="loading" :disabled="loading">
        <v-icon left>mdi-hand-right</v-icon> 通过审核
      </v-btn>
    </v-row>

    <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55">
      </el-table-column>

      <el-table-column prop="member.username" label="用户名" width="180">
      </el-table-column>
      <el-table-column prop="member.nickname" label="昵称" width="180">
      </el-table-column>


      <el-table-column prop="article.title" label="文章标题">
        <template slot-scope="scope">
          <el-link type="primary" @click="linkToArticle(scope.row.article)">{{ scope.row.article.title }}</el-link>
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
<!--          <el-button @click="commentClick(scope.row,true)" type="text" size="small">驳回</el-button>-->
          <el-button @click="replyComment(scope.row)" type="text" size="small">回复</el-button>
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
                loading: false,
                selectList: [],
            }
        },
        methods: {
            async getComments() {
                try {
                    this.$store.commit('setLoading', true);
                    let resp = await this.$http.get(`/comment?pageNum=${this.pageNum}&pageSize=${this.pageSize}&keyword=${this.keyword}`);
                    console.log("评论", resp.data);
                    this.tableData = resp.data.data;
                    this.tableData.forEach((item) => {
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
                console.log(`当前对象: ${item.id}`);
                const {
                    href
                } = this.$router.resolve({
                    name: "articleContent",
                    query: {
                        id: item.id
                    }
                });
                window.open(href, '_blank');
            },
            getCommentStatus(status) {
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
            handleSelectionChange(val) {
                this.selectList = val;
            },
            async onDelete(){
                if (this.selectList.length < 1){
                    this.snackbar = true;
                    this.snackbarText = "请选择要删除的评论";
                    return ;
                }
                try {
                    this.loading = true;
                    let ids = this.selectList.map((item)=>{
                        return item.id;
                    });
                    let resp = await this.$http.delete(`/comment?ids=${ids}`);
                    console.log("删除成功",resp.data);
                    this.getComments();
                }catch (e) {
                    console.log("删除评论失败", e);
                    this.$message.error("删除评论失败，请稍后再试")
                }finally {
                    this.loading = false;
                }
            },
            async onPassOrReject(type){
                if (this.selectList.length < 1){
                    this.snackbar = true;
                    this.snackbarText = "请至少选择一个评论";
                    return ;
                }
                try {
                    this.loading = true;
                    let ids = this.selectList.map((item)=>{
                        return item.id;
                    });
                    let resp = await this.$http.put(`/comment?ids=${ids}&type=${type}`);
                    console.log("成功", resp.data);
                    this.$message.success(type===0?"评论驳回成功":"评论通过审核");
                    this.getComments();
                }catch (e) {
                    console.log("失败", e);
                }finally {
                    this.loading = false;
                }
            },
            async replyComment(row){
                try {
                    let resp = await this.$http.post("/comment", {
                        userId: row.member.uid,
                        articleId: row.article.id,
                        content: this.commentContent,
                    });
                    console.log(resp.data);
                    this.$message({
                        message: '评论提交成功',
                        type: 'success'
                    });
                } catch (e) {
                    console.log("评论失败", e);
                    this.snackbar = true;
                    this.snackbarText = e.response.data.message ? e.response.data.message : "网络异常，请稍后再试";
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
