import {Component, OnInit} from '@angular/core';
import {DateUtil} from '../../common/date-util';
import {ShopService} from '../../service/shop.service';
import 'rxjs/add/operator/map';

@Component({
  templateUrl: './sales-report.component.html'
})

export class SalesReportComponent implements OnInit {

  shopName: any;
  shopId: any = 1005;
  userId: any = 50030;
  totalMoney: any;
  salesNum: any;
  reportTime: any;
  now: any = Date();
  errorMsg: any;

  constructor(private dateUtil: DateUtil,
              private service: ShopService) {
  }

  ngOnInit() {
    this.reportTime = this.dateUtil.formatDate(this.now);
    // console.log(this.reportTime);
    this.getIds();
  }

  switchTime(num) {
    if (num < 0) {
      this.reportTime = this.dateUtil.formatDate(new Date(this.reportTime).getTime() + (-1000 * 3600 * 24));
    } else if (num > 0) {
      this.reportTime = this.dateUtil.formatDate(new Date(this.reportTime).getTime() + (1000 * 3600 * 24));
    }
  }

  getIds() {
    this.shopId = this.dateUtil.getQueryString('shopId');

    if (this.dateUtil.getQueryString('userId')) {
      this.userId = this.dateUtil.getQueryString('userId');
    } else if (this.dateUtil.getQueryString('useId')) {
      this.userId = this.dateUtil.getQueryString('useId');
    }


    this.getShopName();
    // console.log(this.shopId + ';;;;;;' + this.userId);
  }

  report() {
    if (this.salesNum === null || this.salesNum === undefined || this.totalMoney === null || this.totalMoney === undefined) {
      this.errorMsg = '总金额和件数不能为空!';
    }
    this.service.salesReport({
      shopId: this.shopId,
      date: this.reportTime,
      salesVolume: this.salesNum,
      salesAmount: this.totalMoney,
      userId: this.userId
    }).subscribe(result => {
      // console.log(result.status);
      if (result.status === 200) {
        this.errorMsg = '上报成功!';
      } else {
        this.errorMsg = '上报失败!';
      }
    });
  }

  getShopName() {
    this.service.getShopName(this.shopId).subscribe(result => {
      // console.log(result);
      this.shopName = result.name;
    });
  }
}
