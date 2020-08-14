<template>
  <div class="ma-4">
    <v-card background-color="transparent" tile elevation="0" min-width="200px" class="d-flex pa-4" style="align-items: center; justify-content: center">
      <v-card-actions>
        <v-flex class="d-flex align-center justify-center flex-row mt-4">
          <!--<span class="material-icons">link_variant</span>-->
          <p class="font-weight-medium" style="font-size: 26px">友情链接</p>
        </v-flex>
      </v-card-actions>
    </v-card>

    <v-row no-gutters>
      <v-col v-for="item in items" :key="item.title" cols="12" sm="3">
        <v-card class="ma-2"  elevation="3">
          <v-flex class="d-flex grow flex-row">
            <v-sheet elevation="10" class="d-flex align-center justify-center" shaped style="margin-top: -20px;margin-left: 20px;">
              <v-avatar size="60">
                <img src="https://cdn.vuetifyjs.com/images/lists/1.jpg">
              </v-avatar>
            </v-sheet>
            <v-flex class="flex-column ma-2">
              <div>{{item.name}}</div>
              <div>{{item.description}}</div>
            </v-flex>

          </v-flex>

          <v-card-actions>
            <!--<el-link :href="item.link" type="primary">{{item.name}}</el-link>-->
            <v-btn color="primary" text>传送门</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-card tile elevation="0">
      <v-card-title>交换要求</v-card-title>
      <v-card-text>
        交换前请先行加上本博链接。仅交换内页，首页仅根据个人喜好添加。
        认真做站（即建站超过 1 年），更新频率至少 1 月 1 次，百度收录需要大于 500，原则上仅接受生活、技术类博客
      </v-card-text>
      <v-card-text>友链无法访问会即时删除，不会额外通知。</v-card-text>
    </v-card>

  </div>
</template>

<script>
    export default {
        name: "friendLink",
        data() {
            return {
                items: [
                    {
                        link: "",
                        name: 'Jason Oner',
                        description: 'https://cdn.vuetifyjs.com/images/lists/1.jpg'
                    },
                    {
                        link: "",
                        name: 'Jason Oner',
                        description: 'https://cdn.vuetifyjs.com/images/lists/1.jpg'
                    },
                    {
                        link: "",
                        name: 'Jason Oner',
                        description: 'https://cdn.vuetifyjs.com/images/lists/1.jpg'
                    },
                    {
                        link: "",
                        name: 'Jason Oner',
                        description: 'https://cdn.vuetifyjs.com/images/lists/1.jpg'
                    }
                ],
            }
        },
        methods:{
            async getLinks(){
                try {
                    let resp = await this.$http.get("/front/link");
                    this.items = resp.data.data;
                } catch (e) {
                    console.log("异常",e);
                }
            }
        },
        created() {
            this.getLinks();
        }
    }
</script>

<style scoped>

</style>
