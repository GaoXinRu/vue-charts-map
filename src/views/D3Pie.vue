<!--
 * @Description: 
 * @Author: XR.Gao
 * @Date: 2021-01-25 16:33:36
 * @LastEditTime: 2021-01-26 20:47:00
 * @Fighting: Make it Work, Make it Right, Make it Fast
-->
<template>
  <div class="wrapper">
     <div class="chart" id="age" style="width:80%; height:80%"><svg style="width:100%;height:100%"></svg></div>
   </div>
</template>

<script>
import * as d3 from 'd3'
import xxsuv from "@/assets/xxsuv.png";
import zxsuv from "@/assets/zxsuv.png";
import jcxsuv from "@/assets/jcxsuv.png";

import xxc from "@/assets/xxc.png";
import zxc from "@/assets/zxc.png";
import jcxc from "@/assets/jcxc.png";
export default {
  name: 'D3Pie',
  data(){
    return {
      carLevelData:  [ {
      "name" : "中型suv",
      "value" : 1037
    }, {
      "name" : "中型车",
      "value" : 3578
    }, {
      "name" : "小型suv",
      "value" : 1663
    }, {
      "name" : "小型车",
      "value" : 2424
    }, {
      "name" : "紧凑型suv",
      "value" : 4393
    }, {
      "name" : "紧凑型车",
      "value" : 11395
    } ]
    }
  },
  methods:{
     drawDriverAge(data) {
      const { width, height } = this;
      let circleRadius = 10; // 内圆半径
      let ringWidth = 20; // 圆环宽度
      let ringSpacing = 20; // 圆环间距
      let xAsixLineLength = 200; // 水平线距离圆心的距离
      let yAsixLineLength = 100; // 垂直线距离水平线的距离
      let rightNum = 3; // 右侧文字展示数量
      // 圆心

      let drivingAgeData = data;
      /**
       * 虚线 右侧
       * 起点: {'x':0,'y':circleRadius+ringWidth/2 + i*(ringWidth+ringSpacing)}
       * 折线点: {'x':xAsixLineLength,'y':circleRadius+ringWidth/2 + i*(ringWidth+ringSpacing)}
       * 终点: {'x':xAsixLineLength, 'y':10}
       *
       * 虚线 左侧
       * 起点: {'x':circleRadius + (i-2) * (ringWidth + ringSpacing)+ringWidth/2,'y':0}
       * 折线点: {'x':xAsixLineLength*xFlag,'y':0}
       * 终点: {'x':xAsixLineLength*xFlag,'y':yAsixLineLength*yFlag}
       *
       * (Math.sin(2*Math.PI/360*(i-2)*15)*circleRadius+ringWidth/2)
       */
      var dashedLine = []; // 虚线数组
      var driverAgeImgArr = []; // 提示文字显示位置数组
      var driverAgePercentageTextArr = []; // 占百分比显示位置数组
      var imageArr = [xxsuv, zxsuv, jcxsuv, xxc, zxc, jcxc];
      var circleColor = [
        { fill: "#5e22f450", stroke: "#5e22f4" },
        { fill: "#7a44f450", stroke: "#7a44f4" },
        { fill: "#001cf450", stroke: "#001cf4" },
        { fill: "#3022f350", stroke: "#3022f3" },
        { fill: "#038ae950", stroke: "#038ae9" },
        { fill: "#2d6ef050", stroke: "#2d6ef0"}
      ];
      var yFlag; // 控制折线向上向下flag
      var xFlag; // 控制折线向左向右flag
      var lineFlag; // 控制水平线是否加长flag

      var imgWidth = 100;
      var imgHeight = 50;
      for (let i = 0; i < drivingAgeData.length; i++) {
        yFlag = i % rightNum === 0 ? -1 : 1;
        if (i % 2 === 1) {
          lineFlag = 1;
        } else {
          lineFlag = 0;
        }

          
          switch (i) {
            case 0: // 右下
              xFlag = 1;
              xAsixLineLength = 300;
              yAsixLineLength = 220;
              dashedLine[i] = [
              {
                x: 0,
                y: -(
                  circleRadius +
                  ringWidth / 2 +
                  i * (ringWidth + ringSpacing)
                ),
              },
              {
                x: xFlag * (xAsixLineLength + lineFlag * 15),
                y: -(
                  circleRadius +
                  ringWidth / 2 +
                  i * (ringWidth + ringSpacing)
                ),
              },
              {
                x: xFlag * (xAsixLineLength + lineFlag * 15),
                y: -(
                  circleRadius +
                  ringWidth / 2 +
                  i * (ringWidth + ringSpacing) +
                  yAsixLineLength * yFlag
                ),
              },
              ];
              driverAgeImgArr[i] = {
              x: xFlag * (xAsixLineLength + lineFlag * 15 -imgWidth/2),
              y: -(
                circleRadius +
                ringWidth / 2 +
                i * (ringWidth + ringSpacing) +
                yAsixLineLength * yFlag +
                5 * yFlag
              ),
              };
              driverAgePercentageTextArr[i] = {
                x: xFlag * (xAsixLineLength + lineFlag * 15),
                y: -(
                  circleRadius +ringWidth / 2 +i * (ringWidth + ringSpacing) +yAsixLineLength * yFlag +
                (imgHeight+15) * yFlag
                )
              };
              break;
            case 1: // 右中
              xFlag = 1;
              xAsixLineLength = 300;
              dashedLine[i] = [{
                x: 0,
                y: -(
                  circleRadius +
                  ringWidth / 2 +
                  i * (ringWidth + ringSpacing)
                ),
              },
              {
                x: xFlag * (xAsixLineLength + lineFlag * 15),
                y: -(
                  circleRadius +
                  ringWidth / 2 +
                  i * (ringWidth + ringSpacing)
                ),
              },
              ];
              driverAgeImgArr[i] = {
              x: xFlag * (xAsixLineLength + lineFlag * 15 + 80 - imgWidth/2),
              y: -(
                circleRadius +
                ringWidth / 2 +
                i * (ringWidth + ringSpacing + imgHeight/2)
              ),
              };
              driverAgePercentageTextArr[i] = {
              x: xFlag * (xAsixLineLength + lineFlag * 15 + 80),
              y: -(
                circleRadius +
                ringWidth / 2 +
                i * (ringWidth + ringSpacing- imgHeight)
              ),
              };
              break;
            case 2: // 右上
              xFlag = 1;
              xAsixLineLength = 300;
              yAsixLineLength = 120;
              dashedLine[i] = [
              {
                x: 0,
                y: -(
                  circleRadius +
                  ringWidth / 2 +
                  i * (ringWidth + ringSpacing)
                ),
              },
              {
                x: xFlag * (xAsixLineLength + lineFlag * 15),
                y: -(
                  circleRadius +
                  ringWidth / 2 +
                  i * (ringWidth + ringSpacing)
                ),
              },
              {
                x: xFlag * (xAsixLineLength + lineFlag * 15),
                y: -(
                  circleRadius +
                  ringWidth / 2 +
                  i * (ringWidth + ringSpacing) +
                  yAsixLineLength * yFlag
                ),
              },
              ];
              driverAgeImgArr[i] = {
              x: xFlag * (xAsixLineLength + lineFlag * 15 - imgWidth/2),
              y: -(
                circleRadius +
                ringWidth / 2 +
                i * (ringWidth + ringSpacing) +
                yAsixLineLength * yFlag +
                80 * yFlag
              )
              };
              driverAgePercentageTextArr[i] = {
              x: xFlag * (xAsixLineLength + lineFlag * 15),
              y: -(
                circleRadius +
                ringWidth / 2 +
                i * (ringWidth + ringSpacing) +
                yAsixLineLength * yFlag +
                20 * yFlag
              ),
              };
              break;
            case 3: // 左下
              xFlag = -1;
              xAsixLineLength = 300;
              yAsixLineLength = 210;
              dashedLine[i] = [
              {
                x:
                  xFlag *
                  (Math.cos((Math.PI / 180) * (i - rightNum) * 15) *
                    circleRadius +
                    i * (ringWidth + ringSpacing) +
                    10),
                y:
                  -yFlag *
                  (Math.sin((Math.PI / 180) * (i - rightNum) * 15) *
                    circleRadius +
                    (i - rightNum) * ringWidth),
              },
              {
                x: (xAsixLineLength + lineFlag * 15) * xFlag,
                y:
                  -yFlag *
                  (Math.sin((Math.PI / 180) * (i - rightNum) * 15) *
                    circleRadius +
                    (i - rightNum) * ringWidth),
              },
              {
                x: (xAsixLineLength + lineFlag * 15) * xFlag,
                y:
                  -yFlag *
                  (Math.sin((Math.PI / 180) * (i - rightNum) * 15) *
                    circleRadius +
                    (i - rightNum) * ringWidth +
                    yAsixLineLength),
              },
              ];
              driverAgeImgArr[i] = {
              x: xFlag * (xAsixLineLength + lineFlag * 15 + imgWidth/2),
              y:
                -yFlag *
                (Math.sin((Math.PI / 180) * (i - rightNum) * 15) *
                  circleRadius +
                  (i - rightNum) * ringWidth +
                  yAsixLineLength +
                  5),
              };
              driverAgePercentageTextArr[i] = {
              x: xFlag * (xAsixLineLength + lineFlag * 15),
              y:
                -yFlag *
                (Math.sin((Math.PI / 180) * (i - rightNum) * 15) *
                  circleRadius +
                  (i - rightNum) * ringWidth +
                  yAsixLineLength +
                  imgHeight + 15),
              };
              break;
            case 4: // 左中
              xFlag = -1;
              xAsixLineLength = 350;
              dashedLine[i] = [
              {
                x:
                  xFlag *
                  (Math.cos((Math.PI / 180) * (i - rightNum) * 15) *
                    circleRadius +
                    i * (ringWidth + ringSpacing) +
                    10),
                y:
                  -yFlag *
                  (Math.sin((Math.PI / 180) * (i - rightNum) * 15) *
                    circleRadius +
                    (i - rightNum) * ringWidth),
              },
              {
                x: (xAsixLineLength + lineFlag * 15) * xFlag,
                y:
                  -yFlag *
                  (Math.sin((Math.PI / 180) * (i - rightNum) * 15) *
                    circleRadius +
                    (i - rightNum) * ringWidth),
              },
              ];
              driverAgeImgArr[i] = {
              x: (xAsixLineLength + lineFlag * 20 + imgWidth + 10) * xFlag,
              y:
                -yFlag *
                (Math.sin((Math.PI / 180) * (i - rightNum) * 15) *
                  circleRadius +
                  (i - rightNum) * ringWidth + imgHeight/2),
              };
              driverAgePercentageTextArr[i] = {
              x: (xAsixLineLength + lineFlag * 15 + imgWidth/2 + 10) * xFlag,
              y:
                -yFlag *
                (Math.sin((Math.PI / 180) * (i - rightNum) * 15) *
                  circleRadius +
                  (i - rightNum) * ringWidth - (imgHeight)),
              };
              break;
            case 5: // 左上
              xFlag = -1;
              xAsixLineLength = 320;
              yAsixLineLength = 180;
              dashedLine[i] = [
              {
                x:
                  xFlag *
                  (Math.cos((Math.PI / 180) * (i - rightNum) * 15) *
                    circleRadius +
                    i * (ringWidth + ringSpacing) +
                    10),
                y:
                  -yFlag *
                  (Math.sin((Math.PI / 180) * (i - rightNum) * 15) *
                    circleRadius +
                    (i - rightNum) * ringWidth),
              },
              {
                x: (xAsixLineLength + lineFlag * 15) * xFlag,
                y:
                  -yFlag *
                  (Math.sin((Math.PI / 180) * (i - rightNum) * 15) *
                    circleRadius +
                    (i - rightNum) * ringWidth),
              },
              {
                x: (xAsixLineLength + lineFlag * 15) * xFlag,
                y:
                  -yFlag *
                  (Math.sin((Math.PI / 180) * (i - rightNum) * 15) *
                    circleRadius +
                    (i - rightNum) * ringWidth +
                    yAsixLineLength),
              },
              ];
              driverAgeImgArr[i] = {
              x: xFlag * (xAsixLineLength + lineFlag * 15 + imgWidth/2),
              y:
                -yFlag *
                (Math.sin((Math.PI / 180) * (i - rightNum) * 15) *
                  circleRadius +
                  (i - rightNum) * ringWidth +
                  yAsixLineLength +
                  imgHeight+15),
              };
              driverAgePercentageTextArr[i] = {
              x: xFlag * (xAsixLineLength + lineFlag * 15),
              y:
                -yFlag *
                (Math.sin((Math.PI / 180) * (i - rightNum) * 15) *
                  circleRadius +
                  (i - rightNum) * ringWidth +
                  yAsixLineLength +
                  5),
              };
              break;
            default:
              break;
          }
      }
    
      
      var lineFunction = d3
        .line()
        .x(function (d, i) {
          return d.x;
        })
        .y(function (d, i) {
          return d.y;
        });

      let total = 0;
      let value = data.map((item) => item.value);
      total = value.reduce((a, b) => {
        return a + b;
      });
      // var total = drivingAgeData[0].value + drivingAgeData[1].value + drivingAgeData[2].value + drivingAgeData[3].value + drivingAgeData[4].value
      for (let j = 0; j < 4; j++) {
        const g = d3
          .select("#age")
          .select("svg")
          .append("g")
          .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        for (let i = 0; i < drivingAgeData.length; i++) {
          var arcGenerator = d3
            .arc()
            .innerRadius(circleRadius + i * (ringWidth + ringSpacing))
            .outerRadius(
              circleRadius + i * (ringWidth + ringSpacing) + ringWidth
            )
            .startAngle(0)
            .endAngle((-drivingAgeData[i].value / total) * Math.PI * 2)
            .cornerRadius(3);
          var arcGeneratorInside = d3
            .arc()
            .innerRadius(circleRadius + i * (ringWidth + ringSpacing))
            .outerRadius(
              circleRadius + i * (ringWidth + ringSpacing) + ringWidth
            )
            .startAngle(0)
            .endAngle(Math.PI * 2)
            .cornerRadius(3);
          if (j == 0) {
            g.append("path")
              .attr("d", lineFunction(dashedLine[i]))
              .attr("stroke", "#00b7fe")
              .attr("stroke-width", 0.5)
              .attr("fill", "none")
              .attr("stroke-dasharray", 3);
          } else if (j == 1) {
            g.append("path")
              .datum({ endAngle: Math.PI * 2 })
              .attr("fill", "#ff00d210")
              .attr("stroke", "#ff00d210")
              .attr("d", arcGeneratorInside);
            g.append("path")
              .datum({ endAngle: Math.PI * 2 })
              .attr("fill", circleColor[i].fill)
              .attr("stroke", circleColor[i].stroke)
              .attr("stroke-width", 2)
              .attr("stroke-opacity", "1")
              .attr("d", arcGenerator)
              .attr("class", "pathCircle");
          } else if (j == 2) {
            g.append("text")
              .attr("text-anchor", "middle")
              .attr("dominant-baseline", "middle")
              .attr("x", driverAgePercentageTextArr[i].x)
              .attr("y", driverAgePercentageTextArr[i].y)
              .attr("fill", "#00b7fe")
              .attr("font-size", 20)
              .text(
                drivingAgeData[i].name +
                  ((drivingAgeData[i].value / total) * 100).toFixed(2) +
                  "%"
              );
          } else {
             g.append('image')
            .attr('xlink:href', imageArr[i])
            .attr('x', driverAgeImgArr[i].x)
            .attr('y', driverAgeImgArr[i].y)
            .attr('width', '100px')
            .attr('height', '50px')
          }
        }
      }

      d3.selectAll(".pathCircle")
        .transition()
        .duration(1000)
        .delay(function (d, i) {
          return i * 1000;
        })
        .on("start", function repeat(d, i) {
          d3.active(this)
            .attr("stroke-opacity", "1")
            .transition()
            .attr("stroke-opacity", "0")
            .transition()
            .delay(4000)
            .on("start", repeat);
        });
    },
  },
  created(){},
  mounted(){
     let { width, height } = document
      .querySelector("#age")
      .getClientRects()[0];
    // console.log(width, height);

    Object.assign(this, {
      width: width,
      height: height,
    });

    this.drawDriverAge(this.carLevelData)
  }
}
</script>
<style  scoped>
</style>