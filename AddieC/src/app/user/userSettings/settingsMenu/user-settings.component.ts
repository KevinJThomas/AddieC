import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../userShared/user';
import { UserService } from '../../userShared/user.service';

import * as Rx from "rxjs/Rx";
import * as firebase from 'firebase';

@Component({
    templateUrl: './user-settings.component.html',
    styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {
    theUser: any;
    privacySetting: string;
    checked = true;
    nickname: string;
    isDataAvailable = false;
    privacyOptions = [
        'Public',
        'Friends Only',
        'Private',
    ];
    myBlockedUsers = [
        'Bubbles',
        'Flower',
    ]

    constructor(private router: Router, private userSVC: UserService) {}

    ngOnInit() {
        this.getUser();
    }

    getUser() {
        const dbRef = firebase.database().ref('users/');
        dbRef.once('value')
        .then((snapshot) => {
            const tmp: string[] = snapshot.val();
            this.theUser = Object.keys(tmp).map(key => tmp[key]).filter(item => item.uid === this.userSVC.getUserId())[0];
        }).then(() =>        
        this.isDataAvailable = true);
    }

    blockedUsers() {
        this.router.navigate(['/user/settings/blockedUsers']);
    }

    securityQuestion() {
        this.router.navigate(['/user/settings/securityQuestion']);
    }

    resetPassword() {
        this.router.navigate(['/user/settings/resetPassword']);
    }

    reportAbuse() {
        this.router.navigate(['/user/settings/reportAbuse']);
    }
}
