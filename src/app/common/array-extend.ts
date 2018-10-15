import { DateTimeFormatter, LocalDate} from 'js-joda';

export {};
declare global {
  interface Array<T> {
    // bucket(callback: (...args) => any): any;
    groupBy(key: string): Group[];
    flatten(): Array<any>;
  }

  // interface LocalDate {
  //   format(formatter?: DateTimeFormatter): string;
  // }


}

interface Group {
  key: string;
  values: Array<any>;
}

Array.prototype.groupBy = function (key: string) {
  const groupByObj = {};
  for (const item of this) {
    if (!(item[key] in groupByObj)) {
      groupByObj[item[key]] = new Array<any>();
    }
    (<Array<any>>groupByObj[item[key]]).push(item);
  }
  const result = new Array<Group>();
  return Object.entries(groupByObj).map(([k, v]) => (<Group>{key: k, values: v}));
};

Array.prototype.flatten = function () {
  return this.reduce((previousValue, currentValue) =>
    previousValue.concat(Array.isArray(currentValue) ? currentValue.flatten() : currentValue),
    []);
};

// const oldFormatFunction = LocalDate.prototype.format;
// LocalDate.prototype.format = function (formatter?: DateTimeFormatter) {
//   console.log('11111');
//   if (!formatter) {
//     return oldFormatFunction.call(this, DateTimeFormatter.ISO_LOCAL_DATE);
//   }
//   return oldFormatFunction.call(this, formatter);
// };

