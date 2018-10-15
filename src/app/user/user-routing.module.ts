import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
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

const routes: Routes = [
  {
    path: '',
    component: UserComponent
  },
  {
    path: 'account',
    component: AccountComponent
  },
  {
    path: 'reminder',
    component: ArriveShopReminderComponent
  },
  {
    path: 'attendance',
    component: AttendanceManagementComponent
  },
  {
    path: 'timeSetting',
    component: BusinessHoursComponent
  },
  {
    path: 'password',
    component: PasswordComponent
  },
  {
    path: 'question',
    component: QuestionComponent
  },
  {
    path: 'concat',
    component: ConcatComponent
  },
  {
    path: 'escape',
    component: EscapeComponent
  },
  {
    path: 'myAttendance',
    component: MyAttendanceComponent
  },
  {
    path: 'employeeAttendance',
    component: MyEmployeeAttendanceComponent
  },
  {
    path: 'orgSwitch',
    component: OrganizationSwitchComponent
  },
  {
    path: 'salesOpportunity',
    component: SalesOpportunityComponent
  },
  {
    path: 'salesReport',
    component: SalesRepportComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
