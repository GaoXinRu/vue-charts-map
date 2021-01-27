<!--
 * @Description: 
 * @Author: XR.Gao
 * @Date: 2021-01-25 16:32:02
 * @LastEditTime: 2021-01-26 10:59:18
 * @Fighting: Make it Work, Make it Right, Make it Fast
-->

<template>
  <div class="wrapper">
    <div class="descText">
        <p> 1. maskImage 是词云自定义的背景图形状 </p>
        <p> 2. 这张图片必须是全黑背景，echarts-wordcloud按背景渲染必须是黑色背景图</p>
        <p> 3. 如果想要有 背景轮廓, 那么就在图标下重合放置这张图片即可</p>
    </div>
    <div class="chart" ref="female" style="width: 80%; height: 80%"></div>
  </div>
 
</template>

<script>
import * as echarts from 'echarts'
import 'echarts-wordcloud';
import femaleUrl from "../assets/2.png";
import {femaleJsonData} from '../utils/femaleJsonData'

export default {
  name: "EchartsCloud",
  data() {
    return {
      femaleChart: null,
      femaleChartOpt: {
        tooltip: {
          show: true,
        },
        xAxis: {
          type: "category",
          show: false,
        },
        yAxis: {
          max: 100,
          show: false,
        },
        series: [
          {
            type: "wordCloud",
            sizeRange: [10, 150],
            rotationRange: [0,0],
            // width: '45%',
            // height: '35%',
            textPadding: 0,
            gridSize: 5, //用于标记画布可用性的网格大小（以像素为单位）//字距越大，字距越大。 
            maskImage: null,
            textPadding: 0,
            left: "center",
            top: "center",
            drawOutOfBound: false,
             textStyle: {
            fontFamily: 'sans-serif',
            fontWeight: 'bold',
            // Color can be a callback function or a color string
            color: function () {
                // Random color
                return 'rgb(' + [
                    Math.round(Math.random() * 160),
                    Math.round(Math.random() * 160),
                    Math.round(Math.random() * 160)
                ].join(',') + ')';
            }
              },
            data: [],
          },
          {
            zlevel: -1,
            type: "pictorialBar",
            name: "pictorial",
            silent: true,
            symbol: "image://" + femaleUrl,
            // symbolSize: ['56%', '37%'],
            symbolPosition: "center",
            barWidth: "100%",
            barMaxWidth: "100%",
            itemStyle: {
              normal: {
                opacity: 1,
              },
            },
            data: [
              {
                value: 100,
              },
            ],
          },
        ],
      },
    };
  },
  methods: {

    resizeCharts() {
      this.femaleChart.resize();
    },
    setFemaleEcharts() {
      this.femaleChart = echarts.init(this.$refs.female);
    
    },
    getWordCloud() {
      // 此处应该 axios 请求到cloud的数据, 然后赋值设置echarts

      this.femaleChartOpt.series[0].data = femaleJsonData;
      const femaleIamge = new Image();
      femaleIamge.src = femaleUrl;
      let that = this;
      femaleIamge.onload = function () {
        that.femaleChartOpt.series[0].maskImage = femaleIamge;
        that.femaleChart.setOption(that.femaleChartOpt)
      };
    },
  },
  created() {
    
  },
  mounted() {
  
    this.setFemaleEcharts();
    
    this.getWordCloud();
    let _this = this; //赋值vue的this
    window.onresize = () => {
      //调用methods中的事件
      _this.resizeCharts();
    };
  },
};
</script>
<style lang="less"  scoped>

</style>