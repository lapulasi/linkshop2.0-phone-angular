import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-infinite-calendar-placeholder',
  templateUrl: './infinite-calendar-placeholder.component.html',
  styleUrls: ['./infinite-calendar-placeholder.component.scss']
})
export class InfiniteCalendarPlaceholderComponent implements OnInit {

  iterator;

  _placeHolderNumber = 0;

  @Input()
  set placeHolderNumber(placeHolderNumber: number) {
    this._placeHolderNumber = placeHolderNumber;
    this.iterator = Array(placeHolderNumber);
  }



  constructor() { }

  ngOnInit() {
    // this.iterator = Array(this.placeHolderNumber).keys();
  }

  width(): string {
    return (this.placeHolderNumber * 50) + 'px';
  }


}
