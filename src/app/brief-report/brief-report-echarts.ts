import {Injectable} from '@angular/core';

@Injectable()

export class BriefReportEcharts {
  getSalesShort(salesVolume, salesAmount, dataAxis, weekAxis) {
    // 基于准备好的dom，初始化echarts实例

    return {
      title: {},
      tooltip: {/*鼠标点击效果*/
        show: false,
        trigger: 'axis',
        showContent: false/*去掉浮层框*/
      },
      legend: {
        data: [{name: '销量', icon: 'image://../assets/images/line-green.png', textStyle: {color: '#9FA4AC'}}, {name: '销额(K)', icon: 'image://../assets/images/line-purple.png', textStyle: {color: '#9FA4AC'}}]
      },
      grid: {
        left: '1%',
        top: '12%',
        right: '1%',
        bottom: '10%',
        containLabel: true
      },
      xAxis: [
        {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#9FA4AC'
          },
          data: dataAxis
        },
        {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            margin: 18,
            color: '#9FA4AC'
          },
          data: weekAxis
        }
      ],
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
            show: false,
            lineStyle: {
              color: '#F5F6F8'
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
            show: true,
            lineStyle: {
              color: '#F5F6F8'
            }
          },
        }
      ],
      series: [{
           name: '销量',
        type: 'line',
        smooth: true,
        data: salesVolume,
        yAxisIndex: 0,
        label: {
          show: true,
          position: 'top'
        },

        lineStyle: {
          normal: {
            width: 3,
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: '#3BCBCA' // 0% 处的颜色
              }, {
                offset: 1, color: '#6F92EA' // 100% 处的颜色
              }],
              globalCoord: false // 缺省为 false
            }

          }
        },
      },
        {
               name: '销额(K)',
          type: 'line',
          smooth: true,
          data: salesAmount,
          yAxisIndex: 1,
          label: {
            show: true,
            position: 'top'
          },
          lineStyle: {
            normal: {
              width: 3,
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: '#A14BEC' // 0% 处的颜色
                }, {
                  offset: 1, color: '#FF7474' // 100% 处的颜色
                }],
                globalCoord: false // 缺省为 false
              }

            }
          },
        }]
    };
  }

  getFlowShort(guestCount, guestStayMins, dataAxis, weekAxis) {
    return {
      title: {},
      tooltip: {/*鼠标点击效果*/
        show: false,
        trigger: 'axis',
        showContent: false/*去掉浮层框*/
      },
      legend: {
        data: [{name: '客流', icon: 'image://../assets/images/line-green.png', textStyle: {color: '#9FA4AC'}}, {name: '客流涨幅', icon: 'image://../assets/images/line-purple.png', textStyle: {color: '#9FA4AC'}}]
      },
      grid: {
        left: '1%',
        top: '12%',
        right: '1%',
        bottom: '10%',
        containLabel: true
      },
      xAxis: [
        {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#9FA4AC'
          },
          data: dataAxis
        },
        {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            margin: 18,
            color: '#9FA4AC'
          },
          data: weekAxis
        }
      ],
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
            show: false,
            lineStyle: {
              color: '#F5F6F8'
            }
          },
        }/*,
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
              color: '#F5F6F8'
            }
          },
        }*/
      ],
      series: [{
           name: '客流',
        type: 'line',
        smooth: true,
        data: guestCount,
        yAxisIndex: 0,
        label: {
          show: true,
          position: 'top'
        },
        lineStyle: {
          normal: {
            width: 3,
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: '#3BCBCA' // 0% 处的颜色
              }, {
                offset: 1, color: '#6F92EA' // 100% 处的颜色
              }],
              globalCoord: false // 缺省为 false
            }

          }
        },
      },
        {
               name: '客流涨幅',
          type: 'line',
          smooth: true,
          data: guestStayMins,
          yAxisIndex: 0,
          label: {
            show: true,
            position: 'top'
          },
          lineStyle: {
            normal: {
              width: 3,
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: '#A14BEC' // 0% 处的颜色
                }, {
                  offset: 1, color: '#FF7474' // 100% 处的颜色
                }],
                globalCoord: false // 缺省为 false
              }

            }
          },
        }]
    };
  }

  getOnTheJob(workTimeList, dataAxis, weekAxis) {
    return {
      title: {},
      tooltip: {/*鼠标点击效果*/
        show: false,
        trigger: 'axis',
        showContent: false/*去掉浮层框*/
      },
      legend: {},
      grid: {
        left: '1%',
        top: '1%',
        right: '1%',
        bottom: '10%',
        containLabel: true
      },
      xAxis: [
        {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#9FA4AC'
          },
          data: dataAxis
        },
        {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            margin: 18,
            color: '#9FA4AC'
          },
          data: weekAxis
        }
      ],
      yAxis: {
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
            color: '#F5F6F8'
          }
        },
      },
      series: [{
//            name: '销量',
        type: 'line',
        smooth: true,
        data: workTimeList,
        label: {
          show: true,
          position: 'top'
        },
        lineStyle: {
          normal: {
            width: 3,
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: '#3BCBCA' // 0% 处的颜色
              }, {
                offset: 1, color: '#6F92EA' // 100% 处的颜色
              }],
              globalCoord: false // 缺省为 false
            }

          }
        },
      }]
    };
  }

  getNormalRate(normalRateData, dataAxis, weekAxis) {
    return {
      title: {},
      tooltip: {/*鼠标点击效果*/
        show: false,
        trigger: 'axis',
        /*showContent: false*//*去掉浮层框*/
      },
      legend: {},
      grid: {
        left: '1%',
        top: '1%',
        right: '1%',
        bottom: '10%',
        containLabel: true
      },
      xAxis: [
        {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#9FA4AC'
          },
          data: dataAxis
        },
        {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            margin: 18,
            color: '#9FA4AC'
          },
          data: weekAxis
        }
      ],
      yAxis: {
        min: 0,
        max: 1,
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
            color: '#F5F6F8'
          }
        },
      },
      series: [
        {
//                name: '销量',
          type: 'line',
          smooth: true,
          data: normalRateData,
          label: {
            show: true,
            position: 'top'
          },
          lineStyle: {
            normal: {
              width: 3,
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: '#A14BEC' // 0% 处的颜色
                }, {
                  offset: 1, color: '#FF7474' // 100% 处的颜色
                }],
                globalCoord: false // 缺省为 false
              }

            }
          },
        }]
    };
  }
}
