import {Component, Input, OnInit} from '@angular/core';
import {WebHttpClient} from '../../web.httpclient';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-shop-compare-list',
  templateUrl: './shop-compare-list.component.html',
  styleUrls: ['./shop-compare-list.component.css']
})
export class ShopCompareListComponent implements OnInit {

  @Input() org ;

  shopList: Array<any>;
  inputFocus = false;

  beginDate;

  endDate;

  filterText = '';

  constructor(private http: WebHttpClient, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(queryParamMap => {
      this.org = queryParamMap.get('org');
      this.beginDate = queryParamMap.get('beginDate');
      this.endDate = queryParamMap.get('endDate');
    });
    const orgCode = this.org;
    this.http.get('/org/shops', {orgCode}).subscribe(shopList => this.shopList = shopList);
  }

  onSelectShop(shop): void {
    this.router.navigate(['../compare', shop['id']], { relativeTo: this.route ,
      queryParams: {beginDate: this.beginDate, endDate: this.endDate}});
  }

  onKeyUp(fiterText: string): void {
    this.filterText = fiterText;
  }

  filter(shopName: string): boolean {
    if (this.filterText === '') {
      return true;
    }
    return shopName.indexOf(this.filterText) >= 0;
  }

}
