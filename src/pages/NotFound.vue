<template>
  <div>
    <v-img src="http://img.lingxiaomz.top/404?imageView2/2/w/1920/h/1080" max-width="100%"  :aspect-ratio="16/9" class="d-flex align-center justify-center">
<!--      <v-btn color="primary" tile small>返回首页</v-btn>-->
    </v-img>

  </div>
</template>
<script>
export default {
    data(){
        return{
            image: require("../assets/404.png")
        }
    }
}
</script>
<style scoped>
    .page-container {
        font-size: 20px;
        text-align: center;
        color: rgb(192, 204, 218);
    }
</style>
