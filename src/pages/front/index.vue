<template>
  <v-app id="inspire">
    <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet">

    <v-navigation-drawer v-model="drawer" app temporary>
      <v-row>
        <v-card tile elevation="4">
          <v-img src="https://source.unsplash.com/random/600x400" height="194" class="header">
            <v-list-item align="center">
              <v-list-item-content>
                <v-avatar size="60">
                  <img src="https://cdn.vuetifyjs.com/images/john.jpg"
                       alt="John">
                </v-avatar>
                <v-list-item-title class="headline white--text">haha</v-list-item-title>
                <v-list-item-subtitle class="white--text">习惯沉默而不停止思考，无力表达却不曾失去态度</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-img>

        </v-card>

        <v-col cols="12" >
          <v-list dense>
            <v-list-item v-for="item in drawerList" :key="item.name" no-action :prepend-icon="'mdi-'+item.icon" @click="onDrawerClick(item.path)">
              <v-list-item-icon>
                <v-icon v-text="'mdi-'+item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{item.name}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>


      </v-row>

    </v-navigation-drawer>
    <v-card class="overflow-hidden" tile>

      <v-toolbar color="primary" dark
                 shrink-on-scroll
                 fade-img-on-scroll>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>凌霄的博客</v-toolbar-title>
        <v-spacer/>

        <v-row align="center" style="max-width: 400px" v-if="showSearch">
          <v-text-field :autofocus="showSearch" :append-icon-cb="() => {}" placeholder="搜索文章" single-line color="white"
                        hide-details/>
        </v-row>
        <v-btn icon @click="showSearch = !showSearch">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>


        <v-menu offset-y v-if="false">
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


    <div>
      <router-view />
    </div>

  </v-app>
</template>

<script>
    export default {
        data() {
            return {

                drawerList: [
                    {
                        name: "首页",
                        icon: "home",
                        path: "articleList"
                    },
                    {
                        name: "友情链接",
                        icon: "link-variant",
                        path: "friendLink"
                    },
                    {
                        name: "关于",
                        icon: "information-variant",
                        path: "about"
                    }
                ],

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
                drawer: null,
            }
        },
        watch: {
            currentItem(oldVal, newVal) {
                console.log("oldVal:     ", oldVal, "newVal:     ", newVal)
            }
        },
        methods: {

            menuClick(item) {
                this.$router.push(item.url);
            },
            onDrawerClick(path){
                this.$router.push(path);
            }
        },

    }
</script>

<style>
</style>
