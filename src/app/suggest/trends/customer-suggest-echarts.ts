import {Injectable} from '@angular/core';

@Injectable()

export class CustomerSuggestEcharts {
  getPeopleStructure() {
    return {
      tooltip : {
        trigger: 'item',
        formatter: '{b} : {c} ({d}%)'
      },
      grid: {
        left: '5%',
        top: '15%',
        right: '5%',
        bottom: '5%',
        containLabel: true
      },
      color: ['#5599FF', '#3BCBCA', '#FCC50A', '#FF7474', '#A14BEC', '#605C72'],
      legend: {
        orient: 'vertical',
        x: '70%',
        y: 30,
        itemWidth: 10,
        itemHeight: 10,
        textStyle: {
          color: '#A4A9B3'
        },
        data: [
          {name: '男 20-30岁', icon: 'rect'},
          {name: '男 30-40岁', icon: 'rect'},
          {name: '男 40-50岁', icon: 'rect'},
          {name: '女 20-30岁', icon: 'rect'},
          {name: '女 30-40岁', icon: 'rect'},
          {name: '其他', icon: 'rect'}
        ],
        formatter: function (name) {
          return window['echarts']['format'].truncateText(name, 100, '14px Microsoft Yahei', '…');
        },
        tooltip: {
          show: true
        }
      },
      series:
        {
          name: '访问来源',
          type: 'pie',
          center: ['35%', '50%'],
          radius: ['0%', '60%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: true,
              position: 'outside',
              formatter: '{d}%'
            },
            emphasis: {
              show: false,
              textStyle: {
                fontSize: '30',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            show: true,
            length: 10,
            length2: 5
          },
          data: []
        }

    };
  }

  getCustomMaxTime() {
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
        bottom: '5%',
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
        data: ['16-17点', '17-18点', '18-19点', '15-16点', '14-15点', '19-20点']
      },
      yAxis: {
        position: 'right',
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false,
          color: '#9FA4AC',
          formatter: '{value}人'
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#EAEDF2'
          }
        }
      },
      series:
        {
          type: 'bar',
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: '#6F92EA' // 0% 处的颜色
              }, {
                offset: 1, color: '#A8C4F6' // 100% 处的颜色
              }],
              globalCoord: false // 缺省为 false
            }
          },
          data: [],
          label: {
            normal: {
              show: true,
              position: 'top',
              formatter: function (param): string {
                return (param.value * 100).toFixed(1) + '%';
              }

            }
          },
        }
    };
  }

  getCustomerShopTrend() {
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
      series: {
        type: 'line',
        smooth: true,
        data: [],
        showSymbol: true,
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
        label: {
          normal: {
            show: true,
            position: 'top',
            formatter: function (param): string {
              return param.value;
            }
          }
        },
      }
    };
  }

  getCustomLongTime() {
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
        bottom: '5%',
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
        data: ['16-17点', '17-18点', '18-19点', '15-16点', '14-15点', '19-20点']
      },
      yAxis: {
        position: 'right',
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false,
          color: '#9FA4AC',
          formatter: '{value}人'
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#EAEDF2'
          }
        }
      },
      series:
        {
          type: 'bar',
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: '#6F92EA' // 0% 处的颜色
              }, {
                offset: 1, color: '#A8C4F6' // 100% 处的颜色
              }],
              globalCoord: false // 缺省为 false
            }
          },
          data: [],
          label: {
            normal: {
              show: true,
              position: 'top',
              formatter: function (param): string {
                return (param.value ).toFixed(2) + '分';
              }

            }
          },
        }
    };
  }

  getShopFlowRatio() {
    return {
      tooltip : {
        trigger: 'item',
        formatter: '{b} : {c} ({d}%)'
      },
      grid: {
        left: '5%',
        top: '15%',
        right: '5%',
        bottom: '5%',
        containLabel: true
      },
      legend: {
        orient: 'vertical',
        x: '70%',
        y: 30,
        itemWidth: 10,
        itemHeight: 10,
        textStyle: {
          color: '#A4A9B3'
        },
        data: [],
        formatter: function (name) {
          return window['echarts']['format'].truncateText(name, 100, '14px Microsoft Yahei', '…');
        },
        tooltip: {
          show: true
        }
      },
      series:
        {
          name: '访问来源',
          type: 'pie',
          center: ['35%', '50%'],
          radius: ['0%', '60%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: true,
              position: 'outside',
              formatter: '{d}%'
            },
            emphasis: {
              show: false,
              textStyle: {
                fontSize: '30',
                fontWeight: 'bold'
              }
            },

          },
          labelLine: {
            show: true,
            length: 10,
            length2: 5
          },
          data: []
        }

    };
  }
}
