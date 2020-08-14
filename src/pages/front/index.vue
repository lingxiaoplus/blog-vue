<template>
  <v-app id="inspire">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
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

    <v-app-bar color="primary" dark app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>凌霄的博客</v-toolbar-title>
      <v-spacer/>

      <v-row align="center" style="max-width: 400px" v-if="showSearch">
        <v-text-field :autofocus="showSearch" :append-icon-cb="() => {}" placeholder="搜索文章" single-line color="white"
                      hide-details/>
      </v-row>

      <router-link to="articleList">
        <v-btn
          color="primary" large depressed
          class="white--text"
        >
          <v-icon left dark>mdi-home</v-icon>
          首页
        </v-btn>
      </router-link>
      <router-link to="tags">
        <v-btn
          color="primary" large depressed
          class="white--text"
        >
          <v-icon left dark>mdi-cast</v-icon>
          标签
        </v-btn>
      </router-link>
      <router-link to="category">
        <v-btn
          color="primary" large depressed
          class="white--text"
        >
          <v-icon left dark>mdi-memory</v-icon>
          分类
        </v-btn>
      </router-link>

      <router-link to="timeline">
        <v-btn
          color="primary" large depressed
          class="white--text"
        >
          <v-icon left dark>mdi-folder-open</v-icon>
          归档
        </v-btn>
      </router-link>

      <router-link to="friendLink">
        <v-btn
          color="primary" large depressed
          class="white--text"
        >
          <v-icon left dark>mdi-link-variant</v-icon>
          友链
        </v-btn>
      </router-link>

      <router-link to="about">
        <v-btn
          color="primary" large depressed
          class="white--text"
        >
          <v-icon left dark>mdi-information-variant</v-icon>
          关于
        </v-btn>
      </router-link>

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

    </v-app-bar>

    <v-main app>
      <v-container fluid @click="onOuterClick">
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app dark fixed padless absolute>
      <v-card
        flat
        tile
        class="primary lighten-1 white--text text-center" style="width: 100%;"
      >
        <v-card-text>
          <v-btn
            v-for="icon in icons"
            :key="icon"
            class="mx-4 white--text"
            icon
          >
            <v-icon size="24px">{{ icon }}</v-icon>
          </v-btn>
        </v-card-text>

        <v-card-text class="white--text pt-0">
          站点总字数: 194.7k 字 |  总访问量: 38509 次 |  总访问人数: 7317 人 本站已安全运行 {{runningTime}}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          Copyright © 2018 -  {{ new Date().getFullYear() }} — <strong> lingxiao | Powered by vuetify</strong>
        </v-card-text>
      </v-card>
    </v-footer>

   <!-- <div style="position:absolute;width: 100%">
      <vue-particles  :particleOpacity="0.7"
                      linesColor="#ffffff"
                      shapeType="circle"
                      :particleSize="5"
                      :linesWidth="2"
                      :lineLinked="true"
                      :lineOpacity="0.4"
                      :linesDistance="150"
                      :moveSpeed="3"
                      :hoverEffect="true"
                      hoverMode="grab"
                      :clickEffect="true"
                      clickMode="push"  color="#ef0078" style="z-index:0;" :particlesNumber="100">
      </vue-particles>
    </div>-->
  </v-app>
</template>

<script>
    import colorFul from '@/plugins/click-colorful'
    export default {
        data() {
            return {
                icons: [
                    'mdi-sina-weibo',
                    'mdi-twitter',
                    'mdi-qqchat',
                    'mdi-wechat',
                ],
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
                runningTime: ''
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
            },
            initClickColorful(x,y){
                var params = {
                    colors: ["#EC407A", "#66BB6A", "#FFEE58", "#26C6DA"], // 自定义颜色
                    size: 30, // 小球大小
                    maxCount: 30, // 点击一次出现多少个球
                }
                //params不传，则走默认配置
                var color = new colorBall(params);
                // 绽放一次
                color.fly(x, y)
                // 绽放5次,间隔300ms
                //color.fly(x, y, 2, 200)
            },
            onOuterClick(e){
                console.log(">>>>>>>>>>>>",e);
                this.initClickColorful(e.clientX,e.clientY)
            },
            show_date_time(){
                window.setTimeout(()=>{ this.show_date_time() }, 1000);
                let BirthDay = new Date("08-14-2020 12:12:24");//建站日期
                let today= new Date();
                let timeold = (today.getTime()-BirthDay.getTime());
                let sectimeold=timeold/1000
                let secondsold = Math.floor(sectimeold);
                const msPerDay=24*60*60*1000
                let e_daysold=timeold/msPerDay
                let daysold=Math.floor(e_daysold);
                let e_hrsold=(daysold-e_daysold)*-24;
                let hrsold=Math.floor(e_hrsold);
                let e_minsold=(hrsold-e_hrsold)*-60;
                let minsold=Math.floor((hrsold-e_hrsold)*-60);
                let seconds=Math.floor((minsold-e_minsold)*-60);
                this.runningTime = daysold+"天"+hrsold+"小时"+minsold+"分"+seconds+"秒" ;
          },
        },
        mounted() {
            this.show_date_time();
        }
    }
</script>

<style>
</style>
