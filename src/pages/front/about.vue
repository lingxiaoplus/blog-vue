<template>
  <v-app  id="inspire">
    <v-card class="overflow-hidden" tile>
      <v-app-bar
        extension-height="100"
        color="primary"
        src="http://www.lingxiaomz.top/wp-content/themes/mdx/img/dpic.jpg"
        dark shrink-on-scroll
        extended fade-img-on-scroll scroll-target="#scrolling-techniques-2"
      >
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-toolbar-title>关于</v-toolbar-title>
        <v-spacer/>

        <v-btn icon @click="showSearch = !showSearch">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-app-bar>

      <v-card-text>
        <markdown :mdValuesP="content" :fullPageStatusP="false" :editStatusP="false"
                  :previewStatusP="true"
                  :navStatusP="false" :icoStatusP="false">
        </markdown>
      </v-card-text>

    </v-card>


  </v-app>

</template>

<script>
    import markdown from '../../components/markdown';
    export default {
        name: "about",
        data() {
            return{
                content: "### hello"
            }
        }
    }
</script>

<style scoped>

</style>
