<template>
  <div class="page-content">
    <div class="tunnelTabs">
      <span
        v-for="(item, index) in tunnelNameList"
        :key="index"
        :class="activeTunnel === item.value ? 'activeSpan' : ''"
        @click="changeTunnelHandle(item)"
      >
        {{ item.name }}
      </span>
    </div>
    <div class="header">
      <div class="header_left">
        <span>时间</span>
        <el-select v-model="selectedTime.type" placeholder="请选择" size="small" @change="typeChangeHandle">
          <el-option
            v-for="item in timeTypeOption"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-select v-model="selectedTime.time" placeholder="请选择" size="small">
          <el-option
            v-for="item in timeOption"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="header_right">
        <el-button type="primary" size="small" @click="getAllData">查询</el-button>
        <el-button type="button" class="search-button restBut" size="small" @click="resetSearch">重置</el-button>
      </div>
    </div>
    <div class="content">
      <el-scrollbar style="height:100%">
        <div class="center">
          <div class="left">
            <div class="leftOne">
              <!-- 树形统计图 -->
              <div id="barChart" class="chart-hover"></div>
              <div class="totalInfo">
                  <span>上行流量汇总(辆) : {{trafficFlowData.uploadNumber}}</span>
                  <span>下行流量汇总(辆) : {{trafficFlowData.downNumber}}</span>
                  <span>总流量(辆) : {{trafficFlowData.totalNumber}}</span>
              </div>
            </div>
            <div class="leftTwo">
              <div class="covi">
                <span class="common_title">CO(ppm)/VI(km)</span>
                <div class="dataTable">
                  <div class="leftTitle">
                    上行
                  </div>
                  <div class="rightContent">
                    <div class="column">
                      <div class="colTitle">入口</div>
                      <div class="colData">
                        <p>
                          <span class="key">CO平均值</span
                          ><span class="value">{{ upcovi.inCoSpeed }}</span>
                        </p>
                        <p>
                          <span class="key">VI平均值</span
                          ><span class="value">{{ upcovi.inViTrend }}</span>
                        </p>
                      </div>
                    </div>
                    <div class="column">
                      <div class="colTitle">中间口</div>
                      <div class="colData">
                        <p>
                          <span class="key">CO平均值</span
                          ><span class="value">{{ upcovi.centerCoSpeed }}</span>
                        </p>
                        <p>
                          <span class="key">VI平均值</span
                          ><span class="value">{{ upcovi.centerViTrend }}</span>
                        </p>
                      </div>
                    </div>
                    <div class="column">
                      <div class="colTitle">出口</div>
                      <div class="colData">
                        <p>
                          <span class="key">CO平均值</span
                          ><span class="value">{{ upcovi.outCoSpeed }}</span>
                        </p>
                        <p>
                          <span class="key">VI平均值</span
                          ><span class="value">{{ upcovi.outViTrend }}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="dataTable">
                  <div class="leftTitle">
                    下行
                  </div>
                  <div class="rightContent">
                    <div class="column">
                      <div class="colTitle">入口</div>
                      <div class="colData">
                        <p>
                          <span class="key">CO平均值</span
                          ><span class="value">{{ downcovi.inCoSpeed }}</span>
                        </p>
                        <p>
                          <span class="key">VI平均值</span
                          ><span class="value">{{ downcovi.inViTrend }}</span>
                        </p>
                      </div>
                    </div>
                    <div class="column">
                      <div class="colTitle">中间口</div>
                      <div class="colData">
                        <p>
                          <span class="key">CO平均值</span
                          ><span class="value">{{
                            downcovi.centerCoSpeed
                          }}</span>
                        </p>
                        <p>
                          <span class="key">VI平均值</span
                          ><span class="value">{{
                            downcovi.centerViTrend
                          }}</span>
                        </p>
                      </div>
                    </div>
                    <div class="column">
                      <div class="colTitle">出口</div>
                      <div class="colData">
                        <p>
                          <span class="key">CO平均值</span
                          ><span class="value">{{ downcovi.outCoSpeed }}</span>
                        </p>
                        <p>
                          <span class="key">VI平均值</span
                          ><span class="value">{{ downcovi.outViTrend }}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="wind">
                <span class="common_title">风速(m/s)/风向比例(%)</span>
                <div class="dataTable">
                  <div class="leftTitle">
                    上行
                  </div>
                  <div class="rightContent">
                    <div class="column">
                      <div class="colTitle windStyle">入口</div>
                      <div class="colData">
                        <p>
                          <span class="key">风速平均值</span
                          ><span class="value">{{ uptw.inCoSpeed }}</span>
                        </p>
                        <p>
                          <span class="key">风向比例</span
                          ><span class="value">{{ uptw.inViTrend }}</span>
                        </p>
                      </div>
                    </div>
                    <div class="column">
                      <div class="colTitle windStyle">中间口</div>
                      <div class="colData">
                        <p>
                          <span class="key">风速平均值</span
                          ><span class="value">{{ uptw.centerCoSpeed }}</span>
                        </p>
                        <p>
                          <span class="key">风向比例</span
                          ><span class="value">{{ uptw.centerViTrend }}</span>
                        </p>
                      </div>
                    </div>
                    <div class="column">
                      <div class="colTitle windStyle">出口</div>
                      <div class="colData">
                        <p>
                          <span class="key">风速平均值</span
                          ><span class="value">{{ uptw.outCoSpeed }}</span>
                        </p>
                        <p>
                          <span class="key">风向比例</span
                          ><span class="value">{{ uptw.outViTrend }}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="dataTable">
                  <div class="leftTitle">
                    下行
                  </div>
                  <div class="rightContent">
                    <div class="column">
                      <div class="colTitle windStyle">入口</div>
                      <div class="colData">
                        <p>
                          <span class="key">风速平均值</span
                          ><span class="value">{{ downtw.inCoSpeed }}</span>
                        </p>
                        <p>
                          <span class="key">风向比例</span
                          ><span class="value">{{ downtw.inViTrend }}</span>
                        </p>
                      </div>
                    </div>
                    <div class="column">
                      <div class="colTitle windStyle">中间口</div>
                      <div class="colData">
                        <p>
                          <span class="key">风速平均值</span
                          ><span class="value">{{ downtw.centerCoSpeed }}</span>
                        </p>
                        <p>
                          <span class="key">风向比例</span
                          ><span class="value">{{ downtw.centerViTrend }}</span>
                        </p>
                      </div>
                    </div>
                    <div class="column">
                      <div class="colTitle windStyle">出口</div>
                      <div class="colData">
                        <p>
                          <span class="key">风速平均值</span
                          ><span class="value">{{ downtw.outCoSpeed }}</span>
                        </p>
                        <p>
                          <span class="key">风向比例</span
                          ><span class="value">{{ downtw.outViTrend }}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="leftThree">
              <!--折线统计图 -->
              <div id="lineChart" class="chart-hover"></div>
            </div>
          </div>
          <div class="right">
            <div class="rightOne">
              <span class="common_title">通风</span>
              <div class="tableStyle">
                <div class="firstRow">
                  <div>
                    上行
                  </div>
                  <div>
                    下行
                  </div>
                </div>
                <div class="secondRow" width="100%">
                  <div class="commonCircle">
                    <p>
                      <span class="number">{{ windData.uploadCount }}</span
                      >次
                    </p>
                    <p>开启次数</p>
                  </div>
                  <div class="commonCircle">
                    <p>
                      <span class="number">{{ windData.uploadDate }}</span
                      >小时
                    </p>
                    <p>开启时长</p>
                  </div>
                  <div class="commonCircle">
                    <p>
                      <span class="number">{{ windData.downCount }}</span
                      >次
                    </p>
                    <p>开启次数</p>
                  </div>
                  <div class="commonCircle">
                    <p>
                      <span class="number">{{ windData.downDate }}</span
                      >小时
                    </p>
                    <p>开启时长</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="rightTwo">
              <span class="common_title">照明</span>
              <p class="subtitle">基础照明</p>
              <div class="tableStyle baseLight">
                <div class="firstRow">
                  <div>
                    上行
                  </div>
                  <div>
                    下行
                  </div>
                </div>
                <div class="secondRow" width="100%">
                  <div class="commonCircle">
                    <p>
                      <span class="number">{{
                        basicLightData.uploadBLightCount
                      }}</span
                      >次
                    </p>
                    <p>开启次数</p>
                  </div>
                  <div class="commonCircle">
                    <p>
                      <span class="number">{{
                        basicLightData.uploadBLightDate
                      }}</span
                      >小时
                    </p>
                    <p>开启时长</p>
                  </div>
                  <div class="commonCircle">
                    <p>
                      <span class="number">{{
                        basicLightData.downBLightCount
                      }}</span
                      >次
                    </p>
                    <p>开启次数</p>
                  </div>
                  <div class="commonCircle">
                    <p>
                      <span class="number">{{
                        basicLightData.downBLightDate
                      }}</span
                      >小时
                    </p>
                    <p>开启时长</p>
                  </div>
                </div>
              </div>
              <p class="subtitle">加强照明</p>
              <div class="tableStyle strengthenLight">
                <div class="firstRow">
                  <div>
                    上行
                  </div>
                  <div>
                    下行
                  </div>
                </div>
                <div class="secondRow" width="100%">
                  <div class="commonCircle">
                    <p>
                      <span class="number">{{
                        strongerLightData.uploadSLightCount
                      }}</span
                      >次
                    </p>
                    <p>开启次数</p>
                  </div>
                  <div class="commonCircle">
                    <p>
                      <span class="number">{{
                        strongerLightData.uploadSLightDate
                      }}</span
                      >时长
                    </p>
                    <p>开启次数</p>
                  </div>
                  <div class="commonCircle">
                    <p>
                      <span class="number">{{
                        strongerLightData.downSLightCount
                      }}</span
                      >次
                    </p>
                    <p>开启次数</p>
                  </div>
                  <div class="commonCircle">
                    <p>
                      <span class="number">{{
                        strongerLightData.downSLightDate
                      }}</span
                      >时长
                    </p>
                    <p>开启次数</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="rightThree">
              <!-- 亮度气泡统计图 -->
              <div id="brightnessChart" class="chart-hover"></div>
            </div>
          </div>
        </div>
        <!-- 折线统计图 -->
        <!-- <div class="footer">
          <div id="rainFallChart" class="chart-hover"></div>
        </div> -->
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import api from '@/utils/requst.js'
import { TableSearch } from 'vue-common-nmg-tunnel'
export default {
  name: 'analyData',
  components: {
    TableSearch,
  },
  data() {
    return {
      timeTypeOption: [
         {
             label:'按天',
             value:'day'
         },
         {
             label:'按季度',
             value:'quarter'
         },
         {
             label:'按年',
             value:'year'
         }
      ],
      timeOption:[],
      timeOptionData:[
           {
              type:"day",
              subOption:[
                  {
                     label:"最近7天",
                     value:6
                  },
                  {
                     label:"最近30天",
                     value:29
                  }
              ]
          },
          {
              type:"quarter",
              subOption:[
                  {
                     label:"一季度",
                     value:1
                  },
                  {
                     label:"二季度",
                     value:2
                  },
                  {
                     label:"三季度",
                     value:3
                  },
                  {
                     label:"四季度",
                     value:4
                  }
              ]
          },
           {
              type:"year",
              subOption:[
                  {
                     label:`${new Date().getFullYear()}年`,
                     value: new Date().getFullYear()
                  },
                  {
                     label:`${new Date().getFullYear() - 1}年`,
                     value: new Date().getFullYear() - 1
                  },
                   {
                     label:`${new Date().getFullYear() - 2}年`,
                     value: new Date().getFullYear() - 2
                  },
              ]
          }
      ],
      selectedTime:{
          type:"day", // 时间类型
          time:"" // 具体时间
      },
      activeTunnel: '', // 当前选中的隧道
      tunnelNameList: [],
      trafficFlowData:{
          uploadNumber: 0,
          downNumber: 0,
          totalNumber: 0
      },
      barGraphData: [],
      barInit: null, // 竖型统计图实例
      // 竖型统计图配置数据
      barGraphOption: {
        title: {
          show: true,
          text: '交通流量',
          x: '24px',
          y: '24px',
          textStyle: {
            color: '#F1F4F8',
            fontSize: 16,
          },
        },
        legend: {
          show: true,
          x: '24px',
          y: '72px',
          itemGap: 27,
          itemWidth: 8,
          itemHeight: 8,
          textStyle: {
            // 图列内容样式
            color: '#F1F4F8', // 字体颜色
            fontSize: 12,
          },
        },
        tooltip: {
          show: true, // 是否显示提示框，默认为true
          trigger: 'item', // 数据项图形触发
          axisPointer: {
            // 指示样式
            type: 'shadow',
            axis: 'auto',
          },
          padding: 5,
          textStyle: {
            // 提示框内容的样式
            color: '#fff',
          },
        },
        grid: {
          show: false, // 是否显示直角坐标系网格
          top: 112, // 相对位置 top\bottom\left\right
          left: 24,
          right: 24,
          bottom: 24,
          containLabel: true,
        },
        xAxis: {
          //设置x轴
          show: true, // 是否显示
          type: 'category',
          data: [],
          nameTextStyle: {
            // 坐标轴名称样式
            color: '#B4B9C1',
          },
          axisLine: {
            // 坐标轴 轴线
            lineStyle: {
              color: '#556382',
              width: 1,
              type: 'solid',
            },
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            type: 'slider',
            show: true,
            color: '#B4B9C1',
            margin: 12,
            interval: 0,
          },
        },
        dataZoom: [
          {
            show: false,
            start: 0,
            end: 100,
            //showDetail:false,
            height: '5',
            bottom: '3%',
            // handleIcon:'0',
            // handleSize:'80%',
            borderRadius: 10,
            borderColor: 'transparent',
            backgroundColor: '#283145',
            fillerColor: '#B4B9C1',
          },
        ],
        yAxis: {
          type: 'value',
          axisLine: {
            show: false,
          },
          nameTextStyle: {
            // 坐标轴名称样式
            color: '#B4B9C1',
          },
          axisLabel: {
            show: true,
            color: '#B4B9C1',
            margin: 12,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            lineStyle: {
              type: 'dashed',
              color: '#556382',
            },
          },
        },
        series: [
          {
            name: '上行',
            type: 'bar',
            itemStyle: {
              // 图形的形状
              color: '#5E85FD',
            },
            //barWidth: 16,
            data: [],
          },
          {
            name: '下行',
            type: 'bar',
            data: [],
            itemStyle: {
              // 图形的形状
              color: '#4FBDFD',
            },
            //barWidth: 16,
          },
        ],
      },
      lineGraphData: [],
      lineInit: null, // 折线统计图实例
      // 折线统计图配置数据
      lineGraphOption: {
        title: {
          show: true,
          text: '紧急电话广播',
          x: '24px',
          y: '24px',
          textStyle: {
            color: '#F1F4F8',
            fontSize: 16,
          },
        },
        legend: {
          show: true,
          x: '24px',
          y: '72px',
          icon: 'rect',
          itemGap: 27,
          itemWidth: 8,
          itemHeight: 8,
          textStyle: {
            // 图列内容样式
            color: '#F1F4F8', // 字体颜色
            fontSize: 12,
          },
        },
        tooltip: {
          show: true, // 是否显示提示框，默认为true
          trigger: 'axis', // 数据项图形触发
          axisPointer: {
            // 指示样式
            type: 'line',
            //axis: 'auto',
            show: true,
            lineStyle: {
              color: '#4D5A77',
            },
          },

          backgroundColor: '#3A455E',
          padding: 12,
          textStyle: {
            // 提示框内容的样式
            color: '#fff',
          },
          formatter: '{a0}呼叫: {c0}次 <br />{a1}呼叫: {c1}次',
        },
        dataZoom: [
          {
            show: false,
            start: 0,
            end: 100,
            //showDetail:false,
            height: '5',
            bottom: '3%',
            // handleIcon:'0',
            // handleSize:'80%',
            borderRadius: 10,
            borderColor: 'transparent',
            backgroundColor: '#283145',
            fillerColor: '#B4B9C1',
          },
        ],
        grid: {
          show: false, // 是否显示直角坐标系网格
          top: 112, // 相对位置 top\bottom\left\right
          left: 24,
          right: 24,
          bottom: 24,
          containLabel: true,
        },
        xAxis: {
          //设置x轴
          show: true, // 是否显示
          type: 'category',
          data: [],
          nameTextStyle: {
            // 坐标轴名称样式
            color: '#B4B9C1',
          },
          axisLine: {
            // 坐标轴 轴线
            lineStyle: {
              color: '#556382',
              width: 1,
              type: 'solid',
            },
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: true,
            color: '#B4B9C1',
            margin: 12,
          },
        },
        yAxis: {
          type: 'value',
          axisLine: {
            show: false,
          },
          nameTextStyle: {
            // 坐标轴名称样式
            color: '#B4B9C1',
          },
          axisLabel: {
            show: true,
            color: '#B4B9C1',
            margin: 12,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            lineStyle: {
              type: 'dashed',
              color: '#556382',
            },
          },
        },
        series: [
          {
            name: '上行',
            type: 'line',
            itemStyle: {
              // 图形的形状
              color: '#4FBDFD',
            },
            smooth: true,
            data: [],
          },
          {
            name: '下行',
            type: 'line',
            data: [],
            itemStyle: {
              // 图形的形状
              color: '#02D8A0',
            },
            smooth: true,
          },
        ],
      },
      //液压、水位统计图示例
      rainFallInit: null,
      rainFallGraphOption: {
        title: {
          show: true,
          text: '液位/水压',
          x: '24px',
          y: '24px',
          textStyle: {
            color: '#F1F4F8',
            fontSize: 16,
          },
        },
        legend: {
          show: true,
          symbol: 'circle',
          //data: ['液位(m)', '水压(MPa)'],
          x: '24px',
          y: '60px',
          textStyle: {
            // 图列内容样式
            color: '#F1F4F8', // 字体颜色
            fontSize: 12,
          },
        },
        grid: {
          show: false, // 是否显示直角坐标系网格
          top: 130, // 相对位置 top\bottom\left\right
          left: 24,
          right: 24,
          bottom: 24,
          containLabel: true,
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            animation: false,
            label: {
              backgroundColor: '#505765',
            },
          },
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            axisLine: { onZero: false },
            nameTextStyle: {
              // 坐标轴名称样式
              color: '#B4B9C1',
            },
            axisLine: {
              // 坐标轴 轴线
              lineStyle: {
                color: '#556382',
                width: 1,
                type: 'solid',
              },
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: true,
              color: '#B4B9C1',
              margin: 12,
            },
            // prettier-ignore
            data:[]
          },
        ],
        yAxis: [
          {
            name: '液位(m)',
            type: 'value',
            nameTextStyle: {
              // 坐标轴名称样式
              color: '#B4B9C1',
            },
            axisLabel: {
              show: true,
              color: '#B4B9C1',
              margin: 12,
            },
            // 网格背景线
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dashed',
                color: '#556382',
              },
            },
            axisTick: {
              show: false,
            },
          },
          {
            name: '水压(MPa)',
            nameLocation: 'start',
            type: 'value',
            alignTicks: true,
            inverse: true,
            nameTextStyle: {
              // 坐标轴名称样式
              color: '#B4B9C1',
            },
            axisLabel: {
              show: true,
              color: '#B4B9C1',
              margin: 12,
            },
            // 网格背景线
            splitLine: {
              show: false,
              interval: 'auto',
            },
            axisTick: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: '液位(m)',
            type: 'line',
            // 绘制面积样式
            areaStyle: {
              color: '#5E85FD',
              opacity: 0.4,
            },
            //smooth:true, 折现变弯曲
            itemStyle: {
              normal: {
                color: '#5E85FD',
                lineStyle: {
                  width: 1,
                  color: '#5E85FD',
                },
              },
            },
            symbol: 'circle', // 将图例设置为实心圆
            showSymbol: false, // 隐藏掉折现点
            emphasis: {
              focus: 'series',
            },
            // prettier-ignore
            data: []
          },
          {
            name: '水压(MPa)',
            type: 'line',
            yAxisIndex: 1,
            areaStyle: {
              color: '#00E2A6',
              opacity: 0.4,
            },
            itemStyle: {
              normal: {
                color: '#00E2A6',
                lineStyle: {
                  width: 1,
                  color: '#00E2A6',
                },
              },
            },
            symbol: 'circle',
            showSymbol: false,
            emphasis: {
              focus: 'series',
            },
            // prettier-ignore
            data: []
          },
        ],
      },
      rainFallGraphData: [],
      // 亮度 气泡统计图数据
      brightnessChartInit: null,
      brightnessGraphOption: {
        title: {
          show: true,
          text: '亮度（cd/m²）',
          x: '24px',
          y: '24px',
          textStyle: {
            color: '#F1F4F8',
            fontSize: 16,
          },
        },
        legend: {
          show: true,
          x: '24px',
          y: '72px',
          textStyle: {
            // 图列内容样式
            color: '#F1F4F8', // 字体颜色
            fontSize: 12,
          },
        },
        grid: {
          show: true, // 是否显示直角坐标系网格
          top: 112, // 相对位置 top\bottom\left\right
          left: 24,
          right: 24,
          bottom: 24,
          borderColor: '#323D53',
          borderWidth: 2,
          containLabel: true,
        },
        dataZoom: [
          {
            show: false,
            start: 0,
            end: 90,
            //showDetail:false,
            height: '5',
            bottom: '3%',
            // handleIcon:'0',
            // handleSize:'80%',
            borderRadius: 10,
            borderColor: 'transparent',
            backgroundColor: '#283145',
            fillerColor: '#B4B9C1',
          },
        ],
        xAxis: {
          axisLine: {
            show: false,
            // 坐标轴 轴线
            lineStyle: {
              color: '#556382',
              width: 1,
              type: 'solid',
            },
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: true,
            color: '#B4B9C1',
            margin: 12,
            interval:0
          },
          data: [],
        },
        yAxis: {
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed',
              color: '#323D53',
            },
          },
          axisLine: {
            show: false,
          },
          nameTextStyle: {
            // 坐标轴名称样式
            color: '#B4B9C1',
          },
          axisLabel: {
            show: true,
            color: '#B4B9C1',
            margin: 12,
          },
          axisTick: {
            show: false,
          },
        },
        scale: true,
      },
      brightnessGraphData: [],
      // 通风数据
      windData: [],
      // 基础照明数据
      basicLightData: [],
      // 加强照明数据
      strongerLightData: [],
      // covi 上行数据
      upcovi: {},
      // covi 下行数据
      downcovi: {},
      // 风速 上行 数据
      uptw: {},
      // 风速 下行 数据
      downtw: {},
    }
  },
  created() {
      this.setTimeOption()
  },
  mounted() {
    // 获取 隧道tab列表
    this.getTunnelClassifyAll()
  },
  watch: {
    // 监听竖形配置数据
    barGraphOption: {
      handler(newVal, oldVal) {
        if (this.barInit) {
          if (newVal) {
            this.barInit.setOption(newVal)
          } else {
            this.barInit.setOption(oldVal)
          }
        } else {
          this.echartsInit()
        }
      },
      deep: true,
    },
    // 监听竖形配置数据
    lineGraphOption: {
      handler(newVal, oldVal) {
        if (this.lineInit) {
          if (newVal) {
            this.lineInit.setOption(newVal)
          } else {
            this.lineInit.setOption(oldVal)
          }
        } else {
          this.echartsInit()
        }
      },
      deep: true,
    },
    // 监听液位/水压配置数据
    /* rainFallGraphOption: {
      handler(newVal, oldVal) {
        if (this.rainFallInit) {
          if (newVal) {
            this.rainFallInit.setOption(newVal)
          } else {
            this.rainFallInit.setOption(oldVal)
          }
        } else {
          this.echartsInit()
        }
      },
      deep: true,
    }, */
    brightnessGraphOption: {
      handler(newVal, oldVal) {
        if (this.brightnessChartInit) {
          if (newVal) {
            this.brightnessChartInit.setOption(newVal)
          } else {
            this.brightnessChartInit.setOption(oldVal)
          }
        } else {
          this.echartsInit()
        }
      },
      deep: true,
    },
  },
  methods: {
    getTunnelClassifyAll() {
      api.post('/tunnelClassify/tunnelClassifyAll').then((res) => {
        this.tunnelNameList = res || []
        if (this.tunnelNameList.length > 0) {
          this.activeTunnel = this.tunnelNameList[0].value
          this.getAllData()
        }
      })
    },
    changeTunnelHandle(item) {
      this.activeTunnel = item.value
      this.activeTime = 6
      // 获取全部数据
      this.getAllData()
    },
    setTimeOption(){
        let type = this.selectedTime.type
        this.timeOptionData.forEach(item=>{
            if(item.type === type){
                this.timeOption = item.subOption
                this.selectedTime.time = item.subOption[0].value
            }
        })
    },
    // 时间类型变动，获取它的子选项值
    typeChangeHandle(){
        this.setTimeOption()
    },
    getAllData() {
      let options = {
        tunnelClassifyId: this.activeTunnel,
        days: this.selectedTime.time,
        type: ''
      }
      if(this.selectedTime.type == 'quarter' || this.selectedTime.type == 'year'){
          options.days = 0
          options.type = this.selectedTime.time
      }
      // 获取交通流量数据
      this.getTrafficFlow(options)
      // 获取通风 次数/时长数据
      this.getWindData(options)
      // 获取基础照明 次数/时长数据
      this.getBasicLight(options)
      // 获取加强照明 次数/时长数据
      this.getStrongerLight(options)
      // 获取 紧急电话 统计图数据
      this.getUrgentPhone(options)
      // 获取亮度统计图数据
      this.getBrightnessData(options)
      // 获取 covi 风速风向表格数据
      this.getTableData(options)
      // 获取液位/水压 数据
      //this.getWaterPressure(options)
    },
    resetSearch(){
        this.selectedTime.type = 'day'
        this.setTimeOption()
        this.getAllData()
    },
    getTableData(options) {
      api.get('/dataStatisticChart/queryCoViTw', options).then((res) => {
        this.downcovi = res.downcovi
        this.downtw = res.downtw
        this.upcovi = res.upcovi
        this.uptw = res.uptw
      })
    },
    getTrafficFlow(options) {
      api.get('/dataStatisticChart/queryTraffic', options).then((res) => {
        let isdataZoom = false
        let endNum = 100
        if (res.list.length > 7) {
          isdataZoom = true
          endNum = 30
        } else {
          isdataZoom = false
          endNum = 100
        }
        this.$set(this.barGraphOption.dataZoom[0], 'show', isdataZoom)
        this.$set(this.barGraphOption.dataZoom[0], 'end', endNum)
        this.trafficFlowData.uploadNumber = res.upAllCount
        this.trafficFlowData.downNumber = res.downAllCount
        this.trafficFlowData.totalNumber = res.allCount
        let barGraphxAxisData = res.list.map((item) => {
          return item.date
        })
        let barGraphSeriesData01 = res.list.map((item) => {
          return item.uploadCount
        })
        let barGraphSeriesData02 = res.list.map((item) => {
          return item.downCount
        })
        this.$set(this.barGraphOption.xAxis, 'data', barGraphxAxisData)
        this.$set(this.barGraphOption.series[0], 'data', barGraphSeriesData01)
        this.$set(this.barGraphOption.series[1], 'data', barGraphSeriesData02)
      })
    },
    getWindData(options) {
      api.get('/dataStatisticChart/queryOperation', options).then((res) => {
        this.windData = res
      })
    },
    getBasicLight(options) {
      api.get('/dataStatisticChart/queryOperation', options).then((res) => {
        this.basicLightData = res
      })
    },
    getStrongerLight(options) {
      api.get('/dataStatisticChart/queryOperation', options).then((res) => {
        this.strongerLightData = res
      })
    },
    getCoViData(res) {
      this.coviData = res['covi']
    },
    getWindSpeed(res) {
      this.windSpeedData = res['windSpeed']
    },
    getUrgentPhone(options) {
      api.get('/dataStatisticChart/queryTelephone', options).then((res) => {
        let isdataZoom = false
        let endNum = 100
        if (res.length > 7) {
          isdataZoom = true
          endNum = 25
        } else {
          isdataZoom = false
          endNum = 100
        }
        this.$set(this.lineGraphOption.dataZoom[0], 'show', isdataZoom)
        this.$set(this.lineGraphOption.dataZoom[0], 'end', endNum)
        let lineGraphxAxisData = res.map((item) => {
          return item.date
        })
        let lineGraphSeriesData01 = res.map((item) => {
          return item.uploadCount
        })
        let lineGraphSeriesData02 = res.map((item) => {
          return item.downCount
        })
        this.$set(this.lineGraphOption.xAxis, 'data', lineGraphxAxisData)
        this.$set(this.lineGraphOption.series[0], 'data', lineGraphSeriesData01)
        this.$set(this.lineGraphOption.series[1], 'data', lineGraphSeriesData02)
      })
    },
    getWaterPressure() {
      let rainFallGraphxAxisData = [
        '08-01',
        '08-02',
        '08-03',
        '08-04',
        '08-05',
        '08-06',
        '08-07',
        '08-08',
        '08-09',
        '08-10',
      ]
      //let data1 = [1.3, 2.8, 3.3, 2.31, 2.3, 2.2, 1.3, 2.2, 2.3, 2.2]
      //let data2 = [0.3, 0.4, 0.3, 0.5, 0.3, 0.9, 0.3, 0.9, 0.3, 0.9]
      let waterLevelData = [
        0.1,
        2.1,
        3.1,
        2.1,
        3.1,
        2.1,
        3.1,
        2.1,
        2.1,
        3.1,
        3.1,
        2.1,
        2.1,
        4.1,
        2.1,
        3.1,
        4.1,
        2.3,
        2.1,
        3.7,
      ]
      let waterPressureData = [
        0.2,
        0.1,
        0.2,
        0.2,
        0.2,
        0.1,
        0.3,
        0.1,
        0.2,
        0.2,
        0.2,
        0.2,
        0.1,
        0.3,
        0.2,
        0.3,
        0.3,
        0.3,
        0.1,
        0.2,
      ]

      this.$set(
        this.rainFallGraphOption.xAxis[0],
        'data',
        rainFallGraphxAxisData
      )
      this.$set(this.rainFallGraphOption.series[0], 'data', waterLevelData)
      this.$set(this.rainFallGraphOption.series[1], 'data', waterPressureData)
    },
    getBrightnessData(options) {
      api.get('/dataStatisticChart/queryLight', options).then((res) => {
        let dateList = res.map((item) => {
          return item.date
        })
        let uploadData = res.map((item) => {
          let displayText = `洞内:${item.uploadInCount},洞外:${item.uploadOutCount}`
          return [
            item.date,
            item.uploadInCount,
            item.uploadOutCount,
            displayText,
            '上行',
          ]
        })
        let downData = res.map((item) => {
          let displayText = `洞内:${item.downInCount},洞外:${item.downOutCount}`
          return [
            item.date,
            item.downInCount,
            item.downOutCount,
            displayText,
            '下行',
          ]
        })
        let seriesData = [
          {
            name: '上行',
            data: uploadData,
            type: 'scatter',
            symbolSize: function(data) {
              return 35
            },
            emphasis: {
              focus: 'series',
              label: {
                show: true,
                fontSize: 11,
                color: '#F1F4F8',
                padding: 12,
                lineHeight: 12,
                borderRadius: 4,
                backgroundColor: '#3A455E',
                formatter: function(param) {
                  let temp = param.data[3].split(',')
                  return temp[0] + '\n\n' + temp[1]
                },
                position: 'right',
              },
            },
            tooltip: {
              padding: 5,
            },
            itemStyle: {
              color: 'rgba(79, 189, 253, 0.3)',
              borderColor: '#4FBDFD',
            },
          },
          {
            name: '下行',
            data: downData,
            type: 'scatter',
            symbolSize: function(data) {
              return 35
            },
            emphasis: {
              focus: 'series',
              label: {
                show: true,
                fontSize: 11,
                color: '#F1F4F8',
                padding: 12,
                lineHeight: 12,
                borderRadius: 4,
                backgroundColor: '#3A455E',
                formatter: function(param) {
                  let temp = param.data[3].split(',')
                  return temp[0] + '\n\n' + temp[1]
                },
                position: 'right',
              },
            },
            itemStyle: {
              color: 'rgba(0, 226, 166, 0.3)',
              borderColor: '#00E2A6',
            },
          },
        ]
        let isdataZoom = false
        let endNum = 100
        if (res.length > 7) {
          isdataZoom = true
          endNum = 18
        } else {
          isdataZoom = true
          endNum = 90
        }
        this.$set(this.brightnessGraphOption.dataZoom[0], 'show', isdataZoom)
        this.$set(this.brightnessGraphOption.dataZoom[0], 'end', endNum)
        this.$set(this.brightnessGraphOption.xAxis, 'data', dateList)
        this.$set(this.brightnessGraphOption, 'series', seriesData)
      })
    },
    echartsInit() {
      this.barInit = this.$echarts.init(document.getElementById('barChart'))
      this.barInit.setOption(this.barGraphOption)
      this.lineInit = this.$echarts.init(document.getElementById('lineChart'))
      this.lineInit.setOption(this.lineGraphOption)
      /* this.rainFallInit = this.$echarts.init(
        document.getElementById('rainFallChart')
      )
      this.rainFallInit.setOption(this.rainFallGraphOption) */
      this.brightnessChartInit = this.$echarts.init(
        document.getElementById('brightnessChart')
      )
      this.brightnessChartInit.setOption(this.brightnessGraphOption)
      let that = this
      window.addEventListener('resize', function() {
        that.barInit.resize()
        that.lineInit.resize()
        //that.rainFallInit.resize()
        that.brightnessChartInit.resize()
      })
    },
    changeTab(days) {
      this.activeTime = days
      // 获取全部数据
      this.getAllData()
    },
  },
}
</script>

