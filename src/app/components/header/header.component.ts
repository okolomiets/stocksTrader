import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { AppService } from '../../app.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  user$: Subject<{}>;
  getBalanceSub: Subscription;
  constructor(private appService: AppService) { }

  ngOnInit() {
    this.user$ = this.appService.userBalance$;
    this.getBalanceSub = this.appService.getBalance().subscribe((user: User) => {
      this.appService.userBalance = user;
      this.appService.userBalance$.next(user);
    });
  }

  ngOnDestroy() {
    this.getBalanceSub.unsubscribe();
  }

}
