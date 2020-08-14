<template>
    <div>
      <v-flex>
        <v-card v-for="item in lines" :key="item.id">
          <vue-timeline-update
            :date="new Date(item.createTime)"
            :title="item.title"
            :description="item.content+ '...'"
            :thumbnail="item.headImage"
            :category="item.categoryName"
            icon="vue"
            color="blue"
          />
        </v-card>
      </v-flex>

    </div>
</template>

<script>
    export default {
        name: "timeline",
        data() {
            return {
                lines:[],
            }
        },
        props:{

        },
        methods:{

        },
        mounted() {
            let json = localStorage.getItem("article")
            if(json){
                let articles = JSON.parse(json)
                console.log(articles)
                this.lines = articles.data;
            }
        }
    }
</script>

<style scoped>
  .gb-vue-timeline-update__thumbnail{
    max-width: 400px;
  }
</style>