<style lang="scss" scoped>
$common_bg_color: #283143;
$common_padding: 24px;
.page-content {
  background-color: transparent;
  padding: 0px;
}
.tunnelTabs {
  display: flex;
  align-items: center;
  width: 100%;
  height: 47px;
  margin-bottom: 10px;
  border-bottom: 1px solid #323d53;

  span {
    margin-right: 16px;
    font-size: 16px;
    color: #b4b9c1;
    padding: 0px 24px;
    cursor: pointer;
    display: block;
    height: 47px;
    line-height: 47px;
  }
  span:hover {
    color: #f1f4f8;
  }
  .activeSpan {
    position: relative;
    color: #f1f4f8;
    &:after {
      position: absolute;
      content: '';
      bottom: 0px;
      left: 24px;
      width: calc(100% - 48px);
      height: 1.6px;
      background-color: #3377ff;
    }
  }
}
.header {
  width: 100%;
  height: 56px;
  background-color: $common_bg_color;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 12px;
  .header_left {
    .el-select {
      margin-left: 8px;
    }
    span {
      margin-left: 12px;
    }
  }
}
.content {
  margin-top: 10px;
  height: calc(100% - 123px);
  /deep/ .el-scrollbar__wrap {
    overflow-x: hidden;
  }
  .center {
    width: 100%;
    display: flex;
    background-color: transparent;
    margin-bottom: 10px;
    .left {
      width: calc(100% - 586px);
      .leftOne {
        position: relative;
        width: 100%;
        height: 370px;
        background-color: $common_bg_color;
        .totalInfo{
            position: absolute;
            right: 24px;
            top: 72px;
            span{
                font-size: 14px;
                color: #B4B9C1;
                margin-left: 40px;
            }
        }
      }
      .leftTwo {
        margin: 10px 0px;
        height: 370px;
        width: 100%;
        background-color: transparent;
        display: flex;
        justify-content: space-between;
        .covi,
        .wind {
          width: calc(50% - 5px);
          background-color: $common_bg_color;
          padding: $common_padding;
        }
      }
      .leftThree {
        height: 391px;
        width: 100%;
        background-color: $common_bg_color;
      }
    }
    .right {
      width: 576px;
      margin-left: 10px;
      background-color: transparent;

      .rightOne {
        height: 278px;
        width: 100%;
        padding: $common_padding;
        background-color: $common_bg_color;
      }
      .rightTwo {
        margin: 10px 0px;
        height: 528px;
        width: 100%;
        padding: $common_padding;
        background-color: $common_bg_color;
      }
      .rightThree {
        height: 325px;
        width: 100%;
        background-color: $common_bg_color;
      }
    }
    .common_title {
      display: block;
      font-size: 16px;
      color: #f1f4f8;
      line-height: 24px;
    }
    .subtitle {
      margin: 12px 0px;
      font-size: 14px;
      color: #b4b9c1;
      line-height: 22px;
    }
    .tableStyle {
      width: 100%;
      height: 182px;
      border: 1px solid #323d53;
      margin-top: 24px;
      .firstRow {
        display: flex;
        width: 100%;
        height: 38px;
        line-height: 38px;
        border-bottom: 1px solid #323d53;
        div {
          width: 50%;
          text-align: center;
          &:nth-child(1) {
            border-right: 1px solid #323d53;
          }
        }
      }
      .secondRow {
        display: flex;
        padding: 24px;
        justify-content: space-around;
      }
      .commonCircle {
        width: 96px;
        height: 96px;
        background: rgba(79, 189, 253, 0.12);
        border: 1px solid #4fbdfd;
        border-radius: 50%;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;

        p:nth-child(1) {
          font-size: 12px;
          color: #4fbdfd;
          line-height: 16px;
          .number {
            font-size: 24px;
            color: #4fbdfd;
            font-weight: Bold;
            display: inline-block;
            margin-right: 4px;
          }
        }
        p:nth-child(2) {
          margin-top: 8px;
          font-size: 12px;
          color: #b4b9c1;
          line-height: 16px;
        }
        span {
        }
      }
    }
    .baseLight {
      margin-top: 0px;
      .commonCircle {
        background: rgba(254, 154, 13, 0.12);
        border: 1px solid #fe9a0d;
        p:nth-child(1) {
          color: #fe9a0d;
          .number {
            color: #fe9a0d;
          }
        }
      }
    }
    .strengthenLight {
      margin-top: 0px;
      .commonCircle {
        background: rgba(255, 52, 123, 0.12);
        border: 1px solid #ff347b;
        p:nth-child(1) {
          color: #ff347b;
          .number {
            color: #ff347b;
          }
        }
      }
    }
    .dataTable {
      margin-top: 22px;
      height: 126px;
      width: 100%;
      display: flex;
      .leftTitle {
        width: 36px;
        height: 100%;
        margin-right: 8px;
        text-align: center;
        line-height: 126px;
        box-sizing: border-box;
        color: #b4b9c1;
        border: 1px solid #323d53;
      }
      .rightContent {
        width: calc(100% - 44px);
        height: 100%;
        border: 1px solid #323d53;
        display: flex;
        box-sizing: border-box;
        justify-content: space-around;
        .column {
          flex: 1;
          text-align: center;
          .colTitle {
            background: rgba(79, 189, 253, 0.4);
            color: #4fbdfd;
            font-weight: bold;
            height: 30px;
            line-height: 30px;
          }
          .windStyle {
            background: rgba(94, 133, 253, 0.4);
            color: #5e85fd;
          }
          .colData {
            height: calc(100% - 30px);
            width: 100%;
            padding: 8px 12px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            border-right: 1px solid #323d53;
            p {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              .key {
                min-width: 62px;
                text-align: left;
                font-size: 14px;
                color: #b4b9c1;
              }
              .value {
                color: #f1f4f8;
                text-align: right;
                word-wrap: break-word;
                font-weight: bold;
              }
            }
          }
        }
      }
    }
  }
  .footer {
    height: 391px;
    width: 100%;
    margin-top: 10px;
    margin-bottom: 10px;
    background-color: $common_bg_color;
  }
  .chart-hover {
    height: 100%;
  }
}
</style>
