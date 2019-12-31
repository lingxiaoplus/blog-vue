<template>
  <v-app id="inspire">
    <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet">
    <v-card class="overflow-hidden" tile>
      <v-toolbar color="primary" dark flat src="https://picsum.photos/1920/1080?random" shrink-on-scroll >
        <template v-slot:img="{ props }">
          <v-img v-bind="props" gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"></v-img>
        </template>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-toolbar-title>凌霄的博客</v-toolbar-title>
        <v-spacer />
        <template v-slot:extension>
          <v-tabs v-model="currentItem" background-color="transparent" slider-color="white">
            <v-tab v-for="item in items" :key="item.name" :href="'#tab-' + item.name" class="mx-8">
              {{ item.name }}
            </v-tab>
          </v-tabs>
        </template>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-toolbar>
    </v-card>
    <v-sheet
          id="scrolling-techniques-2"
          class="overflow-y-auto"
          min-height="600"
        >
          <v-container style="height: 100%;">
            <v-tabs-items v-model="currentItem">
              <v-tab-item v-for="item in items" :key="item.name" :value="'tab-' + item.name">
                <v-container>
                  <!--文章内容-->
                  <v-layout row wrap >
                    <v-col  cols="3" v-for="item in articleList" :key="item.id">
                      <v-card elevation="12" >
                          <v-img
                            :src="item.headImage"
                            height="194"
                          >
                            <v-card-title style="position: absolute;bottom: 0px;color: white">{{item.title}}</v-card-title>
                          </v-img>


                        <v-card-actions class="d-flex ">
                          <el-link class="pa-2" style="color: #909399"><i class="el-icon-time el-icon--left"> {{item.updateTime}}</i> </el-link>
                          <el-link class="pa-2" style="color: #909399"><i class="el-icon-view el-icon--left"> 阅读(0)</i> </el-link>
                          <v-btn
                            text
                            color="deep-purple accent-4"
                            class="ml-auto"
                          >
                            阅读
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-col>
                  </v-layout>

                </v-container>
              </v-tab-item>
            </v-tabs-items>
            <v-layout class="pa-md-4" min-heigth="400px">
              <v-fab-transition>
                <v-btn key="keyboard_arrow_up" color="green" absolute fab large dark bottom right
                >
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
        items: [
          '首页', '科技', '发明', '研究',
        ],
          articleList: [],
      }
    },
      watch:{
          currentItem(oldVal, newVal){

          }
      },
    methods:{
      async getCategory(){
          try {
              let resp = await this.$http.get("/front/category");
              console.log("结果",resp.data.data);
              this.items = resp.data.data;
              this.items.splice(0,0,{
                  id: -1,
                  name: '首页'
              })
          }catch (e) {
              debugger;
              console.log("异常",e);
          }finally {

          }
      },
      async getArticleList(){
          try {
              let resp = await this.$http.get("/front/article");
              console.log("文章列表",resp.data.data);
              this.articleList = resp.data.data;
          }catch (e) {
              debugger;
              console.log("异常",e);
          }finally {

          }
      }
    },
      created() {
        this.getCategory();
        this.getArticleList();
      }
  }
</script>

<style>
</style>
