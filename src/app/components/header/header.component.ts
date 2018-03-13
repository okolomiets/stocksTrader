import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { CoreService } from '../../core/core.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  user$: Subject<{}>;
  getBalanceSub: Subscription;
  constructor(private coreService: CoreService) { }

  ngOnInit() {
    this.user$ = this.coreService.userBalance$;
    this.getBalanceSub = this.coreService.getBalance().subscribe((user: User) => {
      this.coreService.userBalance = user;
      this.coreService.userBalance$.next(user);
    });
  }

  ngOnDestroy() {
    this.getBalanceSub.unsubscribe();
  }

}
