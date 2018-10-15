import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OrgService} from '../../service/org.service';
import {Location} from '@angular/common';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';

@Component({
  template: `<div class='regional'>
    <div class='search-page'>
      <div class='search'>
        <ul>
          <li></li>
          <li><input #searchBox type='text' placeholder='搜索' (input)='search(searchBox.value)'/></li>
        </ul>
      </div>
      <p (click)='goBack()'>取消</p>
    </div>
    <div class='search-list'>
      <ul>
        <li *ngFor='let item of resultList$ | async' (click)='gotoPrePage(item.id)'>
          <span>{{item.name}}</span>
        </li>
      </ul>
      <div class='clear'>
        <div>
          <span></span>
          <span>清除搜索记录</span>
        </div>
      </div>
    </div>
  </div>`
})

export class RegionalSearchComponent implements OnInit {

  orgCode: any;
  adcode: any;
  levelId: any;
  resultList$: Observable<any>;

  returnPageUrl: any;
  private searchTerms = new Subject<string>();


  constructor(
    private router: Router,
    private location: Location,
    private route: ActivatedRoute,
  private orgService: OrgService) {}

  ngOnInit() {
    this.orgCode = this.route.snapshot.queryParams['orgCode'];
    this.adcode = this.route.snapshot.queryParams['adcode'];
    this.levelId = this.route.snapshot.queryParams['levelId'];
    this.returnPageUrl = this.route.snapshot.queryParams['returnUrl'];

    this.resultList$ = this.searchTerms.pipe(
      debounceTime(300),

      distinctUntilChanged(),

      switchMap((term: string) => this.adcode === '0' ? this.orgService.listOrgsQuery(term.trim(), this.levelId, this.orgCode) : of('')),
    );
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  gotoPrePage(id) {
    this.router.navigateByUrl(this.returnPageUrl + '#target' + id);
  }

  // 返回区域表现页
  goBack() {
    this.location.back();
  }
}
