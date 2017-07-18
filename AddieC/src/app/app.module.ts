import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './start/app.component';
import * as firebase from 'firebase';

import { NavComponent } from './shared/navbar.component';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { AboutComponent } from './about/about.component';
import { AppRoutingModule } from './shared/app.routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
   MdButtonModule,
   MdCheckboxModule,
   MdMenuModule,
   MdToolbarModule,
   MdGridListModule
  } from '@angular/material';

import 'hammerjs';

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
    BrowserAnimationsModule,
    MdMenuModule,
    MdToolbarModule,
    MdButtonModule,
    MdCheckboxModule,
    MdGridListModule,
    UserModule,
    AppRoutingModule // AppRoutingModule needs to be imported last or routing will not work
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})

export class AppModule {
  constructor() {
        firebase.initializeApp({
            apiKey: 'AIzaSyBnYaUlBo8GEWfw9Z_nBohqcGk-z3fEn-o',
            authDomain: 'addiec-1026c.firebaseapp.com',
            databaseURL: 'https://addiec-1026c.firebaseio.com',
            projectId: 'addiec-1026c',
            storageBucket: 'addiec-1026c.appspot.com',
            messagingSenderId: '809044298440'
        })
     }
 }
