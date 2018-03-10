import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// shared
import { SharedModule } from './shared/shared.module';

// components
import * as fromComponents from './components/components.index';
import { AppComponent } from './app.component';

// services
import { AppService } from './app.service';

// routes
import { ROUTES } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    ...fromComponents.container
  ],
  entryComponents: [
    fromComponents.ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
    SharedModule
  ],
  providers: [
    AppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
