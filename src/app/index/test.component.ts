import {Component} from '@angular/core';
import {WebHttpClient} from '../web.httpclient';
import {forkJoin} from 'rxjs/observable/forkJoin';
import {of} from 'rxjs/observable/of';
import {interval} from 'rxjs/observable/interval';
import {delay, take, concatMap, map, combineAll} from 'rxjs/operators';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import {SortUtil} from '../common/sort-util';

declare var AMap: any;

@Component({
  template: `
    <button (click)="updateDistrictGeo()">updateDistrictGeo</button>
    <!--<button (click)="testHttp()">test</button>-->
    <!--<button (click)='test()'>testH5数据</button><br/>-->
  <!--<button (click)='updateAdcode()'>更新adcode</button>-->
  <!--<button (click)='testForkjoin()'>test forkjoin</button>-->
  <!--<button (click)='testAsync()'>test async</button>-->
  <!--<button (click)='testCombineAll()'>test combineAll</button>-->
    <!--<button (click)='testSort()'>test sort</button>-->
  `
})

export class TestComponent {

  amapKey = 'e36db2ad3312a433e47167f7c831eda9';
  amapWeatherUrl = 'http://restapi.amap.com/v3/geocode/geo?key=' + this.amapKey;


  constructor(private http: WebHttpClient, private sortUtil: SortUtil) {}

  updateDistrictGeo() {
    const that = this;
    this.http.get('/org/provinces', null).subscribe(data => {
      data.forEach(item => {
        console.log(item);
        AMap.service('AMap.DistrictSearch', function () {
          new AMap.DistrictSearch().search(item.code, function (status, result) {
            console.log(result);
            // const geo = result.districtList[0].center.lng + ',' + result.districtList[0].center.lat;
            // // console.log(item.code, geo);
            // that.http.get('/org/provinces/geo', {code: item.code, geo: geo}).subscribe();
          });
        });
      });


    });

  }

  testHttp() {
    this.http.get('/user/',
      {access_token: 'c794062d-0908-46e4-bb1d-595a9f28b023', phone: '15321660372'}).subscribe(data => {
      console.log(data);
    });

    // http://localhost:9090/oauth/token?grant_type=password&scope=read&client_id=adminUser&client_secret=sec3333&username=15321660372&password=666666
    // this.http.post('/oauth/token?grant_type=password&scope=read&client_id=adminUser&client_secret=sec3333&username=15321660372&password=666666').subscribe(data => {
    //   console.log(data);
    // });
  }

