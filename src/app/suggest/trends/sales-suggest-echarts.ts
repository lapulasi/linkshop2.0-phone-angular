import {Injectable} from '@angular/core';
import {stringDistance} from 'codelyzer/util/utils';

@Injectable()

export class SalesSuggestEcharts {
  getAverageSales() {
    return {
      title: {},
      tooltip: {
        show: false,
        trigger: 'axis'
      },
      legend: {},
      grid: {
        left: '5%',
        top: '10%',
        right: '5%',
        bottom: '10%',
        containLabel: true
      },
      xAxis: {
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: '#9FA4AC',
        },
        data: ['7月', '8月', '9月', '10月', '11月', '12月', '1月', '2月']
      },
      yAxis: [{

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
            color: '#EAEDF2'
          }
        },
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
              color: '#EAEDF2'
            }
          },
        }],
      series: [{
//            name: '销量',
        type: 'line',
        smooth: true,
        data: [20, 36, 10, 20, 36, 20, 50, 20],
        showSymbol: true,
        yAxisIndex: 0,
        label: {
          normal: {
            show: true,
            position: 'top',
            formatter: this.formatter
          }
        },
        lineStyle: {
          width: 3,
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: '#6F92EA' // 0% 处的颜色
            }, {
              offset: 1, color: '#3BCBCA' // 100% 处的颜色
            }],
            globalCoord: false // 缺省为 false
          }
        }
      },
        {
          type: 'bar',
          // barWidth: '80%',
          yAxisIndex: 1,
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: '#D0DDFF' // 0% 处的颜色
              }, {
                offset: 1, color: '#A8C4F6' // 100% 处的颜色
              }],
              globalCoord: false // 缺省为 false
            }
          },
          data: [5, 20, 36, 20, 20, 10, 20, 36],
          label: {
            normal: {
              show: true,
              position: 'top',
              formatter: this.formatter
            }
          },
        }]
    };
  }

  getWeeklyAnalysis1() {
    return {
      title: {},
      tooltip: {
        show: false,
        trigger: 'axis'
      },
      legend: {},
      grid: {
        left: '0%',
        top: '10%',
        right: '0%',
        bottom: '10%',
        containLabel: true
      },
      xAxis: {
        show: true,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: [
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
            show: false
          }
        }
        ,
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
            show: false
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
            show: false
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
            show: false
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
            show: false
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
            show: false
          }
        }
      ],
      series: [
        {
          type: 'line',
          smooth: true,
          data: [],
          showSymbol: true,
          yAxisIndex: 0,
          lineStyle: {
            width: 3,
            color: '#6F92EA'
          },
          label: {
            normal: {
              show: true,
              position: 'top',
              formatter: this.formatter
            }
          },
        },
        {
          type: 'line',
          smooth: true,
          data: [],
          showSymbol: true,
          yAxisIndex: 1,
          lineStyle: {
            width: 3,
            color: '#3BCBCA'
          },
          label: {
            normal: {
              show: true,
              position: 'top',
              formatter: this.formatter

            }
          },
        },
        {
          type: 'line',
          smooth: true,
          data: [],
          showSymbol: true,
          yAxisIndex: 2,
          lineStyle: {
            width: 3,
            color: 'red'
          },
          label: {
            normal: {
              show: true,
              position: 'top',
              formatter: this.formatter

            }
          },
        },
        {
          type: 'line',
          smooth: true,
          data: [],
          showSymbol: true,
          yAxisIndex: 3,
          lineStyle: {
            width: 3,
            color: 'pink'
          },
          label: {
            normal: {
              show: true,
              position: 'top',
              formatter: this.formatter

            }
          },
        },
        {
          type: 'line',
          smooth: true,
          data: [],
          showSymbol: true,
          yAxisIndex: 4,
          lineStyle: {
            width: 3,
            color: 'green'
          },
          label: {
            normal: {
              show: true,
              position: 'top',
              formatter: this.formatter1

            }
          },
        },
        {
          type: 'line',
          smooth: true,
          data: [],
          showSymbol: true,
          yAxisIndex: 5,
          lineStyle: {
            width: 3,
            color: 'black'
          },
          label: {
            normal: {
              show: true,
              position: 'top',
              formatter: this.formatter

            }
          },
        }
      ]
    };
  }

  getWeeklyAnalysis2() {
    return {
      title: {},
      tooltip: {
        show: false,
        trigger: 'axis'
      },
      legend: {},
      grid: {
        left: '5%',
        top: '10%',
        right: '5%',
        bottom: '10%',
        containLabel: true
      },
      xAxis: {
        // show: false,
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: '#9FA4AC'
        },
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {
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
          lineStyle: {
            color: '#EAEDF2'
          }
        },
      },
      series: [{
        type: 'bar',
        // barWidth: '80%',
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: '#D0DDFF' // 0% 处的颜色
            }, {
              offset: 1, color: '#A8C4F6' // 100% 处的颜色
            }],
            globalCoord: false // 缺省为 false
          }
        },
        data: [20, 36, 18, 10, 20, 26, 30]
      }]
    };
  }

  getSalesCompetitiveness() {
    return {
      title: {},
      tooltip: {
        show: false,
        trigger: 'axis'
      },
      legend: {},
      grid: {
        left: '5%',
        top: '15%',
        right: '5%',
        bottom: '5%',
        containLabel: true
      },
      xAxis: {
        name: '转化率',
        nameGap: -25,
        nameTextStyle: {
          color: '#9FA4AC'
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#EAEDF2'
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false
        },
        splitLine: {
          show: false
        }
        // data: ["7月", "8月", "9月", "10月", "11月", "12月", "1月", "2月"]
      },
      yAxis: {
        name: '销售额',
        show: true,
        nameGap: 5,
        nameTextStyle: {
          color: '#9FA4AC'
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#EAEDF2'
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false
        },
        splitLine: {
          show: false
        }
      },
      series: [{
//            name: '销量',
        type: 'scatter',
        symbolSize: 20,
        label: {
          color: '#fff',
          emphasis: {
            show: true,
            formatter: function (param) {
              return param.name;
            },
            position: 'top'
          },
          backgroundColor: '#FF7474',
          padding: 8,
          borderRadius: 5
        },

        data: [],
        itemStyle: {
          color: '#6F92EA'
        },
        tooltip: {
          formatter: '{b}',
          borderWidth: 5
        }
      }]
    };
  }

  formatter(param): string {
    if (param.value >= 1000) {
      return Math.floor(param.value / 1000) + 'k';
      // return parseFloat((param.value / 1000) + '').toFixed(2) + 'k';
    } else {
      return Math.floor(param.value) + '';
    }
  }

  formatter1(param): string {/*转化率的格式化*/
    return (param.value * 100).toFixed(2) + '%';
  }
}


