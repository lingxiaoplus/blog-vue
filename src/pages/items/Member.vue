<template>
  <v-container fluid>

    <v-data-iterator :items="items" :items-per-page.sync="itemsPerPage" :footer-props="{ itemsPerPageOptions }">
      <template v-slot:default="props">
        <v-row>
          <v-col v-for="item in props.items" :key="item.id" cols="12" sm="6" md="4" lg="3">
            <v-card>
              <v-card-actions>
                <v-row>
                  <v-col cols="6" sm="4" md="4">
                    <v-avatar style="margin-left: 10px;">
                      <img :src="item.headPortrait" alt="John">
                    </v-avatar>
                  </v-col>
                  <v-row cols="6" sm="4" md="8">
                    <v-card-title>
                      <h5>{{ item.name }}</h5>
                    </v-card-title>
                  </v-row>
                </v-row>
              </v-card-actions>

              <v-divider></v-divider>
              <v-list dense>
                <v-list-item>
                  <v-list-item-content>昵称:</v-list-item-content>
                  <v-list-item-content class="align-end">{{ item.nickname }}</v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>电话:</v-list-item-content>
                  <v-list-item-content class="align-end">{{ item.phoneNum }}</v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>邮箱:</v-list-item-content>
                  <v-list-item-content class="align-end">{{ item.email }}</v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>

    <!-- 添加人员 -->
    <v-dialog v-model="openAddDialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" @click="addMember"  absolute dark fab bottom right color="primary" style="bottom: 20px;">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">添加人员</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field label="用户名" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field label="昵称" hint="这是一个昵称"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="电话号码" hint="请输入11位手机号码" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Email" type="email" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="密码" type="password" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-avatar color="primary">
                  <v-icon dark>mdi-plus</v-icon>
                </v-avatar>
              </v-col>
            </v-row>
          </v-container>
          <small>这个世界太奇妙</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="openAddDialog = false">关闭</v-btn>
          <v-btn color="blue darken-1" text @click="openAddDialog = false">保存</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script>
  export default {
    data: () => ({
      itemsPerPageOptions: [4, 8, 12],
      itemsPerPage: 4,
      items: [],
      member: {
        email: "zs@163.com",
        headPortrait: "https://cdn.vuetifyjs.com/images/john.jpg",
        id: "E61D65F673D54F68B0861025C69773DB",
        name: "张三",
        phoneNum: "18888888888"
      },
      loading: false,
      openAddDialog: false,
    }),
    methods: {
      async getMembers() {
        this.loading = true;
        try {
          let response = await this.$http.get("/member/all", {
            pageNum: 1,
            pageSize: 5
          });
          console.log("获取人员列表", response.data);
          this.items = response.data.data;
        } catch (e) {
          console.log("获取人员列表失败", e);
        } finally {
          //this.loading = false;
        }
      },
      async addMember() {
        this.loading = true;
        try {
          let response = await this.$http.post("member", this.member);
          console.log("添加人员", response.data);
        } catch (e) {
          console.log("添加人员失败", e);
        } finally {
          this.loading = false;
        }
      },
    },
    created() {
      this.getMembers();
    }
  }
</script>

<style>
</style>