  test() {
    const that = this;

//       AMap.convertFrom([120.361817, 36.088231], 'baidu', function (status, data) {
//
//         const lng = data.locations[0].lng;
//         const lat = data.locations[0].lat;
//         const location = lng + ',' + lat;
// console.log(location);
//       });


    // const arr = [
    //   {id: 1217, geo: [114.121192, 22.547112]},
    //   {id: 1218, geo: [114.122359, 22.546729]},
    //   {id: 1220, geo: [114.02626, 22.532665]},
    //   {id: 1219, geo: [114.121192, 22.547112]},
    //   {id: 1221, geo: [114.021642, 22.535917]}
    // ];
    //
    // for (const item of arr) {
    //   AMap.convertFrom(item.geo, 'baidu', function (status, data) {
    //     const lng = data.locations[0].lng;
    //     const lat = data.locations[0].lat;
    //     const location = lng + ',' + lat;
    //
    //     console.log(location);
    //     that.http.get('/org/update', {orgId: item.id, geo: location}).subscribe(info => {
    //       console.log(info);
    //     });
    //
    //   });
    // }


    // this.http.get('/org/list/new', null).subscribe(result => {
    //   for (const org of result) {
    //     that.http.get('http://localhost:9895/index/org', {orgId: org.id}).subscribe(res => {
    //       const id = res.id;
    //       const geo = res.geoCoord.split(',', 2);
    //       AMap.convertFrom(geo, 'baidu', function (status, data) {
    //         const lng = data.locations[0].lng;
    //         const lat = data.locations[0].lat;
    //         const location = lng + ',' + lat;
    //
    //         that.http.get('/org/update', {orgId: id, geo: location}).subscribe(info => {
    //             console.log(info);
    //         });
    //
    //       });
    //     });
    //   }
    //
    // });

    // AMap.convertFrom([114.028095,22.542058], 'baidu', function (status, data) {
    //   const lng = data.locations[0].lng;
    //   const lat = data.locations[0].lat;
    //   const location = lng + ',' + lat;
    //
    //   console.log(lng, lat);
    //
    //   // that.http.get('/org/update', {orgId: id, geo: location}).subscribe(info => {
    //   //   console.log(info);
    //   // });
    //
    // });

    this.http.get('/org/avc/list', null).subscribe(data => {
      for (const org of data) {
        // console.log(org);
        AMap.service('AMap.Geocoder', function() {
          new AMap.Geocoder({}).getAddress(org.geo, function(status, result) {
            let name = result.regeocode.addressComponent.district;
            if (org.orgLevel.level < 3) {
              name = result.regeocode.addressComponent.province;
            } else if (org.orgLevel.level === 3) {
              const city = result.regeocode.addressComponent.city;
              name = city === '' ? result.regeocode.addressComponent.province : city;
            }
            // console.log(name);

            // console.log(name);
            AMap.service('AMap.DistrictSearch', function() {
              new AMap.DistrictSearch().search(name, function( sta, res) {
                console.log(org.id, res.districtList[0].adcode);
                that.http.get('/org/avc/update/' + org.id, {adcode: res.districtList[0].adcode}).subscribe();
              });
            });


          });
        });

      }


    });

  }

  updateAdcode() {
    const that = this;
    this.http.get('/org/shop/list', null).subscribe(data => {
      for (const shop of data) {
          const geo = shop.orgObj.geo;
          // console.log(shop.id, geo);

        AMap.service('AMap.Geocoder', function() {
          const geocoder = new AMap.Geocoder({});
          geocoder.getAddress(geo, function(status, result) {
            if (status === 'complete' && result.info === 'OK') {
              const adcode = result.regeocode.addressComponent.adcode;

              that.http.get('/org/shop/adcode/update', {shopId: shop.id, adcode: adcode}).subscribe(rs => {
                console.log(rs);
              });

            } else {
              console.log('fail');
            }
          });

        });

      }
    });
  }

  testForkjoin() {
    const myPromise = val =>
      new Promise(resolve =>
        setTimeout(() => resolve(`Promise Resolved: ${val}`), 5000)
      );

    const example = forkJoin(
      of('Hello'),
      of('World').pipe(delay(1000)),
      interval(1000).pipe(take(1)),
      interval(1000).pipe(take(2)),
      myPromise('RESULT')
    );


    // const subscribe = example.subscribe(val => console.log(val));

    new Subject().debounceTime(1000).subscribe(params => {
      example.subscribe(val => console.log(val));
    });

  }

  testAsync() {
    of('Hello', 'Goodbye')
      .pipe(concatMap(val => new Promise(resolve => resolve(`${val} World!`))))
      .subscribe(val => console.log(val));
  }

  testCombineAll() {
    // const source = interval(1000).pipe(take(2));
    // const example = source.pipe(
    //   map(val => interval(1000).pipe(map(i => `Result (${val}): ${i}`), take(5)))
    // );
    // const combined = example.pipe(combineAll());
    //
    // const subscribe = combined.subscribe(val => console.log(val));

  }

  testSort() {
    // const arr = [{name: 'aa', id1: 2, id2: 6}, {name: 'bb', id1: 4, id2: 3}];
    // const arr1 = arr;
    // const arr2 = arr;
    // forkJoin(arr1.sort(this.sortUtil.desc('id1')), arr2.sort(this.sortUtil.desc('id2')));
    //
    // // arr1.sort(this.sortUtil.desc('id1'));
    // console.log(arr1);
    // // arr2.sort(this.sortUtil.desc('id2'));
    // console.log(arr2);
  }

}
