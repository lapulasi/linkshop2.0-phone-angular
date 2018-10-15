import {DatePipe} from '@angular/common';

export class DateUtil {

  // 格式化日期
  formatDate(date: any) {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(date, 'yyyy-MM-dd');
  }

  getRangeDate(range: number, type?: string) {

    const formatDate = (time: any) => {
      // 格式化日期，获取今天的日期
      const Dates = new Date(time);
      const year: number = Dates.getFullYear();
      const month: any = ( Dates.getMonth() + 1 ) < 10 ? '0' + ( Dates.getMonth() + 1 ) : ( Dates.getMonth() + 1 );
      const day: any = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();
      return year + '-' + month + '-' + day;
    };

    const now = formatDate(new Date().getTime()); // 当前时间
    const resultArr: Array<any> = [];
    let changeDate: string;
    if (range) {
      if (type) {
        if (type === 'one') {
          changeDate = formatDate(new Date().getTime() + ( 1000 * 3600 * 24 * range ));
          console.log(changeDate);
          return changeDate;
        }
        if (type === 'more') {
          if (range < 0) {
            for (let i = Math.abs(range); i >= 0; i--) {
              resultArr.push(formatDate(new Date().getTime() + ( -1000 * 3600 * 24 * i )));
              // console.log(resultArr);
            }
          } else {
            for (let i = 1; i <= range; i++) {
              resultArr.push(formatDate(new Date().getTime() + ( 1000 * 3600 * 24 * i )));
              // console.log(resultArr);
            }
          }
          return resultArr;
        }
      } else {
        changeDate = formatDate(new Date().getTime() + ( 1000 * 3600 * 24 * range ));
        // console.log( changeDate );
        return changeDate;
      }
    }
  }

  getQueryString(name) {
    const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    const r = window.location.search.substr(1).match(reg);
    if (r != null) {
      return decodeURI(r[2]);
    }
    return null;
  }

  getWeekByDay(dayValue) { // dayValue='2014-01-01'
    const day = new Date(Date.parse(dayValue.replace(/-/g, '/'))); // 将日期值格式化
    const today = new Array('日', '一', '二', '三', '四', '五', '六'); // 创建周数组
    // console.log(today[day.getDay()])
    return today[day.getDay()];  // 返一个周中的某一天，其中0为周日
  }

}
