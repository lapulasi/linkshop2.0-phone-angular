import {Component, OnInit} from '@angular/core';
import {environment} from '../../environments/environment';
import {DateUtil} from '../common/date-util';
import {UserService} from '../service/user.service';

@Component({
  templateUrl: './user.component.html'
})

export class UserComponent implements OnInit {
  preImgUrl: any = environment.pre_img_url;
  userId: any = '500030';
  access_token: any = 'd12c780e-0904-4fcd-94c7-cc9e4eb75367';
  user: any;

  constructor(private dateUtile: DateUtil,
              private service: UserService) {
  }

  ngOnInit() {
    /*this.userId = this.dateUtile.getQueryString('userId');
    this.access_token = this.dateUtile.getQueryString('access_token');*/
    // console.log(this.userId + '\\' + this.access_token);
    this.loadUserInfo();
  }

  loadUserInfo() {
    this.service.userInfo(this.userId).subscribe(result => {
      // console.log(JSON.stringify(result, null, 4));
      this.user = result;
    });
  }
}
