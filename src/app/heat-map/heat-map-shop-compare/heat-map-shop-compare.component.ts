import {Component, Input, OnInit} from '@angular/core';
import {WebHttpClient} from '../../web.httpclient';

@Component({
  templateUrl: './heat-map-shop-compare.component.html'
})

export class HeatMapShopCompareComponent implements OnInit {

  @Input() orgCode = '';

  constructor(private http: WebHttpClient) {

  }

  ngOnInit() {
    this.http.get('/org/shops', {orgCode: ''} ).subscribe(value => {});
  }
}
