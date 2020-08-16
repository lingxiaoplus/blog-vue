<template>
    <div>
      <!--<v-flex>
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
      </v-flex>-->


      <v-timeline :dense="$vuetify.breakpoint.smAndDown" v-for="(item,index) in lines" :key="item.id">
        <v-timeline-item :color="colorList[index]"  fill-dot :left="index%2!==0" :right="index%2===0" :small="index%2===0">
          <template v-slot:opposite>
            <p :style="[{'color': colorList[index]}]">{{item.createTime}}</p>
          </template>
          <v-card>
            <v-card-title :class="colorList[index]" class="purple lighten-2">
              <!--<v-icon dark size="42" class="mr-4">mdi-magnify</v-icon>-->
              <h2 class="display-1 white--text font-weight-light">{{item.title}}</h2>
            </v-card-title>
            <v-container>
              <v-row>
                <v-col cols="12">
                  {{item.content}}...
                </v-col>
              </v-row>
            </v-container>
            <v-card-actions>
              <v-chip class="ma-2" :color="colorList[index]" label text-color="white">
                <v-icon left>mdi-label</v-icon>
                {{item.categoryName}}
              </v-chip>
            </v-card-actions>
          </v-card>
        </v-timeline-item>



      </v-timeline>

    </div>
</template>

<script>
    export default {
        name: "timeline",
        data() {
            return {
                lines:[],
                colorList:['primary','secondary','green','red','orange','indigo',
                    'blue','cyan','teal','lime','yellow','purple','light-blue'
                    ,'secondary','green','cyan','teal','lime',',blue','cyan','teal','lime','yellow','purple'
                ],
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
