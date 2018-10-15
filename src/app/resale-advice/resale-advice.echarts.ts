import {Injectable} from '@angular/core';

@Injectable()

export class ResaleAdviceEcharts {
  getRadarChart(score) {
    return {
      title: {},
      tooltip: {},
      legend: {},
      grid: {
        backgroundColor: 'red'
      },
      radar: {
        // shape: 'circle',
        name: {
          textStyle: {
            color: '#95949D',
          }
        },
        nameGap: 5,
        shape: 'circle',
        radius: '58%',
        axisLine: {            // 坐标轴线
          /*show: false    */    // 默认显示，属性show控制显示与否
          lineStyle: {
            color: '#95949D',
            opacity: 0.2
          }
        },
        splitArea: {
          show: true,
          areaStyle: {
            color: ['transparent']  // 图表背景网格的颜色
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            width: 1,
            color: '#95949D', // 图表背景网格线的颜色
            opacity: 0.2
          }
        },
        indicator: [
          {name: '平均转化率', max: 20}, /*#95949D*/
          {name: '均价', max: 20},
          {name: '店均客流', max: 20},
          {name: '平均人效', max: 20},
          {name: '平均坪效', max: 20},
        ]
      },
      series: [{
        type: 'radar',
        // areaStyle: {normal: {}},
        data: [
          {
            value: [
              score.transformRatioScore, score.avgPriceScore, score.avgGuestCountScore, score.avgPersonEfficacyScore, score.avgAreaEfficacyScore],
            itemStyle: {
              normal: {
                areaStyle: {
                  type: 'default',
                  opacity: 0.8, // 图表中各个图区域的透明度
                  color: '#1686c2' // 图表中各个图区域的颜色
                }
              }
            },
            lineStyle: {
              opacity: 0 // 隐藏线条
            },
            areaStyle: {
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
            // name : '预算分配（Allocated Budget）'
          }/*,
            {
                value : [5000, 14000, 28000, 21000, 12000],
                // name : '实际开销（Actual Spending）'
            }*/
        ]
      }]
    };
  }
}
