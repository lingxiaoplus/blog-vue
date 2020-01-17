<template>
  <v-container>
    <v-row>
      <v-col clos="2" >
        <v-card elevation="6" max-width="600">
          <v-img src="https://source.unsplash.com/random/600x400" height="194" class="header">
            <v-list-item align="center">
              <v-list-item-content>
                <v-avatar size="60">
                  <img :src="user_info.headPortrait?user_info.headPortrait:'https://cdn.vuetifyjs.com/images/john.jpg'" alt="John">
                </v-avatar>
                <v-list-item-title class="headline white--text">{{user_info.nickname}}</v-list-item-title>
                <v-list-item-subtitle class="white--text">习惯沉默而不停止思考，无力表达却不曾失去态度</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-img>
          <v-card-text>
            蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED
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
            <v-btn text color="primary">
              更新个人信息
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="7" >
        <v-card elevation="6" max-width="800">
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

    </v-row>
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
  .header{
    justify-content: center;
    align-items: center;
  }
</style>
