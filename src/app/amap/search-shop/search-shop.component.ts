import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {OrgLevelService} from "../../service/org-level.service";
import {OrgService} from "../../service/org.service";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {debounceTime, distinctUntilChanged, switchMap} from "rxjs/operators";
import {RegionService} from "../../regional/region.service";
import {AuditLogService} from "../../service/audit-log.service";
import {DeviceService} from "../../service/device-service";

@Component({
  selector: 'app-search-shop',
  templateUrl: './search-shop.component.html',
  styleUrls: ['./search-shop.component.css']
})
export class SearchShopComponent implements OnInit {

  searchTerms = new Subject<string>();
  resultList$: Observable<any>;
  shopLevelId: any;
  orgCode: any;

  constructor(
    private route: ActivatedRoute,
    private deviceService: DeviceService,
    private orgLevelService: OrgLevelService,
    private auditLogService: AuditLogService,
    private regionService: RegionService) {

  }

  ngOnInit() {

    this.route.queryParams.subscribe(queryParams => {
      this.orgCode = queryParams.orgCode;

      this.orgLevelService.getShopLevelByOrgCode(this.orgCode).subscribe(data => {
        this.shopLevelId = data.id;

        this.resultList$ = this.searchTerms.pipe(
          debounceTime(300),

          distinctUntilChanged(),

          switchMap((term: string) => {
            return this.regionService.search(term.trim(), this.shopLevelId, this.orgCode);
          })
        );

        setTimeout(() => {
          this.searchTerms.next('');
        }, 300);

      });

    });
  }

  // 巡店
  gotoShopInspecton(shopId: any) {
    this.auditLogService.addEventLog('inspectShop', `shopid:${shopId}`);
    // window.location.href = 'shop://inspection?shopId=' + shopId;

    this.deviceService.getDeviceType(shopId).subscribe(data => {
        const deviceType = data.resultData;
        window.location.href = `shop://inspection?shopId=${shopId}=${deviceType}`;
    });

  }


  search(term: string): void {
    this.searchTerms.next(term);
  }

  cancle() {
    window.history.back();
  }

}
