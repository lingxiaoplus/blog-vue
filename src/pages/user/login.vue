<template>
     <v-app id="inspire">
       <!-- <v-app-bar dense app color="primary" light>
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
               <v-toolbar-title>Page title</v-toolbar-title>
               <v-spacer></v-spacer>
               <v-btn icon>
                 <v-icon>mdi-heart</v-icon>
               </v-btn>
               <v-btn icon>
                 <v-icon>mdi-magnify</v-icon>
               </v-btn>
               <v-menu
                 left
                 bottom
               >
                 <template v-slot:activator="{ on }">
                   <v-btn icon v-on="on">
                     <v-icon>mdi-dots-vertical</v-icon>
                   </v-btn>
                 </template>

                 <v-list>
                   <v-list-item
                     v-for="n in 5"
                     :key="n"
                     @click="() => {}"
                   >
                     <v-list-item-title>Option {{ n }}</v-list-item-title>
                   </v-list-item>
                 </v-list>
               </v-menu>
       </v-app-bar> -->
       <v-progress-linear
               :active="loading"
               absolute
               top
               indeterminate
               color="primary"
             ></v-progress-linear>
       <v-content>
         <v-container fluid fill-height>
           <v-snackbar v-model="snackbar" :color="snackbarColor" :timeout="1500" :top="true">
             {{ snackbarText }}
             <v-btn dark text @click="snackbar = false">确认</v-btn>
           </v-snackbar>
           <v-layout align-center justify-center>
             <v-flex xs12 sm8 md4>
               <v-card elevation="6" tile>
                 <v-toolbar dark color="primary" elevation="0" >
                   <v-toolbar-title>个人博客登录</v-toolbar-title>
                   <v-spacer></v-spacer>
                 </v-toolbar>
                 <v-card-text>
                   <v-form>
                     <v-text-field prepend-inner-icon="mdi-account-arrow-right-outline" outlined v-model="username" label="用户名" type="text" />
                     <v-text-field prepend-inner-icon="mdi-lock-outline " outlined v-model="password" label="密码" id="password"
                       :append-icon="e1 ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"  @click:append="() => (e1 = !e1)"
                       :type="e1 ? 'text' : 'password'" hint="至少6位密码"></v-text-field>
                   </v-form>
                 </v-card-text>
                 <v-card-actions>
                   <v-col cols="12" class="px-8">
                     <v-btn width="100%" tile large color="primary" @click="doLogin">登录</v-btn>
                   </v-col>
                 </v-card-actions>

                 <v-card-text>
                   <v-row>
                     <v-col cols="12" align="center">
                       <small>
                         没有账号？注册一个
                       </small>
                     </v-col>
                     <v-col cols="12" align="center">
                       <small @click="doForget">
                         忘记用户名/密码
                       </small>
                     </v-col>
                   </v-row>
                 </v-card-text>
               </v-card>
             </v-flex>
           </v-layout>
         </v-container>
       </v-content>

     </v-app>


</template>

<script>
  import Qs from 'qs'
  export default {
    data: () => ({
      username: "lingxiao",
      password: "123456",
      e1: false,
      snackbar: false,
      snackbarText: '',
      snackbarColor: 'primary',
      loading: false
    }),
    methods: {
      doLogin() {
        if (!this.username || !this.password) {
          this.showSnackBar("用户名或密码不能为空", false);
          return false;
        }
        console.log(this.username + " ... " + this.password);
        this.loading = true;
        this.$http.post("/user/login",Qs.stringify({
          'account': this.username,
          'password': this.password,
            'loginType': 1
        }),{
          /*headers:{
              'Content-Type': 'application/x-www-form-urlencoded'
          }*/
        }).then(res=>{
          console.log("登录成功",res.data);
          this.showSnackBar("登录成功", true);
          this.$router.push("/");
          this.loading = false;
        }).catch(e=>{
          this.showSnackBar("登录失败，请检查用户名密码是否正确", false);
          this.loading = false;
          if(e.response){
            console.log("登录失败，失败详情",e.response.data);
          }
        })

      },
      doForget(){
        this.showSnackBar("开发中", true);
      },
      showSnackBar(text, success) {
        this.snackbar = true;
        this.snackbarText = text;
        this.snackbarColor = success ? "green" : "red";
      },
    }
  };
</script>

<style>
</style>
