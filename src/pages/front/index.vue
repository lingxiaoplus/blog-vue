<template>
  <v-app id="inspire">
    <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet">
    <v-card class="overflow-hidden" tile>
      <v-toolbar color="primary" dark  src="https://picsum.photos/1920/1080?random" shrink-on-scroll>
        <template v-slot:img="{ props }">
          <v-img v-bind="props" gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"></v-img>
        </template>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-toolbar-title>凌霄的博客</v-toolbar-title>
        <v-spacer/>
        <template v-slot:extension>
          <v-tabs v-model="currentItem" background-color="transparent" slider-color="white">
            <v-tab v-for="item in items" :key="item.name" :href="'#tab-' + item.name" class="mx-8">
              {{ item.name }}
            </v-tab>
          </v-tabs>
        </template>

        <!-- <v-text-field
          flat
          solo-inverted
          hide-details
          prepend-inner-icon="mdi-magnify"
          label="Search"
          class="hidden-sm-and-down"
        /> -->
        <v-row align="center" style="max-width: 400px" v-if="showSearch">
          <v-text-field :autofocus="showSearch" :append-icon-cb="() => {}" placeholder="搜索文章" single-line color="white"
                        hide-details/>
        </v-row>
        <v-btn icon @click="showSearch = !showSearch">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>


        <!-- 换肤 -->
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn icon dark v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in menuList"
              :key="index"
              @click="menuClick(item)"
            >
              <v-list-item-title class="px-4">{{ item.name }}</v-list-item-title>
            </v-list-item>

          </v-list>
        </v-menu>

      </v-toolbar>
    </v-card>
    <v-sheet id="scrolling-techniques-2" class="overflow-y-auto" min-height="600">
      <v-container style="height: 100%;">
        <v-tabs-items v-model="currentItem">
          <v-tab-item v-for="item in items" :key="item.name" :value="'tab-' + item.name">
            <v-container>
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
                        <el-link class="pa-2" style="color: #909399"><i class="el-icon-view el-icon--left"> 阅读(0)</i>
                        </el-link>
                        <v-btn text color="deep-purple accent-4" class="ml-auto" @click="readArticle(item.id)">
                          阅读
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-hover>

                </v-col>
              </v-layout>

            </v-container>
          </v-tab-item>
        </v-tabs-items>
        <v-layout class="pa-md-4" min-heigth="400px">
          <v-fab-transition>
            <v-btn key="keyboard_arrow_up" color="green" absolute fab large dark bottom right>
              <v-icon>mdi-chevron-up</v-icon>
            </v-btn>
          </v-fab-transition>
        </v-layout>

      </v-container>
    </v-sheet>

  </v-app>
</template>

<script>
    export default {
        data() {
            return {
                currentItem: 0,
                items: [],
                articleList: [],
                showSearch: false,
                menuList: [
                    {
                        name: "友情链接",
                        url: "",
                    },
                    {
                        name: "关于",
                        url: "about",
                    }
                    ],
            }
        },
        watch: {
            currentItem(oldVal, newVal) {
                console.log("oldVal:     ", oldVal, "newVal:     ", newVal)
            }
        },
        methods: {
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
                    debugger;
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
            menuClick(item) {
                this.$router.push(item.url);
            },
        },
        created() {
            this.getCategory();
            this.getArticleList();
        }
    }
</script>

<style>
</style>
