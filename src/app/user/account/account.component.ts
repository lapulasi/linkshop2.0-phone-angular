import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';
import {DateUtil} from '../../common/date-util';
import {UserService} from '../../service/user.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  templateUrl: './account.component.html'
})

export class AccountComponent implements OnInit {
  preImgUrl: any = environment.pre_img_url;
  headImg: any;
  phone: any;
  realName: any;
  constructor(private dateUtile: DateUtil,
              private service: UserService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.headImg = params['headImg'];
      this.phone = params['phone'];
      this.realName = params['realName'];
    });
  }
}
