<template>
  <div>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <v-card :elevation="0">
      <v-card-actions >
        <v-flex class="d-flex" style="align-items: center; justify-content: center;flex-direction: row">
          <span class="material-icons">loyalty</span>
          <span class="font-weight-medium" style="font-size: 26px">文章标签</span>
        </v-flex>
      </v-card-actions>
      <v-card-text>
        <v-row justify="space-around">
          <v-col cols="12" sm="6" md="4" lg="6">
            <v-sheet elevation="2" class="pa-2">
              <v-chip-group
                column
                active-class="primary--text"
              >
                <v-chip v-for="(tag,index) in tags" :key="tag" dark :color="colorList[index]" label class="ma-2">
                  {{ tag }}
                </v-chip>
              </v-chip-group>
            </v-sheet>
          </v-col>
        </v-row>
      </v-card-text>

    </v-card>


    <v-card class="overflow-hidden" tile :elevation="0">
      <v-card-text>
        <div ref="cloud" style="width: 100%;height:300px"></div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
    var echarts = require('echarts/lib/echarts');
    require('echarts-wordcloud');

    export default {
        name: "tags",
        data() {
            return{
                theme: "macarons",
                tags: [
                    'Work',
                    'Home Improvement',
                    'Vacation',
                    'Food',
                    'Drawers',
                    'Shopping',
                    'Art',
                    'Tech',
                    'java','安卓','技术'
                ],
                colorList:['primary','secondary','green','red','orange','indigo',
                    'blue','cyan','teal','lime','yellow','purple','light-blue'
                    ,'secondary','green','cyan','teal','lime',',blue','cyan','teal','lime','yellow','purple'
                ]
            }
        },
        mounted(){
            this.popcloud()
        },
        methods:{
            popcloud(){
                let option = {
                    title:{
                        text:"词云图",
                        link:'https://github.com/ecomfe/echarts-wordcloud',
                        subtext: 'data-visual.cn',
                        sublink:'http://data-visual.cn',
                    },
                    tooltip: {},
                    series: [{
                        type: 'wordCloud',
                        gridSize: 20,
                        sizeRange: [12, 50],
                        rotationRange: [0, 0],
                        shape: 'circle',
                        textStyle: {
                            normal: {
                                color: function() {
                                    return 'rgb(' + [
                                        Math.round(Math.random() * 160),
                                        Math.round(Math.random() * 160),
                                        Math.round(Math.random() * 160)
                                    ].join(',') + ')';
                                }
                            },
                            emphasis: {
                                shadowBlur: 10,
                                shadowColor: '#333'
                            }
                        },
                        data: [{
                            name: 'java',
                            value: 10000,
                            textStyle: {
                                normal: {
                                    color: 'black'
                                },
                                emphasis: {
                                    color: 'red'
                                }
                            }
                        }, {
                            name: 'Macys',
                            value: 6181
                        }, {
                            name: 'Amy Schumer',
                            value: 4386
                        }, {
                            name: 'Jurassic World',
                            value: 4055
                        }, {
                            name: 'Charter Communications',
                            value: 2467
                        }, {
                            name: 'Chick Fil A',
                            value: 2244
                        }, {
                            name: 'Planet Fitness',
                            value: 1898
                        }, {
                            name: 'Pitch Perfect',
                            value: 1484
                        }, {
                            name: 'Express',
                            value: 1112
                        }, {
                            name: 'Home',
                            value: 965
                        }, {
                            name: 'Johnny Depp',
                            value: 847
                        }, {
                            name: 'Lena Dunham',
                            value: 582
                        }, {
                            name: 'Lewis Hamilton',
                            value: 555
                        }, {
                            name: 'KXAN',
                            value: 550
                        }, {
                            name: 'Mary Ellen Mark',
                            value: 462
                        }, {
                            name: 'Farrah Abraham',
                            value: 366
                        }, {
                            name: 'Rita Ora',
                            value: 360
                        }, {
                            name: 'Serena Williams',
                            value: 282
                        }, {
                            name: 'NCAA baseball tournament',
                            value: 273
                        }, {
                            name: 'Point Break',
                            value: 265
                        }]
                    }]
                };

                const cloud = echarts.init(this.$refs.cloud, this.theme);
                cloud.setOption(option);
            }
        }
    }
</script>

<style scoped>

</style>
