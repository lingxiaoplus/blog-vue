<template>
  <v-container>
    <v-row>
      <v-col clos="2">
        <v-card tile elevation="6" max-width="600">
          <v-img src="https://source.unsplash.com/random/600x400" height="194" class="header">
            <v-list-item align="center">
              <v-list-item-content>
                <v-avatar size="60">
                  <img :src="user_info.headPortrait?user_info.headPortrait:'https://cdn.vuetifyjs.com/images/john.jpg'"
                       alt="John">
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
            <v-dialog v-model="updateInfoDialog" persistent max-width="600px">
              <template v-slot:activator="{ on }">
                <v-btn text color="primary" dark v-on="on">更新个人信息</v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">更新个人信息</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="昵称" required></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field label="Legal middle name" hint="example of helper text only on focus"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Legal last name*"
                          hint="example of persistent helper text"
                          persistent-hint
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field label="邮箱" required></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field label="密码" type="password" required></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-select
                          :items="['0-17', '18-29', '30-54', '54+']"
                          label="Age*"
                          required
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-autocomplete
                          :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                          label="Interests"
                          multiple
                        ></v-autocomplete>
                      </v-col>
                    </v-row>
                  </v-container>
                  <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="updateInfoDialog = false">取消</v-btn>
                  <v-btn color="blue darken-1" text @click="updateInfoDialog = false">确认</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-card-actions>
        </v-card>




      </v-col>
      <v-col cols="7">
        <v-card tile elevation="6" max-width="800">
          <v-tabs v-model="tablemodel">
            <v-tab v-for="item in tables" :key="item.name">
              {{ item.name }}
            </v-tab>

            <v-tabs-items v-model="tablemodel">
              <v-tab-item>
                <v-flex class="d-flex flex-column mx-6">
                  <v-text-field style="max-width: 260px" label="昵称 (不作为登录使用)"></v-text-field>
                  <v-text-field style="max-width: 260px" label="手机号"></v-text-field>

                  <v-flex class="d-flex flex-row" style="align-items: center">
                    <v-list-item>性别: </v-list-item>
                    <v-radio-group v-model="row" row style="max-width: 260px">
                      <v-radio label="男" value="0" color="primary"></v-radio>
                      <v-radio label="女" value="1" color="primary"></v-radio>
                    </v-radio-group>
                  </v-flex>
                </v-flex>
              </v-tab-item>
              <v-tab-item>
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
              <v-tab-item v-if="false" v-for="item in tables" :key="item.name" >
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
                    name: '用户资料'
                }, {
                    name: '操作日志'
                },],
                userInfo: '',
                updateInfoDialog: false
            }
        },
        methods: {},
        created() {

            let user_info = JSON.parse(localStorage.getItem("user_info"));

            console.log("用户信息", user_info);
            this.user_info = user_info;
        }
    }
</script>

<style>
  .header {
    justify-content: center;
    align-items: center;
  }
</style>
