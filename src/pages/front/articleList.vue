<template>
  <div>
    <div>
      <v-tabs v-model="currentItem" background-color="primary" dark>
        <v-tab v-for="item in items" :key="item.name" :href="'#tab-' + item.name" class="mx-8">
          {{ item.name }}
        </v-tab>
      </v-tabs>



      <v-card elevation="0" class="mx-2" flat>
        <v-tabs-items v-model="currentItem">
          <v-tab-item v-for="item in items" :key="item.name" :value="'tab-' + item.name">
            <!--文章内容-->
            <v-layout row wrap>
              <v-col cols="3" v-for="item in articleList" :key="item.id">
                <v-hover v-slot:default="{ hover }">
                  <v-card :elevation="hover?12:2">
                    <v-img :src="item.headImage" height="194">
                      <v-card-title style="position: absolute;bottom: 0px;color: white">{{item.title}}</v-card-title>
                    </v-img>

                    <v-card-actions class="d-flex ">
                      <el-link class="pa-2" style="color: #909399"><i class="el-icon-time el-icon--left">
                        {{item.updateTime}}</i></el-link>
                      <el-link class="pa-2" style="color: #909399"><i class="el-icon-view el-icon--left"> 阅读({{item.watchCount}})</i>
                      </el-link>
                      <v-btn text color="deep-purple accent-4" class="ml-auto" @click="readArticle(item.id)">
                        阅读
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-hover>

              </v-col>
            </v-layout>
          </v-tab-item>
        </v-tabs-items>

        <v-fab-transition>
          <v-btn key="keyboard_arrow_up" color="primary" fixed fab large dark right bottom>
            <v-icon>mdi-chevron-up</v-icon>
          </v-btn>
        </v-fab-transition>


      </v-card>
    </div>
    </div>
</template>

<script>
    export default {
        name: "articleList",
        data(){
            return{
                currentItem: 0,
                items: [],
                articleList: [],
            }
        },
        methods:{
            async getCategory() {
                try {
                    let resp = await this.$http.get("/front/category");
                    console.log("结果", resp.data.data);
                    this.items = resp.data.data;
                    this.items.splice(0, 0, {
                        id: -1,
                        name: '首页'
                    });
                    this.currentItem = `tab-${this.items[0]}`;
                } catch (e) {
                    console.log("异常", e);
                } finally {

                }
            },
            async getArticleList() {
                try {
                    let resp = await this.$http.get("/front/article");
                    console.log("文章列表", resp.data.data);
                    this.articleList = resp.data.data;
                } catch (e) {
                    console.log("异常", e);
                } finally {

                }
            },
            readArticle(id) {
                const {
                    href
                } = this.$router.resolve({
                    name: "articleContent",
                    query: {
                        id: id
                    }
                });
                window.open(href, '_blank');
            },
        },
        mounted() {
            this.getCategory();
            this.getArticleList();
        }
    }
</script>

<style scoped>

</style>
