import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {RegionService} from "../region.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit, OnChanges {

  @Output() valChange = new EventEmitter();
  @Input() org: any;
  @Input() selectedLevel: any;

  searchTerms = new Subject<string>();
  resultList$: Observable<any>;

  constructor(private regionService: RegionService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.selectedLevel) {
      this.resultList$ = this.searchTerms.pipe(
        debounceTime(300),

        distinctUntilChanged(),

        switchMap((term: string) => this.regionService.search(term.trim(), this.selectedLevel.id, this.org.orgCode))
      );
    }
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  valChanged(id) {
    this.valChange.emit({show: false, selectId: id});
  }

  cancle() {
    this.valChange.emit({show: false});
  }

}
