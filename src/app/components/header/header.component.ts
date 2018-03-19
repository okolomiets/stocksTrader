import {Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { User } from '../../models/user.model';
import * as fromStore from '../../store';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user$: Observable<User>;
  constructor(
    private store: Store<fromStore.AppState>
  ) { }

  ngOnInit() {
    this.user$ = this.store.select(fromStore.getUser);
    this.store.dispatch(new fromStore.LoadUser());
    this.store.dispatch(new fromStore.LoadStocks());
  }
}
