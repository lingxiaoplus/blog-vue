<template>
  <v-app id="inspire">
    <v-container style="position:relative;z-index: 999;" fluid fill-height>
      <!--<v-snackbar v-model="snackbar" :color="snackbarColor" :timeout="1500" :top="true">
        {{ snackbarText }}
        <v-btn dark text @click="snackbar = false">确认</v-btn>
      </v-snackbar>-->
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-form ref="form"
                  v-model="valid"
                  lazy-validation>
          <v-card tile elevation="4">
            <v-toolbar elevation="2">
              <v-toolbar-title>注册一个账号</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>

            <v-col cols="12" align="center">

              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <v-avatar size="46" v-if="imageUrl">
                  <img :src="imageUrl" alt="John">
                </v-avatar>
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </v-col>

            <v-card-text>

                <v-row>
                  <v-col cols="6">
                    <v-text-field prepend-inner-icon="mdi-account-arrow-right-outline" v-model="username"
                                  label="请填写用户名" type="text"/>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field prepend-inner-icon="mdi-account-search-outline" v-model="nickname"
                                  label="请填写昵称" type="text"/>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="6">
                    <v-text-field prepend-inner-icon="mdi-lock-outline" v-model="password"
                                  label="请填写密码" type="password"/>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field prepend-inner-icon="mdi-repeat-once " v-model="repeatPassword"
                                  label="请重复填写密码" type="password"/>
                  </v-col>
                </v-row>
                <v-row align="center">
                  <v-col cols="8">
                    <v-text-field prepend-inner-icon="mdi-email-check-outline" v-model="email"
                                  label="请填写邮箱" type="text" :rules="emailRules">
                      <template v-slot:append>
                        <v-btn text @click="sendCode">发送验证码</v-btn>
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col cols="4">
                    <v-text-field v-model="repeatPassword"
                                  label="请填写验证码" type="text"/>
                  </v-col>
                </v-row>



            </v-card-text>
            <v-card-actions>
              <v-col cols="12" class="px-4">
                <v-btn width="100%" tile color="primary" @click="doRegister">注册</v-btn>
              </v-col>
            </v-card-actions>
            <v-card-actions>
              <v-col cols="12" align="center">
                已经有账号了?  <el-link type="primary" @click="doLogin">登录</el-link>
              </v-col>
            </v-card-actions>
          </v-card>
          </v-form>
        </v-flex>
      </v-layout>


    </v-container>
    <div style="position:absolute;width: 100%">
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
    </div>

  </v-app>
</template>

<script>
    export default {
        name: "register",
        data(){
            return{
                username: '',
                password: '',
                repeatPassword: '',
                nickname: '',
                imageUrl: '',
                email: '',
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                ],
                valid: true,

            }
        },
        methods:{
            doRegister(){
                if (this.$refs.form.validate()) {
                    this.$message.success("验证通过")
                }else {
                    this.$message.error("请完善用户信息")
                }
            },
            doLogin(){
                this.$router.push("/user/login");
            },
            handleAvatarSuccess(){

            },
            beforeAvatarUpload(){

            },
            async sendCode(){
                try {
                    let resp = await this.$http.post(`/user/email/${this.email}`);
                }catch (e) {
                    console.log("发送邮件验证码失败",e);
                    this.$message.error("发送邮件验证码失败")
                }
            }
        },
    }
</script>

<style scoped>
  .avatar-uploader  {
    border: 1px dashed #d9d9d9;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 120px;
    height: 120px;
  }
  .avatar-uploader {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
