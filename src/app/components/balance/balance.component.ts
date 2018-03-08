import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BalanceComponent implements OnInit {
  @Input() user: User;
  constructor() { }

  ngOnInit() { }

}
