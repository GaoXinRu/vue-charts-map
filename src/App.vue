<!--
 * @Description: 
 * @Author: XR.Gao
 * @Date: 2021-01-25 16:02:02
 * @LastEditTime: 2021-01-26 20:45:38
 * @Fighting: Make it Work, Make it Right, Make it Fast
-->
<template>
  <div id="app">
    <div id="nav">
      <router-link to="/echartsCloud">echarts轮廓词云图</router-link> |
      <router-link to="/d3Cloud">d3词云气泡图</router-link> | 
      <router-link to="/d3CityMap">d3城市地图</router-link> | 
      <router-link to="/d3Pie">d3图例饼状图</router-link> | 
      <router-link to="/d3Bar">d3柱状图</router-link>
    </div>
    <div class="container">
        <router-view/>
    </div>
    
  </div>
</template>

<style lang="less">
html, body{
  width:100%;
  height:100%;
}
*{
  margin:0;
  padding:0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width:100%;
  height: 100%;
 
}

#nav {
  // height: 80px;
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.container{
  width: 100%;
  height: calc(100% - 81px);
}

.wrapper{
  width:100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .descText{
    margin: 0 auto;
    text-align: left;
    margin-bottom: 50px;
  }

  .chart{
    margin: 0 auto;
    width: 100%;
    height: 100%;
  }
}
</style>
