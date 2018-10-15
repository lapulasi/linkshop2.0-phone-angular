import {Injectable} from '@angular/core';

@Injectable()

export class StoreSuggestEcharts {
  getGrowthTrendBar() {
    const echartsWidth = document.getElementById('growth-trend-bar').clientWidth;
    const echartsHeight = document.getElementById('growth-trend-bar').clientHeight;
    return {
      title: {},
      tooltip: {
        show: false,
        trigger: 'axis'
      },
      legend: {
        show: false,
        data: ['areaEffect', 'staffEffect', 'collectGuestEffect', 'workMins', 'managerAccessCount', 'serviceEffect'],
        selected: {'areaEffect': false,
          'staffEffect': false,
          'collectGuestEffect': false,
          'workMins': false,
          'managerAccessCount': false,
          'serviceEffect': false
        }
      },
      grid: {
        left: '-5%',
        top: '10%',
        right: '0%',
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
        data: []
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
          name: 'areaEffect',
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
          name: 'staffEffect',
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
          name: 'collectGuestEffect',
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
          name: 'workMins',
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
          name: 'managerAccessCount',
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
              formatter: this.formatter

            }
          },
        },
        {
          name: 'serviceEffect',
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
      ],
      graphic: {
        id: 'draggable',
        type: 'rect',
        $action: 'replace',
        left: 0,
        top: 0,
        invisible: true,
        draggable: false,
        shape: {
          x: 0,
          y: 0,
          width: echartsWidth,
          height: echartsHeight
        }
      },
      dataZoom: [
        {   // 这个dataZoom组件，默认控制x轴。
          type: 'inside', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
          startValue: 0,
          endValue: 8,
          zoomLock: true
        }
      ]
    };
  }

  getGrowthTrendLine() {
    return {
      title: {},
      tooltip: {
        show: false,
        trigger: 'axis'
      },
      legend: {},
      grid: {
        left: '-5%',
        top: '10%',
        right: '0%',
        bottom: '10%',
        containLabel: true
      },
      xAxis: {
        show: false,
        data: ['12.06', '12.07', '12.08', '12.09', '12.10', '12.11', '12.12', '12.13', '12.14', '12.15', '12.16', '12.17', '12.18', '12.19', '12.20']
      },
      yAxis: {show: false},
      series: [{
//            name: '销量',
        type: 'line',
        smooth: true,
        data: [5, 20, 36, 10, 10, 20, 36, 10, 10, 10, 10, 20, 20, 50, 20],
        showSymbol: false,
        yAxisIndex: 0,
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
        },
      },
        {
//                name: '销量',
          type: 'line',
          smooth: true,
          data: [15, 20, 26, 30, 20, 50, 20, 26, 30, 30, 20, 50, 20, 26, 30],
          showSymbol: false,
          yAxisIndex: 0,
          lineStyle: {
            width: 3,
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: '#FF7474' // 0% 处的颜色
              }, {
                offset: 1, color: '#A14BEC' // 100% 处的颜色
              }],
              globalCoord: false // 缺省为 false
            }
          },
        }]
    };
  }

  getDayService() {
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
        right: '8%',
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
          color: '#9FA4AC'
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#EAEDF2'
          }
        },
        data: ['8点', '10点', '12点', '14点', '16点', '18点', '20点', '22点']
      },
      yAxis: {
        show: false
      },
      series: [{
//            name: '销量',
        type: 'line',
        smooth: true,
        data: [5, 20, 36, 10, 20, 20, 50, 20],
        showSymbol: false,
        yAxisIndex: 0,
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
      }]
    };
  }

  getGrowthTrend() {
    return {
      title: {},
      tooltip: {
        show: false,
        trigger: 'axis'
      },
      legend: {},
      grid: {
        left: '3%',
        top: '10%',
        right: '4%',
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
          color: '#9FA4AC',
          formatter: '{value}h'
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#EAEDF2'
          }
        },
        min: 1,
        max: 10,
        splitNumber: 9,
        // data: ["1h", "2h", "3h", "4h", "5h", "6h", "7h", "8h", "9h", "10h"]
      },
      yAxis: {
        type: 'category',
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: '#9FA4AC'
        },
        data: ['白石洲店', '大冲店', '科技园店', '南油店', '桃园店', '世界之窗店', '海岸城店']
      },
      series: [{
        type: 'bar',
        // barWidth: '80%',
        itemStyle: {
          color: '#6F92EA'
        },
        data: [6.4, 6.6, 7.2, 7.6, 8.4, 9.4, 9.7]
      }]
    };
  }

  formatter(param): string {
    return (param.value * 100).toFixed(2) + '%';


    // if (param.value >= 1000) {
    //   return Math.floor(param.value / 1000) + 'k';
    // } else {
    //   return Math.floor(param.value) + '';
    // }
  }
}
