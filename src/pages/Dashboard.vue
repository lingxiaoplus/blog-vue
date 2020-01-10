<template>
  <v-container>
    <v-layout row wrap>

      <v-flex xs10 md12>
        <v-layout row wrap>
          <v-col class="pa-6" cols="4" v-for="item in cardList" :key="item.name">
            <v-hover v-slot:default="{ hover }">
              <v-card :elevation="hover?12:6">
                <v-img :src="item.color" class="white--text align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  height="160px">
                  <v-card-title>{{item.name}}</v-card-title>
                  <v-card-subtitle class="white--text">{{item.number}}</v-card-subtitle>
                </v-img>
              </v-card>
            </v-hover>

          </v-col>



        </v-layout>
      </v-flex>

      <v-flex xs10 md6>
        <v-card>
          <v-card-text class="px2">
            <div ref="sale" style="width: 100%;height:350px"></div>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs10 md6>
        <v-card>
          <v-card-text class="px2">
            <div ref="pie" style="width: 100%;height:350px"></div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  // 引入 ECharts 主模块
  var echarts = require('echarts/lib/echarts');
  require('echarts/lib/chart/bar');
  require('echarts/lib/chart/pie');
  require('echarts/theme/macarons');
  export default {
    name: "dashboard",
    data() {
      return {
        theme: "macarons",
        cardList:[
          {
            name:'新增用户',
            number: 0,
            color: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg',
            url: ''
          },
          {
            name:'文章总数',
            number: 12,
            color: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg',
            url: ''
          },
          {
            name:'收到评论数',
            number: 22,
            color: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg',
            url: ''
          },
          {
            name:'分类数量',
            number: 1,
            color: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
            url: ''
          },
          {
            name:'标签数量',
            number: 1,
            color: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
            url: ''
          },
          {
            name:'友情链接',
            number: 1,
            color: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
            url: ''
          }
        ],
      }
    },
    //html加载完成后执行
    mounted() {
      this.$nextTick(() => {
        var sale = echarts.init(this.$refs.sale, this.theme);
        // 指定图表的配置项和数据
        var option = {
          title: {
            text: '文章统计'
          },
          tooltip: {},
          legend: {
            data: ['新增文章']
          },
          xAxis: {
            data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
          },
          yAxis: {},
          series: [{
            name: '新增文章',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20],
            //color:  this.$vuetify.theme.themes.light.primary
          }]
        };
        // 使用刚指定的配置项和数据显示图表。
        sale.setOption(option);

        const pie = echarts.init(this.$refs.pie, this.theme);
        pie.setOption({

          title: {
            text: '访问来源'
          },
          series: [{
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            data: [{
                value: 235,
                name: '视频广告'
              },
              {
                value: 274,
                name: '联盟广告'
              },
              {
                value: 310,
                name: '邮件营销'
              },
              {
                value: 335,
                name: '直接访问'
              },
              {
                value: 400,
                name: '搜索引擎'
              }
            ]
          }],
          itemStyle: {
            emphasis: {
              // 阴影的大小
              shadowBlur: 200,
              // 阴影水平方向上的偏移
              shadowOffsetX: 0,
              // 阴影垂直方向上的偏移
              shadowOffsetY: 0,
              // 阴影颜色
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            },
            normal: {
              color: function(params) {
                //自定义颜色
                var colorList = [
                  '#00FFFF', '#00FF00', '#FFFF00', '#FF8C00', '#FF0000',
                ];
                return colorList[params.dataIndex]
              }
            }
          }
        })

      })
    }
  }
</script>

<style>
</style>
