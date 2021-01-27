<!--
 * @Description: 
 * @Author: XR.Gao
 * @Date: 2021-01-25 16:33:02
 * @LastEditTime: 2021-01-26 15:10:07
 * @Fighting: Make it Work, Make it Right, Make it Fast
-->
<template>
  <div class="wrapper">
    <div class="descText">
      1. 在
      <a
        target="_blank"
        href="http://datav.aliyun.com/tools/atlas/#&lat=30.37018632615852&lng=106.12965415279088&zoom=3.5"
        >http://datav.aliyun.com/tools/atlas/#&lat=30.37018632615852&lng=106.12965415279088&zoom=3.5</a
      >
      网站中下载对应城市 geojson文件
    </div>
    <div class="chart" id="scoreMap">
      <svg style="width:100%; height:100%"></svg>
    </div>
  </div>
</template>

<script>
import * as d3 from "d3";
import szJson from "@/static/cityJson/sz.json";
export default {
  name: "D3CityMap",
  data() {
    return {
      scoreMapData: undefined,
    };
  },
  methods: {
    getCityMapData() {
      // axios 网络请求
      this.scoreMapData ={
      "data" : [ {
        "cityName" : "baoan",
        "cityNameCN" : "宝安区",
        "value" : 60.0
      }, {
        "cityName" : "futian",
        "cityNameCN" : "福田区",
        "value" : 85.0
      }, {
        "cityName" : "longgang",
        "cityNameCN" : "龙岗区",
        "value" : 70.0
      }, {
        "cityName" : "longhua",
        "cityNameCN" : "龙华区",
        "value" : 74.0
      }, {
        "cityName" : "luohu",
        "cityNameCN" : "罗湖区",
        "value" : 80.0
      }, {
        "cityName" : "nanshan",
        "cityNameCN" : "南山区",
        "value" : 80.0
      }, {
        "cityName" : "pingshan",
        "cityNameCN" : "坪山区",
        "value" : 64.0
      }, {
        "cityName" : "yantian",
        "cityNameCN" : "盐田区",
        "value" : 75.0
      } ],
      "value" : 95.0,
      "max" : 85.0,
      "min" : 60.0
      }
    },
    drawSZMap(mapJson) {
      let { width, height } = this;
      let padding = { top: 10, right: 0, bottom: 10, left: 10 };
      let w = width - padding.right - padding.left;
      let h = height - padding.bottom - padding.top;

      const svg = d3.select(this.$el).select("svg");

      // 定义地图的投影
      const projection = d3.geoMercator().fitSize([w, h], mapJson);
      // 原来的写法需要自己计算
      // const projection = d3
      //   .geoMercator()
      //   .center([114.251372, 22.721511])
      //   .scale(30000)
      //   .translate([w / 2, h / 2]);

      //  定义地理路径生成器
      const path = d3.geoPath().projection(projection);
      // let color = d3.schemeCategory10;

      const mapGroups = svg.append("g").attr("class", "mapGroups");

      const maxData = this.scoreMapData.max;
      const minData = this.scoreMapData.min;
      console.log(maxData, minData)

      var palegreen = d3.rgb(2, 175, 102);
      var darkgreen = d3.rgb(81, 37, 255);

      var color = d3.interpolate(palegreen, darkgreen);
      const cliner = d3.scaleLinear().domain([minData, maxData]).range([0, 1]);
      // // 地图路径绘制
      mapGroups
        .selectAll("path")
        .data(mapJson.features)
        .enter()
        .append("path")
        .attr("class", "map-path")
        .attr("stroke", "black")
        .attr("fill", "transparent")
        .attr("d", path)
        .transition()
        .duration(1000)
        .delay((d, i) => i * 50)
        .ease(d3.easePolyInOut)
        .attr("fill", (d) => {
          // 某个地区的名字  深圳新的光明区没有
          let prov = d.properties.name;
          let curProvData = this.scoreMapData.data.find(
            (provData) => provData.cityNameCN === prov
          );
          if (curProvData) {
            console.log(
              curProvData.value,
              cliner(curProvData.value),
              color(cliner(curProvData.value))
            );
          }
          return color(cliner(curProvData ? curProvData.value : minData));
        });

      // text地理名称
      mapGroups
        .selectAll("text")
        .data(mapJson.features)
        .enter()
        .append("text")
        .attr("x", (d) => projection(d.properties.centroid)[0])
        .attr("y", (d) => projection(d.properties.centroid)[1])
        .attr("transform", `translate(${0},${0})`)
        .text((d) => d.properties.name)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .transition()
        .duration(1000)
        .delay((d, i) => i * 50)
        .ease(d3.easePolyInOut)
        .attr("opacity", 1)
        .attr("fill", "#FFF");
    },
  },
  created() {
    this.getCityMapData();
  },
  mounted() {
    let { width, height } = document
      .querySelector("#scoreMap")
      .getClientRects()[0];

    Object.assign(this, {
      width: width,
      height: height,
    });
    this.drawSZMap(szJson);
  },
};
</script>
<style  scoped>
</style>