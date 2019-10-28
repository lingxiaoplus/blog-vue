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
              <v-list-item-title style="margin-left: 20px;">admin</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      <v-divider/>

			<v-list dense >
        <v-list-group v-for="item in items" :key="item.title" no-action >
           <!--一级菜单 -->
          <v-list-item slot="activator">
          	<v-list-item-action>
          		<v-icon>mdi-{{item.action}}</v-icon>
          	</v-list-item-action>
          	<v-list-item-content>
          		<v-list-item-title>{{item.title}}</v-list-item-title>
          	</v-list-item-content>
          </v-list-item>
          <!-- 二级菜单 -->
          <v-list-item v-for="subItem in item.items" :key="subItem.title" :to="item.path + subItem.path">
            <v-list-item-content>
              <v-list-item-title>{{ subItem.title }}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-icon>{{ subItem.action }}</v-icon>
            </v-list-item-action>
          </v-list-item>

        </v-list-group>

			</v-list>
		</v-navigation-drawer>

		<v-app-bar app color="indigo" dark>
			<v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
			<v-toolbar-title>后台管理系统</v-toolbar-title>
      <v-spacer/>

      <!-- 调色板 -->
      <v-btn icon color="cyan">
        <v-icon>mdi-voicemail</v-icon>
      </v-btn>


      <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn icon color="cyan" dark v-on="on">
              <v-icon>mdi-send</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in items"
              :key="index"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
      </v-menu>

		</v-app-bar>

		<v-content>
			<v-container class="fill-height" fluid>
				<v-row align="center" justify="center">
					<v-col class="text-center">
						<v-tooltip left>
							<template v-slot:activator="{ on }">
								<v-btn :href="source" icon large target="_blank" v-on="on">
									<v-icon large>mdi-code-tags</v-icon>
								</v-btn>
							</template>
							<span>Source</span>
						</v-tooltip>

						<v-tooltip right>
							<template v-slot:activator="{ on }">
								<v-btn icon large href="https://codepen.io/johnjleider/pen/zgxeLQ" target="_blank" v-on="on">
									<v-icon large>mdi-codepen</v-icon>
								</v-btn>
							</template>
							<span>Codepen</span>
						</v-tooltip>
					</v-col>
				</v-row>
			</v-container>
		</v-content>
		<v-footer color="indigo" app>
			<span class="white--text">&copy; 2019</span>
		</v-footer>
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
	    }),
      computed:{
        items(){
          return menus;
        }
      }
	  }
</script>

<style>
</style>
