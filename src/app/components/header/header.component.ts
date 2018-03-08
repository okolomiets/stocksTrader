import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { User } from '../../models/user.model';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user$: Subject<{}>;
  constructor(private appService: AppService) { }

  ngOnInit() {
    this.user$ = this.appService.userBalance$;
    this.appService.getBalance().subscribe((user: User) => {
      this.appService.userBalance = user;
      this.appService.userBalance$.next(user);
    });
  }

}
