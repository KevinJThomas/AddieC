import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './start/app.component';

import { NavComponent } from './shared/navbar.component';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { AboutComponent } from './about/about.component';
import { AppRoutingModule } from './shared/app.routing';

import { UserModule } from './user/user.module';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    ErrorComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    UserModule,
    AppRoutingModule //AppRoutingModule needs to be imported last or routing will not work
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
