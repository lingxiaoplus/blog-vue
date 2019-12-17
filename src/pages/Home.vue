<template>
	<v-app id="inspire">
		<link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet">
		<v-navigation-drawer v-model="drawer" app>
        <v-list dense>
          <v-list-item avatar>
            <v-avatar size="40">
              <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
            </v-avatar>
            <v-list-item-content>
              <v-list-item-title style="margin-left: 20px;">{{user_name}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      <v-divider/>

			<v-list dense >
        <v-list-group v-for="item in items" :key="item.title" no-action :prepend-icon="'mdi-'+item.action">
           <!--一级菜单 -->
          <template slot="activator">
          	<!-- <v-list-item-action>
          		<v-icon >mdi-{{item.action}}</v-icon>
          	</v-list-item-action> -->
          	<v-list-item-content>
          		<v-list-item-title>{{item.title}}</v-list-item-title>
          	</v-list-item-content>
          </template>
          <!-- 二级菜单 -->
          <v-list-item v-for="subItem in item.items" :key="subItem.title" :to="item.path + subItem.path" @click="onPathChanged(item,subItem)">
            <v-list-item-content>
              <v-list-item-title>{{ subItem.title }}</v-list-item-title>
            </v-list-item-content>
            <!-- <v-list-item-action>
              <v-icon>mdi-{{subItem.action}}</v-icon>
            </v-list-item-action> -->
          </v-list-item>
        </v-list-group>

			</v-list>
		</v-navigation-drawer>

		<v-app-bar app color="primary" dark >
      <!-- loading条 -->
      <v-progress-linear @setLoading="setLoadingState" :active="loading" :indeterminate="loading" absolute bottom background-color="white" color="error">
      </v-progress-linear>
			<v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
			<v-toolbar-title>后台管理系统</v-toolbar-title>
      <v-spacer/>


      <!-- 换肤 -->
      <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <!-- <v-btn icon dark v-on="on">
              <v-icon>mdi-send</v-icon>
            </v-btn> -->
            <!-- 调色板 -->
            <v-btn icon dark  v-on="on">
              <v-icon>mdi-weather-fog </v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in themes"
              :key="index"
              @click="themeChanged(item)"
            >
              <v-list-item-action>
                <v-avatar :color="item.color" size="32">
                      <span class="white--text headline"></span>
                </v-avatar>
              </v-list-item-action>
              <v-list-item-title>{{ item.name }}</v-list-item-title>
              <v-checkbox v-model="item.checked" :color="item.color"></v-checkbox>
            </v-list-item>

          </v-list>
      </v-menu>

		</v-app-bar>

    <v-content>
      <!-- 面包屑 -->
      <v-breadcrumbs :items="menuMap">
        <template v-slot:divider>
          <v-icon>mdi-chevron-right</v-icon>
        </template>
      </v-breadcrumbs>
      <!-- 界面内容显示区域 -->
      <div>
        <transition name="fade-enter-active">
          <router-view/>
        </transition>
      </div>
    </v-content>
		<!-- <v-footer color="primary" app>
			<span class="white--text">&copy; 2019</span>
		</v-footer> -->
	</v-app>
</template>

<script>
  import menus from '../menu.js';
	export default {
	    props: {
	      source: String,

	    },
	    data: () => ({
	      drawer: null,
        menuMap:[
          {
            text: 'Link1',
            disabled: false,
            href: 'breadcrumbs_link_1',
          },

        ],
        user_name: 'admin',
        loading: false,
	    }),
      computed:{
        items(){
          return menus.drawers;
        },
        themes(){
          return menus.themes;
        },
        /* item1(){
          const arr = this.$route.path.split("/");
          return this.menuMap[arr[1]].name;
        },
        item2(){
          const arr = this.$route.path.split("/");
          return this.menuMap[arr[1]][arr[2]];
        } */
      },
      methods: {
        themeChanged(item) {
          // Light theme
          /* if(item.dark){
            this.$vuetify.theme.themes.dark.primary = item.color
          }else{
            this.$vuetify.theme.themes.light.primary = item.color
          } */
          item.checked = true;
          this.$vuetify.theme.themes.light.primary = item.color
        },
        onPathChanged(item,subItem){
          var map = [];
          map.push({
            text: item.title,
            disabled: false,
            href: item.path,
          });
          map.push({
            text: subItem.title,
            disabled: true,
            href: subItem.path,
          });
          this.menuMap = map;
          console.log("menuMap: ",this.menuMap);
        },
          async getMenuData(){
            let resp = await this.$http.get("/menu");
            console.log("菜单",resp.data.data);
          },
          setLoadingState(loading){
            console.log("设置状态>>>>>>>>>",loading);
          }
      },

      created() {
        console.log(">>>>>>>>>>>>",this.menuMap)
        let menu = menus.drawers[0];
        this.menuMap[0] = {
          text: menu.title,
          disabled: false,
          href: menu.path,
        };
        this.menuMap[1] = {
          text: menu.items[0].title,
          disabled: false,
          href: menu.items[0].path,
        };
        this.$http.get("/user/verify")
        .then(res=>{
          console.log("登录有效",res.data);
          this.user_name = res.data.data.nickname;
        }).catch(e=>{
          console.log("登录失败",e);
          this.$router.push("/user/login");
        })
          this.getMenuData();
          //this.loading = this.$store.getters.getLoadingState;
          //console.log("获取到状态>>>>>>>>> ",this.$store.getters.getLoadingState)
        /* menus.drawers.forEach(m => {
          const p1 = m.path.slice(1);
          this.menuMap[p1] = {name:m.title};
          m.items.forEach(i => {
            this.menuMap[p1][i.path.slice(1)] = i.title;
          })
        }) */
      }
	  }
</script>

<style>
  .fade-enter {
    opacity:0;
  }
  .fade-leave{
    opacity:1;
  }
  .fade-enter-active{
    transition:opacity .5s;
  }
  .fade-leave-active{
    opacity:0;
    transition:opacity .5s;
  }
</style>
