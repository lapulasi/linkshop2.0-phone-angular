import {Injectable} from '@angular/core';
import {Globals} from "../../global";

@Injectable()

export class CustomerTrendsEcharts {
  constructor(private globals: Globals){}
  getTrendLine(dates, weekAxis, passengerTraffic, shopTraffic, averageDwellTime) {
    /*console.log(dates)
    console.log(weekAxis)*/
    /*console.log(passengerTraffic)
    console.log(shopTraffic)
    console.log(averageDwellTime)*/
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
            that.globals.customerTrendIndex = params[0].dataIndex;
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
      xAxis: [
        {
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#9FA4AC'
          },
          data: dates
        },
        {
          offset: -2,
          axisTick: {
            show: false
          },
          axisLabel: {
            // color: '#9FA4AC',
            color: function (value, index) {
              return (value == '六' || value=='日') ? '#FF7474' : '#9FA4AC';
            }

          },
          data: weekAxis
        }
      ],
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
        data: shopTraffic,
        showSymbol: false,
        yAxisIndex: 0,
        lineStyle: {
          width: 3,
          color: '#FF7474'
        },
      },
        {
//                name: '销量',
          type: 'line',
          smooth: true,
          data: passengerTraffic,
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
          data: averageDwellTime
        }]
    };
  }
}
