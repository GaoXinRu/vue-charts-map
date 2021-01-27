<!--
 * @Description: 
 * @Author: XR.Gao
 * @Date: 2021-01-25 16:32:24
 * @LastEditTime: 2021-01-26 15:01:53
 * @Fighting: Make it Work, Make it Right, Make it Fast
-->
<template>
  <div class="wrapper">
    <div class="chart" id="interCloudSvgBox"><svg></svg></div>
  </div>
</template>

<script>
import * as d3 from "d3";
export default {
  name: "D3Cloud",
  data() {
    return {
      cloudData: [],
    };
  },
  methods: {
    getCloudData() {
      // axios 获取数据
      this.cloudData = [
        {
          name: "停车场",
          value: 492,
        },
        {
          name: "电压",
          value: 968,
        },
        {
          name: "胎压",
          value: 917,
        },
        {
          name: "加油站",
          value: 672,
        },
        {
          name: "关闭DMS",
          value: 1220,
        },
        {
          name: "减小音量",
          value: 1084,
        },
        {
          name: "打开音乐",
          value: 1180,
        },
        {
          name: "避免拥堵路线",
          value: 1516,
        },
        {
          name: "打开行车记录仪",
          value: 1970,
        },
        {
          name: "打开空调",
          value: 1058,
        },
        {
          name: "关闭导航",
          value: 1180,
        },
        {
          name: "调高音量",
          value: 1352,
        },
        {
          name: "收费站",
          value: 492,
        },
        {
          name: "打开蘑菇小队",
          value: 1297,
        },
        {
          name: "机场",
          value: 636,
        },
        {
          name: "打开AR导航",
          value: 1500,
        },
        {
          name: "汽车站",
          value: 444,
        },
        {
          name: "流行歌曲",
          value: 432,
        },
        {
          name: "火车站",
          value: 612,
        },
        {
          name: "热歌",
          value: 384,
        },
        {
          name: "打开ADAS",
          value: 1408,
        },
        {
          name: "播报剩余电量",
          value: 1155,
        },
        {
          name: "剩余油量",
          value: 834,
        },
        {
          name: "导航回家",
          value: 1041,
        },
        {
          name: "路线",
          value: 384,
        },
        {
          name: "邓丽君",
          value: 396,
        },
        {
          name: "陈奕迅",
          value: 384,
        },
        {
          name: "导航去公司",
          value: 1937,
        },
        {
          name: "调低温度",
          value: 1084,
        },
      ];
    },
    drawSvg(cloudData) {
      let { width, height } = this;

      /** 宽 可以有padding自己设置*/
      let w = width;
      /** 高 */
      let h = height;

      const g1 = d3
        .select("#interCloudSvgBox")
        .select("svg")
        .append("g")
        .style("width", "100%")
        .style("height", "100%");
      // 渐变色  
      g1.append("defs")
        .append("linearGradient")
        .attr("id", "circleGradient")
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "0%")
        .attr("y2", "100%");
      g1.selectAll("linearGradient")
        .append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#00deff");
      g1.selectAll("linearGradient")
        .append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#006eff");

      const g2 = d3
        .select("#interCloudSvgBox")
        .select("svg")
        .append("g")
        .style("width", "100%")
        .style("height", "100%");

      var bubble = d3.pack({ children: cloudData }).size([w, h]).padding(5);

      var nodes = d3.hierarchy({ children: cloudData }).sum(function (d) {
        return d.value;
      });

      var node = g2
        .selectAll(".node")
        .data(bubble(nodes).descendants())
        .enter()
        .filter(function (d) {
          return !d.children;
        })
        .append("g")
        .attr("class", "node")
        .attr("transform", function (d) {
          return "translate(" + w / 2 + "," + h / 2 + ")";
        });
      node
        .transition()
        .duration(2000)
        .delay(200)
        .ease(d3.easePolyInOut)
        .attr("transform", function (d) {
          return "translate(" + d.x + "," + d.y + ")";
        });

      // 添加 圆圈
      node
        .append("circle")
        .attr("r", function (d, i) {
          return d.r;
        })
        .style("fill", "url(#circleGradient)")
        .attr("opacity", function () {
          let num = Math.round(Math.random() * (1 - 0) + 0) + 0.8;
          console.log(num);
          return num;
        }).transition().on("start", function repeat(d, i) {
        d3.active(this)
          .transition()
          .ease(d3.easePolyInOut)
          .duration(3000)
          .delay(() => i * 300)
          .attr("r", function () {
            return d.r;
          })
          .transition()
          .ease(d3.easeCircleOut)
          .duration(2000)
          .delay(() => i * 200)
          .attr("r", function () {
            let num = Math.round(Math.random() * (1 - 0) + 0) ? 1 : -1;
            return d.r/2;
          })
          .on("start", repeat);
      })

      // 添加文字
      node
        .append("text")
        .attr("dy", ".3em")
        .attr("font-size", 12)
        .style("fill", "#fff")
        .style("text-anchor", "middle")
        .text(function (d) {
          return d.data.name;
        });
    },
  },
  created() {
    this.getCloudData();
  },
  mounted() {
    let { width, height } = document
      .querySelector("#interCloudSvgBox")
      .getClientRects()[0];

    Object.assign(this, {
      width: width,
      height: height,
    });

    this.drawSvg(this.cloudData);
  },
};
</script>
<style  scoped>
svg {
  width: 100%;
  height: 100%;
}
</style>