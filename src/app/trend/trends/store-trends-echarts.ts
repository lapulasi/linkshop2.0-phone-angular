import {Injectable} from '@angular/core';
import {Globals} from "../../global";

@Injectable()

export class StoreTrendsEcharts {
  constructor(private globals: Globals) {
  };

  getStoreTrend1(dates, weekAxis, pingEffect, humanEffect, flowCapacity) {
    /*console.log(dates)
    console.log(pingEffect)
    console.log(humanEffect)
    console.log(flowCapacity)*/
    const that = this;
    const tempNum = 19 / dates.length;
    const endPercent = (tempNum * 100 >= 100) ? 0 : (tempNum > 0.7 ? (tempNum - 0.3) : tempNum) * 100;
    const barWidth = dates.length > 10 ? '80%' : '50%';
    return {
      title: {},
      tooltip: {
        /*鼠标点击效果*/
        show: true,
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'line' // 默认为直线，可选为：'line' | 'shadow'
        },
        formatter: function (params) {
          if (params.length > 0) {
            that.globals.storeTrendIndex = params[0].dataIndex;
          }
        },
      },
      legend: {},
      grid: {
        left: '0%',
        top: '0%',
        right: '0%',
        bottom: '10%',
        containLabel: true
      },
      dataZoom: [{
        type: 'inside',
        show: true,
        xAxisIndex: [0, 1],
        start: 100,
        end: endPercent
      }],
      xAxis: [{
        axisTick: {
          show: false
        },
        axisLabel: {
          color: '#9FA4AC'
        },
        data: dates
      },
        {
          axisTick: {
            show: false
          },
          axisLabel: {
            color: function (value, index) {
              return (value == '六' || value=='日') ? '#FF7474' : '#9FA4AC';
            }
          },
          data: weekAxis
        }],
      yAxis: [{
        // show: false
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false
        },
        splitLine: {
          show: true,
          lineStyle:
            {
              color: '#312D3F'
            }
        },
        splitArea: {
          show: true,
          areaStyle:
            {
              color: '#2C293B'
            }
        }
      },
        {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#312D3F'
            }
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: '#2C293B'
            }
          }
        },
        {
          // show: false
          axisLine: {
            show: false
          },
          axisLabel: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#312D3F'
            }
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: '#2C293B'
            }
          }
        }],
      series: [{
//            name: '销量',
        type: 'line',
        smooth: true,
        data: humanEffect,
        showSymbol: false,
        yAxisIndex: 0,
        lineStyle: {
          width: 3,
          color: '#6F92EA'
        },
      },
        {
//                name: '销量',
          type: 'line',
          smooth: true,
          data: pingEffect,
          showSymbol: false,
          yAxisIndex: 1,
          lineStyle: {
            width: 3,
            color: '#3BCBCA'
          },
        },
        {
          type: 'bar',
          barWidth: barWidth,
          // barMaxWidth: '80%',
          yAxisIndex: 2,
          itemStyle: {
            color: '#3B394C'
          },
          data: flowCapacity
        }]
    };
  }

  getStoreTrend4(dates, weekAxis, quanArrive, serviceAbility, workTime) {
    const that = this;
    const tempNum = 19 / dates.length;
    const endPercent = (tempNum * 100 >= 100) ? 0 : (tempNum > 0.7 ? (tempNum - 0.3) : tempNum) * 100;
    const barWidth = dates.length > 10 ? '80%' : '50%';
    return {
      title: {},
      tooltip: {
        /*鼠标点击效果*/
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'line' // 默认为直线，可选为：'line' | 'shadow'
        },
        formatter: function (params) {
          if (params.length > 0) {
            that.globals.storeTrendIndex1 = params[0].dataIndex;
          }
        },
      },
      legend: {},
      grid: {
        left: '0%',
        top: '0%',
        right: '0%',
        bottom: '10%',
        containLabel: true
      },
      dataZoom: [{
        type: 'inside',
        show: true,
        xAxisIndex: [0, 1],
        start: 100,
        end: endPercent
      }],
      xAxis: [{
        axisTick: {
          show: false
        },
        axisLabel: {
          color: '#9FA4AC'
        },
        data: dates
      },
        {
          axisTick: {
            show: false
          },
          axisLabel: {
            color: function (value, index) {
              return (value == '六' || value=='日') ? '#FF7474' : '#9FA4AC';
            }
          },
          data: weekAxis
        }],
      yAxis: [{
        // show: false
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false
        },
        splitLine: {
          show: false,
          lineStyle:
            {
              color: '#312D3F'
            }
        },
        splitArea: {
          show: false,
          areaStyle:
            {
              color: '#2C293B'
            }
        }
      },
        {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: '#312D3F'
            }
          },
          splitArea: {
            show: false,
            areaStyle: {
              color: '#2C293B'
            }
          }
        },
        {
          // show: false
          axisLine: {
            show: false
          },
          axisLabel: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#312D3F'
            }
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: '#2C293B'
            }
          }
        }],
      series: [{
//            name: '销量',
        type: 'line',
        smooth: true,
        data: quanArrive,
        showSymbol: false,
        yAxisIndex: 0,
        lineStyle: {
          width: 3,
          color: '#A14BEC'
        },
      },
        {
//                name: '销量',
          type: 'line',
          smooth: true,
          data: workTime,
          showSymbol: false,
          yAxisIndex: 1,
          lineStyle: {
            width: 3,
            color: '#FCC50A'
          },
        },
        {
          type: 'bar',
          barWidth: barWidth,
          yAxisIndex: 2,
          itemStyle: {
            color: '#3B394C'
          },
          data: serviceAbility
        }]
    };
  }
}
