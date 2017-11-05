import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { UserInfo } from '../shared/user-info';
import { Observable, BehaviorSubject } from 'rxjs';
import {Router} from '@angular/router';
import { EchartsRadarComponent } from './charts/echarts/echarts-radar.component';

@Component({
  selector: 'ngx-reports',
//   styleUrls: ['./reports.component.scss'],
  templateUrl: './reports.component.html',
})
export class ReportsComponent implements AfterViewInit, OnDestroy {
  userInfo: Observable<UserInfo>;
  isLoggedIn = new BehaviorSubject(false);
  name: string;


  constructor(private authService: AuthService, private router: Router) {
    console.log("Displaying reports");
    this.userInfo = authService.userInfo;
    this.userInfo
      .map(userInfo => !userInfo.isAnonymous)
      .subscribe(this.isLoggedIn);
    this.checkLogin();
    // this.name = this.authService.currentUserAsVar().displayName;
  }

  ngAfterViewInit() {
   
  }

  ngOnDestroy(): void {
  }
  
  checkLogin(): boolean {
    //this.authService.addPT();
    if (this.authService.isLoggedInBool() === undefined || this.authService.isLoggedInBool() === null) {
      console.log("Skipping Info Page Display");
      // this.router.navigate(['../welcome/'])
      return false;
    }

    console.log("Showing Info Page Display");
    console.log(this.authService.currentUserAsVar());
    console.log(this.authService.currentUser());
    return !this.authService.isLoggedInBool();
  }

  currentUser(): Observable<UserInfo> {
    return this.authService.currentUser();
  }


}
