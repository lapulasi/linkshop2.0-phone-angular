import {Injectable} from '@angular/core';

@Injectable()
export class SortUtil {

  /**
   *分子，分母
   */
  multiDesc(numerator, denominator) {
    return function(obj1, obj2) {
      const value1 = Number(obj1.data[numerator] / obj1.data[denominator]);
      const value2 = Number(obj2.data[numerator] / obj2.data[denominator]);

      if (value1 < value2) {
        return 1;
      } else if (value1 > value2) {
        return -1;
      } else {
        return 0;
      }
    };
  }

  // 升序
  asc(propertyName) {

    return function(obj1, obj2) {
      const value1 = Number(obj1[propertyName]);
      const value2 = Number(obj2[propertyName]);

      if (value1 < value2) {
        return -1;
      } else if (value1 > value2) {
        return 1;
      } else {
        return 0;
      }
    };
  }

  // 降序
  desc(propertyName) {

    return function(obj1, obj2) {
      const value1 = Number(obj1[propertyName]);
      const value2 = Number(obj2[propertyName]);

      if (value1 < value2) {
        return 1;
      } else if (value1 > value2) {
        return -1;
      } else {
        return 0;
      }
    };
  }


  // 中位数分析（区域表现-概览）
  medianAnalysis(property: any, objList: any) {
    // 倒序
    objList.sort(this.desc(property));

    const rankData = {max: null, min: null, mid: null, midToMin: null, midToMax: null};
    if (objList && objList.length > 0) {
      const len = objList.length;
      rankData['max'] = objList[0];
      rankData['min'] = objList[len - 1];
      if (len > 2 && len % 2 > 0) { // 奇数个
        rankData['mid'] = {first: objList[Math.floor(len / 2)], second: objList[Math.floor(len / 2)]};
      } else if (len > 2 && len % 2 === 0) { // 偶数个
        rankData['mid'] = {first: objList[len / 2 - 1], second: objList[len / 2]};
      }

      if (len > 3) {
        if (len === 4) {
          rankData['midToMax'] = {first: objList[1], second: objList[1]};
          rankData['midToMin'] = {first: objList[2], second: objList[2]};
        } else {
          const val = Math.round((len - 3) / 2) % 2;
          if (val === 0) {
            rankData['midToMax'] = {first: objList[Math.round(len / 4) - 1], second: objList[Math.round(len / 4)]};
            rankData['midToMin'] = {first: objList[Math.round(len * 3 / 4) - 1], second: objList[Math.round(len * 3 / 4)]};
          } else {
            rankData['midToMax'] = {first: objList[Math.round((len + 3) / 4) - 1], second: objList[Math.round((len + 3) / 4) - 1]};
            rankData['midToMin'] = {first: objList[Math.round((3 * len + 1) / 4) - 1], second: objList[Math.round((3 * len + 1) / 4) - 1]};
          }
        }

      }
    }
    return rankData;

  }


}
