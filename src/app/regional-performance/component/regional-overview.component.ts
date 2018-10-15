import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  template: `<div class="overview">
    <app-overview-guest *ngIf="vdoing == 'guest'" [firstLevelId]="levelList[0].id" [org]="org" [adcode]="adcode" [queryParams]="queryParams"></app-overview-guest>
    <app-overview-sales *ngIf="vdoing == 'sales'" [firstLevelId]="levelList[0].id" [org]="org" [adcode]="adcode" [queryParams]="queryParams"></app-overview-sales>
    <app-overview-effective *ngIf="vdoing == 'effective'" [firstLevelId]="levelList[0].id" [org]="org" [adcode]="adcode" [queryParams]="queryParams"></app-overview-effective>
  </div>`
})

export class RegionalOverviewComponent implements OnInit {
  org: any;
  adcode: any;
  queryParams: any;
  vdoing: any;
  levelList: any;

  constructor(
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.org = this.route.snapshot.data['org'];
    this.levelList = this.route.snapshot.data['levelList'].reverse();
    this.adcode = this.route.snapshot.params['adcode'];
    this.vdoing = this.route.snapshot.params['vdoing'];
    this.queryParams = this.route.snapshot.queryParams;
  }





}
