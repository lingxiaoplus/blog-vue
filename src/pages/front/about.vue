<template>
  <v-app  id="inspire">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <v-sheet>
      <v-flex class="d-flex flex-column align-center justify-center">
        <v-avatar size="160">
          <img src="../../assets/dog.gif">
        </v-avatar>
        <p class="font-weight-medium" style="font-size: 26px">凌霄</p>
        <p class="font-weight-medium" style="font-size: 14px">java开发工程师</p>
        <p class="font-weight-medium" style="font-size: 12px">习惯沉默而不停止思考，无力表达却不曾失去态度</p>

        <v-flex class="d-flex align-center justify-center flex-row mt-4">
          <span class="material-icons">card_giftcard</span>
          <span class="font-weight-medium px-2" style="font-size: 26px">我的项目</span>
        </v-flex>
        <v-row no-gutters>
          <v-col v-for="project in projectList" :key="project.id" cols="12" sm="4">
            <v-flex class="d-flex flex-column align-center justify-center pa-6 ma-4">
              <v-avatar size="160">
                <img
                  :src="project.icon"
                />
              </v-avatar>
              <p class="font-weight-medium" style="font-size: 14px">{{project.name}}</p>
              <p class="font-weight-medium" style="font-size: 14px">{{project.desc}}</p>
            </v-flex>
          </v-col>
        </v-row>


        <v-flex class="d-flex align-center justify-center flex-row mt-4">
          <span class="material-icons">build</span>
          <span class="font-weight-medium px-2" style="font-size: 26px">我的技能</span>
        </v-flex>

        <v-row no-gutters>
          <v-col v-for="technology in technologyList" :key="technology.id" cols="12" sm="6">
            <v-flex class="d-flex flex-column align-center justify-center pa-6 ma-4" style="min-width: 400px">
              <v-progress-linear height="25" v-model="technology.value">
                <strong>{{technology.name}}:{{ Math.ceil(technology.value) }}%</strong>
              </v-progress-linear>
            </v-flex>
          </v-col>
        </v-row>

        <v-card-text>
          <markdown :mdValuesP="content" :fullPageStatusP="false" :editStatusP="false"
                    :previewStatusP="true"
                    :navStatusP="false" :icoStatusP="false">
          </markdown>
        </v-card-text>
      </v-flex>
    </v-sheet>


  </v-app>

</template>

<script>
    import markdown from '../../components/markdown';
    export default {
        name: "about",
        data() {
            return{
                bgGifUrl: require("../../assets/dog.gif"),
                projectList:[
                    {
                        id: 1,
                        icon: '../../assets/logo.png',
                        name: '个人博客系统',
                        desc: '一个采用 Material Design 和响应式设计的 Hexo 博客主题。',
                    },
                    {
                        id: 2,
                        icon: '../../assets/logo.png',
                        name: 'BiliBili',
                        desc: '仿照B站设计的系统。',
                    },
                    {
                        id: 3,
                        icon: '../../assets/logo.png',
                        name: '个人博客系统',
                        desc: '一个采用 Material Design 和响应式设计的 Hexo 博客主题。',
                    }
                ],
                technologyList:[
                    {
                        id: 1,
                        name:'java',
                        value:33.1
                    },
                    {
                        id: 2,
                        name:'javascript',
                        value:13.1
                    },
                    {
                        id: 3,
                        name:'android',
                        value:91.1
                    }
                ],
                content: "#### 简介\n" +
                    "\n" +
                    "Hello，我是凌霄。这是我的照片：\n" +
                    "![本人吴彦祖](http://omsaa4hdo.bkt.clouddn.com/wyz.jpeg)\n" +
                    "\n" +
                    "可以靠颜值吃饭的我，偏偏要靠才华。\n" +
                    "\n" +
                    "#### 谈谈人生\n" +
                    "\n" +
                    "爱梦想，爱生活。平时喜欢发发呆，胡思乱想。爱音乐，目前自学吉他，希望能学会。爱宠物，老家有一只狗。想养只猫，不过现在单身，合租，养活自己都是问题。总结：我是一只有趣的程序猿。\n" +
                    "\n" +
                    "这是我的个人博客，用来记录一些平时遇到的琐碎问题和一些笔记，不期待有多大的流量。如果刚好你能从我的博客找到解决问题的方法，那么我很高兴能帮到你。\n" +
                    "\n" +
                    "#### 个人链接\n" +
                    "\n" +
                    "[Github](https://github.com/lingxiaopua)\n" +
                    "\n" +
                    "[掘金](https://juejin.im/user/5a3097fbf265da430c11ccd8)\n" +
                    "\n" +
                    "[微博](https://weibo.com/p/1005053866839538/home?from=page_100505&mod=TAB&is_all=1#place)\n" +
                    "\n" +
                    "邮箱：lingxiaopua@gmail.com\n"
            }
        },
        components: {
            markdown, // 声明mardown组件
        },
    }
</script>

<style scoped>

</style>
