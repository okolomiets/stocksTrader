import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<div>
    <h1>
      {{title}}
    </h1>
    <app-header></app-header>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  </div>`,
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'Stocks';
}
