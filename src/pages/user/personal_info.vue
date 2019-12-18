<template>
  <v-container>
    <v-layout row>
      <v-col clos="2">
        <v-card elevation="12" >
          <v-img src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg" height="194">
            <v-list-item>
              <v-list-item-content>
                <v-avatar size="60">
                  <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
                </v-avatar>
                <v-list-item-title class="headline">{{user_info.username}}</v-list-item-title>
                <v-list-item-subtitle>by Kurt Wagner</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-img>
          <v-card-text>
            蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED
          </v-card-text>

          <v-card-text>
            浙江省杭州市
          </v-card-text>
          <v-card-text>
            昵称：{{user_info.nickname}}
          </v-card-text>
          <v-card-text>
            电话：{{user_info.phoneNumber}}
          </v-card-text>
          <v-card-text>
            邮箱：{{user_info.email}}
          </v-card-text>
          <v-card-actions>
            <v-btn text color="deep-purple accent-4">
              更新个人信息
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="8" >
        <v-card elevation="12" >
          <v-tabs v-model="tablemodel">
            <v-tab v-for="item in tables" :key="item.name">
              {{ item.name }}
            </v-tab>

            <v-tabs-items v-model="tablemodel">
              <v-tab-item v-for="item in tables" :key="item.name">
                <v-list two-line subheader>
                  <v-subheader>General</v-subheader>

                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>Profile photo</v-list-item-title>
                      <v-list-item-subtitle>Change your Google+ profile photo</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>Show your status</v-list-item-title>
                      <v-list-item-subtitle>Your status is visible to everyone</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>Show your status</v-list-item-title>
                      <v-list-item-subtitle>Your status is visible to everyone</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>Show your status</v-list-item-title>
                      <v-list-item-subtitle>Your status is visible to everyone</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>Show your status</v-list-item-title>
                      <v-list-item-subtitle>Your status is visible to everyone</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-tab-item>
            </v-tabs-items>
          </v-tabs>
        </v-card>
      </v-col>

    </v-layout>
  </v-container>

</template>

<script>
  export default {
    data() {
      return {
        tablemodel: 0,
        tables: [{
          name: '文章'
        }, {
          name: '应用'
        }, {
          name: '项目'
        }],
        userInfo: '',
      }
    },
    methods: {

    },
    created() {

      let user_info = JSON.parse(localStorage.getItem("user_info"));

      console.log("用户信息",user_info);
      this.user_info = user_info;
    }
  }
</script>

<style>
</style>
