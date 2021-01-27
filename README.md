# vuechartsmap

## VUE + Echarts + D3 绘制图表

    由于项目需要, echarts 中的图表并不能完全满足数据大屏的定制要求, 尤其是循环动画.
    所以不能够使用 canvas, 转而使用 svg. 利用 D3 框架绘制图表.
    需要注意 D3 的网上资料都是V3版本, 与V4,5,6的代码相差很多.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

## 版本对应: 

```
"d3": "^6.5.0"
"echarts": "^5.0.1"
"echarts-wordcloud": "^2.0.0"
"vue": "^2.6.11"
```

主要内容 D3 绘制 图表

### 项目中图表列举

#### 1. Echarts 词云图
![词云图](/词云图.png)

#### 2. D3 气泡图
![气泡图](气泡图.png)

#### 3. D3 城市地图
svg / geojson 各城市地图下载地址: http://datav.aliyun.com/tools/atlas
![城市地图](局部地图.png)

#### 4. D3 图例饼状图
![图例饼状图](图例饼状图.png)

#### 5. D3 圆柱状图
![圆柱状图](圆柱状图.png)




