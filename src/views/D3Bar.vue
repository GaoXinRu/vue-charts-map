<!--
 * @Description: 
 * @Author: XR.Gao
 * @Date: 2021-01-26 15:19:08
 * @LastEditTime: 2021-01-26 16:44:10
 * @Fighting: Make it Work, Make it Right, Make it Fast
-->
<template>
   <div class="wrapper">
     <div class="chart" id="changeMachineAgeDom" style="width:80%; height:80%"></div>
   </div>
</template>

<script>
import * as d3 from 'd3'
export default {
  name: 'D3Bar',
  data(){
    return {
        ageData: {
            "data" : [ 23291, 8328, 15492, 14562, 10934, 5097 ],
            "xAxis" : {
                "data" : [ "3月以下", "3-12月", "1-3年", "3-5年", "5-8年", "8年以上" ]
            }
        }
    }
  },
  methods:{
     // 绘制图形
    rightRoundedRect (data, index, total, length) {
      let { width, height } = this;
     
      height -= 100
      let totalAll = length
      let rectWidth = 50
      var str = ''
      // 坐标点为起点
 	  str += 'M ' + (width / totalAll / 2 + index * width / totalAll - rectWidth / 2) + ' ' + (height - parseInt(data / total * height*2) + rectWidth / 2) + ' '
      str += 'A ' + rectWidth / 2 + ' ' + rectWidth / 2 + ' 0 0 1 ' + (width / totalAll / 2 + index * width / totalAll - rectWidth / 2 + rectWidth) + ' ' + (height - parseInt(data / total * height*2) + rectWidth / 2) + ' '
      str += 'L ' + (width / totalAll / 2 + index * width / totalAll - rectWidth / 2 + rectWidth) + ' ' + height + ' '
      str += 'L ' + (width / totalAll / 2 + index * width / totalAll - rectWidth / 2) + ' ' + height + 'L ' + (width / totalAll / 2 + index * width / totalAll - rectWidth / 2) + ' ' + (height - parseInt(data / total * height*2) + rectWidth / 2)
      return str
    },
     drawSvg () {
      d3.select('#changeMachineAgeDom').select('svg').remove();
      let { width, height } = this;
      height -= 100

      const g = d3.select('#changeMachineAgeDom').append('svg').style('width', '100%').style('height', '100%')
     
      let xAgeData = this.ageData.data
      let xAgeName = this.ageData.xAxis.data

      let total = 0;
  
      for (let i = 0; i < xAgeData.length; i++) {
        total += parseInt(xAgeData[i])
      }
      let textArr = xAgeData.map((item)=> ((item/total)*100).toFixed(0) + "%")
      
      // y轴分布
      let yAxisColor = 0.32
      let yHeight = null
      for (let j = 0; j < 6; j++) {
        yHeight = height / 6 + j * height / 6
        g.append('line')
          .attr('x1', 0)
          .attr('y1', yHeight)
          .attr('x2', width)
          .attr('y2', yHeight)
          .attr('style', 'stroke:#00f;stroke-width:1')
          .style('stroke-opacity', yAxisColor)
      }
   

      // 填充渐变颜色   
      g.append('defs')
        .append('linearGradient')
        .attr('id', 'pathId')
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '0%')
        .attr('y2', '100%')
      g.selectAll('linearGradient').append('stop')
        .attr('offset', '0%')
        .attr('style', 'stop-color:#1FD0FE')
      g.selectAll('linearGradient').append('stop')
        .attr('offset', '100%')
        .attr('style', 'stop-color:#0274E8')
      
      // 描边渐变颜色
      g.append('defs')
        .append('linearGradient')
        .attr('id', 'pathStrokeId')
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '0%')
        .attr('y2', '100%')
      g.selectAll('linearGradient').append('stop')
        .attr('offset', '0%')
        .attr('style', 'stop-color:#1FD0FE')
      g.selectAll('linearGradient').append('stop')
        .attr('offset', '100%')
        .attr('style', 'stop-color:#0274E8')


        // 绘制柱状图
        g.selectAll('path').data(xAgeData).enter().append('path')
        .attr('d', (d, i) => {
          return this.rightRoundedRect(xAgeData[i], i, total, xAgeData.length)
        })
        .style('stroke', 'url(#pathStrokeId)')
        .attr('fill', 'url(#pathId)')
        .transition()
        .on('start', function repeat (d, i) {
          d3.active(this)
            .transition()
            .ease(d3.easeBackInOut)
            .duration(1200)
            .delay(() => i * 200)
            .attr('fill-opacity', '1')
            .attr('stroke-opacity', '1')
            .transition()
            .delay(5000)
            .attr('fill-opacity', '0')
            .attr('stroke-opacity', '0')
            .on('start', repeat)
        })

        // 百分比数字
        g.append('g').selectAll('text').data(xAgeData).enter().append('text')
        .attr('x', (d, i) => {
          return (width / xAgeData.length / 2 + i * width / xAgeData.length)
        })
        .attr('y',(d, i)=>{
          return (height - parseInt(xAgeData[i] / total * height*2) - 15)
        })
        .text((d, i) => textArr[i])
        .attr('font-size', 30)
        .attr("text-anchor", "middle")
        .style('fill', 'black')
        .transition()
        .on('start', function repeat (d, i) {
          d3.active(this)
            .transition()
            .ease(d3.easeBackInOut)
            .duration(1200)
            .delay(() => i * 200)
            .attr('fill-opacity', '1')
            .attr('stroke-opacity', '1')
            .transition()
            .delay(5000)
            .attr('fill-opacity', '0')
            .attr('stroke-opacity', '0')
            .on('start', repeat)
        })


      // x轴坐标
      const xAxisLabelG = g.append('g').attr('class', 'xAxisg')
      xAxisLabelG.selectAll('text').data(xAgeData).enter().append('text')
        .attr('x', (d, i) => {
          return width / xAgeData.length / 2 + i * width / xAgeData.length
        })
        .attr('y', height + 50)
        .text((d, i) => xAgeName[i])
        .attr('font-size', 30)
        .style('fill', 'black')
        .style('font-weight', '100')
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle')
     
    },
    resizeSvg(){
      
      let { width, height } = document
            .querySelector('#changeMachineAgeDom')
            .getClientRects()[0]
            
          Object.assign(this, {
            width: width,
            height: height,
          });
          this.drawSvg()
    }
   
  },
  created(){},
  mounted(){
      
     this.resizeSvg()
     let _that = this
     window.onresize = function() {
        _that.resizeSvg()
     }
  }
}
</script>
<style  scoped>
</style>