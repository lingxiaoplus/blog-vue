<template>
  <div >
    <v-sheet>
      <v-flex class="d-flex flex-column align-center justify-center">
        <v-carousel cycle interval="4000">
          <v-carousel-item v-for="(item,i) in banners" :key="i" :src="item.src">
            <v-flex class="d-flex align-center justify-center mt-8">
              <span class="font-weight-medium px-2" style="font-size: 26px">一个极简的 Java ASCII 表格生成库</span>
            </v-flex>
          </v-carousel-item>
        </v-carousel>
        <v-flex class="d-flex align-center justify-center flex-row mt-4">
          <span class="material-icons">card_giftcard</span>
          <span class="font-weight-medium px-2" style="font-size: 26px">每日一句</span>
        </v-flex>
        <v-card elevation="0" max-width="800px" class="ma-2">
          <v-card-text>
            <span class="font-weight-medium px-2" style="font-size: 20px">
              不是每个人都应该像我这样去建造一座水晶大教堂，但是每个人都应该拥有自己的梦想，设计自己的梦想，追求自己的梦想，实现自己的梦想。梦想是生命的灵魂，是心灵的灯塔，是引导人走向成功的信仰。有了崇高的梦想，只要矢志不渝地追求，梦想就会成为现实，奋斗就会变成壮举，生命就会创造奇迹。——罗伯·舒乐
            </span>
          </v-card-text>
        </v-card>

        <v-flex class="d-flex align-center justify-center flex-row mt-4">
          <span class="material-icons">card_giftcard</span>
          <span class="font-weight-medium px-2" style="font-size: 26px">我的文章</span>
        </v-flex>
        <v-flex>
        <v-card class="mx-12" elevation="0">
          <v-row class="mx-12">
            <v-col v-for="item in articleList" :key="item.id" cols="4" sm="4">
              <v-hover v-slot:default="{ hover }">
                <v-card class="ma-4"  :elevation="hover?10:2">
                  <v-img :src="item.headImage" height="194">
                    <v-card-title style="position: absolute;bottom: 0px;color: white">{{item.title}}</v-card-title>

                  </v-img>
                  <v-flex class="mx-2" style="color: #909399;max-height: 100px">
                    {{item.content}}...
                  </v-flex>

                  <v-card-actions>
                    <el-link class="px-2" style="color: #909399"><i class="el-icon-time el-icon--left">
                      {{item.updateTime}}</i></el-link>
                    <el-link class="px-2" style="color: #909399"><i class="el-icon-view el-icon--left"> 阅读({{item.watchCount}})</i>
                    </el-link>

                    <v-btn text color="blue-grey" class="mx-2 white--text">
                      <v-icon left dark>mdi-memory</v-icon>{{item.categoryName}}
                    </v-btn>

                    <v-btn text color="deep-purple accent-4" class="ml-auto" @click="readArticle(item.id)">
                      阅读
                    </v-btn>
                  </v-card-actions>
                  <v-divider></v-divider>
                  <v-card-actions>
                    <v-chip-group column>
                      <v-chip color="primary" v-for="label in item.labels" :key="label.id">
                        {{ label.name }}
                      </v-chip>
                    </v-chip-group>
                  </v-card-actions>
                </v-card>
              </v-hover>

            </v-col>
          </v-row>
        </v-card>
        </v-flex>
        <div class="text-center" v-if="pageCount > 0">
          <v-pagination v-model="pageNum" :length="pageCount" :total-visible="7"></v-pagination>
        </div>

      </v-flex>
    </v-sheet>
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
                banners: [
                    {
                        src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
                    },
                    {
                        src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
                    },
                    {
                        src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
                    },
                    {
                        src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
                    },
                ],
                pageNum: 1,
                pageCount: 0,
                itemsPerPage: 10,
            }
        },
        watch: {
            pageNum(val) {
                this.pageNum = val;
                this.getArticleList();
            },
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
                    let resp = await this.$http.get("/front/article?pageSize=6&pageNum=" + this.pageNum);
                    console.log("文章列表", resp.data.data);
                    this.articleList = resp.data.data;
                    this.pageCount = resp.data.totalPage;
                    localStorage.setItem("article",JSON.stringify(resp.data))
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
