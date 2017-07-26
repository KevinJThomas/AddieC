import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../userShared/user.service';

import * as Rx from 'rxjs/Rx';
import * as firebase from 'firebase';

@Component({
    templateUrl: './user-settings.component.html',
    styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {
    theUser: any;
    blockedUserList: string[] = [];
    isDataAvailable = false;
    privacyOptions = [
        'Public',
        'Friends Only',
        'Private',
    ];

    constructor(private router: Router, private userSVC: UserService) {}

    ngOnInit() {
        this.getUser();
    }

    // TODO: Move to service as observable
    getUser() {
        const dbRef = firebase.database().ref('users/');
        dbRef.once('value')
        .then((snapshot) => {
            const tmp: string[] = snapshot.val();
            this.theUser = Object.keys(tmp).map(key => tmp[key]).filter(item => item.uid === this.userSVC.getUserId())[0];
            if (this.theUser.blockedUsers) {
                for (const uid of this.theUser.blockedUsers) {
                    dbRef.once('value')
                    .then((snapshot) => {
                        const tmp: string[] = snapshot.val();
                        this.blockedUserList.push(Object.keys(tmp).map(key => tmp[key]).filter(item => item.uid === uid)[0].email);
                    });
                }
            } else {
                this.blockedUserList = ['None'];
            }
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
        const verify = confirm(`Send a password reset email to ` + this.userSVC.loggedInUser + `?`)
        if (verify === true) {
            this.userSVC.passwordResetEmail();
        }
    }

    reportAbuse() {
        this.router.navigate(['/user/settings/reportAbuse']);
    }

    cancel() {
        this.router.navigate(['/user']);
    }

    apply() {
        this.userSVC.updateUserSettings(this.theUser);
        this.router.navigate(['/user']);
    }
}
