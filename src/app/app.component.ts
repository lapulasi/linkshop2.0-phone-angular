import {Title} from '@angular/platform-browser';

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, NavigationStart, Router} from "@angular/router";
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import {AuditLogService} from "./service/audit-log.service";

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {

  public constructor(
    private router: Router,
    private route: ActivatedRoute,
    private auditLogService: AuditLogService,
    private titleService: Title) {}

  ngOnInit() {

    // localStorage.setItem('exper', 1);


    // 微信中路由处理
    this.router.events.subscribe(event => {
        if (event instanceof NavigationStart) {
          let url = event.url;
          if (url.indexOf('wx') > 0 && !localStorage.getItem('wx')) {
            localStorage.setItem('wx', '1');
          }

          if (localStorage.getItem('wx') && url.indexOf('wx') < 0) {
            if (url.indexOf('?') < 0) {
              url = url.concat('?wx=1');
            } else {
              url = url.concat('&wx=1');
            }
            this.router.navigateByUrl(url);
          }
        }

    });


    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .map(() => this.route)
      .map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
      })
      // .filter(route => route.outlet === 'primary')
      // .mergeMap(route => route.data)
      .subscribe((event) => {
      if (event.snapshot.data['title']) {
        this.titleService.setTitle(event.snapshot.data['title']);
      }

        const path = event.snapshot['_routerState']['url'];
        if (path) {
          this.auditLogService.addPageLog(path.split('?')[0]);
        }

      });
  }

}
