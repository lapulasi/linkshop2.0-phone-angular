import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserComponent} from './user.component';
import {AccountComponent} from './account/account.component';
import {ArriveShopReminderComponent} from './arrive-shop-reminder/arrive-shop-reminder.component';
import {AttendanceManagementComponent} from './attendance-management/attendance-management.component';
import {BusinessHoursComponent} from './business-hours/business-hours.component';
import {PasswordComponent} from './password/password.component';
import {QuestionComponent} from './question/question.component';
import {ConcatComponent} from './concat/concat.component';
import {EscapeComponent} from './escape/escape.component';
import {MyAttendanceComponent} from './my-attendance/my-attendance.component';
import {MyEmployeeAttendanceComponent} from './my-employee-attendance/my-employee-attendance.component';
import {OrganizationSwitchComponent} from './organization-switch/organization-switch.component';
import {SalesOpportunityComponent} from './sales-opportunity/sales-opportunity.component';
import {SalesRepportComponent} from './sales-repport/sales-repport.component';
import {UserRoutingModule} from './user-routing.module';
import {DateUtil} from '../common/date-util';
import {UserService} from '../service/user.service';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule
  ],
  declarations: [
    UserComponent,
    AccountComponent,
    ArriveShopReminderComponent,
    AttendanceManagementComponent,
    BusinessHoursComponent,
    PasswordComponent,
    QuestionComponent,
    ConcatComponent,
    EscapeComponent,
    MyAttendanceComponent,
    MyEmployeeAttendanceComponent,
    OrganizationSwitchComponent,
    SalesOpportunityComponent,
    SalesRepportComponent
  ],
  providers: [
    DateUtil,
    UserService
  ]
})

export class UserModule {

}
